#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

var pager = new PerfectBindingPager(document)
pager.forEachArtboard(function(artboard) {
    artboard.name = pager.getLeftTitle() + '-' + pager.getRightTitle()
})