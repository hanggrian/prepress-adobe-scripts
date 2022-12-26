/*<javascriptresource><menu>hide</menu></javascriptresource>*/

var Internals = {

  /**
   * @param {!Button|!DropDownList|!EditText|!IconButton|!ListBox|!CheckBox|!RadioButton|!Panel} owner
   * @param {string} type
   * @param {function()} listener
   */
  addListener: function(owner, type, listener) {
    checkNotNull(type)
    checkNotNull(listener)
    var typeHolder = type + 'Listeners'
    if (owner[typeHolder] === undefined) {
      owner[typeHolder] = [listener]
      owner[type] = listener
    } else {
      if (owner[typeHolder].length === 1) {
        owner[type] = function() { Collections.forEach(owner[typeHolder], function(it) { it() }) }
      }
      owner[typeHolder].push(listener)
    }
  },

  /**
   * @param {!Array<!Object>} fileExtensions array of enum FileExtension.
   * @return {(function(!File): boolean)|string}
   */
  getFileFilters: function(fileExtensions) {
    checkNotNull(fileExtensions)
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
      // in Windows, filters are string, e.g.: 'Adobe Illustrator:*.ai;Photoshop:*.psd,*.psb,*.pdd;'
      filters = ''
      var allExts = []
      Collections.forEach(fileExtensions, function(it) {
        filters += it.name + ':*.' + it.value.join(';*.') + ','
        allExts = allExts.concat(it.value)
      })
      filters = 'All Formats:*.' + allExts.join(';*.') + ',' + filters
      if (filters.endsWith(',')) {
        filters = filters.substringBeforeLast(',')
      }
      println('Native filters = ' + filters)
    }
    return filters
  },

  /**
   * @param {string} s
   * @param {!IArguments|!Array<!Object>} arr
   * @return {string}
   * @see https://stackoverflow.com/a/35187109/1567541
   */
  formatString: function(s, arr) {
    checkNotNull(arr)
    var args = Array.prototype.slice.call(arr)
    var rep = args.slice(0, args.length)
    var i = 0
    var output = s.replace(/%s|%d|%f|%@/g, function() { return rep.slice(i, ++i) })
    return output
  },

  /**
   * @param {!Group|!Panel|!Window} parent
   * @param {string} tips
   */
  setHelpTips: function(parent, tips) {
    Collections.forEach(parent.children, function(it) { it.helpTip = tips })
  },

  /**
   * @param {!Array<number>} size
   */
  sizeOrBounds: function(size) {
    return size !== undefined && size.length === 2 ? [0, 0, size[0], size[1]] : size
  },

  /**
   * @param {?string|?File} image
   * @return {?File}
   */
  imageOrResource: function(image) {
    if (image !== undefined && typeof image === 'string') {
      return getImage(image)
    }
    return image
  },

  /**
   * @param {?string|?Object} text
   * @return {?string}
   */
  textOrResource: function(text) {
    if (text !== undefined && typeof text !== 'string') {
      return getString(text)
    }
    return text
  },

  /**
   * @param {string} string
   * @param {!Array<!RegExp>} regexes
   * @return {string}
   */
  removeRegexes: function(string, regexes) {
    checkNotNull(regexes)
    var s = string
    Collections.forEach(regexes, function(regex) {
      s = s.replace(regex, '')
    })
    return s
  },

  /**
   * @param {!Array<!Object>} items
   * @return {!Array<!Array<string>>}
   */
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
      itemFiles.push(pair[0] === '-' ? undefined : Internals.imageOrResource(pair[1]))
    })
    return [itemTexts, itemFiles]
  },

  /**
   * @param {!EditText} editText
   * @param {string} regex
   * @param {function(string, string): string} getValue
   */
  registerValidator: function(editText, regex, getValue) {
    checkNotNull(regex)
    checkNotNull(getValue)
    var oldValue = editText.text
    editText.onActivate = function() { oldValue = editText.text }
    editText.addChangeListener(function() {
      var newValue = editText.text
      editText.text = regex.test(newValue) ? getValue(oldValue, newValue) : oldValue
    })
  },

  /**
   * @param {!Group|!Panel|!Window} parent
   * @return {number}
   */
  getSelectedRadioIndex: function(parent) {
    var radioCount = 0
    for (var i = 0; i < parent.children.length; i++) {
      if (parent.children[i].type === 'radiobutton') {
        if (parent.children[i].value) {
          return radioCount
        }
        radioCount++
      }
    }
    return -1
  },

  /**
   * @param {!Group|!Panel|!Window} parent
   * @param {number} index
   */
  selectRadioIndex: function(parent, index) {
    checkNotNull(index)
    if (index < 0 || index > Collections.lastIndex(parent.children)) {
      return
    }
    var radio = parent.children[index]
    check(radio.type === 'radiobutton')
    radio.select()
  }
}
