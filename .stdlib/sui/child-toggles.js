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
 * @param {String|Object} text tips to display.
 */
Checkbox.prototype.tooltip = function(text) { Internals.setTooltip(this, Internals.stringOrResources(text)) }

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {CheckBox}
 */
Group.prototype.checkBox = function(size, text, properties) {
  return _checkBox(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {CheckBox}
 */
Panel.prototype.checkBox = function(size, text, properties) {
  return _checkBox(this, size, text, properties)
}

function _checkBox(root, size, text, properties) {
  var child = root.add("checkbox", Internals.sizeOrBounds(size), Internals.stringOrResources(text), properties)
  if (root.helpTips !== undefined) {
    Internals.setTooltip(child, root.helpTips)
  }
  return child
}

/**
 * Set tooltip to this children.
 * @param {String|Object} text tips to display.
 */
RadioButton.prototype.tooltip = function(text) { Internals.setTooltip(this, Internals.stringOrResources(text)) }

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {RadioButton}
 */
Group.prototype.radioButton = function(size, text, properties) {
  return _radioButton(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {RadioButton}
 */
Panel.prototype.radioButton = function(size, text, properties) {
  return _radioButton(this, size, text, properties)
}

function _radioButton(root, size, text, properties) {
  var child = root.add("radiobutton", Internals.sizeOrBounds(size), Internals.stringOrResources(text), properties)
  if (root.helpTips !== undefined) {
    Internals.setTooltip(child, root.helpTips)
  }
  return child
}
