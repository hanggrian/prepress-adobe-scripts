/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Allows for multiple click listeners to occur by invoking all of them in collective listener.
 * @param {Function} listener a callable of no parameter.
 */
Button.prototype.addClickListener = function(listener) { Internals.addClickListener(this, listener) }

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @return {Button}
 */
Group.prototype.button = function(size, text, properties) {
  return Internals.addButton(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @return {Button}
 */
Panel.prototype.button = function(size, text, properties) {
  return Internals.addButton(this, size, text, properties)
}

Internals.addButton = function(root, size, text, properties) {
  var child = root.add("button", Internals.sizeOrBounds(size), text, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
