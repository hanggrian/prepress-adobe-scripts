/** Assert that document is currently saved. */
function checkSaved() {
    check(document.saved, 'Save the document before proceeding')
}

/** Assert that document currently has any selection. */
function checkHasSelection() {
    check(selection != null && selection.length > 0, 'No selection')
}

/** Assert that document currently has single selection. */
function checkSingleSelection() {
    checkHasSelection()
    check(selection.length === 1, 'Multiple selection is not supported')
}

/** Assert that document currently has multiple selection. */
function checkMultipleSelection() {
    checkHasSelection()
    check(selection.length > 1, 'Single selection is not supported')
}