var SelectOption =
    new Enum({
      YES: {text: R.string.yes},
      NO: {text: R.string.no},

      isYes: function(name) {
        return SelectOption.find(name) === SelectOption.YES
      },
    })

/**
 * Panel of width and height inputs.
 * @param {!Group|!Panel|!Window} parent
 * @param {!Array<number>} inputSize
 */
function SelectDimensionPanel(parent, inputSize) {
  checkNotNull(parent)

  var self = parent.vpanel(R.string.dimension)
  self.widthEdit, self.heightEdit

  self.alignChildren = 'right'
  self.hgroup(function(group) {
    group.staticText(undefined, R.string.width).apply(HEADING)
    self.widthEdit = group.editText(inputSize).apply(VALIDATE_UNITS)
  })
  self.hgroup(function(group) {
    group.staticText(undefined, R.string.height).apply(HEADING)
    self.heightEdit = group.editText(inputSize).apply(VALIDATE_UNITS)
  })

  /** @return {number} */
  self.getWidth =
      function() {
        return parseUnits(self.widthEdit.text)
      }

  /** @return {number} */
  self.getHeight =
      function() {
        return parseUnits(self.heightEdit.text)
      }

  return self
}
