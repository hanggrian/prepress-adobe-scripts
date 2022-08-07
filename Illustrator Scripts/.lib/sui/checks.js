function RecursiveCheck(parent) {
  var self = this

  this.main = parent.checkBox(undefined, "Recursive").also(function(it) {
    it.tip("Iterate through groups recursively")
  })

  this.isSelected = function() { return self.main.value }
}

function KeepSizeCheck(parent) {
  var self = this

  this.main = parent.checkBox(undefined, "Keep Size").also(function(it) {
    it.tip("Keep curent dimension")
  })

  this.isSelected = function() { return self.main.value }
}
