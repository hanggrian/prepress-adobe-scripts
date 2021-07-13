#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/range.js'
#include '../../.lib/ui/save-options.js'

var BOUNDS_TEXT = [70, 21]

for (var i = 0; i < app.documents.length; i++) {
    check(app.documents[i].saved, 'Save all documents before proceeding')
}

var dialog = new Dialog('Export PDF')
var saveFilePanel
var useBleedCheck, compressArtCheck
var saveDirectoryGroup

dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    saveFilePanel = new SaveFilePanel(topGroup, BOUNDS_TEXT, 'pdf')
    topGroup.vpanel('Export', function(panel) {
        panel.alignChildren = 'fill'
        useBleedCheck = panel.checkBox(undefined, 'Use Bleed', function(it) {
            it.setTooltip('Link 4 bleed values')
            it.select()
        })
        compressArtCheck = panel.checkBox(undefined, 'Compress Art', function(it) {
            it.setTooltip('	Should line art and text be compressed?')
            it.select()
        })
    })
})
saveDirectoryGroup = new SaveDirectoryGroup(dialog, [390, 21])

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    process(document)
    saveDirectoryGroup.browse()
})
dialog.setNeutralButton(170, 'All Documents', function() {
    for (var i = 0; i < app.documents.length; i++) {
        app.activeDocument = app.documents[i]
        process(app.activeDocument)
    }
    saveDirectoryGroup.browse()
})
dialog.show()

function process(document) {
    var newFile = new File(saveDirectoryGroup.getDirectoryName() + '/' + saveFilePanel.getFileName(document.name.substringBeforeLast('.')))
    var oldFile = document.fullName
    document.saveAs(newFile, new PDFSaveOptions().also(function(it) {
        if (!saveFilePanel.isAllArtboards) {
            it.artboardRange = saveFilePanel.rangeGroup.getStartText() + '-' + saveFilePanel.rangeGroup.getEndText()
        }
        it.bleedLink = useBleedCheck.value
        it.compressArt = compressArtCheck.value
    }))
    document.close()
    app.open(oldFile)
}