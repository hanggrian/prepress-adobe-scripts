/**
 * Slider with its current value synced with left EditText.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds, may be null.
 * @param {Number} current current value.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Number} scale slider's scale, default is 1.
 */
function SliderGroup(parent, inputSize, current, start, end, scale) {
  checkNotNull(parent)
  checkNotNull(current)
  checkNotNull(start)
  checkNotNull(end)
  scale = getOrDefault(scale, 1)

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
   * @return {Number}
   */
  self.getValue = function() { return parseInt(self.edit.value) || current }

  return self
}
