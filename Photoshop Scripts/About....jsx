/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

#target Photoshop
#include '.lib/core.js'

var dialog = new Dialog('About Scripts')
var clientDate = parseDate(getResource('VERSION').readText())

dialog.vgroup(function(main) {
    main.hgroup(function(group) {
        group.alignChildren = 'center'
        group.image(undefined, 'logo.png')
        group.staticText([300, 32], 'Prepress Adobe Scripts for Photoshop\nLast updated ' + clientDate.toISOString(), { multiline: true })
    })
    new AboutTabbedPanel(main, clientDate)
})
dialog.setCancelButton('Close') // because there is no default button
dialog.setHelpButton('Visit GitHub', function() { openLink('github') })
dialog.show()