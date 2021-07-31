#target Illustrator
#include '.lib/core.js'

var dialog = new Dialog('About')
var clientDate = parseDate(new File(supportPath + '/VERSION').readText())

dialog.vgroup(function(main) {
    main.hgroup(function(group) {
        group.alignChildren = 'center'
        group.image(undefined, 'logo.png')
        group.staticText([300, 32], 'Prepress Adobe Scripts for Illustrator\nLast updated ' + clientDate.toISOString(), { multiline: true })
    })
    new AboutTabbedPanel(main, clientDate)
})
dialog.setCancelButton('Close')
dialog.setHelpButton('Visit GitHub', function() {
    openURL('https://github.com/hendraanggrian/prepress-adobe-scripts')
})
dialog.show()