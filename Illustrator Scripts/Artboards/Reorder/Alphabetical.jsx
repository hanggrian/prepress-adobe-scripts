#target Illustrator
#include '../../.lib/commons.js'

var properties = []
document.artboards.forEach(function(it) {
    properties.push(copyProperties(it))
})
properties.sort(function(a, b) {
    if (a.name > b.name) {
        return 1
    } else if (a.name < b.name) {
        return -1
    }
    return 0
})
document.artboards.forEach(function(it, i) {
    pasteProperties(properties[i], it)
})