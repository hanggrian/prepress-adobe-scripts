/**
 * UI are related to custom dialog.
 */

#include 'core.js'

var dialog
var _positiveButtonText, _positiveButtonAction
var _negativeButtonText, _negativeButtonAction
var _neutralButtonText, _neutralButtonAction, _neutralButtonGap

/**
 * Initialize a dialog.
 * @param title - dialog title
 * @return {void}
 */
function createDialog(title) {
    dialog = new Window('dialog', title)
    dialog.orientation = 'column'
    // dialog.alignChildren = 'fill'
    dialog.main = dialog.addVGroup()
    dialog.main.alignChildren = 'left'
    dialog.buttons = dialog.addHGroup()
    dialog.buttons.alignment = 'right'
    return dialog
}

/**
 * Set positive dialog button.
 * @param text - button text
 * @param action - button click, may be undefined
 * @return {void}
 */
function setPositiveButton(text, action) {
    _positiveButtonText = text
    _positiveButtonAction = action
}

/**
 * Set negative dialog button.
 * @param text - button text
 * @param action - button click, may be undefined
 * @return {void}
 */
function setNegativeButton(text, action) {
    _negativeButtonText = text
    _negativeButtonAction = action
}

/**
 * Set neutral dialog button.
 * @param text - button text
 * @param action - button click, may be undefined
 * @param gap - gap between neutral and positive/negative button, may be undefined
 * @return {void}
 */
function setNeutralButton(text, action, gap) {
    _neutralButtonText = text
    _neutralButtonAction = action
    _neutralButtonGap = gap
}

/**
 * Show dialog, after populating buttons.
 * @return {void}
 */
function show() {
    if (_neutralButtonText !== undefined) {
        _addButton(_neutralButtonText, _neutralButtonAction)
        if (_neutralButtonGap !== undefined) {
            dialog.buttons.addText([0, 0, _neutralButtonGap, 0])
        }
    }
    if (isMacOS()) {
        _addButton(_negativeButtonText, _negativeButtonAction)
        _addButton(_positiveButtonText, _positiveButtonAction)
    } else {
        _addButton(_positiveButtonText, _positiveButtonAction)
        _addButton(_negativeButtonText, _negativeButtonAction)
    }
    dialog.show()
}

function _addButton(text, action) {
    if (text !== undefined) {
        dialog.buttons.addButton(undefined, text, function() {
            dialog.close()
            if (action !== undefined) {
                action()
            }
        })
    }
}

/** Add static text to target. */
Object.prototype.addText = function(bounds, text, justify) {
    var staticText = this.add('statictext', bounds, text)
    if (justify !== undefined) {
        staticText.justify = justify
    }
    return staticText
}

/** Add edit text to target. */
Object.prototype.addEditText = function(bounds, text) {
    return this.add('edittext', bounds, text)
}

/** Add button to target. */
Object.prototype.addButton = function(bounds, text, onClick) {
    var button = this.add('button', bounds, text)
    if (onClick !== undefined) {
        button.onClick = onClick
    }
    return button
}

/** Add icon button to target. */
Object.prototype.addIconButton = function(bounds, path, onClick) {
    var button = this.add('iconbutton', bounds, File(path), {style: 'toolbutton'})
    if (onClick !== undefined) {
        button.onClick = onClick
    }
    return button
}

/** Add check box to target. */
Object.prototype.addCheckBox = function(bounds, text) {
    return this.add('checkbox', bounds, text)
}

/** Add radio button to target. */
Object.prototype.addRadioButton = function(bounds, text) {
    return this.add('radiobutton', bounds, text)
}

/** Add drop down list to target. */
Object.prototype.addDropDown = function(bounds, content) {
    return this.add('dropdownlist', bounds, content)
}

/** Add horizontal group to target. */
Object.prototype.addHGroup = function() {
    var group = this.add('group')
    group.orientation = 'row'
    return group
}

/** Add vertical group to target. */
Object.prototype.addVGroup = function() {
    var group = this.add('group')
    group.orientation = 'column'
    return group
}

/** Add horizontal panel to target. */
Object.prototype.addHPanel = function(title) {
    var panel = this.add('panel', undefined, title)
    panel.orientation = 'row'
    panel.add('group') // tiny space
    return panel
}

/** Add vertical panel to target. */
Object.prototype.addVPanel = function(title) {
    var panel = this.add('panel', undefined, title)
    panel.orientation = 'column'
    panel.add('group') // tiny space
    return panel
}