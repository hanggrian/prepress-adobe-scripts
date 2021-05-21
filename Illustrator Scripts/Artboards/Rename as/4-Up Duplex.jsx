#target Illustrator
#include '../../.lib/commons.js'

check(document.artboards.length.isEven(), 'Odd number of pages')

new FourUpDuplexPager(document).forEachArtboard(function() { })