/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Construct a new dialog.
 * @param {String} title window title.
 */
function Dialog(title) {
    var self = this
    this.title = title
    this.positiveButton, this.negativeButton, this.neutralButton

    var window = new Window('dialog', title)
    window.orientation = 'column'

    this.main = window.add('group')
    this.buttons = window.add('group').also(function(topGroup) {
        topGroup.orientation = 'stack'
        topGroup.alignment = 'fill'
        self.leftButtons = topGroup.hgroup(function(group) {
            group.alignment = 'left'
        })
        self.rightButtons = topGroup.hgroup(function(group) {
            group.alignment = 'right'
        })
    })

    var positiveButtonText, positiveButtonAction
    var negativeButtonText, negativeButtonAction
    var neutralButtonText, neutralButtonAction

    this.setTitle = function(title) {
        self.title = title
        window.text = title
    }

    this.hgroup = function(configuration) {
        self.main.orientation = 'row'
        if (configuration !== null) {
            configuration(self.main)
        }
    }

    this.vgroup = function(configuration) {
        self.main.orientation = 'column'
        if (configuration !== null) {
            configuration(self.main)
        }
    }

    /**
     * Set positive dialog button, the text will always be `OK`.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     */
    this.setPositiveButton = function(action) {
        positiveButtonText = 'OK' // automatically marked as positive button by Adobe
        positiveButtonAction = action
    }

    /**
     * Set negative dialog button.
     * @param {String} text button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     */
    this.setNegativeButton = function(text, action) {
        negativeButtonText = checkNotNull(text)
        negativeButtonAction = action
    }

    /**
     * Set neutral dialog button.
     * @param {String} text button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     */
    this.setNeutralButton = function(text, action) {
        neutralButtonText = checkNotNull(text)
        neutralButtonAction = action
    }

    /** Show the dialog, after populating buttons. */
    this.show = function() {
        if (neutralButtonText !== undefined) {
            self.neutralButton = appendButton(self.leftButtons, neutralButtonText, neutralButtonAction)
        }
        if (isMacOS()) {
            if (negativeButtonText !== undefined) {
                self.negativeButton = appendButton(self.rightButtons, negativeButtonText, negativeButtonAction)
            }
            if (positiveButtonText !== undefined) {
                self.positiveButton = appendButton(self.rightButtons, positiveButtonText, positiveButtonAction)
            }
        } else {
            if (positiveButtonText !== undefined) {
                self.positiveButton = appendButton(self.rightButtons, positiveButtonText, positiveButtonAction)
            }
            if (negativeButtonText !== undefined) {
                self.negativeButton = appendButton(self.rightButtons, negativeButtonText, negativeButtonAction)
            }
        }
		window.show()
    }

    /** Manually close the dialog. */
    this.close = function() {
        window.close()
    }

    this.update = function() {
        window.update()
    }

    function appendButton(group, text, action) {
        return group.button(undefined, text).also(function(it) {
            it.onClick = function() {
                var keepDialog
                if (action !== undefined) {
                    keepDialog = action()
                }
                if (keepDialog === undefined || !keepDialog) {
                    self.close()
                }
            }
        })
    }
}