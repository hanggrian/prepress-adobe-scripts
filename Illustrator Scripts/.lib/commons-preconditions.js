/** Asserts that more than 1 artboard are present. */
function checkMultipleArtboards() {
  check(document.artboards.length > 1, R.string.error_preconditions_multipleartboard)
}

/** Asserts that document currently has any selection. */
function checkHasSelection() {
  check(selection != null && selection.length > 0, R.string.error_preconditions_hasselection)
}

/** Asserts that document currently has single selection. */
function checkSingleSelection() {
  checkHasSelection()
  check(selection.length === 1, R.string.error_preconditions_singleselection)
}

/** Asserts that document currently has multiple selection. */
function checkMultipleSelection() {
  checkHasSelection()
  check(selection.length > 1, R.string.error_preconditions_multipleselection)
}
