/**
 * Apply help tip to all children of this group.
 * Don't set the tooltip on the group/panel itself since the behavior is different on Illustrator and Photoshop.
 * @param {String} tooltip help tip to install.
 */
Group.prototype.setTooltip = function(tooltip) {
    _setTooltip(this, tooltip)
}

/**
 * Apply help tip to all children of this panel.
 * Don't set the tooltip on the group/panel itself since the behavior is different on Illustrator and Photoshop.
 * @param {String} tooltip help tip to install.
 */
Panel.prototype.setTooltip = function(tooltip) {
    _setTooltip(this, tooltip)
}

function _setTooltip(target, tooltip) {
    target.children.forEach(function(it) {
        it.helpTip = tooltip
    })
}