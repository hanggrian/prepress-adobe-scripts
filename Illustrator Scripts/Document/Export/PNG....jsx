#target Illustrator
#include '../../.lib/commons.js'

var BOUNDS_TEXT = [70, 21]

var dialog = new Dialog('Export PNG')
var saveFilePanel, separatorEdit, suffixArtboardRadio, suffixIndexRadio
var antiAliasingCheck, matteCheck, transparencyCheck
var saveDirectoryGroup

dialog.vgroup(function(main) {
    main.hgroup(function(topGroup) {
        topGroup.alignChildren = 'fill'
        saveFilePanel = new SaveFilePanel(topGroup, BOUNDS_TEXT, 'png').also(function(panel) {
            panel.alignChildren = 'fill'
            panel.main.hgroup(function(group) {
                group.tips('Characters to divide')
                group.staticText(BOUNDS_TEXT, 'Separator:').also(JUSTIFY_RIGHT)
                separatorEdit = group.editText([100, 21], '-')
            })
            panel.main.hgroup(function(group) {
                group.tips('Ending file name')
                group.staticText(BOUNDS_TEXT, 'Suffix:').also(JUSTIFY_RIGHT)
                suffixArtboardRadio = group.radioButton(undefined, 'Artboard Name').also(SELECTED)
                suffixIndexRadio = group.radioButton(undefined, 'Index')
            })
        })
        topGroup.vpanel('Export', function(panel) {
            panel.alignChildren = 'fill'
            antiAliasingCheck = panel.checkBox(undefined, 'Anti-Aliasing').also(function(it) {
                it.tip('Should the resulting image be antialiased')
                it.select()
            })
            matteCheck = panel.checkBox(undefined, 'Matte').also(function(it) {
                it.tip('Should the artboard be matted with a color')
                it.select()
            })
            transparencyCheck = panel.checkBox(undefined, 'Transparency').also(function(it) {
                it.tip('	Should the resulting image use transparency')
                it.select()
            })
        })
    })
    saveDirectoryGroup = new SaveDirectoryGroup(main, [390, 21])
})
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
    var prefix = document.name.substringBeforeLast('.')
    var separator = separatorEdit.text
    var options = new ExportOptionsPNG24().also(function(it) {
        it.artBoardClipping = true
        it.antiAliasing = antiAliasingCheck.value
        it.matte = matteCheck.value
        it.transparency = transparencyCheck.value
    })
    var action = function(i) {
        var suffix = suffixArtboardRadio.value ? document.artboards[i].name : (i + 1).toString()
        var newFile = new File(saveDirectoryGroup.getDirectoryName() + '/' + saveFilePanel.getFileName(prefix + separator + suffix))
        document.artboards.setActiveArtboardIndex(i)
        document.exportFile(newFile, ExportType.PNG24, options)
    }
    if (saveFilePanel.isAllArtboards()) {
        for (var i = 0; i < document.artboards.length; i++) {
            action(i)
        }
    } else {
        rangeGroup.forEach(action)
    }
}