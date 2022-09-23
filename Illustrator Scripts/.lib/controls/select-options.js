var SelectOption = new Enum({
  YES: { name: R.string.yes },
  NO: { name: R.string.no },

  isYes: function(name) { return SelectOption.valueOf(name) === SelectOption.YES }
})

/**
 * Panel of width and height inputs.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds.
 */
function SelectDimensionPanel(parent, inputSize) {
  var self = parent.vpanel(R.string.dimension)
  self.widthEdit, self.heightEdit

  self.alignChildren = "right"
  self.hgroup(function(group) {
    group.helpTips = "Selected object's width"
    group.leftStaticText(undefined, R.string.width)
    self.widthEdit = group.editText(inputSize).also(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.helpTips = "Selected object's height"
    group.leftStaticText(undefined, R.string.height)
    self.heightEdit = group.editText(inputSize).also(VALIDATE_UNITS)
  })

  /**
   * Returns width input.
   * @return {Number}
   */
  self.getWidth = function() { return parseUnits(self.widthEdit.text) }

  /**
   * Returns height input.
   * @return {Number}
   */
  self.getHeight = function() { return parseUnits(self.heightEdit.text) }

  return self
}
