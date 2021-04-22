// Resize all items to target size regardless of their XY positions.

#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/item-transform.js'

checkHasSelection()

var dialog = new Dialog('Resize')
var prefill = selection.first()
var widthEdit, heightEdit, changePanel, anchorPanel

var textBounds = [45, 21]
var editBounds = [150, 21]

dialog.vpanel(dialog.title, function(panel) {
    panel.hgroup(function(group) {
        group.staticText(textBounds, 'Width:', JUSTIFY_RIGHT)
        widthEdit = group.editText(editBounds, formatUnits(prefill.width, unitName, 2), function(it) {
            it.validateUnits()
            it.activate()
        })
    })
    panel.hgroup(function(group) {
        group.staticText(textBounds, 'Height:', JUSTIFY_RIGHT)
        heightEdit = group.editText(editBounds, formatUnits(prefill.height, unitName, 2), VALIDATE_UNITS)
    })
})

dialog.hgroup(function(group) {
    group.alignChildren = 'fill'    
    changePanel = new ItemChangePanel(group)
    anchorPanel = new ItemAnchorPanel(group)
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var width = parseUnits(widthEdit.text)
    var height = parseUnits(heightEdit.text)
    selection.forEachItem(function(it) {
        var scaleX = 100 * width / it.width
        var scaleY = 100 * height / it.height
        if (scaleX != 100 && scaleY != 100) {
            it.resize(scaleX, 
                scaleY,
                changePanel.isPositions(),
                changePanel.isFillPatterns(),
                changePanel.isFillGradients(),
                changePanel.isStrokePatterns(),
                100,
                anchorPanel.getTransformation())
        }
    })
})
dialog.show()