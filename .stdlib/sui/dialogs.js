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

    var okButtonText, okButtonAction
    var yesButtonText, yesButtonAction
    var cancelButtonText, cancelButtonAction
    var helpButtonText, helpButtonAction

    /** Manually set dialog's title. */
    this.setTitle = function(title) {
        window.text = title
    }

    /** Retrieves dialog's title. */
    this.getTitle = function() {
        return window.text
    }

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
     * Set ok dialog button, the text will always be `OK`.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     */
    this.setOKButton = function(action) {
        okButtonText = 'OK' // automatically marked as default button by SUI
        okButtonAction = action
    }

    /**
     * Set yes dialog button.
     * @param {String} text button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     */
    this.setYesButton = function(text, action) {
        yesButtonText = checkNotNull(text)
        yesButtonAction = action
    }

    /**
     * Set cancel dialog button.
     * @param {String} text button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     */
    this.setCancelButton = function(text, action) {
        cancelButtonText = checkNotNull(text)
        cancelButtonAction = action
    }

    /**
     * Set help dialog button.
     * @param {String} text button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     */
    this.setHelpButton = function(text, action) {
        helpButtonText = checkNotNull(text)
        helpButtonAction = action
    }

    /** Show the dialog, after populating buttons. */
    this.show = function() {
        if (helpButtonText !== undefined) {
            self.helpButton = appendButton(self.leftButtons, helpButtonText, helpButtonAction)
        }
        if (isMacOS()) {
            if (cancelButtonText !== undefined) {
                self.cancelButton = appendButton(self.rightButtons, cancelButtonText, cancelButtonAction)
            }
            if (yesButtonText !== undefined) {
                self.yesButton = appendButton(self.rightButtons, yesButtonText, yesButtonAction)
            }
            if (okButtonText !== undefined) {
                self.okButton = appendButton(self.rightButtons, okButtonText, okButtonAction)
            }
        } else {
            if (yesButtonText !== undefined) {
                self.yesButton = appendButton(self.rightButtons, yesButtonText, yesButtonAction)
            }
            if (okButtonText !== undefined) {
                self.okButton = appendButton(self.rightButtons, okButtonText, okButtonAction)
            }
            if (cancelButtonText !== undefined) {
                self.cancelButton = appendButton(self.rightButtons, cancelButtonText, cancelButtonAction)
            }
        }
		window.show()
    }

    /** Manually close the dialog. */
    this.close = function() {
        window.close()
    }

    /** Update UI. */
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

/**
 * Construct a new progress dialog.
 * @param {Number} stop final value of progress bar.
 */
function ProgressDialog(stop) {
    var self = this
    this.statusText, this.countText, this.progressBar

    var window = new Window('palette', 'Please Wait')
    window.orientation = 'column'

    this.labels = window.add('group').also(function(group) {
        group.orientation = 'row'
        self.statusText = group.staticText([150, 21])
        self.countText = group.staticText([50, 21], '0/' + stop)
    })
    this.progressBar = window.add('progressbar', [0, 0, 200, 21], 0, stop)

    var count = 0

    /** Manually set dialog's title. */
    this.setTitle = function(title) {
        window.text = title
    }

    /** Retrieves dialog's title. */
    this.getTitle = function() {
        return window.text
    }

    /** Add progression to dialog with optional status. */
    this.increment = function(status) {
        count++
        if (status !== undefined) {
            self.statusText.text = status
        }
        self.countText.text = count + '/' + stop
        self.progressBar.value = count
        window.update()
    }

    /** Show the dialog. */
    this.show = function() {
		window.show()
    }

    /** Manually close the dialog. */
    this.close = function() {
        window.close()
    }

    /** Update UI. */
    this.update = function() {
        window.update()
    }
}