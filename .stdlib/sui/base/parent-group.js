/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this parent.
 * @returns {Group}
 */
Group.prototype.tips = function(text) { return _tips(this, text) }

/**
 * Add horizontal parent to group.
 * @returns {Group}
 */
Group.prototype.hgroup = function(configuration) { return _group(this, 'row').also(configuration) }

/**
 * Add horizontal parent to panel.
 * @returns {Group}
 */
Panel.prototype.hgroup = function(configuration) { return _group(this, 'row').also(configuration) }

/**
 * Add vertical parent to group.
 * @returns {Group}
 */
Group.prototype.vgroup = function(configuration) { return _group(this, 'column').also(configuration) }

/**
 * Add vertical parent to panel.
 * @returns {Group}
 */
Panel.prototype.vgroup = function(configuration) { return _group(this, 'column').also(configuration) }

function _group(parent, orientation) {
    var result = parent.add('group')
    result.orientation = orientation
    if (parent.helpTips !== undefined) {
        _tips(result, parent.helpTips)
    }
    return result
}