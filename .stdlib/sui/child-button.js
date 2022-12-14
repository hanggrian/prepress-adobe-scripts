/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Allows for multiple click listeners to occur by invoking all of them in collective listener.
 * @param {function()} listener
 */
Button.prototype.addClickListener = function(listener) {
  Internals.addListener(this, 'onClick', listener)
}

/**
 * Add children to group.
 * @param {?Array<number>=} size
 * @param {?string|?Object=} text
 * @param {?Object=} properties
 * @return {!Button}
 */
Group.prototype.button = function(size, text, properties) {
  return Internals.addButton(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {?Array<number>=} size
 * @param {?string|?Object=} text
 * @param {?Object=} properties
 * @return {!Button}
 */
Panel.prototype.button = function(size, text, properties) {
  return Internals.addButton(this, size, text, properties)
}

Internals.addButton = function(root, size, text, properties) {
  var child = root.add('button', Internals.sizeOrBounds(size), text, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
