#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

var current = 1
var isFront = true
document.artboards.forEach(function(it) {
    if (isFront) {
        it.name = current + '-' + (current + 2)
    } else {
        it.name = (current + 1) + '-' + (current - 1)
    }
    current += 2
    isFront = !isFront
})