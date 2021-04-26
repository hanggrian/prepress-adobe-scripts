#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

var pager = new SimplexPager2(document)
pager.forEachArtboard(function(artboard) {
    artboard.name = pager.getArtboardTitle()
})