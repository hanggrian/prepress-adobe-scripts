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
    dialog.alignChildren = 'right'
    root = dialog.addVGroup()
    actions = dialog.addHGroup()
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

/**
 * Add horizontal group to target.
 * @this {Object} - may be a Group, Panel, or Window
 * @return {Group}
 */
Object.prototype.addHGroup = function() {
    var group = this.add('group')
    group.horizontal()
    return group
}

/**
 * Add vertical group to target.
 * @this {Object} - may be a Group, Panel, or Window
 * @return {Group}
 */
Object.prototype.addVGroup = function() {
    var group = this.add('group')
    group.vertical()
    return group
}

/**
 * Add horizontal panel to target.
 * @this {Object} - may be a Group, Panel, or Window
 * @param title - panel title
 * @return {Panel}
 */
Object.prototype.addHPanel = function(title) {
    var panel = this.add('panel', undefined, title)
    panel.horizontal()
    panel.add('group') // tiny space
    return panel
}

/**
 * Add vertical panel to target.
 * @this {Object} - may be a Group, Panel, or Window
 * @param title - panel title
 * @return {Panel}
 */
Object.prototype.addVPanel = function(title) {
    var panel = this.add('panel', undefined, title)
    panel.vertical()
    panel.add('group') // tiny space
    return panel
}

/**
 * Orientate container content to horizontal.
 * @this {Object} - may be a Group, Panel, or Window
 * @return {void}
 */
Object.prototype.horizontal = function() {
    this.orientation = 'row'
}

/**
 * Orientate container content to vertical.
 * @this {Object} - may be a Group, Panel, or Window
 * @return {void}
 */
Object.prototype.vertical = function() {
    this.orientation = 'column'
}