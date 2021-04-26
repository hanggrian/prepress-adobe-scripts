#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

var pager = new SimplexPager4(document)
pager.forEachArtboard(function(artboard) {
    artboard.name = pager.getArtboardTitle()
})