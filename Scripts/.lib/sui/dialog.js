function Dialog(title) {
    var dialog = new Window('dialog', title)
    dialog.orientation = 'column'
    dialog.alignChildren = 'right'
    dialog.root = dialog.addVGroup()
    dialog.actions = dialog.addHGroup()
    return dialog
}

Window.prototype.addAction || (Window.prototype.addAction = function(text, onAction) { 
    var dialog = this
    var action = dialog.actions.add('button', undefined, text)
    if (onAction !== undefined) {
        action.onClick = function() {
            dialog.close()
            onAction()
        }
    }
    return action
})

Group.prototype.addHGroup || (Group.prototype.addHGroup = function() { return _createGroup(this, true) })
Panel.prototype.addHGroup || (Panel.prototype.addHGroup = function() { return _createGroup(this, true) })
Window.prototype.addHGroup || (Window.prototype.addHGroup = function() { return _createGroup(this, true) })
Group.prototype.addVGroup || (Group.prototype.addVGroup = function() { return _createGroup(this, false) })
Panel.prototype.addVGroup || (Panel.prototype.addVGroup = function() { return _createGroup(this, false) })
Window.prototype.addVGroup || (Window.prototype.addVGroup = function() { return _createGroup(this, false) })

function _createGroup(target, isHorizontal) {
    var group = target.add('group')
    _orientate(group, isHorizontal)
    return group
}

Group.prototype.addHPanel || (Group.prototype.addHPanel = function(title) { return _createPanel(this, true, title) })
Panel.prototype.addHPanel || (Panel.prototype.addHPanel = function(title) { return _createPanel(this, true, title) })
Window.prototype.addHPanel || (Window.prototype.addHPanel = function(title) { return _createPanel(this, true, title) })
Group.prototype.addVPanel || (Group.prototype.addVPanel = function(title) { return _createPanel(this, false, title) })
Panel.prototype.addVPanel || (Panel.prototype.addVPanel = function(title) { return _createPanel(this, false, title) })
Window.prototype.addVPanel || (Window.prototype.addVPanel = function(title) { return _createPanel(this, false, title) })

function _createPanel(target, isHorizontal, title) {
    var panel = target.add('panel', undefined, title)
    _orientate(panel, isHorizontal)
    panel.add('group') // tiny space
    return panel
}

Panel.prototype.horizontal || (Panel.prototype.horizontal = function() { return _orientate(this, true) })
Group.prototype.horizontal || (Group.prototype.horizontal = function() { return _orientate(this, true) })
Window.prototype.horizontal || (Window.prototype.horizontal = function() { return _orientate(this, true) })
Panel.prototype.vertical || (Panel.prototype.vertical = function() { return _orientate(this, false) })
Group.prototype.vertical || (Group.prototype.vertical = function() { return _orientate(this, false) })
Window.prototype.vertical || (Window.prototype.vertical = function() { return _orientate(this, false) })

function _orientate(target, isHorizontal) {
    if (isHorizontal) {
        target.orientation = 'row'
    } else {
        target.orientation = 'column'
    }
}