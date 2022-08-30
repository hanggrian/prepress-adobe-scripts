/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns true if this list has a selection.
 * @returns {Boolean}
 */
ListBox.prototype.hasSelection = function() { return this.selection !== null }

/**
 * Change selection to ListItem with `text`.
 * @param {String|Object} text existing text of any ListItem, throws error if not found.
 */
ListBox.prototype.selectText = function(text) {
  this.selection = Collections.indexOf(
    Collections.map(this.items, function(it) { return it.text }), Internals.stringOrResources(text))
}

/**
 * Set tooltip to this children.
 * @param {String|Object} text tips to display.
 */
ListBox.prototype.tooltip = function(text) { Internals.setTooltip(this, Internals.stringOrResources(text)) }

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {Array} items optional list items.
 * @param {Object} properties optional extra properties.
 * @returns {ListBox}
 */
Group.prototype.listBox = function(size, items, properties) {
  return _listBox(this, size, items, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {Array} items optional list items.
 * @param {Object} properties optional extra properties.
 * @returns {ListBox}
 */
Panel.prototype.listBox = function(size, items, properties) {
  return _listBox(this, size, items, properties)
}

function _listBox(root, size, items, properties) {
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
    Internals.setTooltip(child, root.helpTips)
  }
  return child
}
