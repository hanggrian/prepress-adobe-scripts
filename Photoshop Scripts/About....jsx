/*
<javascriptresource>
<category>3</category>
</javascriptresource>
*/

#target Photoshop
#include '../.stdlib/ui/about.js'
#include '.lib/core.js'

var dialog = new Dialog('About', 'center')
dialog.image(undefined, getResource(R.png.logo))
dialog.staticText(undefined, 'Prepress Adobe Scripts for Illustrator')
new AboutTabbedPanel(dialog.main)

dialog.setNegativeButton('Close')
dialog.setNeutralButton(260, 'Visit GitHub', function() {
    openURL('https://github.com/hendraanggrian/prepress-adobe-scripts')
})
dialog.show()