/**
 * CheckBox with text `Document Origin`.
 * @param {Group|Panel|Window} parent holder of this control.
 */
function DocumentOriginCheck(parent) {
  return parent.checkBox(undefined, R.string.document_origin).also(function(it) {
    it.helpTip = R.string.tip_checks_documentorigin
  })
}

/**
 * CheckBox with text `Recursive`.
 * @param {Group|Panel|Window} parent holder of this control.
 */
function RecursiveCheck(parent) {
  return parent.checkBox(undefined, R.string.recursive).also(function(it) {
    it.helpTip = R.string.tip_checks_recursive
  })
}

/**
 * CheckBox with text `Keep Size`.
 * @param {Group|Panel|Window} parent holder of this control.
 */
function KeepSizeCheck(parent) {
  return parent.checkBox(undefined, R.string.keep_size).also(function(it) {
    it.helpTip = R.string.tip_checks_keepsize
  })
}
