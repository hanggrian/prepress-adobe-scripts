/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add horizontal parent to tabbed panel.
 * @returns {Group}
 */
Object.prototype.vtab = function(title, configuration) {
  check(this.type === 'tabbedpanel')
  return _tab(this, 'row', title).also(configuration)
}

/**
 * Add vertical parent to tabbed panel.
 * @returns {Group}
 */
Object.prototype.vtab = function(title, configuration) {
  check(this.type === 'tabbedpanel')
  return _tab(this, 'column', title).also(configuration)
}

/**
 * Add stack parent to tabbed panel.
 * @returns {Group}
 */
Object.prototype.stab = function(title, configuration) {
  check(this.type === 'tabbedpanel')
  return _tab(this, 'stack', title).also(configuration)
}

function _tab(parent, orientation, title) {
  var tab = parent.add('tab', undefined, title)
  var result = _group(tab, orientation)
  return result
}
