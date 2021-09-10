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
    var prepared = false
    this.defaultButton, this.yesButton, this.cancelButton, this.helpButton, this.helpIconButton

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
    var helpURLFile

    /** Returns native window title. */
    this.getTitle = function() { return window.text }

    /** Sets native window title. */
    this.setTitle = function(title) { window.text = title }

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
     * @param {Function} action nullable button click listener.
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
     * @param {Function} action nullable button click listener.
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
     * @param {Function} action nullable button click listener.
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
     * @param {Function} action nullable button click listener.
     * @param {Boolean} disabled nullable first state, set true to disable upon creation.
     */
    this.setHelpButton = function(text, action, disabled) {
        helpButtonText = text || 'Help'
        helpButtonAction = action
        helpButtonDisabled = disabled
    }

    /**
     * Help icon button sits on the leftmost side of the dialog.
     * @param {String} urlFilename file name without extension.
     */
    this.setHelpLink = function(urlFile) {
        helpURLFile = urlFile
    }

    this.prepare = function() {
        if (prepared) {
            return
        }
        if (helpURLFile !== undefined) {
            self.helpIconButton = self.leftButtons.iconButton(undefined, 'ic_help.png', { style: 'toolbutton' }).also(function(it) {
                it.tip('Visit website for help')
                it.onClick = function() { openLink(helpURLFile) }
            })
        }
        self.helpButton = appendButton(self.leftButtons, helpButtonText, helpButtonAction, helpButtonDisabled)
        if (isMacOS()) {
            self.yesButton = appendButton(self.rightButtons, yesButtonText, yesButtonAction, yesButtonDisabled)
            self.cancelButton = appendButton(self.rightButtons, cancelButtonText, cancelButtonAction, cancelButtonDisabled, { name: 'cancel' })
            self.defaultButton = appendButton(self.rightButtons, defaultButtonText, defaultButtonAction, defaultButtonDisabled, { name: 'ok' })
        } else {
            self.yesButton = appendButton(self.rightButtons, yesButtonText, yesButtonAction, yesButtonDisabled)
            self.defaultButton = appendButton(self.rightButtons, defaultButtonText, defaultButtonAction, defaultButtonDisabled, { name: 'ok' })
            self.cancelButton = appendButton(self.rightButtons, cancelButtonText, cancelButtonAction, cancelButtonDisabled, { name: 'cancel' })
        }
        prepared = true
    }

    /** Show the dialog, after populating buttons. */
    this.show = function() {
        self.prepare()
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
        if (text === undefined) {
            return undefined
        }
        return group.button(undefined, text, properties).also(function(it) {
            if (disabled !== undefined && disabled) {
                it.enabled = false
            }
            it.onClick = function() {
                self.close()
                action()
            }
        })
    }
}