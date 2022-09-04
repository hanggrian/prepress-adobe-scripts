/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var Enums = {
  /**
   * Give Java-like methods namely `values` and `valueOf` for enumeration.
   * There is also `list` for displaying `ListItem` in `DropDownList` or `ListBox`.
   * @param {Object} object actual enum, every item must contain property `name`.
   * @param {*} withImage whether or not enum item contain property `image`.
   * @param {*} separatorIndices ListItem separator.
   * @returns
   */
  of: function(object, withImage, separatorIndices) {
    if (withImage === undefined) {
      withImage = false
    }
    if (separatorIndices === undefined) {
      separatorIndices = []
    }
    var fields = []
    for (var key in object) {
      if (key.toUpperCase() === key) {
        fields.push(object[key])
      }
    }
    object.values = function() { return fields }
    object.list = function() {
      var result = []
      Collections.forEach(fields, function(it, i) {
        result.push(!withImage ? it.name : [it.name, it.image])
        if (Collections.contains(separatorIndices, i)) {
          result.push(!withImage ? "-" : ["-", undefined])
        }
      })
      return result
    }
    object.valueOf = function(name) {
      if (name instanceof ListItem) {
        name = name.text
      }
      return Collections.first(fields, function(it) { return it.name == name })
    }
    return object
  }
}
