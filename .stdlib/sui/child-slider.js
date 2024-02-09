/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Add children to group.
 * @param {?Array<number>=} size
 * @param {number} current current value.
 * @param {number} start min value.
 * @param {number} end max value.
 * @param {?Object=} properties
 * @return {!Slider}
 */
Group.prototype.slider =
    function(size, current, start, end, properties) {
      return Internals.addSlider(this, size, current, start, end, properties)
    }

/**
 * Add children to panel.
 * @param {?Array<number>=} size
 * @param {number} current current value.
 * @param {number} start min value.
 * @param {number} end max value.
 * @param {?Object=} properties
 * @return {!Slider}
 */
Panel.prototype.slider =
    function(size, current, start, end, properties) {
      return Internals.addSlider(this, size, current, start, end, properties)
    }

Internals.addSlider =
    function(root, size, current, start, end, properties) {
      var child = root.add('slider', Internals.sizeOrBounds(size), current, start, end, properties)
      if (root.helpTips !== undefined) {
        child.helpTip = root.helpTips
      }
      return child
    }
