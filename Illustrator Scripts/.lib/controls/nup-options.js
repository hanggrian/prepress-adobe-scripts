/**
 * 3 checkboxes group for imposing N-Up pager.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Boolean} showRotate include rotate checkbox.
 * @param {Boolean} showDuplex include duplex checkbox.
 * @param {Boolean} showCutStack include cut-stack checkbox.
 */
function NUpOptionsGroup(parent, showRotate, showDuplex, showCutStack) {
  var self = this
  this.rotateCheck, this.duplexCheck, this.cutStackCheck

  this.main = parent.hgroup(function(group) {
    group.alignment = "right"
    if (showRotate) {
      self.rotateCheck = group.checkBox(undefined, "Rotate Pages").also(function(it) {
        it.tooltip("Should the page be rotated?")
      })
    }
    if (showDuplex) {
      self.duplexCheck = group.checkBox(undefined, "Duplex Printing").also(function(it) {
        it.tooltip("Should the page be printed on both sides?")
      })
    }
    if (showCutStack) {
      self.cutStackCheck = group.checkBox(undefined, "Cut Stack").also(function(it) {
        it.tooltip("Should the pages stacked on top of each other?")
      })
    }
  })

  /**
   * Returns true if rotate checkbox is selected.
   * @returns {Boolean}
   */
  this.isRotate = function() { return self.rotateCheck.value }

  /**
   * Returns true if duplex checkbox is selected.
   * @returns {Boolean}
   */
  this.isDuplex = function() { return self.duplexCheck.value }

  /**
   * Returns true if cut-stack checkbox is selected.
   * @returns {Boolean}
   */
  this.isCutStack = function() { return self.cutStackCheck.value }
}
