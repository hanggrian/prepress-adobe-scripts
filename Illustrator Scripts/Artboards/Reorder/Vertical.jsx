#target Illustrator
#include '../../.lib/commons.js'

check(document.artboards.length > 1, 'No other artboards')

var properties = []
document.artboards.forEach(function(it) {
    properties.push(copyProperties(it))
})
properties.sort(function(a, b) {
    var aX = Math.floor(a.artboardRect[0])
    var aY = Math.floor(a.artboardRect[1])
    var bX = Math.floor(b.artboardRect[0])
    var bY = Math.floor(b.artboardRect[1])
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