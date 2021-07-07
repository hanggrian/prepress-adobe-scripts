#target Illustrator
#include '../.stdlib/ui/about.js'
#include '.lib/core.js'

var dialog = new Dialog('About')
dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'center'
    topGroup.image(undefined, getResource(R.png.logo))
    topGroup.staticText([300, 32], 'Prepress Adobe Scripts for Illustrator\nVersion 0.1b', function(it) {

    }, { multiline: true })
})
new AboutTabbedPanel(dialog.main)

dialog.setNegativeButton('Close')
dialog.setNeutralButton(230, 'Visit GitHub', function() {
    openURL('https://github.com/hendraanggrian/prepress-adobe-scripts')
})
dialog.show()