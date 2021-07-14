/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this button.
 * @param {String} tooltip help tip of this children.
 */
Button.prototype.setTooltip = function(tooltip) {_setTooltip(this, tooltip) }

/**
 * Set tooltip to this list.
 * @param {String} tooltip help tip of this children.
 */
DropDownList.prototype.setTooltip = function(tooltip) { _setTooltip(this, tooltip) }

/**
 * Set tooltip to this edit text.
 * @param {String} tooltip help tip of this children.
 */
EditText.prototype.setTooltip = function(tooltip) { _setTooltip(this, tooltip) }

/**
 * Set tooltip to this static text.
 * @param {String} tooltip help tip of this children.
 */
StaticText.prototype.setTooltip = function(tooltip) { _setTooltip(this, tooltip) }

/**
 * Set tooltip to this check box.
 * @param {String} tooltip help tip of this children.
 */
Checkbox.prototype.setTooltip = function(tooltip) { _setTooltip(this, tooltip) }

/**
 * Set tooltip to this radio button.
 * @param {String} tooltip help tip of this children.
 */
RadioButton.prototype.setTooltip = function(tooltip) { _setTooltip(this, tooltip) }

function _setTooltip(child, tooltip) {
    tooltip = tooltip.trim()
    child.helpTip = tooltip.endsWith('.') || tooltip.endsWith('?') ? tooltip : tooltip + '.'
}

/**
 * Queue tooltip for all children of this group.
 * @param {String} tooltips help tip of all children.
 */
Group.prototype.setTooltips = function(tooltips) { _setTooltips(this, tooltips) }

/**
 * Queue tooltip for all children of this panel.
 * @param {String} tooltips help tip of all children.
 */
Panel.prototype.setTooltips = function(tooltips) { _setTooltips(this, tooltips) }

function _setTooltips(parent, tooltips) {
    // queue tooltip that will be attached upon children creation
    parent.tooltips = tooltips
    // attach it manually in case `setHelpTips` is called when children are already created
    parent.children.forEach(function(it) {
        _setTooltip(it, tooltips)
    })
}