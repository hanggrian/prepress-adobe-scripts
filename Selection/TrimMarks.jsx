/**
 * Create 2,5mm trim marks with 2,5mm bleed around the selected path item.
 * The marks are created with clockwise ordering.
 */

#target Illustrator
#include '../preconditions.jsx'
#include '../units.jsx'
#include '../trim_marks.jsx'

checkActiveDocument()

const document = app.activeDocument
const selection = document.selection

checkSingleSelection(selection)

const selectedItem = selection[0]

checkTypename(selectedItem, 'PathItem')

const bleedAndMarkSize = mm(2.5)
createTrimMarks(selectedItem, bleedAndMarkSize, bleedAndMarkSize)