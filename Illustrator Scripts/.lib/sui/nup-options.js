function NUpOptionsGroup(parent, showRotate, showDuplex, showCutStack) {
  var self = this
  this.rotateCheck, this.duplexCheck, this.cutStackCheck

  this.main = parent.hgroup(function(group) {
    group.alignment = 'right'
    if (showRotate) {
      self.rotateCheck = group.checkBox(undefined, 'Rotate Pages').also(function(it) {
        it.tip('Should the page be rotated?')
      })
    }
    if (showDuplex) {
      self.duplexCheck = group.checkBox(undefined, 'Duplex Printing').also(function(it) {
        it.tip('Should the page be printed on both sides?')
      })
    }
    if (showCutStack) {
      self.cutStackCheck = group.checkBox(undefined, 'Cut Stack').also(function(it) {
        it.tip('Should the pages stacked on top of each other?')
      })
    }
  })

  this.isRotate = function() { return self.rotateCheck.value }
  this.isDuplex = function() { return self.duplexCheck.value }
  this.isCutStack = function() { return self.cutStackCheck.value }
}