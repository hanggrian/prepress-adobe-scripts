#target Illustrator
#include '../../.lib/commons.js'

check(document.artboards.length % 4 == 0, 'Number of booklet pages must be dividable by 4')

var start = 1
document.artboards.forEach(function(it) {
    it.name = start++ + '-' + start++
})