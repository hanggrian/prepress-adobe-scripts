var STYLE_TOOLBUTTON = { style: 'toolbutton' }

/**
 * Allows for multiple click listeners to occur by invoking all of them in collective listener.
 * @param {function()} listener
 */
IconButton.prototype.addClickListener = function(listener) {
  Internals.addListener(this, 'onClick', listener)
}

/**
 * Add children to group.
 * @param {?Array<number>=} size
 * @param {?string=} file
 * @param {?Object=} properties
 * @return {!IconButton}
 */
Group.prototype.iconButton = function(size, file, properties) {
  return Internals.addIconButton(this, size, file, properties)
}

/**
 * Add children to panel.
 * @param {?Array<number>=} size
 * @param {?string=} file
 * @param {?Object=} properties
 * @return {!IconButton}
 */
Panel.prototype.iconButton = function(size, file, properties) {
  return Internals.addIconButton(this, size, file, properties)
}

Internals.addIconButton = function(root, size, file, properties) {
  var child = root.add('iconbutton', Internals.sizeOrBounds(size), Internals.imageOrResource(file),
    properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
