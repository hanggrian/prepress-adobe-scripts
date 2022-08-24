/**
 * CheckBox with text `Recursive`.
 * @param {Group|Panel|Window} parent holder of this control.
 */
function RecursiveCheck(parent) {
  return parent.checkBox(undefined, "Recursive").also(function(it) {
    it.tooltip("Iterate through groups recursively")
  })
}

/**
 * CheckBox with text `Keep Size`.
 * @param {Group|Panel|Window} parent holder of this control.
 */
function KeepSizeCheck(parent) {
  return parent.checkBox(undefined, "Keep Size").also(function(it) {
    it.tooltip("Keep curent dimension")
  })
}
