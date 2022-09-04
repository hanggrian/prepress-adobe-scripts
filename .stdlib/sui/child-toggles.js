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
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {CheckBox}
 */
Group.prototype.checkBox = function(size, text, properties) {
  return Internals.addCheckBox(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {CheckBox}
 */
Panel.prototype.checkBox = function(size, text, properties) {
  return Internals.addCheckBox(this, size, text, properties)
}

Internals.addCheckBox = function(root, size, text, properties) {
  var child = root.add("checkbox", Internals.sizeOrBounds(size), text, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {RadioButton}
 */
Group.prototype.radioButton = function(size, text, properties) {
  return Internals.addRadioButton(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {RadioButton}
 */
Panel.prototype.radioButton = function(size, text, properties) {
  return Internals.addRadioButton(this, size, text, properties)
}

Internals.addRadioButton = function(root, size, text, properties) {
  var child = root.add("radiobutton", Internals.sizeOrBounds(size), text, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
