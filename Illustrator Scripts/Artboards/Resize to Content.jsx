#target Illustrator
#include '../.lib/commons.js'

document.artboards.forEach(function(_, i) {
    document.artboards.setActiveArtboardIndex(i)
    document.selectObjectsOnActiveArtboard(i)
    document.fitArtboardToSelectedArt(i)
})