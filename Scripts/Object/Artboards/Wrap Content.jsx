/**
 * Adjust artboards' size to match content's bounds.
 */

#target Illustrator
#include '../../.lib/core.js'

for (var i = 0; i < document.artboards.length; i++) {
    document.artboards.setActiveArtboardIndex(i)
    document.selectObjectsOnActiveArtboard(i)
    document.fitArtboardToSelectedArt(i)
}