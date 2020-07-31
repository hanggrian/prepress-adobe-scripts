#target Illustrator
#include '../.lib/preconditions.js'

checkActiveDocument()

var document = app.activeDocument

checkEvenArtboards()

var end = document.artboards.length
var start = 1
var isFront = true
for (var i = 0; i < document.artboards.length; i++) {
    var currentArtboard = document.artboards[i]
    if (isFront) {
        currentArtboard.name = end + '-' + start
    } else {
        currentArtboard.name = start + '-' + end
    }
    end--
    start++
    isFront = !isFront
}