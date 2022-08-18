/**
 * Panel of width and height inputs.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} textBounds size or position & size array.
 * @param {Array} editBounds size or position & size array.
 */
function SelectDimensionPanel(parent, textBounds, editBounds) {
  var self = this
  this.widthEdit, this.heightEdit

  this.main = parent.vpanel("Dimension", function(panel) {
    panel.hgroup(function(group) {
      group.tooltips("Selected object's width")
      group.staticText(textBounds, "Width:").also(JUSTIFY_RIGHT)
      self.widthEdit = group.editText(editBounds).also(VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
      group.tooltips("Selected object's height")
      group.staticText(textBounds, "Height:").also(JUSTIFY_RIGHT)
      self.heightEdit = group.editText(editBounds).also(VALIDATE_UNITS)
    })
  })

  /**
   * Returns width input.
   * @returns {Number}
   */
  this.getWidth = function() { return parseUnits(self.widthEdit.text) }

  /**
   * Returns height input.
   * @returns {Number}
   */
  this.getHeight = function() { return parseUnits(self.heightEdit.text) }
}
