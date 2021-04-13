// Measure length of all selected path items.
// TODO: avoid duplicate paths in the same position and length.

#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename == 'PathItem' })
check(items.isNotEmpty(), 'No paths found in selection')

var dialog = new Dialog('Remove Trim Marks')

var textBounds = [0, 0, 45, 21]
var editBounds = [0, 0, 100, 21]

dialog.length = dialog.main.addHGroup()
dialog.length.addText(textBounds, 'Length:', 'right')
dialog.lengthEdit = dialog.length.addEditText(editBounds, '15 mm') // slightly larger than Illustrator default (12.7 mm)
dialog.lengthEdit.validateUnits()
dialog.length.setTooltip('Remove trim marks lower or equal to this length.')

dialog.weight = dialog.main.addHGroup()
dialog.weight.addText(textBounds, 'Weight:', 'right')
dialog.weightEdit = dialog.weight.addEditText(editBounds, '0.5') // slightly larger than Illustrator default (0.5 pt)
dialog.weightEdit.validateUnits()
dialog.weight.setTooltip('Remove trim marks lower or equal to this weight.')

var colors = ['Any', '-']
COLORS.forEach(function(it) { colors.push(it) })
dialog.color = dialog.main.addHGroup()
dialog.color.addText(textBounds, 'Colors:', 'right')
dialog.colorList = dialog.color.addDropDown(editBounds, colors)
dialog.colorList.selection = 0
dialog.colorList.setTooltip('Remove trim marks with this color.')

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var length = parseUnit(dialog.lengthEdit.text)
    var weight = parseUnit(dialog.lengthEdit.text)
    var color = dialog.colorList.selection.text === 'Any'
        ? null
        : parseColor(dialog.colorList.selection.text)
    items.filter(function(it) {
        var condition = it.length <= length && it.strokeWidth <= weight
        return color === null
            ? condition
            : condition && isColorEqual(it.strokeColor, color)
    })
    .forEach(function(it) { it.remove() })
})
dialog.show()