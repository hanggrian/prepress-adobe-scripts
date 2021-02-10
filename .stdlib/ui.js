/**
 * Construct a new dialog.
 * @param {String} title window title.
 */
function Dialog(title) {
    var self = this
    this.title = title

    var window = new Window('dialog', title)
    window.orientation = 'column'
    // window.alignChildren = 'fill'
    
    this.main = window.addVGroup()
    this.main.alignChildren = 'left'
    this.buttons = window.addHGroup()
    this.buttons.alignment = 'right'

    var positiveButtonText, positiveButtonAction
    var negativeButtonText, negativeButtonAction
    var neutralButtonText, neutralButtonAction, neutralButtonGap

    /**
     * Set positive dialog button, the text will always be `OK`.
     * @param {Function} action button click listener, may be undefined.
     */
    this.setPositiveButton = function(action) {
        positiveButtonText = 'OK' // automatically marked as positive button by Adobe
        positiveButtonAction = action
    }

    /**
     * Set negative dialog button.
     * @param {String} text button text.
     * @param {Function} action button click listener, may be undefined.
     */
    this.setNegativeButton = function(text, action) {
        negativeButtonText = text
        negativeButtonAction = action
    }

    /**
     * Set neutral dialog button.
     * @param {Number} gap gap between neutral and positive/negative button, may be undefined.
     * @param {String} text button text.
     * @param {Function} action button click listener, may be undefined.
     */
    this.setNeutralButton = function(gap, text, action) {
        neutralButtonText = text
        neutralButtonAction = action
        neutralButtonGap = gap
    }
    
    /** Show the dialog, after populating buttons. */
    this.show = function() {
        if (neutralButtonText !== undefined) {
            addButton(neutralButtonText, neutralButtonAction)
            if (neutralButtonGap !== undefined) {
                self.buttons.addText([0, 0, neutralButtonGap, 0])
            }
        }
        if (isMacOS()) {
            addButton(negativeButtonText, negativeButtonAction)
            addButton(positiveButtonText, positiveButtonAction)
        } else {
            addButton(positiveButtonText, positiveButtonAction)
            addButton(negativeButtonText, negativeButtonAction)
        }
		window.show()
    }

    /** Manually close the dialog. */
    this.close = function() {
        window.close()
    }

    function addButton(text, action) {
        if (text !== undefined) {
            self.buttons.addButton(undefined, text, function() {
                self.close()
                if (action !== undefined) {
                    action()
                }
            })
        }
    }
}

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
 * @return {EditText}
 */
Object.prototype.addEditText = function(bounds, text) {
    return this.add('edittext', bounds, text)
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
 * @param {String} alignChildren optional arrangement.
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
 * @param {String} alignChildren optional arrangement.
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
 * @param {String} alignChildren optional arrangement.
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
 * @param {String} alignChildren optional arrangement.
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
    this.children.forEach(function(it) {
        it.helpTip = tooltip
    })
}