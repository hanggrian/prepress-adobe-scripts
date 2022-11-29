/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var Objects = {
  /**
   * Returns an object with cloned properties.
   * @param {!Object} source
   * @see https://community.adobe.com/t5/illustrator/script-to-sort-artboard-list-alphabetically/m-p/9558395
   */
  copyProperties: function(source) {
    checkNotNull(source)
    var props = {}
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
   * @param {!Object} source
   * @param {!Object} target
   * @see https://community.adobe.com/t5/illustrator/script-to-sort-artboard-list-alphabetically/m-p/9558395
   */
  pasteProperties: function(source, target) {
    checkNotNull(source)
    checkNotNull(target)
    for (var key in source) {
      target[key] = source[key]
    }
  }
}
