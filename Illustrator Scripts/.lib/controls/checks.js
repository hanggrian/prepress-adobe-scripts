/**
 * CheckBox with text `Recursive`.
 * @param {Group|Panel|Window} parent holder of this control.
 */
function RecursiveCheck(parent) {
  var self = this

  this.main = parent.checkBox(undefined, "Recursive").also(function(it) {
    it.tooltip("Iterate through groups recursively")
  })

  this.isSelected = function() { return self.main.value }
}

/**
 * CheckBox with text `Keep Size`.
 * @param {Group|Panel|Window} parent holder of this control.
 */
function KeepSizeCheck(parent) {
  var self = this

  this.main = parent.checkBox(undefined, "Keep Size").also(function(it) {
    it.tooltip("Keep curent dimension")
  })

  this.isSelected = function() { return self.main.value }
}
