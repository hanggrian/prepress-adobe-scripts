/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

// See https://community.adobe.com/t5/illustrator/script-to-sort-artboard-list-alphabetically/m-p/9558395.

var Properties = {
  /**
   * Returns an object with cloned properties.
   * @param {Object} source object with properties.
   */
  copy: function(source) {
    var props = { }
    for (var key in source) {
      try {
        props[key] = source[key]
      } catch (e) {
      }
    }
    return props
  },

  /**
   * Sets target's properties the exact same as source's.
   * @param {Object} source object with properties.
   * @param {Object} target any object.
   */
  paste: function(source, target) {
    for (var key in source) {
      target[key] = source[key]
    }
  }
}
