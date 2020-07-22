#target Illustrator
#include '../.lib/preconditions.jsx'

checkActiveDocument()

var document = app.activeDocument

for (var i = 0; i < document.artboards.length; i++) {
    document.artboards.setActiveArtboardIndex(i)
    document.selectObjectsOnActiveArtboard(i)
    document.fitArtboardToSelectedArt(i)
}