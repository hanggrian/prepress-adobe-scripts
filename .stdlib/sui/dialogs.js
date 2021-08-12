/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Construct a new dialog.
 * Button ordering is defined from JavaFX ButtonBar.
 * @param {String} title window title.
 */
function Dialog(title) {
    var self = this
    this.okButton, this.yesButton, this.cancelButton, this.helpButton

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

    var defaultButtonText, defaultButtonAction, defaultButtonDisabled
    var yesButtonText, yesButtonAction, yesButtonDisabled
    var cancelButtonText, cancelButtonAction, cancelButtonDisabled
    var helpButtonText, helpButtonAction, helpButtonDisabled

    /** Set main layout to horizontal. */
    this.hgroup = function(configuration) {
        self.main.orientation = 'row'
        if (configuration !== null) {
            configuration(self.main)
        }
    }

    /** Set main layout to vertical. */
    this.vgroup = function(configuration) {
        self.main.orientation = 'column'
        if (configuration !== null) {
            configuration(self.main)
        }
    }

    /**
     * Default button responds to pressing the Enter key.
     * @param {String} text nullable button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     * @param {Boolean} disabled nullable first state, set true to disable upon creation.
     */
    this.setDefaultButton = function(text, action, disabled) {
        defaultButtonText = text || 'OK'
        defaultButtonAction = action
        defaultButtonDisabled = disabled
    }

    /**
     * Yes button is a secondary default button that sits beside it.
     * @param {String} text nullable button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     * @param {Boolean} disabled nullable first state, set true to disable upon creation.
     */
    this.setYesButton = function(text, action, disabled) {
        yesButtonText = text || 'Yes'
        yesButtonAction = action
        yesButtonDisabled = disabled
    }

    /**
     * Cancel button responds to pressing the Escape key.
     * @param {String} text nullable button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     * @param {Boolean} disabled nullable first state, set true to disable upon creation.
     */
    this.setCancelButton = function(text, action, disabled) {
        cancelButtonText = text || 'Cancel'
        cancelButtonAction = action
        cancelButtonDisabled = disabled
    }

    /**
     * Help button sits on the left side of the dialog.
     * @param {String} text nullable button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     * @param {Boolean} disabled nullable first state, set true to disable upon creation.
     */
    this.setHelpButton = function(text, action, disabled) {
        helpButtonText = text || 'Help'
        helpButtonAction = action
        helpButtonDisabled = disabled
    }

    /** Show the dialog, after populating buttons. */
    this.show = function() {
        if (helpButtonText !== undefined) {
            self.helpButton = appendButton(self.leftButtons, helpButtonText, helpButtonAction, helpButtonDisabled)
        }
        if (isMacOS()) {
            if (cancelButtonText !== undefined) {
                self.cancelButton = appendButton(self.rightButtons, cancelButtonText, cancelButtonAction, cancelButtonDisabled, { name: 'cancel' })
            }
            if (yesButtonText !== undefined) {
                self.yesButton = appendButton(self.rightButtons, yesButtonText, yesButtonAction, yesButtonDisabled)
            }
            if (defaultButtonText !== undefined) {
                self.okButton = appendButton(self.rightButtons, defaultButtonText, defaultButtonAction, defaultButtonDisabled, { name: 'ok' })
            }
        } else {
            if (yesButtonText !== undefined) {
                self.yesButton = appendButton(self.rightButtons, yesButtonText, yesButtonAction, yesButtonDisabled)
            }
            if (defaultButtonText !== undefined) {
                self.okButton = appendButton(self.rightButtons, defaultButtonText, defaultButtonAction, defaultButtonDisabled, { name: 'ok' })
            }
            if (cancelButtonText !== undefined) {
                self.cancelButton = appendButton(self.rightButtons, cancelButtonText, cancelButtonAction, cancelButtonDisabled, { name: 'cancel' })
            }
        }
		window.show()
    }

    /** Manually close the dialog. */
    this.close = function() {
        window.close()
    }

    /** Returns bounds as Array, as opposed to native Bounds. */
    this.getBounds = function() {
        return [window.bounds[0], window.bounds[1], window.bounds[2], window.bounds[3]]
    }

    /** Returns location as Array, as opposed to native Bounds. */
    this.getLocation = function() {
        return [window.location[0], window.location[1]]
    }

    function appendButton(group, text, action, disabled, properties) {
        return group.button(undefined, text, properties).also(function(button) {
            if (disabled !== undefined && disabled) {
                button.enabled = false
            }
            button.onClick = function() {
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

/**
 * Construct a new progress dialog.
 * @param {Number} stop final value of progress bar.
 * @param {String} status message to display, may be null.
 */
function ProgressDialog(stop, status) {
    var self = this
    this.statusText, this.countText, this.progressBar

    var window = new Window('palette', 'Please Wait')
    window.orientation = 'column'

    this.texts = window.add('group').also(function(group) {
        group.orientation = 'row'
        self.statusText = group.staticText([325, 21], (status || 'Please wait') + '...').also(JUSTIFY_LEFT)
        self.countText = group.staticText([75, 21], '0/' + stop).also(JUSTIFY_RIGHT)
    })
    this.progressBar = window.add('slider', [0, 0, 400, 21], 0, 0, stop) // progressbar won't update in palette, use slider instead

    /** Add progression to dialog with optional status. */
    this.increment = function() {
        if (arguments.isNotEmpty()) {
            self.statusText.text = arguments.first().formatArr(Array.prototype.slice.call(arguments, 1)) + '...'
        }
        self.progressBar.value++
        self.countText.text = self.progressBar.value + '/' + stop
        if (self.progressBar.value < stop) {
            window.update()
        } else {
            window.close()
        }
    }

    /** Show the dialog. */
    this.show = function() {
		window.show()
        if (dialog !== undefined) {
            window.location = [
                dialog.getLocation().getLeft() + (dialog.getBounds().getWidth() - self.getBounds().getWidth()) / 2,
                dialog.getLocation().getTop() - 130
            ]
        }
    }

    /** Manually close the dialog. */
    this.close = function() {
        window.close()
    }

    /** Returns bounds as Array, as opposed to native Bounds. */
    this.getBounds = function() {
        return [window.bounds[0], window.bounds[1], window.bounds[2], window.bounds[3]]
    }

    /** Returns location as Array, as opposed to native Bounds. */
    this.getLocation = function() {
        return [window.location[0], window.location[1]]
    }

    this.show() // show dialog on creation
}