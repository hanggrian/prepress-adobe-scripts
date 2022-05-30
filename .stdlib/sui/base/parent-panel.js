/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this parent.
 * @returns {Panel}
 */
Panel.prototype.tips = function(text) { return _tips(this, text) }

/**
 * Add horizontal parent to group.
 * @returns {Panel}
 */
Group.prototype.hpanel = function(title, configuration) { return _panel(this, 'row', title).also(configuration) }

/**
 * Add horizontal parent to panel.
 * @returns {Panel}
 */
Panel.prototype.hpanel = function(title, configuration) { return _panel(this, 'row', title).also(configuration) }

/**
 * Add vertical parent to group.
 * @returns {Panel}
 */
Group.prototype.vpanel = function(title, configuration) { return _panel(this, 'column', title).also(configuration) }

/**
 * Add vertical parent to panel.
 * @returns {Panel}
 */
Panel.prototype.vpanel = function(title, configuration) { return _panel(this, 'column', title).also(configuration) }

/**
 * Add stack parent to group.
 * @returns {Panel}
 */
Group.prototype.spanel = function(title, configuration) { return _panel(this, 'stack', title).also(configuration) }

/**
 * Add stack parent to panel.
 * @returns {Panel}
 */
Panel.prototype.spanel = function(title, configuration) { return _panel(this, 'stack', title).also(configuration) }

function _panel(parent, orientation, title) {
  var result = parent.add('panel', undefined, title)
  result.orientation = orientation
  if (parent.helpTips !== undefined) {
    _tips(result, parent.helpTips)
  }
  if (title !== undefined) {
    // default margin is [15, 10, 15, 10], but this margin is unsufficient when title is present
    result.margins = [15, 15, 15, 10]
  }
  return result
}