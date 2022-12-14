/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Add children to group.
 * @param {?Array<number>=} size
 * @param {?string|?Object=} text
 * @param {?Object=} properties
 * @return {!StaticText}
 */
Group.prototype.leftStaticText = function(size, text, properties) {
  var child = Internals.addStaticText(this, size, text, properties)
  child.text += ':'
  child.justify = 'right'
  return child
}

/**
 * Add children to panel.
 * @param {?Array<number>=} size
 * @param {?string|?Object=} text
 * @param {?Object=} properties
 * @return {!StaticText}
 */
Panel.prototype.leftStaticText = function(size, text, properties) {
  var child = Internals.addStaticText(this, size, text, properties)
  child.text += ':'
  child.justify = 'right'
  return child
}

/**
 * Add children to group.
 * @param {?Array<number>=} size
 * @param {?string|?Object=} text
 * @param {?Object=} properties
 * @return {!StaticText}
 */
Group.prototype.staticText = function(size, text, properties) {
  return Internals.addStaticText(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {?Array<number>=} size
 * @param {?string|?Object=} text
 * @param {?Object=} properties
 * @return {!StaticText}
 */
Panel.prototype.staticText = function(size, text, properties) {
  return Internals.addStaticText(this, size, text, properties)
}

Internals.addStaticText = function(root, size, text, properties) {
  var child = root.add('statictext', Internals.sizeOrBounds(size), text, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
