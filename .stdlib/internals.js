/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var Internals = {

  addChangeListener: function(child, listener) {
    if (child.onChangeListeners === undefined) {
      child.onChangeListeners = [listener]
      child.onChange = listener
    } else {
      if (child.onChangeListeners.length === 1) {
        child.onChange = function() { Collections.forEach(child.onChangeListeners, function(it) { it() }) }
      }
      child.onChangeListeners.push(listener)
    }
  },
  addClickListener: function(child, listener) {
    if (child.onClickListeners === undefined) {
      child.onClickListeners = [listener]
      child.onClick = listener
    } else {
      if (child.onClickListeners.length === 1) {
        child.onClick = function() { Collections.forEach(child.onClickListeners, function(it) { it() }) }
      }
      child.onClickListeners.push(listener)
    }
  },

  getFileFilters: function(fileExtensions) {
    var filters
    if (Scripts.OS_MAC) {
      // in macOS, filters are predicate, returning true for selectable file
      filters = function(file) {
        if (file instanceof Folder) {  // required to go through directory
          return true
        }
        for (var i = 0; i < fileExtensions.length; i++) {
          var fileExtension = fileExtensions[i]
          for (var j = 0; j < fileExtension.value.length; j++) {
            if (file.getExtension() === fileExtension.value[j]) {
              return true
            }
          }
        }
        return false
      }
    } else {
      // in Windows, filters are string, e.g.: "Adobe Illustrator:*.ai;Photoshop:*.psd,*.psb,*.pdd;"
      filters = ""
      var allExts = []
      Collections.forEach(fileExtensions, function(it) {
        filters += it.name + ":*." + it.value.join(";*.") + ","
        allExts = allExts.concat(it.value)
      })
      filters = "All Formats:*." + allExts.join(";*.") + "," + filters
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
    Collections.forEach(regexes, function(regex) {
      s = s.replace(regex, "")
    })
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

  registerValidator: function(editText, regex, getValue) {
    var oldValue = editText.text
    editText.onActivate = function() { oldValue = editText.text }
    editText.addChangeListener(function() {
      var newValue = editText.text
      editText.text = regex.test(newValue) ? getValue(oldValue, newValue) : oldValue
    })
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
    radio.select()
  }
}
