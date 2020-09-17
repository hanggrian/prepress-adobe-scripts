#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

var start = 1
document.artboards.forEach(function(it) {
    it.name = start++ + '-' + start++
})