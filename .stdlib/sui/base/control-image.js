/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @returns {Image}
 */
Image.prototype.tip = function(text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {Image}
 */
Group.prototype.image = function(bounds, file) { return _image(this, bounds, file) }

/**
 * Add children to panel.
 * @returns {Image}
 */
Panel.prototype.image = function(bounds, file) { return _image(this, bounds, file) }

function _image(parent, bounds, file) {
    var result = parent.add('image', _expandBounds(bounds), file)
    if (parent.helpTips !== undefined) {
        _tip(result, parent.helpTips)
    }
    return result
}