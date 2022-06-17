function SliderGroup(parent, editBounds, a, b, c, scale) {
  var self = this
  this.edit, this.slider

  if (scale === undefined) {
    scale = 1
  }

  this.main = parent.hgroup(function(group) {
    self.edit = group.editText([40, editBounds[1]], a * scale).also(function(it) {
      it.validateDigits()
      it.onChanging = function() {
        self.slider.value = new Number(it.text) / scale
      }
    })
    self.slider = group.slider([editBounds[0] - 40 - 10, editBounds[1]], a, b, c).also(function(it) {
      it.onChanging = function() {
        self.edit.text = parseInt(it.value) * scale
      }
    })
  })

  this.getValue = function() { return parseInt(self.edit.value) || b }
}
