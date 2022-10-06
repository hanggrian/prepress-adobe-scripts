/**
 * Slider with its current value synced with left EditText.
 * @param {!Group|!Panel|!Window} parent
 * @param {!Array<number>} inputSize
 * @param {number} current
 * @param {number} start
 * @param {number} end
 * @param {number} scale default is 1.
 */
function SliderGroup(parent, inputSize, current, start, end, scale) {
  checkNotNull(parent)
  checkNotNull(current)
  checkNotNull(start)
  checkNotNull(end)
  scale = scale || 1

  var self = parent.hgroup()
  self.edit, self.slider

  self.edit = self.editText([40, inputSize[1]], current * scale).also(function(it) {
    it.validateDigits()
    it.onChanging = function() { self.slider.value = new Number(it.text) / scale }
  })
  self.slider = self.slider([inputSize[0] - 40 - 10, inputSize[1]], current, start, end).also(function(it) {
    it.onChanging = function() { self.edit.text = parseInt(it.value) * scale }
  })

  /**
   * Returns EditText value, or slider's current point if empty.
   * @return {number}
   */
  self.getValue = function() { return parseInt(self.edit.value) || current }

  return self
}
