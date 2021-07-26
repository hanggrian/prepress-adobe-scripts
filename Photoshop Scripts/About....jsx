/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

#target Photoshop
#include '.lib/core.js'

var dialog = new Dialog('About')
var clientDate = new File(supportPath + '/VERSION').readText()

dialog.vgroup(function(main) {
    main.hgroup(function(group) {
        group.alignChildren = 'center'
        group.image(undefined, 'logo.png')
        group.staticText([300, 32], 'Prepress Adobe Scripts for Photoshop\nLast updated ' + clientDate, { multiline: true })
    })
    new AboutTabbedPanel(main, clientDate)
})
dialog.setNegativeButton('Close')
dialog.setNeutralButton(260, 'Visit GitHub', function() {
    openURL('https://github.com/hendraanggrian/prepress-adobe-scripts')
})
dialog.show()