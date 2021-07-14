/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add image to group.
 * @returns {Image}
 */
Group.prototype.image = function(bounds, file) {
    return _image(this, bounds, file)
}

/**
 * Add image to panel.
 * @returns {Image}
 */
Panel.prototype.image = function(bounds, file) {
    return _image(this, bounds, file)
}

function _image(parent, bounds, file) {
    var image = parent.add('image', _expandBounds(bounds), file)
    if (parent.tooltips !== undefined) {
        _setTooltip(image, parent.tooltips)
    }
    return image
}