/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/** Returns true if this list has a selection. */
ListBox.prototype.hasSelection = function() { return this.selection !== null }

/** Change selection to ListItem with `text`. */
ListBox.prototype.selectText = function(text) { this.selection = this.items.map(function(it) { return it.text }).indexOf(text) }

/**
 * Set tooltip to this children.
 * @returns {ListBox}
 */
ListBox.prototype.tip = function(text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {ListBox}
 */
Group.prototype.listBox = function(bounds, items, properties) { return _listBox(this, bounds, items, properties) }

/**
 * Add children to panel.
 * @returns {ListBox}
 */
Panel.prototype.listBox = function(bounds, items, properties) { return _listBox(this, bounds, items, properties) }

function _listBox(parent, bounds, items, properties) {
  var itemTexts, itemFiles
  _splitItems(items).run(function(it) {
    itemTexts = it[0]
    itemFiles = it[1]
  })
  var result = parent.add("listbox", _expandBounds(bounds), itemTexts, properties)
  if (itemFiles.isNotEmpty()) {
    result.items.forEach(function(it, i) {
      var itemFile = itemFiles[i]
      if (itemFile !== undefined) {
        it.image = itemFile
      }
    })
  }
  if (parent.helpTips !== undefined) {
    _tip(result, parent.helpTips)
  }
  return result
}
