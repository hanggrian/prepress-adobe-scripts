/**
 * Panel of width and height inputs.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds.
 */
function SelectDimensionPanel(parent, inputSize) {
  var self = parent.vpanel("Dimension")
  self.widthEdit, self.heightEdit

  self.alignChildren = "right"
  self.hgroup(function(group) {
    group.tooltips("Selected object's width")
    group.staticText(undefined, "Width:").also(JUSTIFY_RIGHT)
    self.widthEdit = group.editText(inputSize).also(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.tooltips("Selected object's height")
    group.staticText(undefined, "Height:").also(JUSTIFY_RIGHT)
    self.heightEdit = group.editText(inputSize).also(VALIDATE_UNITS)
  })

  /**
   * Returns width input.
   * @returns {Number}
   */
  self.getWidth = function() { return parseUnits(self.widthEdit.text) }

  /**
   * Returns height input.
   * @returns {Number}
   */
  self.getHeight = function() { return parseUnits(self.heightEdit.text) }

  return self
}
