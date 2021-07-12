#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/range.js'
#include '../../.lib/ui/save-options.js'

var BOUNDS_TEXT = [40, 21]

var dialog = new Dialog('Export PNG')
var rangeGroup, prefixEdit, suffixArtboardRadio, suffixIndexRadio, extensionCheck
var antiAliasingCheck, matteCheck, transparencyCheck
var saveDirectoryGroup

dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel('File', function(panel) {
        panel.alignChildren = 'fill'
        rangeGroup = new RangeGroup(panel, BOUNDS_TEXT, [100, 21]).also(function(it) {
            it.startEdit.activate()
            it.maxRange = document.artboards.length
            it.endEdit.text = document.artboards.length
        })
        panel.hgroup(function(group) {
            group.setTooltips('Starting file name')
            group.staticText(BOUNDS_TEXT, 'Prefix:', JUSTIFY_RIGHT)
            prefixEdit = group.editText([200, 21], document.name.substringBeforeLast('.') + '-')
        })
        panel.hgroup(function(group) {
            group.setTooltips('Ending file name')
            group.staticText(BOUNDS_TEXT, 'Suffix:', JUSTIFY_RIGHT)
            suffixArtboardRadio = group.radioButton(undefined, 'Artboard', SELECTED)
            suffixIndexRadio = group.radioButton(undefined, 'Index')
        })
        extensionCheck = panel.checkBox(undefined, 'Use Extension', SELECTED)
    })
    topGroup.vpanel('Export', function(panel) {
        panel.alignChildren = 'fill'
        antiAliasingCheck = panel.checkBox(undefined, 'Anti-Aliasing', function(it) {
            it.setTooltip('Should the resulting image be antialiased')
            it.select()
        })
        matteCheck = panel.checkBox(undefined, 'Matte', function(it) {
            it.setTooltip('Should the artboard be matted with a color')
            it.select()
        })
        transparencyCheck = panel.checkBox(undefined, 'Transparency', function(it) {
            it.setTooltip('	Should the resulting image use transparency')
            it.select()
        })
    })
})
saveDirectoryGroup = new SaveDirectoryGroup(dialog, [350, 21])

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var prefix = prefixEdit.text
    var isSuffixArtboard = suffixArtboardRadio.value
    var extension = extensionCheck.value ? '.png' : ''
    var directoryName = saveDirectoryGroup.getDirectoryName()

    var options = new ExportOptionsPNG24().also(function(it) {
        it.artBoardClipping = true
        it.antiAliasing = antiAliasingCheck.value
        it.matte = matteCheck.value
        it.transparency = transparencyCheck.value
    })
    rangeGroup.forEach(function(i) {
        var fileName = directoryName + '/' + prefix
        fileName += isSuffixArtboard ? document.artboards[i].name : (i + 1).toString()
        fileName += extension
        document.artboards.setActiveArtboardIndex(i)
        document.exportFile(new File(fileName), ExportType.PNG24, options)
    })
    saveDirectoryGroup.browse()
})
dialog.show()