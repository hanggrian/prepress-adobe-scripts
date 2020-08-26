function Dialog(title) {
    var dialog = new Window('dialog', title)
    dialog.orientation = 'column'
    dialog.alignChildren = 'right'
    dialog.root = dialog.add('group')
    dialog.buttons = dialog.add('group')
    dialog.cancelButton = dialog.buttons.add('button', undefined, 'Cancel')
    dialog.okButton = dialog.buttons.add('button', undefined, 'OK')
    return dialog
}

Group.prototype.addPanel || (Group.prototype.addPanel = function(title) {
    var panel = this.add('panel', undefined, title)
    panel.orientation = 'column'
    panel.add('group') // tiny space
    return panel
})

Window.prototype.onAction || (Window.prototype.onAction = function(action) {
    var dialog = this
    dialog.okButton.onClick = function() {
        dialog.close()
        action()
    }
})