/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns true if this list has a selection.
 * @return {boolean}
 */
DropDownList.prototype.hasSelection = function() { return this.selection !== null }

/**
 * Change selection to ListItem with `text`, throwing error if not found.
 * @param {string|!Object} text
 */
DropDownList.prototype.selectText = function(text) {
  this.selection = Collections.indexOf(
    Collections.map(this.items, function(it) { return it.text }), text)
}

/**
 * Allows for multiple change listeners to occur by invoking all of them in collective listener.
 * @param {function()} listener
 */
DropDownList.prototype.addChangeListener = function(listener) {
  Internals.addListener(this, 'onChange', listener)
}

/**
 * Add children to group.
 * @param {?Array<number>=} size
 * @param {?Array<*>=} items
 * @param {?Object=} properties
 * @return {!DropDownList}
 */
Group.prototype.dropDownList = function(size, items, properties) {
  return Internals.addDropDownList(this, size, items, properties)
}

/**
 * Add children to panel.
 * @param {?Array<number>=} size
 * @param {?Array<*>=} items
 * @param {?Object=} properties
 * @return {!DropDownList}
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
  var child = root.add('dropdownlist', Internals.sizeOrBounds(size), itemTexts, properties)
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
