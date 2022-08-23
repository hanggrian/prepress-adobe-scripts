/**
 * Panel of width and height inputs.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds.
 */
function SelectDimensionPanel(parent, inputSize) {
  var self = this
  this.widthEdit, this.heightEdit

  this.main = parent.vpanel("Dimension", function(panel) {
    panel.alignChildren = "right"
    panel.hgroup(function(group) {
      group.tooltips("Selected object's width")
      group.staticText(undefined, "Width:").also(JUSTIFY_RIGHT)
      self.widthEdit = group.editText(inputSize).also(VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
      group.tooltips("Selected object's height")
      group.staticText(undefined, "Height:").also(JUSTIFY_RIGHT)
      self.heightEdit = group.editText(inputSize).also(VALIDATE_UNITS)
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
