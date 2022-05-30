/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this parent.
 * @returns {TabbedPanel}
 */
Object.prototype.tips = function(text) {
  check(this.type === 'tabbedpanel')
  return _tips(this, text)
}

/**
 * Add parent to group.
 * @returns {TabbedPanel}
 */
Group.prototype.tabbedPanel = function(configuration) { return _tabbedPanel(this).also(configuration) }

/**
 * Add parent to panel.
 * @returns {TabbedPanel}
 */
Panel.prototype.tabbedPanel = function(configuration) { return _tabbedPanel(this).also(configuration) }

function _tabbedPanel(parent) {
  var result = parent.add('tabbedpanel')
  if (parent.helpTips !== undefined) {
    _tips(result, parent.helpTips)
  }
  return result
}