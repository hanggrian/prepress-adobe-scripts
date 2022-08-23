/**
 * Left and right EditText representing start and end point of range.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds.
 */
function RangeGroup(parent, inputSize) {
  var self = this
  this.startEdit, this.endEdit

  this.minRange = 0
  this.maxRange = Number.MAX_VALUE

  inputSize = [inputSize[0] / 2 - 13, inputSize[1]]
  this.main = parent.hgroup(function(group) {
    self.startEdit = group.editText(inputSize, "1").also(function(it) {
      it.validateDigits()
      it.onChange = function() {
        self.endEdit.text = self.startEdit.text
      }
    })
    group.staticText(undefined, "–") // use en dash
    self.endEdit = group.editText(inputSize, "1").also(VALIDATE_DIGITS)
  })

  /**
   * Returns start input as text, throws error if range is invalid.
   * @returns {String}
   */
  this.getStartText = function() {
    checkValidity()
    return self.startEdit.text
  }

  /**
   * Returns end input as text, throws error if range is invalid.
   * @returns {String}
   */
  this.getEndText = function() {
    checkValidity()
    return self.endEdit.text
  }

  /**
   * Returns start input, shows error alert if range is invalid,
   * @returns {Number}
   */
  this.getStart = function() {
    var start = parseInt(self.getStartText()) - 1
    if (start < self.minRange) {
      errorWithAlert("Start range cannot be less than " + self.minRange)
    }
    return start
  }

  /**
   * Returns end input, shows error alert if range is invalid,
   * @returns {Number}
   */
  this.getEnd = function() {
    var end = parseInt(self.getEndText()) - 1
    if (end > self.maxRange) {
      errorWithAlert("End range cannot be more than " + self.maxRange)
    }
    return end
  }

  /**
   * Returns range distance, throws error if range is invalid.
   * @returns {Number}
   */
  this.getLength = function() {
    checkValidity()
    return self.getEnd() - self.getStart() + 1
  }

  /**
   * Returns true if `input` is in within range, throws error if range is invalid.
   * @param {Number} input expected to be more than start and less than end.
   * @returns {Boolean}
   */
  this.includes = function(input) {
    checkValidity()
    return input >= self.getStart() && input <= self.getEnd()
  }

  /**
   * Iterate from start to end input.
   * @param {Function} action runnable with current index as parameter.
   */
  this.forEach = function(action) {
    checkValidity()
    var start = self.getStart()
    var end = start + self.getLength() // necessary to call `getLength` instead of `getEnd` to check range
    for (var i = start; i < end; i++) {
      action(i)
    }
  }

  function checkValidity() {
    if (parseInt(self.startEdit.text) > parseInt(self.endEdit.text)) {
      errorWithAlert("Invalid range")
    }
  }
}
