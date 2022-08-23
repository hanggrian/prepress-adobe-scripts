/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var Internals = {

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

  sizeToBounds: function(size) {
    return size !== undefined && size.length === 2 ? [0, 0, size[0], size[1]] : size
  },

  removeRegexes: function(string, regexes) {
    var s = string
    for (var i = 0; i < regexes.length; i++) {
      s = s.replace(regexes[i], "")
    }
    return s
  },

  getResourceFile: function(image) {
    if (typeof image === "string" || image instanceof String) {
      return Resources.getImage(image)
    }
    return image
  },

  splitListItems: function(items) {
    if (items === undefined || Collections.isEmpty(items)) {
      return [[], []]
    }
    if (Collections.all(items, function(it) { return typeof it === "string" || it instanceof String })) {
      return [items, []]
    }
    var itemTexts = []
    var itemFiles = []
    Collections.forEach(items, function(it) {
      itemTexts.push(it[0])
      itemFiles.push(it[0] === "-" ? undefined : Internals.getResourceFile(it[1]))
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

  getSelectedRadioText: function(parent) {
    return Collections.first(parent.children,
      function(it) { return it.type === "radiobutton" && it.value }).text
  },

  selectRadioText: function(parent, text) {
    return Collections.first(parent.children,
      function(it) { return it.type === "radiobutton" && it.text === text }).value = true
  },

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

  // https://stackoverflow.com/questions/7975005/format-a-javascript-string-using-placeholders-and-an-object-of-substitutions
  formatString: function(s, arr) {
    var args = Array.prototype.slice.call(arr);
    var rep = args.slice(0, args.length)
    var i = 0
    var output = s.replace(/%s|%d|%f|%@/g, function() { return rep.slice(i, ++i) })
    return output
  }
}
