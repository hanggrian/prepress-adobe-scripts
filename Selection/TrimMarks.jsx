/**
 * Create 2,5mm trim marks with 2,5mm bleed around the selected path item.
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

const offsetAndLength = mm(2.5)
createTrimMarks(
    selectedItem, 
    offsetAndLength, 
    offsetAndLength,
    DEFAULT_TRIM_MARK_WEIGHT,
    registrationColor(),
    MARK_ALL
)

selectedItem.guides = true
document.selection = null