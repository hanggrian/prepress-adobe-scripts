/**
 * Add the same item multiple times according to user input.
 */

#target Illustrator
#include '../util/preconditions.jsx'
#include '../util/units.jsx'
#include '../util/trim_marks.jsx'

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

dialog.multiplicationGroup = dialog.add('group')
dialog.multiplicationText = dialog.multiplicationGroup.add('statictext', [0, 0, 90, 21], 'Multiplication:')
dialog.multiplicationText.justify = 'right'
dialog.horizontalEdit = dialog.multiplicationGroup.add('edittext', [0, 0, 40, 21])
dialog.horizontalEdit.justify = 'center' // find out why this doesn't work
dialog.horizontalEdit.active = true
dialog.operatorText = dialog.multiplicationGroup.add('statictext', [0, 0, 10, 21], 'x')
dialog.operatorText.justify = 'center'
dialog.verticalEdit = dialog.multiplicationGroup.add('edittext', [0, 0, 40, 21])
dialog.verticalEdit.justify = 'center' // find out why this doesn't work

dialog.trimPanel = dialog.add('panel', undefined, 'Trim marks')
const trimLeftBounds = [0, 0, 40, 21]
const trimRightBounds = [0, 0, 113, 21] // matches Rectangle dialog
dialog.bleedGroup = dialog.trimPanel.add('group')
dialog.bleedText = dialog.bleedGroup.add('statictext', trimLeftBounds, 'Bleed:')
dialog.bleedText.justify = 'right'
dialog.bleedEdit = dialog.bleedGroup.add('edittext', trimRightBounds, '2.5mm')
dialog.markGroup = dialog.trimPanel.add('group')
dialog.markText = dialog.markGroup.add('statictext', trimLeftBounds, 'Mark:')
dialog.markText.justify = 'right'
dialog.markEdit = dialog.markGroup.add('edittext', trimRightBounds, '2.5mm')

dialog.buttonGroup = dialog.add('group')
dialog.buttonGroup.add('button', undefined, 'Cancel')
dialog.okButton = dialog.buttonGroup.add('button', undefined, 'OK')
dialog.okButton.onClick = function() {
    app.copy()
    selectedItem.remove()
    
    const maxHorizontal = parseInt(dialog.horizontalEdit.text)
    const maxVertical = parseInt(dialog.verticalEdit.text)
    const bleed = parseUnit(dialog.bleedEdit.text)
    const mark = parseUnit(dialog.markEdit.text)

    for (var vertical = 1; vertical <= maxVertical; vertical++) {
        app.paste()
        selection[0].position = [
            x,
            y - vertical * (height + bleed)
        ]
        createTrimMarks(selection[0], bleed, mark, [MARK_LEFT_BOTTOM, MARK_LEFT_TOP])
        if (vertical == 1) {
            createTrimMarks(selection[0], bleed, mark, [MARK_TOP_LEFT, MARK_TOP_RIGHT])
        }
        if (vertical == maxVertical) {
            createTrimMarks(selection[0], bleed, mark, [MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT])
        }

        for (var horizontal = 1; horizontal < maxHorizontal; horizontal++) {
            app.paste()
            selection[0].position = [
                x + horizontal * (width + bleed),
                y - vertical * (height + bleed)
            ]
            if (horizontal == maxHorizontal - 1) {
                createTrimMarks(selection[0], bleed, mark, [MARK_RIGHT_TOP, MARK_RIGHT_BOTTOM])
            }
            if (vertical == 1) {
                createTrimMarks(selection[0], bleed, mark, [MARK_TOP_LEFT, MARK_TOP_RIGHT])
            }
            if (vertical == maxVertical) {
                createTrimMarks(selection[0], bleed, mark, [MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT])
            }
        }
    }

    dialog.close()
}

dialog.show()