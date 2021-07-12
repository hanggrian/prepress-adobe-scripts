#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/range.js'
#include '../../.lib/ui/save-options.js'

var BOUNDS_TEXT = [40, 21]

// var adobePPDs = app.PPDFileList.filter(function(it) { return it.name.startsWith('Adobe') })

var dialog = new Dialog('Export PostScript')
var saveFilePanel
var cyanCheck, magentaCheck, yellowCheck, blackCheck
var saveDirectoryGroup

dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    saveFilePanel = new SaveFilePanel(topGroup, 'ps')
    topGroup.vpanel('Options', function(panel) {
        panel.hgroup(function(group) {
            group.setTooltips('Output mode')
            group.staticText(BOUNDS_TEXT, 'Mode:', JUSTIFY_RIGHT)
            group.radioButton(undefined, 'Composite')
            group.radioButton(undefined, 'Separations', SELECTED)
        })
    })
    topGroup.vpanel('Process', function(panel) {
        panel.alignChildren = 'fill'
        cyanCheck = panel.checkBox(undefined, 'Cyan', function(it) {
            it.setTooltip('Should ps file include cyan layer')
            it.select()
        })
        magentaCheck = panel.checkBox(undefined, 'Magenta', function(it) {
            it.setTooltip('Should ps file include magenta layer')
            it.select()
        })
        yellowCheck = panel.checkBox(undefined, 'Yellow', function(it) {
            it.setTooltip('Should ps file include yellow layer')
            it.select()
        })
        blackCheck = panel.checkBox(undefined, 'Black', function(it) {
            it.setTooltip('Should ps file include black layer')
            it.select()
        })
    })
})
saveDirectoryGroup = new SaveDirectoryGroup(dialog, [600, 21])

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton('OK', function() {
    var options = new PrintJobOptions()
})
dialog.show()