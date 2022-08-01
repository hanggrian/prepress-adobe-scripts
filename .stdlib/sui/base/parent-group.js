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

/**
 * Add stack parent to group.
 * @returns {Group}
 */
Group.prototype.sgroup = function(configuration) { return _group(this, 'stack').also(configuration) }

/**
 * Add stack parent to panel.
 * @returns {Group}
 */
Panel.prototype.sgroup = function(configuration) { return _group(this, 'stack').also(configuration) }

function _group(parent, orientation) {
  var result = parent.add('group')
  result.orientation = orientation
  if (parent.helpTips !== undefined) {
    _tips(result, parent.helpTips)
  }
  return result
}

/**
 * Returns selected radio of this group.
 * @returns {RadioButton}
 */
Group.prototype.getSelectedRadioText = function() { return _getSelectedRadioText(this) }

/**
 * Returns selected radio of this panel.
 * @returns {RadioButton}
 */
Panel.prototype.getSelectedRadioText = function() { return _getSelectedRadioText(this) }

function _getSelectedRadioText(parent) {
  return parent.children.first(function(it) { return it.type === 'radiobutton' && it.value }).text
}

/** Select radio button of this group. */
Group.prototype.selectRadioText = function(text) { return _selectRadioText(this, text) }

/** Select radio button of this panel. */
Panel.prototype.selectRadioText = function(text) { return _selectRadioText(this, text) }

function _selectRadioText(parent, text) {
  return parent.children.first(function(it) { return it.type === 'radiobutton' && it.text === text }).value = true
}
