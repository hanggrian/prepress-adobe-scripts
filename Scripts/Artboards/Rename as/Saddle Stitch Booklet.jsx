#target Illustrator
#include '../../.lib/commons.js'

check(document.artboards.length % 4 == 0, 'Number of booklet pages must be dividable by 4')

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