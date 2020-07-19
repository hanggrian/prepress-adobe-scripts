/**
 * Create trim masks with custom size around the selected path item.
 * The marks are created with clockwise ordering.
 * The selected item will be deleted afterwards.
 */

#target Illustrator
#include '../lib/colors.jsx'
#include '../lib/preconditions.jsx'
#include '../lib/trim_marks.jsx'
#include '../lib/units.jsx'

checkActiveDocument()

const document = app.activeDocument
const selection = document.selection

checkSingleSelection(selection)

const selectedItem = selection[0]

checkTypename(selectedItem, 'PathItem')

const width = selectedItem.width
const height = selectedItem.height
const x = selectedItem.position[0]
const y = selectedItem.position[1]

const dialog = new Window('dialog', 'Create trim marks')
dialog.alignChildren = 'fill'

const textBounds = [0, 0, 50, 21]
const editBounds = [0, 0, 80, 21]
const panelTextBounds = [0, 0, 90, 21]
const panelEditBounds = [0, 0, 35, 21]

dialog.offsetGroup = dialog.add('group')
dialog.offsetGroup.add('statictext', textBounds, 'Offset:').justify = 'right'
dialog.offsetEdit = dialog.offsetGroup.add('edittext', editBounds, '2.5 mm')
dialog.offsetEdit.active = true

dialog.lengthGroup = dialog.add('group')
dialog.lengthGroup.add('statictext', textBounds, 'Length:').justify = 'right'
dialog.lengthEdit = dialog.lengthGroup.add('edittext', editBounds, '2.5 mm')

dialog.weightGroup = dialog.add('group')
dialog.weightGroup.add('statictext', textBounds, 'Weight:').justify = 'right'
dialog.weightEdit = dialog.weightGroup.add('edittext', editBounds, DEFAULT_TRIM_MARK_WEIGHT)

dialog.colorGroup = dialog.add('group')
dialog.colorGroup.add('statictext', textBounds, 'Color:').justify = 'right'
dialog.colorList = dialog.colorGroup.add('dropdownlist', [0, 0, 120, 21], ['Registration', 'White', 'Black'])
dialog.colorList.selection = 0

dialog.guidesGroup = dialog.add('group')
dialog.guidesGroup.add('statictext', textBounds, 'Guides:').justify = 'right'
dialog.guidesCheck = dialog.guidesGroup.add('checkbox', [0, 0, 120, 15], 'Convert selection')
dialog.guidesCheck.value = true

dialog.multiplePanel = dialog.add('panel', undefined, 'Multiple')
dialog.multiplePanel.alignChildren = 'fill'

dialog.multiplicationGroup = dialog.multiplePanel.add('group')
dialog.multiplicationGroup.add('statictext', panelTextBounds, 'Multiplication:').justify = 'right'
dialog.horizontalEdit = dialog.multiplicationGroup.add('edittext', panelEditBounds)
dialog.horizontalEdit.justify = 'center' // find out why this doesn't work
dialog.multiplicationGroup.add('statictext', [0, 0, 10, 21], 'x').justify = 'center'
dialog.verticalEdit = dialog.multiplicationGroup.add('edittext', panelEditBounds)
dialog.verticalEdit.justify = 'center' // find out why this doesn't work

dialog.bleedGroup = dialog.multiplePanel.add('group')
dialog.bleedGroup.add('statictext', panelTextBounds, 'Bleed:').justify = 'right'
dialog.bleedEdit = dialog.bleedGroup.add('edittext', editBounds)

dialog.buttonGroup = dialog.add('group')
dialog.buttonGroup.alignment = 'right'
dialog.buttonGroup.add('button', undefined, 'Cancel')
dialog.buttonGroup.add('button', undefined, 'OK').onClick = function() {
    const offset = parseUnit(dialog.offsetEdit.text)
    const length = parseUnit(dialog.lengthEdit.text)
    const weight = parseUnit(dialog.weightEdit.text)
    const color = parseColor(dialog.colorList.selection.text)
    const guides = dialog.guidesCheck.value
    const maxHorizontal = parseInt(dialog.horizontalEdit.text) || 0
    const maxVertical = parseInt(dialog.verticalEdit.text) || 0
    const bleed = parseUnit(dialog.bleedEdit.text)

    if (maxHorizontal < 1 || maxVertical < 1) { // multiple disabled
        createTrimMarks(selectedItem, offset, length, weight, color, MARK_ALL)
        if (guides) {
            selectedItem.filled = false
            selectedItem.guides = true
        }
    } else { // multiple enabled
        app.copy()
        selectedItem.remove()

        // vertical is 0 because the starting point doesn't change
        var locations
        for (var vertical = 0; vertical < maxVertical; vertical++) {
            pasteTo(x, y - vertical * (height + bleed), guides)

            locations = [MARK_LEFT_BOTTOM, MARK_LEFT_TOP]
            if (vertical == 0) {
                locations.push(MARK_TOP_LEFT, MARK_TOP_RIGHT)
            }
            if (vertical == maxVertical - 1) {
                locations.push(MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT)
            }
            createTrimMarks(selection[0], offset, length, weight, color, locations)

            for (var horizontal = 1; horizontal < maxHorizontal; horizontal++) {
                pasteTo(x + horizontal * (width + bleed), y - vertical * (height + bleed), guides)
                
                locations = []
                if (horizontal == maxHorizontal - 1) {
                    locations.push(MARK_RIGHT_TOP, MARK_RIGHT_BOTTOM)
                }
                if (vertical == 0) {
                    locations.push(MARK_TOP_LEFT, MARK_TOP_RIGHT)
                }
                if (vertical == maxVertical - 1) {
                    locations.push(MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT)
                }
                createTrimMarks(selection[0], offset, length, weight, color, locations)
            }
        }
    }

    document.selection = null
    dialog.close()
}

dialog.show()

function pasteTo(x, y, guides) {
    app.paste()
    const currentSelection = selection[0]
    currentSelection.position = [x, y]
    if (guides) {
        currentSelection.filled = false
        currentSelection.guides = true
    }
}