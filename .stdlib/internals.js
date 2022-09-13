/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var Internals = {

  getFileFilters: function(fileTypes) {
    var filters
    if (Scripts.OS_MAC) {
      // in macOS, filters are predicate, returning true for selectable file
      filters = function(file) {
        if (file instanceof Folder) {  // required to go through directory
          return true
        }
        for (var i = 0; i < fileTypes.length; i++) {
          var fileType = fileTypes[i]
          for (var j = 0; j < fileType.extensions.length; j++) {
            if (file.getExtension() === fileType.extensions[j]) {
              return true
            }
          }
        }
        return false
      }
    } else {
      // in Windows, filters are string, e.g.: "Adobe Illustrator:*.ai;Photoshop:*.psd,*.psb,*.pdd;"
      filters = ""
      var allExtensions = []
      Collections.forEach(fileTypes, function(it) {
        filters += it.name + ":*." + it.extensions.join(";*.") + ","
        allExtensions = allExtensions.concat(it.extensions)
      })
      filters = "All Formats:*." + allExtensions.join(";*.") + "," + filters
      if (filters.endsWith(",")) {
        filters = filters.substringBeforeLast(",")
      }
      println("Native filters = " + filters)
    }
    return filters
  },

  // https://stackoverflow.com/a/35187109/1567541
  formatString: function(s, arr) {
    var args = Array.prototype.slice.call(arr)
    var rep = args.slice(0, args.length)
    var i = 0
    var output = s.replace(/%s|%d|%f|%@/g, function() { return rep.slice(i, ++i) })
    return output
  },

  setHelpTips: function(parent, tips) { Collections.forEach(parent.children, function(it) { it.helpTip = tips }) },

  sizeOrBounds: function(size) { return size !== undefined && size.length === 2 ? [0, 0, size[0], size[1]] : size },

  imageOrResource: function(image) {
    if (image !== undefined && typeof image === "string") {
      return getImage(image)
    }
    return image
  },
  textOrResource: function(text) {
    if (text !== undefined && typeof text !== "string") {
      return getString(text)
    }
    return text
  },

  removeRegexes: function(string, regexes) {
    var s = string
    for (var i = 0; i < regexes.length; i++) {
      s = s.replace(regexes[i], "")
    }
    return s
  },

  splitListItems: function(items) {
    if (items === undefined || Collections.isEmpty(items)) {
      return [[], []]
    } else if (Collections.none(items, function(it) { return it instanceof Array })) {
      return [items, []]
    }
    var itemTexts = []
    var itemFiles = []
    Collections.forEach(items, function(pair) {
      itemTexts.push(pair[0])
      itemFiles.push(pair[0] === "-" ? undefined : Internals.imageOrResource(pair[1]))
    })
    return [itemTexts, itemFiles]
  },

  registerValidator: function(editText, regex, valueProvider) {
    var oldValue = editText.text
    editText.onActivate = function() { oldValue = editText.text }
    editText.onChange = function() {
      var newValue = editText.text
      editText.text = regex.test(newValue) ? valueProvider(oldValue, newValue) : oldValue
    }
  },

  getSelectedRadioIndex: function(parent) {
    var radioCount = 0
    for (var i = 0; i < parent.children.length; i++) {
      if (parent.children[i].type === "radiobutton") {
        if (parent.children[i].value) {
          return radioCount
        }
        radioCount++
      }
    }
    return -1
  },
  selectRadioIndex: function(parent, index) {
    if (index > Collections.lastIndex(parent.children)) {
      return
    }
    var radio = parent.children[index]
    check(radio.type === "radiobutton")
    radio.value = true
  }
}
