/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var _alertButtonHeight = OS_MAC ? 20 : 21

/**
 * Alert is a simpler dialog containing only text.
 * @param {String} title window title.
 * @param {String} message content of the alert.
 * @param {Boolean} error true to display error icon, default to false.
 * @param {String} helpUrlSuffix enable bottom-left icon button to go to url for help, may be null.
 */
function AlertDialog(title, message, error, helpUrlSuffix) {
    if (error === undefined) {
        error = false
    }

    var dialog = new Dialog(title, helpUrlSuffix)
    dialog.hgroup(function(main) {
        main.image(undefined, error ? 'alert_error' : 'alert_warning')
        main.staticText(undefined, message)
    })

    /** Returns native window title. */
    this.getTitle = function() { return dialog.getTitle() }

    /** Sets native window title. */
    this.setTitle = function(title) { dialog.setTitle(title) }

    /**
     * Default button responds to pressing the Enter key.
     * @param {String} text nullable button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     * @param {Boolean} disabled nullable first state, set true to disable upon creation.
     */
    this.setDefaultButton = function(text, action, disabled) {
        dialog.setDefaultButton(text, action, disabled)
    }

    /**
     * Yes button is a secondary default button that sits beside it.
     * @param {String} text nullable button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     * @param {Boolean} disabled nullable first state, set true to disable upon creation.
     */
    this.setYesButton = function(text, action, disabled) {
        dialog.setYesButton(text, action, disabled)
    }

    /**
     * Cancel button responds to pressing the Escape key.
     * @param {String} text nullable button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     * @param {Boolean} disabled nullable first state, set true to disable upon creation.
     */
    this.setCancelButton = function(text, action, disabled) {
        dialog.setCancelButton(text, action, disabled)
    }

    /**
     * Help button sits on the left side of the dialog.
     * @param {String} text nullable button text.
     * @param {Function} action nullable button click listener, return true to keep dialog open.
     * @param {Boolean} disabled nullable first state, set true to disable upon creation.
     */
    this.setHelpButton = function(text, action, disabled) {
        dialog.setHelpButton(text, action, disabled)
    }

    /** Show the dialog, after populating buttons. */
    this.show = function() {
        dialog.prepare()
        dialog.leftButtons.children.forEach(setMaxHeight)
        dialog.rightButtons.children.forEach(setMaxHeight)
        dialog.defaultButton.active = true
        dialog.show()
    }

    /** Manually close the dialog. */
    this.close = function() {
        dialog.close()
    }

    /** Returns bounds as Array, as opposed to native Bounds. */
    this.getBounds = function() {
        return dialog.getBounds()
    }

    /** Returns location as Array, as opposed to native Bounds. */
    this.getLocation = function() {
        return dialog.getLocation()
    }

    function setMaxHeight(button) {
        button.maximumSize.height = _alertButtonHeight
    }
}