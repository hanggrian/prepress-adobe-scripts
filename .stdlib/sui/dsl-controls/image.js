/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add image to dialog.
 * @returns {Image}
 */
Dialog.prototype.image = function(bounds, file, configuration) {
    return _image(this.main, bounds, file, configuration)
}

/**
 * Add image to group.
 * @returns {Image}
 */
Group.prototype.image = function(bounds, file, configuration) {
    return _image(this, bounds, file, configuration)
}

/**
 * Add image to panel.
 * @returns {Image}
 */
Panel.prototype.image = function(bounds, file, configuration) {
    return _image(this, bounds, file, configuration)
}

function _image(parent, bounds, file, configuration) {
    var image = parent.add('image', _expandBounds(bounds), file)
    if (parent.tooltips !== undefined) {
        _setTooltip(image, parent.tooltips)
    }
    if (configuration !== undefined) {
        configuration(image)
    }
    return image
}