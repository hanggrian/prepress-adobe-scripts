/**
 * UI are related to custom dialog.
 */

#include 'core.js'

var dialog
var positiveAction, negativeAction, neutralAction
var neutralActionGap

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
    dialog.actions = dialog.addHGroup()
    dialog.actions.alignment = 'right'
    return dialog
}

/**
 * Set positive dialog button.
 * @param text - button text
 * @param onAction - button click, may be undefined
 * @return {void}
 */
function setPositiveAction(text, onAction) {
    positiveAction = {'text': text, 'onAction': onAction}
}

/**
 * Set negative dialog button.
 * @param text - button text
 * @param onAction - button click, may be undefined
 * @return {void}
 */
function setNegativeAction(text, onAction) {
    negativeAction = {'text': text, 'onAction': onAction}
}

/**
 * Set neutral dialog button.
 * @param text - button text
 * @param onAction - button click, may be undefined
 * @param gap - gap between neutral and positive/negative button, may be undefined
 * @return {void}
 */
function setNeutralButton(text, onAction, gap) {
    neutralAction = {'text': text, 'onAction': onAction}
    neutralActionGap = gap
}

/**
 * Show dialog, after populating actions.
 * @return {void}
 */
function show() {
    var actions = [neutralAction]
    if (isMacOS()) {
        actions.push(negativeAction)
        actions.push(positiveAction)
    } else {
        actions.push(positiveAction)
        actions.push(negativeAction)
    }
    for (var i = 0; i < actions.length; i++) {
        var action = actions[i]
        if (action !== undefined) {
            var button = dialog.actions.add('button', undefined, action.text)
            if (neutralAction === action && neutralActionGap !== undefined) {
                dialog.actions.add('statictext', [0, 0, neutralActionGap, 0])
            }
            if (action.onClick !== undefined) {
                button.onClick = function() {
                    dialog.close()
                    action.onClick()
                }
            }   
        }
    }
    dialog.show()
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