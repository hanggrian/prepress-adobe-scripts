#target Illustrator
#include '.lib/core.js'

var dialog = new Dialog('About', 'center')
dialog.image(undefined, getResource(R.png.logo))
dialog.staticText(undefined, 'Prepress Adobe Scripts for Illustrator')

dialog.setNegativeButton('Close')
dialog.setNeutralButton(20, 'Visit GitHub', function() {
    openURL('https://github.com/hendraanggrian/prepress-adobe-scripts')
})
dialog.show()