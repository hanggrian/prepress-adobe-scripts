/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Construct a new dialog.
 * @param {String} title window title.
 */
function Dialog(title, alignChildren) {
    var self = this
    this.title = title

    var window = new Window('dialog', title)
    window.orientation = 'column'

    this.main = _group(window, 'column', function(group) {
        group.alignChildren = alignChildren !== undefined ? alignChildren : 'left'
    })
    this.buttons = _group(window, 'row')
    this.buttons.alignment = 'right'

    var positiveButtonText, positiveButtonAction, positveButtonEnabled
    var negativeButtonText, negativeButtonAction
    var neutralButtonGap, neutralButtonText, neutralButtonAction, neutralButtonEnabled

    /**
     * Set positive dialog button, the text will always be `OK`.
     * @param {Function} action button click listener, may be undefined.
     * @param {Boolean} enabled default is true.
     */
    this.setPositiveButton = function(action, enabled) {
        positiveButtonText = 'OK' // automatically marked as positive button by Adobe
        positiveButtonAction = action
        positveButtonEnabled = enabled
    }

    /**
     * Set negative dialog button.
     * @param {String} text button text.
     * @param {Function} action button click listener, may be undefined.
     */
    this.setNegativeButton = function(text, action) {
        negativeButtonText = checkNotNull(text)
        negativeButtonAction = action
    }

    /**
     * Set neutral dialog button.
     * @param {Number} gap gap between neutral and positive/negative button.
     * @param {String} text button text.
     * @param {Function} action button click listener, may be undefined.
     * @param {Boolean} enabled default is true.
     */
    this.setNeutralButton = function(gap, text, action, enabled) {
        neutralButtonGap = checkNotNull(gap)
        neutralButtonText = checkNotNull(text)
        neutralButtonAction = action
        neutralButtonEnabled = enabled
    }

    /** Show the dialog, after populating buttons. */
    this.show = function() {
        if (neutralButtonText !== undefined) {
            self.neutralButton = appendButton(neutralButtonText, neutralButtonAction, neutralButtonEnabled)
            if (neutralButtonGap !== undefined) {
                self.buttons.staticText([neutralButtonGap, 0])
            }
        }
        if (isMacOS()) {
            if (negativeButtonText !== undefined) {
                self.negativeButton = appendButton(negativeButtonText, negativeButtonAction)
            }
            if (positiveButtonText !== undefined) {
                self.positiveButton = appendButton(positiveButtonText, positiveButtonAction, positveButtonEnabled)
            }
        } else {
            if (positiveButtonText !== undefined) {
                self.positiveButton = appendButton(positiveButtonText, positiveButtonAction, positveButtonEnabled)
            }
            if (negativeButtonText !== undefined) {
                self.negativeButton = appendButton(negativeButtonText, negativeButtonAction)
            }
        }
		window.show()
    }

    /** Manually close the dialog. */
    this.close = function() {
        window.close()
    }

    function appendButton(text, action, enabled) {
        var button = self.buttons.button(undefined, text, function(button) {
            button.onClick = function() {
                self.close()
                if (action !== undefined) {
                    action()
                }
            }
        })
        button.enabled = enabled !== undefined ? enabled : true
        return button
    }
}