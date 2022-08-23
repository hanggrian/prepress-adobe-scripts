/**
 * Slider with its current value synced with left EditText.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Array} inputSize size or bounds.
 * @param {Number} current current value.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Number} scale slider's scale.
 */
function SliderGroup(parent, inputSize, current, start, end, scale) {
  var self = this
  this.edit, this.slider

  if (scale === undefined) {
    scale = 1
  }

  this.main = parent.hgroup(function(group) {
    self.edit = group.editText([40, inputSize[1]], current * scale).also(function(it) {
      it.validateDigits()
      it.onChanging = function() {
        self.slider.value = new Number(it.text) / scale
      }
    })
    self.slider = group.slider([inputSize[0] - 40 - 10, inputSize[1]], current, start, end).also(function(it) {
      it.onChanging = function() {
        self.edit.text = parseInt(it.value) * scale
      }
    })
  })

  /**
   * Returns EditText value, or slider's current point if empty.
   * @returns {Number}
   */
  this.getValue = function() { return parseInt(self.edit.value) || current }
}
