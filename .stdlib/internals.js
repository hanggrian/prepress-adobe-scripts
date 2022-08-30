/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var Internals = {

  convertFileFilters: function(filters) {
    var nativeFilters
    if (OS_MAC) {
      nativeFilters = function(file) {
        var condition = file instanceof Folder // required to go through directory
        Collections.forEach(filters, function(array) {
          Collections.forEach(array.slice(1), function(ext) {
            condition = condition || file.getExtension() === ext.toLowerCase()
          })
        })
        return condition
      }
    } else {
      // expected filters = "Adobe Illustrator:*.ai;Photoshop:*.psd,*.psb,*.pdd;"
      nativeFilters = ""
      var allExtensions = []
      Collections.forEach(filters, function(array) {
        check(array.length > 1, "File extension required")
        var name = Collections.first(array)
        var extensions = array.slice(1)
        nativeFilters += name + ":*." + extensions.join(";*.") + ","

        allExtensions = allExtensions.concat(extensions)
      })
      nativeFilters = "All Formats:*." + allExtensions.join(";*.") + "," + nativeFilters
      if (nativeFilters.endsWith(",")) {
        nativeFilters = nativeFilters.substringBeforeLast(",")
      }
      println("Native filters = " + nativeFilters)
    }
    return nativeFilters
  },

  getLanguageCode: function(language) {
    switch (language) {
      case "Indonesia": return "id"
      default: return "en"
    }
  },

  // https://stackoverflow.com/a/35187109/1567541
  formatString: function(s, arr) {
    var args = Array.prototype.slice.call(arr);
    var rep = args.slice(0, args.length)
    var i = 0
    var output = s.replace(/%s|%d|%f|%@/g, function() { return rep.slice(i, ++i) })
    return output
  },

  setTooltip: function(child, text) {
    text = text.trim()
    child.helpTip = text.endsWith(".") || text.endsWith("?") ? text : text + "."
  },

  setTooltips: function(parent, text) {
    // queue tooltip that will be attached upon children creation
    parent.helpTips = text
    // attach it manually in case `setHelpTips` is called when children are already created
    Collections.forEach(parent.children, function(it) {
      if (it.helpTip !== text) {
        Internals.setTooltip(it, text)
      }
    })
  },

  sizeOrBounds: function(size) {
    return size !== undefined && size.length === 2 ? [0, 0, size[0], size[1]] : size
  },

  stringOrResources: function(text) {
    if (text === undefined) {
      return undefined
    }
    if (typeof text === "string") {
      return text
    }
    if (_resLang === undefined) {
      _resLang = configs.getString("language", "English")
    }
    var result = text[Internals.getLanguageCode(_resLang)]
    return result !== undefined ? result : text.en
  },

  imageOrResources: function(image) {
    if (typeof image === "string") {
      return getImage(image)
    }
    return image
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
      return [Collections.map(items, function(it) { return Internals.stringOrResources(it) }), []]
    }
    var itemTexts = []
    var itemFiles = []
    Collections.forEach(items, function(pair) {
      itemTexts.push(Internals.stringOrResources(pair[0]))
      itemFiles.push(pair[0] === "-" ? undefined : Internals.imageOrResources(pair[1]))
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
    if (index < parent.children.length) {
      var radio = parent.children[index]
      check(radio.type === "radiobutton")
      radio.value = true
    }
  }
}
