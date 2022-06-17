/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var JUSTIFY_LEFT = function(staticText) { staticText.justify = 'left' }
var JUSTIFY_CENTER = function(staticText) { staticText.justify = 'center' }
var JUSTIFY_RIGHT = function(staticText) { staticText.justify = 'right' }

/**
 * Set tooltip to this children.
 * @returns {StaticText}
 */
StaticText.prototype.tip = function(text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {StaticText}
 */
Group.prototype.staticText = function(bounds, text, properties) { return _staticText(this, bounds, text, properties) }

/**
 * Add children to panel.
 * @returns {StaticText}
 */
Panel.prototype.staticText = function(bounds, text, properties) { return _staticText(this, bounds, text, properties) }

function _staticText(parent, bounds, text, properties) {
  var result = parent.add('statictext', _expandBounds(bounds), text, properties)
  if (parent.helpTips !== undefined) {
    _tip(result, parent.helpTips)
  }
  return result
}
