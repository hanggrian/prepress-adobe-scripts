#target Illustrator
#include '../.include/preconditions.jsx'

checkActiveDocument()

var document = app.activeDocument

checkEvenArtboards(document)

var current = 1
var isFront = true
for (var i = 0; i < document.artboards.length; i++) {
    var currentArtboard = document.artboards[i]
    if (isFront) {
        currentArtboard.name = current + '-' + (current + 2)
    } else {
        currentArtboard.name = (current + 1) + '-' + (current - 1)
    }
    current += 2
    isFront = !isFront
}