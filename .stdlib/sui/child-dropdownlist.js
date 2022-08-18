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
 * @param {String} text existing text of any ListItem, throws error if not found.
 */
DropDownList.prototype.selectText = function(text) {
  this.selection = Collections.indexOf(
    Collections.map(this.items, function(it) { return it.text }), text)
}

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
DropDownList.prototype.tooltip = function(text) { return Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} bounds optional array of size or position & size.
 * @param {Array} items optional list items.
 * @param {Object} properties optional extra properties.
 * @returns {DropDownList}
 */
Group.prototype.dropDownList = function(bounds, items, properties) {
  return _dropDownList(this, bounds, items, properties)
}

/**
 * Add children to panel.
 * @param {Array} bounds optional array of size or position & size.
 * @param {Array} items optional list items.
 * @param {Object} properties optional extra properties.
 * @returns {DropDownList}
 */
Panel.prototype.dropDownList = function(bounds, items, properties) {
  return _dropDownList(this, bounds, items, properties)
}

function _dropDownList(parent, bounds, items, properties) {
  var itemTexts, itemFiles
  Internals.splitListItems(items).run(function(it) {
    itemTexts = it[0]
    itemFiles = it[1]
  })
  var result = parent.add("dropdownlist", Internals.expandBounds(bounds), itemTexts, properties)
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
