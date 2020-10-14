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
            dialog.buttons.add('statictext', [0, 0, _neutralButtonGap, 0])
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
        dialog.buttons.add('button', undefined, text).onClick = function() {
            dialog.close()
            if (action !== undefined) {
                action()
            }
        }
    }
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