#target Illustrator
#include '../../.lib/commons.js'

check(document.artboards.length > 1, 'No other artboards')

var properties = []
document.artboards.forEach(function(it) {
    properties.push(copyProperties(it))
})
properties.sort(function(a, b) {
    var aX = a.artboardRect.getLeft().floor()
    var aY = a.artboardRect.getTop().floor()
    var bX = b.artboardRect.getLeft().floor()
    var bY = b.artboardRect.getTop().floor()
    if (aX === bX) {
        if (aY < bY) {
            return 1
        } else if (aY > bY) {
            return -1
        }
    } else if (aX > bX) {
        return 1
    } else {
        return -1
    }
    return 0
})
document.artboards.forEach(function(it, i) {
    pasteProperties(properties[i], it)
})