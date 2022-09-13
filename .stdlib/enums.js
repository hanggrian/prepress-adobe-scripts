/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var Enums = {
  /**
   * Give Java-like methods namely `values` and `valueOf` for enumeration.
   * There is also `list` for displaying `ListItem` in `DropDownList` or `ListBox`.
   * Every enumeration field must contain property `name` and optionally `image`.
   * @param {Object} object JSON object.
   * @param {Array} separatorIndices array of numbers indicating where ListItem separator should be.
   * @returns
   */
  of: function(object, separatorIndices) {
    if (separatorIndices === undefined) {
      separatorIndices = []
    }
    var fields = []
    var withImage = undefined
    for (var key in object) {
      if (key.toUpperCase() === key) {
        var field = object[key]
        fields.push(field)
        if (withImage === undefined) {
          withImage = field.image !== undefined
        }
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
