#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/range.js'
#include '../../.lib/ui/save-options.js'

checkSaved()

var dialog = new Dialog('Export PDF')
var saveFilePanel
var useBleedCheck, compressArtCheck
var saveDirectoryGroup

dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    saveFilePanel = new SaveFilePanel(topGroup, 'pdf')
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
saveDirectoryGroup = new SaveDirectoryGroup(dialog, [350, 21])

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var newFile = new File(saveDirectoryGroup.getDirectoryName() + '/' + saveFilePanel.getFileName())
    var oldFile = document.fullName
    document.saveAs(newFile, new PDFSaveOptions().also(function(it) {
        it.artboardRange = saveFilePanel.rangeGroup.getStartText() + '-' + saveFilePanel.rangeGroup.getEndText()
        it.bleedLink = useBleedCheck.value
        it.compressArt = compressArtCheck.value
    }))
    saveDirectoryGroup.browse()
    document.close()
    app.open(oldFile)
})
dialog.show()