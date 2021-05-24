var CONTROL_UNAVAILABLE = function(control) {
    control.enabled = false
    control.helpTip = 'This feature is not yet available.'
}

/** Focus on this edit text. */
EditText.prototype.activate = function() { if (!this.active) this.active = true }

/** Select this check box. */
Checkbox.prototype.select = function() { if (!this.value) this.value = true }

/** Select this radio button. */
RadioButton.prototype.select = function() { if (!this.value) this.value = true }

/** Returns true if this list has a selection. */
DropDownList.prototype.hasSelection = function() { return this.selection !== null }

/**
 * Apply help tip to all children of this group, before or after children creation.
 * Don't set the tooltip on the group/panel itself since the behavior is different on Illustrator and Photoshop.
 * @param {String} helpTips tooltip of the children.
 */
Group.prototype.setHelpTips = function(helpTips) {
    _setHelpTips(this, helpTips)
}

/**
 * Apply help tip to all children of this panel, before or after children creation.
 * Don't set the tooltip on the group/panel itself since the behavior is different on Illustrator and Photoshop.
 * @param {String} helpTips tooltip of the children.
 */
Panel.prototype.setHelpTips = function(helpTips) {
    _setHelpTips(this, helpTips)
}

function _setHelpTips(parent, helpTips) {
    // queue tooltip that will be attached upon children creation
    parent.helpTips = helpTips
    // attach it manually in case `setHelpTips` is called when children are already created
    parent.children.forEach(function(it) {
        if (it.helpTip !== helpTips) {
            it.helpTip = helpTips
        }
    })
}

function _expandBounds(bounds) {
    return bounds !== undefined && bounds.length === 2
        ? [0, 0, bounds[0], bounds[1]]
        : bounds
}