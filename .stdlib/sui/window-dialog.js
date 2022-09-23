/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Alert is a simpler dialog containing only text.
 * @param {String|Object} title window title.
 * @param {String} message content of the alert.
 * @param {Boolean} error true to display error icon, default to false.
 * @param {String} helpUrlSuffix enable bottom-left icon button to go to url for help, may be null.
 */
function AlertDialog(title, message, error, helpUrlSuffix) {
  if (error === undefined) {
    error = false
  }

  var self = new Dialog(title, helpUrlSuffix)
  self.buttonMaxHeight = 20
  self.buttonActivateDefault = true
  self.hgroup(function(main) {
    main.image(undefined, error ? "alert_error" : "alert_warning")
    main.staticText(undefined, message)
  })

  return self
}

/**
 * Construct a new dialog.
 * @param {String|Object} title window title.
 * @param {String} helpUrlSuffix enable bottom-left icon button to go to url for help, may be null.
 */
function Dialog(title, helpUrlSuffix) {
  var self = new Window("dialog", title)
  self.orientation = "column"
  self.defaultButton, self.yesButton, self.cancelButton, self.helpButton, self.helpIconButton

  var defaultButtonContainer, yesButtonContainer, cancelButtonContainer, helpButtonContainer

  // main content
  self.main = self.add("group")

  // buttons
  self.add("group").also(function(rootButtons) {
    rootButtons.orientation = "stack"
    rootButtons.alignment = "fill"
    rootButtons.hgroup(function(leftButtons) {
      leftButtons.alignment = "left"
      if (helpUrlSuffix !== undefined) {
        self.helpIconButton = leftButtons.iconButton(undefined, "ic_help", { style: "toolbutton" }).also(function(it) {
          it.helpTip = R.string.tip_whatsthis
          it.addClickListener(function() { Scripts.openUrl(Scripts.URL_WEBSITE + helpUrlSuffix) })
        })
      }
      helpButtonContainer = leftButtons.sgroup()
    })
    rootButtons.hgroup(function(rightButtons) {
      rightButtons.alignment = "right"
      if (Scripts.OS_MAC) {
        yesButtonContainer = rightButtons.sgroup()
        cancelButtonContainer = rightButtons.sgroup()
        defaultButtonContainer = rightButtons.sgroup()
      } else {
        defaultButtonContainer = rightButtons.sgroup()
        yesButtonContainer = rightButtons.sgroup()
        cancelButtonContainer = rightButtons.sgroup()
      }
    })
  })

  /**
   * Set main layout to horizontal.
   * @param {Function} configuration runnable with this parent as parameter.
   */
  self.hgroup = function(configuration) {
    self.main.orientation = "row"
    if (configuration !== null) {
      configuration(self.main)
    }
  }

  /**
   * Set main layout to vertical.
   * @param {Function} configuration runnable with this parent as parameter.
   */
  self.vgroup = function(configuration) {
    self.main.orientation = "column"
    if (configuration !== null) {
      configuration(self.main)
    }
  }

  /**
   * Default button responds to pressing the Enter key.
   * @param {String|Object} text nullable button text.
   * @param {Function} action nullable button click listener.
   * @param {Boolean} disabled nullable first state, set true to disable upon creation.
   */
  self.setDefaultButton = function(text, action) {
    self.defaultButton = appendButton(defaultButtonContainer, text || "OK", action,
      { name: "ok" })
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
   * @param {String|Object} text nullable button text.
   * @param {Function} action nullable button click listener.
   * @param {Boolean} disabled nullable first state, set true to disable upon creation.
   */
  self.setYesButton = function(text, action) {
    self.yesButton = appendButton(yesButtonContainer, text || getString(R.string.yes), action)
  }

  /**
   * Cancel button responds to pressing the Escape key.
   * @param {String|Object} text nullable button text.
   * @param {Function} action nullable button click listener.
   * @param {Boolean} disabled nullable first state, set true to disable upon creation.
   */
  self.setCancelButton = function(text, action) {
    self.cancelButton = appendButton(cancelButtonContainer, text || getString(R.string.cancel), action,
      { name: "cancel" })
  }

  /**
   * Help button sits on the left side of the dialog.
   * @param {String|Object} text nullable button text.
   * @param {Function} action nullable button click listener.
   * @param {Boolean} disabled nullable first state, set true to disable upon creation.
   */
  self.setHelpButton = function(text, action) {
    self.helpButton = appendButton(helpButtonContainer, text || getString(R.string.help), action)
  }

  /** In `AlertDialog`, max button height is shrinked. */
  self.buttonMaxHeight = undefined

  /** In `AlertDialog`, deefault button is activated. */
  self.buttonActivateDefault = false

  function appendButton(group, text, action, properties) {
    if (text === undefined) {
      return undefined
    }
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
