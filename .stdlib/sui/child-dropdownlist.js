/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns true if this list has a selection.
 * @returns {Boolean}
 */
DropDownList.prototype.hasSelection = function() { return this.selection !== null }

/**
 * Change selection to ListItem with `text`.
 * @param {String|Object} text existing text of any ListItem, throws error if not found.
 */
DropDownList.prototype.selectText = function(text) {
  this.selection = Collections.indexOf(
    Collections.map(this.items, function(it) { return it.text }), text)
}

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {Array} items optional list items.
 * @param {Object} properties optional extra properties.
 * @returns {DropDownList}
 */
Group.prototype.dropDownList = function(size, items, properties) {
  return Internals.addDropDownList(this, size, items, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {Array} items optional list items.
 * @param {Object} properties optional extra properties.
 * @returns {DropDownList}
 */
Panel.prototype.dropDownList = function(size, items, properties) {
  return Internals.addDropDownList(this, size, items, properties)
}

Internals.addDropDownList = function(root, size, items, properties) {
  var itemTexts, itemFiles
  Internals.splitListItems(items).run(function(it) {
    itemTexts = it[0]
    itemFiles = it[1]
  })
  var child = root.add("dropdownlist", Internals.sizeOrBounds(size), itemTexts, properties)
  if (Collections.isNotEmpty(itemFiles)) {
    Collections.forEach(child.items, function(it, i) {
      if (itemFiles[i] !== undefined) {
        it.image = itemFiles[i]
      }
    })
  }
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
