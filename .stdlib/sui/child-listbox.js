/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns true if this list has a selection.
 * @return {Boolean}
 */
ListBox.prototype.hasSelection = function() { return this.selection !== null }

/**
 * Change selection to ListItem with `text`.
 * @param {String|Object} text existing text of any ListItem, throws error if not found.
 */
ListBox.prototype.selectText = function(text) {
  this.selection = Collections.indexOf(
    Collections.map(this.items, function(it) { return it.text }), text)
}

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {Array} items optional list items.
 * @param {Object} properties optional extra properties.
 * @return {ListBox}
 */
Group.prototype.listBox = function(size, items, properties) {
  return Internals.addListBox(this, size, items, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {Array} items optional list items.
 * @param {Object} properties optional extra properties.
 * @return {ListBox}
 */
Panel.prototype.listBox = function(size, items, properties) {
  return Internals.addListBox(this, size, items, properties)
}

Internals.addListBox = function(root, size, items, properties) {
  var itemTexts, itemFiles
  Internals.splitListItems(items).run(function(it) {
    itemTexts = it[0]
    itemFiles = it[1]
  })
  var child = root.add("listbox", Internals.sizeOrBounds(size), itemTexts, properties)
  if (Collections.isNotEmpty(itemFiles)) {
    Collections.forEach(itemFiles, function(it, i) {
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
