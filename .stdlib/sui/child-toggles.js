/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var SELECTED = function(toggle) { toggle.select() }

/** Select this check box, if not already. */
Checkbox.prototype.select = function() { if (!this.value) this.value = true }

/** Select this radio button, if not already. */
RadioButton.prototype.select = function() { if (!this.value) this.value = true }

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
Checkbox.prototype.tooltip = function(text) { Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {CheckBox}
 */
Group.prototype.checkBox = function(bounds, text, properties) {
  return _checkBox(this, bounds, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {CheckBox}
 */
Panel.prototype.checkBox = function(bounds, text, properties) {
  return _checkBox(this, bounds, text, properties)
}

function _checkBox(parent, bounds, text, properties) {
  var result = parent.add("checkbox", Internals.expandBounds(bounds), text, properties)
  if (parent.helpTips !== undefined) {
    Internals.setTooltip(result, parent.helpTips)
  }
  return result
}

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
RadioButton.prototype.tooltip = function(text) { Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {RadioButton}
 */
Group.prototype.radioButton = function(bounds, text, properties) {
  return _radioButton(this, bounds, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {RadioButton}
 */
Panel.prototype.radioButton = function(bounds, text, properties) {
  return _radioButton(this, bounds, text, properties)
}

function _radioButton(parent, bounds, text, properties) {
  var result = parent.add("radiobutton", Internals.expandBounds(bounds), text, properties)
  if (parent.helpTips !== undefined) {
    Internals.setTooltip(result, parent.helpTips)
  }
  return result
}
