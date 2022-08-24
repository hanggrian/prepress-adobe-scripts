/**
 * 3 checkboxes group for imposing N-Up pager.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Boolean} showFolding include folding checkbox, default is true.
 * @param {Boolean} showRotate include rotate checkbox, default is true.
 * @param {Boolean} showDuplex include duplex checkbox, default is true.
 * @param {Boolean} showStack include stack checkbox, default is true.
 */
function NUpOptionsGroup(parent, showFolding, showRotate, showDuplex, showStack) {
  var self = parent.hgroup()
  self.foldingCheck, self.rotateCheck, self.duplexCheck, self.stackCheck

  self.alignment = "right"
  if (showFolding !== undefined ? showFolding : true) {
    self.foldingCheck = self.checkBox(undefined, "Folding Booklet").also(function(it) {
      it.tooltip("Should the page collated to folding booklet?")
      it.onClick = function() {
        if (self.rotateCheck !== undefined) self.rotateCheck.enabled = !it.value
        if (self.duplexCheck !== undefined) self.duplexCheck.enabled = !it.value
        if (self.stackCheck !== undefined) self.stackCheck.enabled = !it.value
      }
    })
  }
  if (showRotate !== undefined ? showRotate : true) {
    self.rotateCheck = self.checkBox(undefined, "Rotate Pages").also(function(it) {
      it.tooltip("Should the page be rotated?")
    })
  }
  if (showDuplex !== undefined ? showDuplex : true) {
    self.duplexCheck = self.checkBox(undefined, "Duplex Printing").also(function(it) {
      it.tooltip("Should the page be printed on both sides?")
    })
  }
  if (showStack !== undefined ? showStack : true) {
    self.stackCheck = self.checkBox(undefined, "Cut Stack").also(function(it) {
      it.tooltip("Should the pages stacked on top of each other?")
    })
  }

  /**
   * Returns true if rotate checkbox is selected.
   * @returns {Boolean}
   */
  self.isFolding = function() { return self.foldingCheck.value }

  /**
   * Returns true if rotate checkbox is selected.
   * @returns {Boolean}
   */
  self.isRotate = function() { return self.rotateCheck.value }

  /**
   * Returns true if duplex checkbox is selected.
   * @returns {Boolean}
   */
  self.isDuplex = function() { return self.duplexCheck.value }

  /**
   * Returns true if cut-stack checkbox is selected.
   * @returns {Boolean}
   */
  self.isStack = function() { return self.stackCheck.value }

  return self
}
