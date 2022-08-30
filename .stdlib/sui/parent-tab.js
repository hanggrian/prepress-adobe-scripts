/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add horizontal parent to tabbed panel.
 * @param {String|Object} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Tab}
 */
Panel.prototype.htab = function(text, configuration) {
  return _tab(this, "row", text, configuration)
}

/**
 * Add vertical parent to tabbed panel.
 * @param {String|Object} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Tab}
 */
Panel.prototype.vtab = function(text, configuration) {
  return _tab(this, "column", text, configuration)
}

/**
 * Add stack parent to tabbed panel.
 * @param {String|Object} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Tab}
 */
Panel.prototype.stab = function(text, configuration) {
  return _tab(this, "stack", text, configuration)
}

function _tab(root, orientation, text, configuration) {
  check(root.type === "tabbedpanel")
  var tab = root.add("tab", undefined, Internals.stringOrResources(text))
  var parent = _group(tab, orientation, configuration)
  return parent
}
