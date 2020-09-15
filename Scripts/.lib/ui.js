/**
 * UI are related to custom dialog.
 */

#include 'core.js'

var dialog
var root
var actions

/**
 * Initialize a dialog.
 * @param title - dialog title
 * @return {void}
 */
function init(title) {
    dialog = new Window('dialog', title)
    dialog.orientation = 'column'
    // dialog.alignChildren = 'fill'
    root = dialog.addVGroup()
    root.alignChildren = 'left'
    actions = dialog.addHGroup()
    actions.alignment = 'right'
    return dialog
}

/**
 * Add dialog action.
 * @param text - button text
 * @param onAction - button onClick
 * @return {void}
 */
function addAction(text, onAction) {
    var action = actions.add('button', undefined, text)
    if (onAction !== undefined) {
        action.onClick = function() {
            dialog.close()
            onAction()
        }
    }
}

/**
 * Show dialog.
 * @return {void}
 */
function show() {
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