#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

var current = 1
var isFront = true
document.artboards.forEach(function(it) {
    it.name = isFront
        ? current + '-' + (current + 2)
        : (current + 1) + '-' + (current - 1)
    current += 2
    isFront = !isFront
})