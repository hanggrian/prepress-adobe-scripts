/**
 * Adjust artboards' size to match content's bounds.
 */

#target Illustrator
#include '../.lib/commons.js'

document.artboards.forEach(function(_, i) {
    document.artboards.setActiveArtboardIndex(i)
    document.selectObjectsOnActiveArtboard(i)
    document.fitArtboardToSelectedArt(i)
})