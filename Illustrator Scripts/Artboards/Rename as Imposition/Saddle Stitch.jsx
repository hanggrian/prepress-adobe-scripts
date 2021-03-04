#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

var start = 1
var end = document.artboards.length * 2
var isFront = true
document.artboards.forEach(function(it) {
    it.name = isFront
        ? end + '-' + start
        : start + '-' + end
    start++
    end--
    isFront = !isFront
})