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