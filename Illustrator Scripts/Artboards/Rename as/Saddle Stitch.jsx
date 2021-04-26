#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

var pager = new SaddleStitchPager(document)
pager.forEachArtboard(function(artboard) {
    artboard.name = pager.getArtboardTitle()
})