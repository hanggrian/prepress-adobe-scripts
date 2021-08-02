#include '../../.stdlib/stdlib.js'

#include 'core-pager/booklet.js'
#include 'core-pager/eight-up.js'
#include 'core-pager/four-up.js'
#include 'core-pager/two-up.js'

#include 'core-collections.js'
#include 'core-colors.js'
#include 'core-files.js'
#include 'core-preferences.js'
#include 'core-units.js'

#include 'sui/maintain-size.js'
#include 'sui/open-options.js'
#include 'sui/order-by.js'
#include 'sui/range.js'
#include 'sui/save-options.js'
#include 'sui/select-dimension.js'
#include 'sui/slider.js'

libPath = new File($.fileName).path

/**
 * Returns layer name, or type if it is unnamed.
 * @this {PageItem}
 * @returns {String}
 */
Object.prototype.getLayerName = function() {
    return this.name != null & this.name.length > 0 ? this.name : this.typename
}

/**
 * Returns the clipping path of this clip group, or the item itself if this is not a clip group.
 * @this {PageItem}
 * @returns {PathItem}
 */
Object.prototype.getClippingPathItem = function() {
    if (this.typename === 'GroupItem' && this.clipped) {
        // can't use `first { }` because PathItems is not an Array
        for (var i = 0; i < this.pathItems.length; i++) {
            var pathItem = this.pathItems[i]
            if (pathItem.clipping) {
                return pathItem
            }
        }
    }
    return this
}

/**
 * Returns bounds covering all items.
 * @returns {Array}
 */
Array.prototype.getFarthestBounds = function() {
    var maxStartX, maxStartY, maxEndX, maxEndY
    this.forEach(function(item) {
        var clippingItem = item.getClippingPathItem()
        var width = clippingItem.width
        var height = clippingItem.height
        var itemStartX = clippingItem.position.getLeft()
        var itemStartY = clippingItem.position.getTop()
        var itemEndX = itemStartX + width
        var itemEndY = itemStartY - height
        if (maxStartX === undefined || itemStartX < maxStartX) maxStartX = itemStartX
        if (maxStartY === undefined || itemStartY > maxStartY) maxStartY = itemStartY
        if (maxEndX === undefined || itemEndX > maxEndX) maxEndX = itemEndX
        if (maxEndY === undefined || itemEndY < maxEndY) maxEndY = itemEndY
    })
    return [maxStartX, maxStartY, maxEndX, maxEndY]
}

/**
 * Returns true if the file associated with this PlacedItem is not missing.
 * @this {PlacedItem}
 * @returns {Boolean}
 */
Object.prototype.isFileExists = function() {
    check(this.typename === 'PlacedItem')
    try {
        this.file
        return true
    } catch (e) {
        return false
    }
}