/**
 * Construct a new dialog.
 * @param {String} title window title.
 */
function Dialog(title, alignChildren) {
    var self = this
    this.title = title

    var window = new Window('dialog', title)
    window.orientation = 'column'
    
    this.main = window.addVGroup(alignChildren !== undefined ? alignChildren : 'left')
    this.buttons = window.addHGroup()
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
            self.neutralButton = addButton(neutralButtonText, neutralButtonAction, neutralButtonEnabled)
            if (neutralButtonGap !== undefined) {
                self.buttons.addText([0, 0, neutralButtonGap, 0])
            }
        }
        if (isMacOS()) {
            self.negativeButton = addButton(negativeButtonText, negativeButtonAction)
            self.positiveButton = addButton(positiveButtonText, positiveButtonAction, positveButtonEnabled)
        } else {
            self.positiveButton = addButton(positiveButtonText, positiveButtonAction, positveButtonEnabled)
            self.negativeButton = addButton(negativeButtonText, negativeButtonAction)
        }
		window.show()
    }

    /** Manually close the dialog. */
    this.close = function() {
        window.close()
    }

    function addButton(text, action, enabled) {
        var button = self.buttons.addButton(undefined, text, function() {
            self.close()
            if (action !== undefined) {
                action()
            }
        })
        button.enabled = enabled !== undefined ? enabled : true
        return button
    }
}