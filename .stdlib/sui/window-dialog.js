/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Alert is a simpler dialog containing only text.
 * @param {string|!Object} title
 * @param {string|!Object} message
 * @param {boolean=} error default to false.
 * @param {?string=} helpUrlSuffix enable bottom-left icon button to go to url for help.
 */
function AlertDialog(title, message, error, helpUrlSuffix) {
  if (error === undefined) {
    error = false
  }

  var self = new Dialog(title, helpUrlSuffix)
  self.buttonMaxHeight = 20
  self.buttonActivateDefault = true
  self.hgroup(function(main) {
    main.image(undefined, error ? 'alert_error' : 'alert_warning')
    main.staticText(undefined, message)
  })

  return self
}

/**
 * Construct a new dialog.
 * @param {string|!Object} title
 * @param {?string=} helpUrlSuffix enable bottom-left icon button to go to url for help.
 */
function Dialog(title, helpUrlSuffix) {
  var self = new Window('dialog', title)
  self.orientation = 'column'
  self.defaultButton, self.yesButton, self.cancelButton, self.helpButton, self.helpIconButton

  var defaultButtonContainer, yesButtonContainer, cancelButtonContainer, helpButtonContainer

  // main content
  self.main = self.add('group')

  // buttons
  Internals.addGroup(self, 'row', function(buttons) {
    buttons.alignment = 'fill'

    if (helpUrlSuffix !== undefined) {
      self.helpIconButton = buttons.iconButton(undefined, 'ic_help', { style: "toolbutton" }).also(function(it) {
        it.alignment = ['left', 'center']
        it.helpTip = R.string.tip_whatsthis
        it.addClickListener(function() { Scripts.openUrl(Scripts.URL_WEBSITE + helpUrlSuffix) })
      })
    }
    helpButtonContainer = buttons.sgroup(function(container) { container.alignment = ['left', 'center'] })
    var alignRight = function(container) { container.alignment = ['right', 'center'] }
    if (Scripts.OS_MAC) {
      yesButtonContainer = buttons.sgroup(alignRight)
      cancelButtonContainer = buttons.sgroup(alignRight)
      defaultButtonContainer = buttons.sgroup(alignRight)
    } else {
      defaultButtonContainer = buttons.sgroup(alignRight)
      yesButtonContainer = buttons.sgroup(alignRight)
      cancelButtonContainer = buttons.sgroup(alignRight)
    }
  })

  /**
   * Set main layout to horizontal.
   * @param {function(!Group): undefined} configuration
   */
  self.hgroup = function(configuration) {
    self.main.orientation = 'row'
    if (configuration !== null) {
      configuration(self.main)
    }
  }

  /**
   * Set main layout to vertical.
   * @param {function(!Group): undefined} configuration
   */
  self.vgroup = function(configuration) {
    self.main.orientation = 'column'
    if (configuration !== null) {
      configuration(self.main)
    }
  }

  /**
   * Default button responds to pressing the Enter key.
   * @param {?string|?Object=} text
   * @param {?function(): boolean=} action
   */
  self.setDefaultButton = function(text, action) {
    text = text || 'OK'
    self.defaultButton = appendButton(defaultButtonContainer, text, action, { name: "ok" })
    if (self.buttonActivateDefault) {
      // skip Illustrator on Windows, see `child-edittext` for more
      if (!Scripts.OS_MAC && Scripts.APP_AI) {
        return
      }
      self.defaultButton.active = true
    }
  }

  /**
   * Yes button is a secondary default button that sits beside it.
   * @param {?string|?Object=} text
   * @param {?function(): boolean=} action
   */
  self.setYesButton = function(text, action) {
    text = text || getString(R.string.yes)
    self.yesButton = appendButton(yesButtonContainer, text, action)
  }

  /**
   * Cancel button responds to pressing the Escape key.
   * @param {?string|?Object=} text
   * @param {?function(): boolean=} action
   */
  self.setCancelButton = function(text, action) {
    text = text || getString(R.string.cancel)
    self.cancelButton = appendButton(cancelButtonContainer, text, action, { name: "cancel" })
  }

  /**
   * Help button sits on the left side of the dialog.
   * @param {?string|?Object=} text
   * @param {?function(): boolean=} action
   */
  self.setHelpButton = function(text, action) {
    text = text || getString(R.string.help)
    self.helpButton = appendButton(helpButtonContainer, text, action)
  }

  /** In `AlertDialog`, max button height is shrinked. */
  self.buttonMaxHeight = undefined

  /** In `AlertDialog`, default button is activated. */
  self.buttonActivateDefault = false

  function appendButton(group, text, action, properties) {
    return group.button(undefined, text, properties).also(function(it) {
      if (self.buttonMaxHeight !== undefined) {
        it.maximumSize.height = self.buttonMaxHeight
      }
      it.addClickListener(function() {
        var consume
        if (action !== undefined) {
          consume = action()
        }
        if (consume === undefined || !consume) {
          self.close()
        }
      })
    })
  }

  return self
}
