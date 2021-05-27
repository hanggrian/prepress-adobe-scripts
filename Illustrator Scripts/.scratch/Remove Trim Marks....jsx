// Measure length of all selected path items.
// TODO: avoid duplicate paths in the same position and length.

#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [45, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PathItem' })
check(items.isNotEmpty(), 'No paths found in selection')

var dialog = new Dialog('Remove Trim Marks')

dialog.length = dialog.main.addHGroup()
dialog.length.setTooltips('Remove trim marks lower or equal to this length')
dialog.length.addText(BOUNDS_TEXT, 'Length:', 'right')
dialog.lengthEdit = dialog.length.addEditText(BOUNDS_EDIT, unitsOf('15 mm')) // slightly larger than Illustrator default (12.7 mm)
dialog.lengthEdit.validateUnits()

dialog.weight = dialog.main.addHGroup()
dialog.weight.setTooltips('Remove trim marks lower or equal to this weight')
dialog.weight.addText(BOUNDS_TEXT, 'Weight:', 'right')
dialog.weightEdit = dialog.weight.addEditText(BOUNDS_EDIT, '0.5') // slightly larger than Illustrator default (0.5 pt)
dialog.weightEdit.validateUnits()

var colors = ['Any', '-']
COLORS.forEach(function(it) { colors.push(it) })
dialog.color = dialog.main.addHGroup()
dialog.color.setTooltips('Remove trim marks with this color')
dialog.color.addText(BOUNDS_TEXT, 'Colors:', 'right')
dialog.colorList = dialog.color.addDropDown(BOUNDS_EDIT, colors)
dialog.colorList.selection = COLORS.indexOf('Registration')

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var length = parseUnits(dialog.lengthEdit.text)
    var weight = parseUnits(dialog.lengthEdit.text)
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