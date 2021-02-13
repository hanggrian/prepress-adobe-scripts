/** 
 * Add static text to target.
 * @param {Bounds} bounds size of this object.
 * @param {String} text text to display.
 * @param {String} justify text alignment.
 * @return {StaticText}
 */
Object.prototype.addText = function(bounds, text, justify) {
    var staticText = this.add('statictext', bounds, text)
    if (justify !== undefined) {
        staticText.justify = justify
    }
    return staticText
}

/** 
 * Add edit text to target.
 * @param {Bounds} bounds size of this object.
 * @param {String} text text to display.
 * @param {Boolean} multiline default is false.
 * @return {EditText}
 */
Object.prototype.addEditText = function(bounds, text, multiline) {
    return this.add('edittext', bounds, text, { multiline: multiline !== undefined ? multiline : false })
}

/** 
 * Add button to target.
 * @param {Bounds} bounds size of this object.
 * @param {String} path source image location.
 * @param {Function} action on click listener.
 * @return {Button}
 */
Object.prototype.addButton = function(bounds, text, action) {
    var button = this.add('button', bounds, text)
    if (action !== undefined) {
        button.onClick = action
    }
    return button
}

/**
 * Add icon button to target.
 * @param {Bounds} bounds size of this object.
 * @param {String} path source image location.
 * @param {Function} action on click listener.
 * @return {IconButton}
 */
Object.prototype.addIconButton = function(bounds, path, action) {
    var button = this.add('iconbutton', bounds, File(path), {style: 'toolbutton'})
    if (action !== undefined) {
        button.onClick = action
    }
    return button
}

/**
 * Add check box to target.
 * @param {Bounds} bounds size of this object.
 * @param {String} text text to display.
 * @return {CheckBox}
 */
Object.prototype.addCheckBox = function(bounds, text) {
    return this.add('checkbox', bounds, text)
}

/**
 * Add radio button to target.
 * @param {Bounds} bounds size of this object.
 * @param {String} text text to display.
 * @return {RadioButton}
 */
Object.prototype.addRadioButton = function(bounds, text) {
    return this.add('radiobutton', bounds, text)
}

/**
 * Add drop down list to target.
 * @param {Bounds} bounds size of this object.
 * @param {Array} items drop down collection.
 * @return {DropDownList}
 */
Object.prototype.addDropDown = function(bounds, items) {
    return this.add('dropdownlist', bounds, items)
}

/**
 * Add horizontal group to target.
 * @param {String} alignChildren optional arrangement of this group.
 * @return {Group}
 */
Object.prototype.addHGroup = function(alignChildren) {
    var group = this.add('group')
    group.orientation = 'row'
    if (alignChildren !== undefined) {
        group.alignChildren = alignChildren
    }
    return group
}

/**
 * Add vertical group to target.
 * @param {String} alignChildren optional arrangement of this group.
 * @return {Group}
 */
Object.prototype.addVGroup = function(alignChildren) {
    var group = this.add('group')
    group.orientation = 'column'
    if (alignChildren !== undefined) {
        group.alignChildren = alignChildren
    }
    return group
}

/**
 * Add horizontal panel to target.
 * @param {String} title of the panel.
 * @param {String} alignChildren optional arrangement of this panel.
 * @return {Panel}
 */
Object.prototype.addHPanel = function(title, alignChildren) {
    var panel = this.add('panel', undefined, title)
    panel.orientation = 'row'
    panel.add('group') // tiny space
    if (alignChildren !== undefined) {
        panel.alignChildren = alignChildren
    }
    return panel
}

/**
 * Add vertical panel to target.
 * @param {String} title of the panel.
 * @param {String} alignChildren optional arrangement of this panel.
 * @return {Panel}
 */
Object.prototype.addVPanel = function(title, alignChildren) {
    var panel = this.add('panel', undefined, title)
    panel.orientation = 'column'
    panel.add('group') // tiny space
    if (alignChildren !== undefined) {
        panel.alignChildren = alignChildren
    }
    return panel
}

/**
 * Apply help tip to all children of this group/panel.
 * Don't set the tooltip on the group/panel itself since the behavior is different on Illustrator and Photoshop.
 * @param {String} tooltip help tip to install.
 */
Object.prototype.setTooltip = function(tooltip) {
    if (this.type != 'group' && this.type != 'panel') {
        this.helpTip = tooltip
        return
    }
    this.children.forEach(function(it) {
        it.setTooltip(tooltip)
    })
}