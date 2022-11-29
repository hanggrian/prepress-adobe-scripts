var Items = {
  /**
   * Returns item name in the layer, or typename if it is unnamed.
   * @param {!PageItem} item
   * @return {string}
   */
  getName: function(item) {
    checkNotNull(item)
    return item.name !== undefined && item.name.isNotBlank() ? item.name : item.typename
  },

  /**
   * Returns the clipping path of this clip group, or the item itself if this is not a clip group.
   * @param {!PageItem} item
   * @return {!PathItem|!CompoundPathItem}
   */
  getClippingItem: function(item) {
    checkNotNull(item)
    if (item.typename === 'GroupItem' && item.clipped) {
      return Collections.first(item.pathItems, function(it) { return it.clipping })
    }
    return item
  },

  /**
   * Returns bounds covering all items.
   * @param {!Array<!PageItem>|!PageItems} items
   * @return {!Array<number>}
   */
  getMaxBounds: function(items) {
    checkNotNull(items)
    var maxStartX, maxStartY, maxEndX, maxEndY
    Collections.forEach(items, function(item) {
      var clippingItem = Items.getClippingItem(item)
      var width = clippingItem.width
      var height = clippingItem.height
      var itemStartX = clippingItem.position.getLeft()
      var itemStartY = clippingItem.position.getTop()
      var itemEndX = itemStartX + width
      var itemEndY = itemStartY - height
      if (maxStartX === undefined || itemStartX < maxStartX) {
        maxStartX = itemStartX
      }
      if (maxStartY === undefined || itemStartY > maxStartY) {
        maxStartY = itemStartY
      }
      if (maxEndX === undefined || itemEndX > maxEndX) {
        maxEndX = itemEndX
      }
      if (maxEndY === undefined || itemEndY < maxEndY) {
        maxEndY = itemEndY
      }
    })
    return [maxStartX, maxStartY, maxEndX, maxEndY]
  },

  /**
   * Returns true if the file associated with this PlacedItem is not missing.
   * @param {!PlacedItem} item
   * @return {boolean}
   */
  isLinkExists: function(item) {
    checkNotNull(item)
    checkTypename(item, 'PlacedItem')
    try {
      return item.file.exists
    } catch (e) {
      return false
    }
  },

  /**
   * Add a rectangle guide around item, the size and position of the item must already be set for this to work.
   * @param {!Document} document
   * @param {!PageItem} item
   * @param {number} bleed
   * @return {!PathItem}
   */
  addBleedGuide: function(document, item, bleed) {
    checkNotNull(document)
    checkNotNull(item)
    checkNotNull(bleed)
    var guide = document.pathItems.rectangle(
      item.position.getTop() - bleed, item.position.getLeft() + bleed,
      item.width - bleed * 2, item.height - bleed * 2)
    guide.filled = false
    guide.guides = true
    return guide
  }
}
