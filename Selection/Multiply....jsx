/**
 * Add the same item multiple times according to user input.
 */

#target Illustrator
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

dialog.trimPanel = dialog.add('panel', undefined, 'Trim marks')
dialog.offsetGroup = dialog.trimPanel.add('group')
dialog.offsetGroup.add('statictext', textBounds, 'Offset:').justify = 'right'
dialog.offsetEdit = dialog.offsetGroup.add('edittext', editBoundsLarge, '2.5 mm')
dialog.lengthGroup = dialog.trimPanel.add('group')
dialog.lengthGroup.add('statictext', textBounds, 'Mark:').justify = 'right'
dialog.lengthEdit = dialog.lengthGroup.add('edittext', editBoundsLarge, '2.5 mm')

dialog.buttonGroup = dialog.add('group')
dialog.buttonGroup.add('button', undefined, 'Cancel')
dialog.buttonGroup.add('button', undefined, 'OK').onClick = function() {
    app.copy()
    selectedItem.remove()
    
    const maxHorizontal = parseInt(dialog.horizontalEdit.text)
    const maxVertical = parseInt(dialog.verticalEdit.text)
    const offset = parseUnit(dialog.offsetEdit.text)
    const length = parseUnit(dialog.lengthEdit.text)

    for (var vertical = 1; vertical <= maxVertical; vertical++) {
        app.paste()
        selection[0].position = [
            x,
            y - vertical * (height + offset)
        ]
        createTrimMarks(selection[0], offset, length, [MARK_LEFT_BOTTOM, MARK_LEFT_TOP])
        if (vertical == 1) {
            createTrimMarks(selection[0], offset, length, [MARK_TOP_LEFT, MARK_TOP_RIGHT])
        }
        if (vertical == maxVertical) {
            createTrimMarks(selection[0], offset, length, [MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT])
        }

        for (var horizontal = 1; horizontal < maxHorizontal; horizontal++) {
            app.paste()
            selection[0].position = [
                x + horizontal * (width + offset),
                y - vertical * (height + offset)
            ]
            if (horizontal == maxHorizontal - 1) {
                createTrimMarks(selection[0], offset, length, [MARK_RIGHT_TOP, MARK_RIGHT_BOTTOM])
            }
            if (vertical == 1) {
                createTrimMarks(selection[0], offset, length, [MARK_TOP_LEFT, MARK_TOP_RIGHT])
            }
            if (vertical == maxVertical) {
                createTrimMarks(selection[0], offset, length, [MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT])
            }
        }
    }

    dialog.close()
}

dialog.show()