#target Illustrator
#include "../preconditions.jsx"

checkActiveDocument()

const document = app.activeDocument

for (var i = 0; i < document.artboards.length; i++) {
    document.artboards.setActiveArtboardIndex(i)
    document.selectObjectsOnActiveArtboard(i) // select everything on artboard
    document.fitArtboardToSelectedArt(i) // resize artboard to selection
}