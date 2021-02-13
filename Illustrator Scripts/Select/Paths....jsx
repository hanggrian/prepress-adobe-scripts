// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

allowSelectionType('PathItem')
allowSelectionType('CompoundPathItem')

var dialog = new Dialog('Select Paths')

dialog.line = dialog.main.addHGroup()

var lineTextBounds = [0, 0, 45, 21]
var lineEditBounds = [0, 0, 100, 21]

dialog.dimension = dialog.line.addVPanel('Dimension')
dialog.dimension.width = dialog.dimension.addHGroup()
dialog.dimension.width.addText(lineTextBounds, 'Width:', 'right')
dialog.dimension.widthEdit = dialog.dimension.width.addEditText(lineEditBounds)
dialog.dimension.widthEdit.validateUnits()
dialog.dimension.widthEdit.active = true
dialog.dimension.height = dialog.dimension.addHGroup()
dialog.dimension.height.addText(lineTextBounds, 'Height:', 'right')
dialog.dimension.heightEdit = dialog.dimension.height.addEditText(lineEditBounds)
dialog.dimension.heightEdit.validateUnits()

dialog.color = dialog.line.addVPanel('Color')
dialog.color.fill = dialog.color.addHGroup()
dialog.color.fill.addText(lineTextBounds, 'Fill:', 'right')
dialog.color.fillList = dialog.color.fill.addDropDown(lineEditBounds, COLORS)
dialog.color.stroke = dialog.color.addHGroup()
dialog.color.stroke.addText(lineTextBounds, 'Stroke:', 'right')
dialog.color.strokeList = dialog.color.stroke.addDropDown(lineEditBounds, COLORS)

var propertiesTextBounds = [0, 0, 55, 21]

dialog.properties = dialog.main.addVPanel('Properties')
dialog.properties.clipping = dialog.properties.addHGroup()
dialog.properties.clipping.addText(propertiesTextBounds, 'Clipping:', 'right')
dialog.properties.clipping.anyCheck = dialog.properties.clipping.addRadioButton(undefined, 'Any')
dialog.properties.clipping.anyCheck.value = true
dialog.properties.clipping.enabledCheck = dialog.properties.clipping.addRadioButton(undefined, 'Enabled')
dialog.properties.clipping.disabledCheck = dialog.properties.clipping.addRadioButton(undefined, 'Disabled')
dialog.properties.clipping.setTooltip('Should this be used as a clipping path?')
dialog.properties.closed = dialog.properties.addHGroup()
dialog.properties.closed.addText(propertiesTextBounds, 'Closed:', 'right')
dialog.properties.closed.anyCheck = dialog.properties.closed.addRadioButton(undefined, 'Any')
dialog.properties.closed.anyCheck.value = true
dialog.properties.closed.enabledCheck = dialog.properties.closed.addRadioButton(undefined, 'Enabled')
dialog.properties.closed.disabledCheck = dialog.properties.closed.addRadioButton(undefined, 'Disabled')
dialog.properties.closed.setTooltip('Is this path closed?')
dialog.properties.guides = dialog.properties.addHGroup()
dialog.properties.guides.addText(propertiesTextBounds, 'Guides:', 'right')
dialog.properties.guides.anyCheck = dialog.properties.guides.addRadioButton(undefined, 'Any')
dialog.properties.guides.anyCheck.value = true
dialog.properties.guides.enabledCheck = dialog.properties.guides.addRadioButton(undefined, 'Enabled')
dialog.properties.guides.disabledCheck = dialog.properties.guides.addRadioButton(undefined, 'Disabled')
dialog.properties.guides.setTooltip('Is this path a guide object?')

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    selectAll(function(item) {
        var condition = true
        var width = parseUnit(dialog.dimension.widthEdit.text)
        if (width > 0) {
            condition = condition && parseInt(width) == parseInt(item.width)
        }
        var height = parseUnit(dialog.dimension.heightEdit.text)
        if (height > 0) {
            condition = condition && parseInt(height) == parseInt(item.height)
        }
        if (dialog.color.fillList.selection != null) {
            condition = condition && isColorEqual(item.fillColor, parseColor(dialog.color.fillList.selection.text))
        }
        if (dialog.color.strokeList.selection != null) {
            condition = condition && isColorEqual(item.strokeColor, parseColor(dialog.color.strokeList.selection.text))
        }
        if (!dialog.properties.clipping.anyCheck.value) {
            condition = condition && dialog.properties.clipping.enabledCheck.value
                ? item.clipping
                : !item.clipping
        }
        if (!dialog.properties.closed.anyCheck.value) {
            condition = condition && dialog.properties.closed.enabledCheck.value
                ? item.closed
                : !item.closed
        }
        if (!dialog.properties.guides.anyCheck.value) {
            condition = condition && dialog.properties.guides.enabledCheck.value
                ? item.guides
                : !item.guides
        }
        return condition
    })
})
dialog.show()