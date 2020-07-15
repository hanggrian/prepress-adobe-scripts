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

const dialog = new Window('dialog', 'Create trim marks')
dialog.alignChildren = 'fill'

const textBounds = [0, 0, 50, 21]
const editBounds = [0, 0, 80, 21]
const listBounds = [0, 0, 120, 21]

dialog.offsetGroup = dialog.add('group')
dialog.offsetGroup.add('statictext', textBounds, 'Offset:').justify = 'right'
dialog.offsetEdit = dialog.offsetGroup.add('edittext', editBounds, '2.5 mm')
dialog.offsetEdit.active = true

dialog.lengthGroup = dialog.add('group')
dialog.lengthGroup.add('statictext', textBounds, 'Length:').justify = 'right'
dialog.lengthEdit = dialog.lengthGroup.add('edittext', editBounds, '2.5 mm')

dialog.weightGroup = dialog.add('group')
dialog.weightGroup.add('statictext', textBounds, 'Weight:').justify = 'right'
dialog.weightEdit = dialog.weightGroup.add('edittext', editBounds, '0.3')

dialog.colorGroup = dialog.add('group')
dialog.colorGroup.add('statictext', textBounds, 'Color:').justify = 'right'
dialog.colorList = dialog.colorGroup.add('dropdownlist', listBounds, ['Registration', 'White'])
dialog.colorList.selection = 0

dialog.buttonGroup = dialog.add('group')
dialog.buttonGroup.add('button', undefined, 'Cancel')
dialog.buttonGroup.add('button', undefined, 'OK').onClick = function() {
    createTrimMarks(
        selectedItem,
        parseUnit(dialog.offsetEdit.text),
        parseUnit(dialog.lengthEdit.text),
        parseUnit(dialog.weightEdit.text),
        parseColor(dialog.colorList.selection.text),
        MARK_ALL
    )
    
    selectedItem.guides = true
    document.selection = null
    
    dialog.close()
}

dialog.show()