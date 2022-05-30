function RecursiveCheck(parent) {
  var self = this

  this.check = parent.checkBox(undefined, 'Recursive').also(function(it) {
    it.tip('Iterate through groups recursively')
  })

  this.isSelected = function() { return self.check.value }
}

function KeepSizeCheck(parent) {
  var self = this

  this.check = parent.checkBox(undefined, 'Keep Size').also(function(it) {
    it.tip('Keep curent dimension')
    it.value = true
  })

  this.isSelected = function() { return self.check.value }
}