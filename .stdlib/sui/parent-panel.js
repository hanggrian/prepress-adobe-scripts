/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Manually set tooltip to all children. This function is intended for parent whose children are
 * already attached. For newly created children, use `helpTips` property which will automatically be
 * delivered to children upon attaching.
 * @param {string|!Object=} tips
 */
Panel.prototype.setHelpTips = function(tips) { Internals.setHelpTips(this, tips) }

/**
 * Allows for multiple change listeners to occur by invoking all of them in collective listener.
 * @param {function()} listener
 */
Panel.prototype.addChangeListener = function(listener) {
  Internals.addListener(this, 'onChange', listener)
}

/**
 * Add horizontal parent to group.
 * @param {?string|?Object=} text
 * @param {?function(!Panel)=} configuration
 * @return {!Panel}
 */
Group.prototype.hpanel = function(text, configuration) {
  return Internals.addPanel(this, 'row', text, configuration)
}

/**
 * Add horizontal parent to panel.
 * @param {?string|?Object=} text
 * @param {?function(!Panel)=} configuration
 * @return {!Panel}
 */
Panel.prototype.hpanel = function(text, configuration) {
  return Internals.addPanel(this, 'row', text, configuration)
}

/**
 * Add vertical parent to group.
 * @param {?string|?Object=} text
 * @param {?function(!Panel)=} configuration
 * @return {!Panel}
 */
Group.prototype.vpanel = function(text, configuration) {
  return Internals.addPanel(this, 'column', text, configuration)
}

/**
 * Add vertical parent to panel.
 * @param {?string|?Object=} text
 * @param {?function(!Panel)=} configuration
 * @return {!Panel}
 */
Panel.prototype.vpanel = function(text, configuration) {
  return Internals.addPanel(this, 'column', text, configuration)
}

/**
 * Add stack parent to group.
 * @param {?string|?Object=} text
 * @param {?function(!Panel)=} configuration
 * @return {!Panel}
 */
Group.prototype.spanel = function(text, configuration) {
  return Internals.addPanel(this, 'stack', text, configuration)
}

/**
 * Add stack parent to panel.
 * @param {?string|?Object=} text
 * @param {?function(!Panel)=} configuration
 * @return {!Panel}
 */
Panel.prototype.spanel = function(text, configuration) {
  return Internals.addPanel(this, 'stack', text, configuration)
}

Internals.addPanel = function(root, orientation, text, configuration) {
  var parent = root.add('panel', undefined, text)
  parent.orientation = orientation
  if (text !== undefined) {
    // default margin is [15, 10, 15, 10], but this margin is insufficient when title is present
    parent.margins = [15, 18, 15, 10]
  }
  if (configuration !== undefined) {
    configuration(parent)
  }
  return parent
}

/**
 * Returns selected radio index of this panel.
 * @return {number}
 */
Panel.prototype.getSelectedRadioIndex = function() { return Internals.getSelectedRadioIndex(this) }

/**
 * Select radio button of this panel.
 * @param {number} index
 */
Panel.prototype.selectRadioIndex = function(index) { Internals.selectRadioIndex(this, index) }
