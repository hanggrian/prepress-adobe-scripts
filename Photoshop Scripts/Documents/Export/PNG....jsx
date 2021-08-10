/*
<javascriptresource>
<name>Export PNG...</name>
<category>3</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include '../../.lib/commons.js'

var BOUNDS_TEXT = [90, 21]

for (var i = 0; i < app.documents.length; i++) {
    check(app.documents[i].saved, 'Save all documents before proceeding')
}

var dialog = new Dialog('Export PNG')
var saveFilePanel
var compressionEdit, interlacedCheck
var saveDirectoryGroup

dialog.vgroup(function(main) {
    main.hgroup(function(topGroup) {
        topGroup.alignChildren = 'fill'
        saveFilePanel = new SaveFilePanel(topGroup, BOUNDS_TEXT, 'png').also(function(panel) {
            panel.alignChildren = 'fill'
            panel.main.hgroup(function(group) {
                group.tips('The compression value from 0 to 9')
                group.staticText(BOUNDS_TEXT, 'Compression:').also(JUSTIFY_RIGHT)
                compressionEdit = group.editText([100, 21], '0').also(VALIDATE_DIGITS)
            })
        })
        topGroup.vpanel('Export', function(panel) {
            panel.alignChildren = 'fill'
            interlacedCheck = panel.checkBox(undefined, 'Interlaced').also(function(it) {
                it.tip('interlacedCheck')
            })
        })
    })
    saveDirectoryGroup = new SaveDirectoryGroup(main, [320, 21])
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
    process(document)
    saveDirectoryGroup.browse()
})
dialog.setYesButton('All Documents', function() {
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
    document.saveAs(newFile, new PNGSaveOptions().also(function(it) {
        it.compression = parseInt(compressionEdit.text)
        it.interlaced = interlacedCheck.value
    }))
    document.close()
    app.open(oldFile)
}