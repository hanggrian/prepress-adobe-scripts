/**
 * 3 checkboxes group for imposing N-Up pager.
 * @param {!Group|!Panel|!Window} parent
 * @param {?boolean=} showFolding default is true.
 * @param {?boolean=} showRotate default is true.
 * @param {?boolean=} showDuplex default is true.
 * @param {?boolean=} showStack default is true.
 */
function NUpOptionsGroup(parent, showFolding, showRotate, showDuplex, showStack) {
  checkNotNull(parent)
  showFolding = showFolding !== false
  showRotate = showRotate !== false
  showDuplex = showDuplex !== false
  showStack = showStack !== false

  var self = parent.hgroup()
  self.foldingCheck, self.rotateCheck, self.duplexCheck, self.stackCheck

  self.alignment = 'right'
  if (showFolding) {
    self.foldingCheck = self.checkBox(undefined, R.string.folding_booklet).apply(function(it) {
      it.helpTip = R.string.tip_nup_foldingbooklet
      it.addClickListener(function() {
        if (self.rotateCheck !== undefined) self.rotateCheck.enabled = !it.value
        if (self.duplexCheck !== undefined) self.duplexCheck.enabled = !it.value
        if (self.stackCheck !== undefined) self.stackCheck.enabled = !it.value
      })
    })
  }
  if (showRotate) {
    self.rotateCheck = self.checkBox(undefined, R.string.rotate_pages).apply(function(it) {
      it.helpTip = R.string.tip_nup_rotatepages
    })
  }
  if (showDuplex) {
    self.duplexCheck = self.checkBox(undefined, R.string.duplex_printing).apply(function(it) {
      it.helpTip = R.string.tip_nup_duplexprinting
    })
  }
  if (showStack) {
    self.stackCheck = self.checkBox(undefined, R.string.cut_stack).apply(function(it) {
      it.helpTip = R.string.tip_nup_cutstack
    })
  }

  /** @return {boolean} */
  self.isFolding = function() { return self.foldingCheck.value }

  /** @return {boolean} */
  self.isRotate = function() { return self.rotateCheck.value }

  /** @return {boolean} */
  self.isDuplex = function() { return self.duplexCheck.value }

  /** @return {boolean} */
  self.isStack = function() { return self.stackCheck.value }

  return self
}
