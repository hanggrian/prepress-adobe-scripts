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
 * @param {String} text existing text of any ListItem, throws error if not found.
 */
ListBox.prototype.selectText = function(text) {
  this.selection = Collections.indexOf(
    Collections.map(this.items, function(it) { return it.text }), text)
}

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
ListBox.prototype.tooltip = function(text) { Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} bounds optional array of size or position & size.
 * @param {Array} items optional list items.
 * @param {Object} properties optional extra properties.
 * @returns {ListBox}
 */
Group.prototype.listBox = function(bounds, items, properties) {
  return _listBox(this, bounds, items, properties)
}

/**
 * Add children to panel.
 * @param {Array} bounds optional array of size or position & size.
 * @param {Array} items optional list items.
 * @param {Object} properties optional extra properties.
 * @returns {ListBox}
 */
Panel.prototype.listBox = function(bounds, items, properties) {
  return _listBox(this, bounds, items, properties)
}

function _listBox(parent, bounds, items, properties) {
  var itemTexts, itemFiles
  Internals.splitListItems(items).run(function(it) {
    itemTexts = it[0]
    itemFiles = it[1]
  })
  var result = parent.add("listbox", Internals.expandBounds(bounds), itemTexts, properties)
  if (Collections.isNotEmpty(itemFiles)) {
    Collections.forEach(result.items, function(it, i) {
      var itemFile = itemFiles[i]
      if (itemFile !== undefined) {
        it.image = itemFile
      }
    })
  }
  if (parent.helpTips !== undefined) {
    Internals.setTooltip(result, parent.helpTips)
  }
  return result
}
