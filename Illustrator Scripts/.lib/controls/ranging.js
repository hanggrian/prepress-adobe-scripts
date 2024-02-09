/**
 * Left and right EditText representing start and end point of range.
 * @param {!Group|!Panel|!Window} parent
 * @param {!Array<number>} inputSize
 */
function RangingGroup(parent, inputSize) {
  checkNotNull(parent)

  var self = parent.hgroup()
  self.startEdit, self.endEdit

  self.minRange = 1
  self.maxRange = Number.MAX_VALUE

  inputSize = [inputSize[0] / 2 - 13, inputSize[1]]
  self.startEdit =
      self.editText(inputSize, '1').apply(function(it) {
        it.validateDigits()
        it.addChangeListener(function() {
          self.endEdit.text = self.startEdit.text
        })
      })
  self.staticText(undefined, '–') // use en dash
  self.endEdit = self.editText(inputSize, '1').apply(VALIDATE_DIGITS)

  /** @return {number} */
  self.getStart =
      function() {
        return parseInt(self.startEdit.text)
      }

  /** @return {number} */
  self.getEnd =
      function() {
        return parseInt(self.endEdit.text)
      }

  /** @return {Range} */
  self.get =
      function() {
        return self.getStart().until(self.getEnd())
      }

  /**
   * Checks validity of range. Dialog action should return true to invalidate process.
   * @return {boolean}
   */
  self.isValid =
      function() {
        // notice that while start and end are not reduced by 1
        var start = self.getStart()
        var end = self.getEnd()
        return start <= end && start >= self.minRange && end <= self.maxRange
      }

  return self
}
