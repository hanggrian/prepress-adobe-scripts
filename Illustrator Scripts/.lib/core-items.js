var Items = {
  /**
   * Returns item name in the layer, or typename if it is unnamed.
   * @param {PageItem} item any type of item.
   * @return {String}
   */
  getName: function(item) {
    return item.name !== undefined && item.name.isNotBlank() ? item.name : item.typename
  },

  /**
   * Returns the clipping path of this clip group, or the item itself if this is not a clip group.
   * @param {PageItem} item any type of item.
   * @return {PathItem|CompoundPathItem}
   */
  getClippingItem: function(item) {
    if (item.typename === "GroupItem" && item.clipped) {
      return Collections.first(item.pathItems, function(it) { return it.clipping })
    }
    return item
  },

  /**
   * Returns bounds covering all items.
   * @param {Array|Object} items array or array-like objects containing any type of item.
   * @return {Array}
   */
  getMaxBounds: function(items) {
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
   * @param {PlacedItem} item a link.
   * @return {Boolean}
   */
  isLinkExists: function(item) {
    checkTypename(item, "PlacedItem")
    try {
      return item.file.exists
    } catch (e) {
      return false
    }
  }
}
