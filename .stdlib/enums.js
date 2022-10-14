/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Give Java-like methods namely `values` and `valueOf` for enumeration.
 * There is also `list` for displaying `ListItem` in `DropDownList` or `ListBox`.
 * Every enumeration field usually have property `name` and `image`, but not mandatory.
 * @param {!Object} object
 * @param {!Array<number>=} separatorIndices array of numbers indicating where ListItem separator should be, default is empty.
 */
function Enum(object, separatorIndices) {
  checkNotNull(object)
  separatorIndices = separatorIndices || []
  for (var key in object) {
    this[key] = object[key]
  }
  this.separatorIndices = separatorIndices
}

/**
 * Returns an array of enum fields.
 * @return {!Array<!Object>}
 */
Enum.prototype.values = function() {
  var result = []
  for (var key in this) {
    if (key.isUpperCase()) {
      result.push(this[key])
    }
  }
  return result
}

/**
 * Returns an array of `ListItem` for `DropDownList` or `ListBox`.
 * For this to work, every field must have property `text` and optionally `image`.
 * @return {!Array<string>|!Array<!Array<string, string>>}
 */
Enum.prototype.list = function() {
  var result = []
  var i = 0
  for (var key in this) {
    if (key.isUpperCase()) {
      var field = this[key]
      checkNotNull(field.text)
      result.push(field.image === undefined ? field.text : [field.text, field.image])
      if (Collections.contains(this.separatorIndices, i++)) {
        result.push(field.image === undefined ? '-' : ['-', undefined])
      }
    }
  }
  return result
}

/**
 * Returns an enum field given a name.
 * @param {string} name enum field name, usually all uppercase.
 * @return {!Object}
 */
Enum.prototype.valueOf = function(name) {
  checkNotNull(name)
  if (name instanceof ListItem) {
    name = name.text
  }
  for (var key in this) {
    if (key.isUpperCase()) {
      if (key == name) {
        return this[key]
      }
    }
  }
  error('No field with name \'%s\' found in this enum'.format(name))
}

/**
 * Returns an enum field given a text, throws error if no such property exist.
 * @param {string} text property of enum field.
 * @return {!Object}
 */
Enum.prototype.find = function(text) {
  checkNotNull(text)
  if (text instanceof ListItem) {
    text = text.text
  }
  for (var key in this) {
    if (key.isUpperCase()) {
      var field = this[key]
      if (checkNotNull(field.text) == text) {
        return field
      }
    }
  }
  error('No field with text \'%s\' found in this enum'.format(text))
}
