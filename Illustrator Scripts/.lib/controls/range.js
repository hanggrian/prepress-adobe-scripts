/**
 * Left and right EditText representing start and end point of range.
 * @param {!Group|!Panel|!Window} parent
 * @param {!Array<number>} inputSize
 */
function RangeGroup(parent, inputSize) {
  checkNotNull(parent)
  
  var self = parent.hgroup()
  self.startEdit, self.endEdit

  self.minRange = 0
  self.maxRange = Number.MAX_VALUE

  inputSize = [inputSize[0] / 2 - 13, inputSize[1]]
  self.startEdit = self.editText(inputSize, '1').also(function(it) {
    it.validateDigits()
    it.addChangeListener(function() {
      self.endEdit.text = self.startEdit.text
    })
  })
  self.staticText(undefined, '–') // use en dash
  self.endEdit = self.editText(inputSize, '1').also(VALIDATE_DIGITS)

  /**
   * Returns start input, shows error alert if range is invalid,
   * @return {number}
   */
  self.getStart = function() { return parseInt(self.startEdit.text) - 1 }

  /**
   * Returns end input, shows error alert if range is invalid,
   * @return {number}
   */
  self.getEnd = function() { return parseInt(self.endEdit.text) - 1 }

  /**
   * Returns range distance, throws error if range is invalid.
   * @return {number}
   */
  self.getLength = function() { return self.getEnd() - self.getStart() + 1 }

  /**
   * Returns true if `input` is in within range, throws error if range is invalid.
   * @param {number} input expected to be more than start and less than end.
   * @return {boolean}
   */
  self.includes = function(input) { return input >= self.getStart() && input <= self.getEnd() }

  /**
   * Creates an array containing starting number until ending number.
   * @return {!Array<number>}
   */
  self.toArray = function() {
    var result = []
    var from = self.getStart()
    var to = from + self.getLength() // necessary to call `getLength` instead of `getEnd` to check range
    for (var i = from; i < to; i++) {
      result.push(i)
    }
    return result
  }

  /**
   * Checks validity of range.
   * Dialog action should return true to invalidate process.
   * @returns {boolean}
   */
  self.isValid = function() {
    // do not use getStart and getEnd because they are reduced accommodate default 0
    var start = parseInt(self.startEdit.text)
    var end = parseInt(self.endEdit.text)
    return start <= end && start >= self.minRange && end <= self.maxRange
  }

  return self
}
