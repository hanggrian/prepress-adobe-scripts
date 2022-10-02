/**
 * Left and right EditText representing start and end point of range.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds, may be null.
 */
function RangeGroup(parent, inputSize) {
  checkNotNull(parent)
  
  var self = parent.hgroup()
  self.startEdit, self.endEdit

  self.minRange = 0
  self.maxRange = Number.MAX_VALUE

  inputSize = [inputSize[0] / 2 - 13, inputSize[1]]
  self.startEdit = self.editText(inputSize, "1").also(function(it) {
    it.validateDigits()
    it.addChangeListener(function() {
      self.endEdit.text = self.startEdit.text
    })
  })
  self.staticText(undefined, "–") // use en dash
  self.endEdit = self.editText(inputSize, "1").also(VALIDATE_DIGITS)

  /**
   * Returns start input as text, throws error if range is invalid.
   * @return {String}
   */
  self.getStartText = function() {
    checkValidity()
    return self.startEdit.text
  }

  /**
   * Returns end input as text, throws error if range is invalid.
   * @return {String}
   */
  self.getEndText = function() {
    checkValidity()
    return self.endEdit.text
  }

  /**
   * Returns start input, shows error alert if range is invalid,
   * @return {Number}
   */
  self.getStart = function() {
    var start = parseInt(self.getStartText()) - 1
    if (start < self.minRange) {
      error("Start range cannot be less than " + self.minRange, undefined, true)
    }
    return start
  }

  /**
   * Returns end input, shows error alert if range is invalid,
   * @return {Number}
   */
  self.getEnd = function() {
    var end = parseInt(self.getEndText()) - 1
    if (end > self.maxRange) {
      error("End range cannot be more than " + self.maxRange, undefined, true)
    }
    return end
  }

  /**
   * Returns range distance, throws error if range is invalid.
   * @return {Number}
   */
  self.getLength = function() {
    checkValidity()
    return self.getEnd() - self.getStart() + 1
  }

  /**
   * Returns true if `input` is in within range, throws error if range is invalid.
   * @param {Number} input expected to be more than start and less than end.
   * @return {Boolean}
   */
  self.includes = function(input) {
    checkValidity()
    return input >= self.getStart() && input <= self.getEnd()
  }

  /**
   * Creates an array containing starting number until ending number.
   * @return {Array}
   */
  self.toArray = function() {
    checkValidity()
    var result = []
    var from = self.getStart()
    var to = from + self.getLength() // necessary to call `getLength` instead of `getEnd` to check range
    for (var i = from; i < to; i++) {
      result.push(i)
    }
    return result
  }

  function checkValidity() { check(parseInt(self.startEdit.text) <= parseInt(self.endEdit.text), R.string.error_range) }

  return self
}
