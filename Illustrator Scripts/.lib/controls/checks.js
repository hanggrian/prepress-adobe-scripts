/**
 * CheckBox with text `Document Origin`.
 * @param {!Group|!Panel|!Window} parent
 */
function DocumentOriginCheck(parent) {
  checkNotNull(parent)
  return parent.checkBox(undefined, R.string.document_origin).apply(function(it) {
    it.helpTip = R.string.tip_checks_documentorigin
  })
}

/**
 * CheckBox with text `Keep Size`.
 * @param {!Group|!Panel|!Window} parent
 */
function KeepSizeCheck(parent) {
  checkNotNull(parent)
  return parent.checkBox(undefined, R.string.keep_size).apply(function(it) {
    it.helpTip = R.string.tip_checks_keepsize
  })
}

/**
 * CheckBox with text `Recursive`.
 * @param {!Group|!Panel|!Window} parent
 */
function RecursiveCheck(parent) {
  checkNotNull(parent)
  return parent.checkBox(undefined, R.string.recursive).apply(function(it) {
    it.helpTip = R.string.tip_checks_recursive
  })
}
