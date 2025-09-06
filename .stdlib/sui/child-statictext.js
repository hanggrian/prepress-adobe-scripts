/*<javascriptresource><menu>hide</menu></javascriptresource>*/

var HEADING =
    function(it) {
      it.text += ':';
      it.justify = 'right';
    };
var JUSTIFY_LEFT =
    function(it) {
      it.justify = 'left';
    };
var JUSTIFY_RIGHT =
    function(it) {
      it.justify = 'right';
    };

/**
 * Add children to group.
 * @param {?Array<number>=} size
 * @param {?string|?Object=} text
 * @param {?Object=} properties
 * @return {!StaticText}
 */
Group.prototype.staticText =
    function(size, text, properties) {
      return Internals.addStaticText(this, size, text, properties);
    };

/**
 * Add children to panel.
 * @param {?Array<number>=} size
 * @param {?string|?Object=} text
 * @param {?Object=} properties
 * @return {!StaticText}
 */
Panel.prototype.staticText =
    function(size, text, properties) {
      return Internals.addStaticText(this, size, text, properties);
    };

Internals.addStaticText =
    function(root, size, text, properties) {
      var child = root.add('statictext', Internals.sizeOrBounds(size), text, properties);
      if (root.helpTips !== undefined) {
        child.helpTip = root.helpTips;
      }
      return child;
    };
