/**
 * Add the same item multiple times according to user input.
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
const width = selectedItem.width
const height = selectedItem.height
const x = selectedItem.position[0]
const y = selectedItem.position[1]

const dialog = new Window('dialog', 'Multiply objects')
dialog.alignChildren = 'fill'

const textBounds = [0, 0, 90, 21]
const editBounds = [0, 0, 40, 21]
const editBoundsLarge = [0, 0, 90, 21]
const markTextBounds = [0, 0, 50, 21]
const markEditBounds = [0, 0, 80, 21]
const markListBounds = [0, 0, 120, 21]

dialog.multiplicationGroup = dialog.add('group')
dialog.multiplicationGroup.add('statictext', textBounds, 'Multiplication:').justify = 'right'
dialog.horizontalEdit = dialog.multiplicationGroup.add('edittext', editBounds)
dialog.horizontalEdit.justify = 'center' // find out why this doesn't work
dialog.horizontalEdit.active = true
dialog.multiplicationGroup.add('statictext', [0, 0, 10, 21], 'x').justify = 'center'
dialog.verticalEdit = dialog.multiplicationGroup.add('edittext', editBounds)
dialog.verticalEdit.justify = 'center' // find out why this doesn't work
dialog.bleedGroup = dialog.add('group')
dialog.bleedGroup.add('statictext', textBounds, 'Bleed:').justify = 'right'
dialog.bleedEdit = dialog.bleedGroup.add('edittext', editBoundsLarge)

dialog.markPanel = dialog.add('panel', undefined, 'Trim marks')
dialog.markPanel.alignChildren = 'fill'
dialog.offsetGroup = dialog.markPanel.add('group')
dialog.offsetGroup.add('statictext', markTextBounds, 'Offset:').justify = 'right'
dialog.offsetEdit = dialog.offsetGroup.add('edittext', markEditBounds, '2.5 mm')
dialog.lengthGroup = dialog.markPanel.add('group')
dialog.lengthGroup.add('statictext', markTextBounds, 'Mark:').justify = 'right'
dialog.lengthEdit = dialog.lengthGroup.add('edittext', markEditBounds, '2.5 mm')
dialog.weightGroup = dialog.markPanel.add('group')
dialog.weightGroup.add('statictext', markTextBounds, 'Weight:').justify = 'right'
dialog.weightEdit = dialog.weightGroup.add('edittext', markEditBounds, '0.3')
dialog.colorGroup = dialog.markPanel.add('group')
dialog.colorGroup.add('statictext', markTextBounds, 'Color:').justify = 'right'
dialog.colorList = dialog.colorGroup.add('dropdownlist', markListBounds, ['Registration', 'White'])
dialog.colorList.selection = 0

dialog.buttonGroup = dialog.add('group')
dialog.buttonGroup.add('button', undefined, 'Cancel')
dialog.buttonGroup.add('button', undefined, 'OK').onClick = function() {
    app.copy()
    selectedItem.remove()
    
    const maxHorizontal = parseInt(dialog.horizontalEdit.text)
    const maxVertical = parseInt(dialog.verticalEdit.text)
    const bleed = parseUnit(dialog.bleedEdit.text)
    const offset = parseUnit(dialog.offsetEdit.text)
    const length = parseUnit(dialog.lengthEdit.text)
    const weight = parseUnit(dialog.weightEdit.text)
    const color = parseColor(dialog.colorList.selection.text)

    // vertical is 0 because the starting point doesn't change
    for (var vertical = 0; vertical < maxVertical; vertical++) {
        app.paste()
        selection[0].position = [
            x,
            y - vertical * (height + bleed)
        ]
        createTrimMarks(selection[0], offset, length, weight, color, [MARK_LEFT_BOTTOM, MARK_LEFT_TOP])
        if (vertical == 0) {
            createTrimMarks(selection[0], offset, length, weight, color, [MARK_TOP_LEFT, MARK_TOP_RIGHT])
        }
        if (vertical == maxVertical - 1) {
            createTrimMarks(selection[0], offset, length, weight, color, [MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT])
        }

        for (var horizontal = 1; horizontal < maxHorizontal; horizontal++) {
            app.paste()
            selection[0].position = [
                x + horizontal * (width + bleed),
                y - vertical * (height + bleed)
            ]
            if (horizontal == maxHorizontal - 1) {
                createTrimMarks(selection[0], offset, length, weight, color, [MARK_RIGHT_TOP, MARK_RIGHT_BOTTOM])
            }
            if (vertical == 0) {
                createTrimMarks(selection[0], offset, length, weight, color, [MARK_TOP_LEFT, MARK_TOP_RIGHT])
            }
            if (vertical == maxVertical - 1) {
                createTrimMarks(selection[0], offset, length, weight, color, [MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT])
            }
        }
    }

    dialog.close()
}

dialog.show()