#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

var start = 1
var end = document.artboards.length * 2
var isFront = true
document.artboards.forEach(function(it) {
    if (isFront) {
        it.name = end + '-' + start
    } else {
        it.name = start + '-' + end
    }
    end--
    start++
    isFront = !isFront
})