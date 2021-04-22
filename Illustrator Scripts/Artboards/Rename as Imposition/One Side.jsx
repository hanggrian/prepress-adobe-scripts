#target Illustrator
#include '../../.lib/commons.js'

checkEvenArtboards()

var pager = new OneSidePager(document)
pager.forEachArtboard(function(artboard) {
    artboard.name = pager.getLeftTitle() + '-' + pager.getRightTitle()
})