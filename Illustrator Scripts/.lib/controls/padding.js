/**
 * An EditText around StaticText requesting padding size, as seen
 * in `Menubar > Effects > Document Raster Effects Settings`.
 * @param {!Group|!Panel|!Window} parent
 */
function PaddingGroup(parent) {
  checkNotNull(parent)

  var self = parent.hgroup()
  self.paddingEdit

  self.helpTips = R.string.tip_padding
  self.staticText(undefined, R.string.add)
  self.paddingEdit = self.editText([70, 21], '0 mm').apply(VALIDATE_UNITS)
  self.staticText(undefined, R.string.around_object)

  /** @return {number} */
  self.get = function() { return parseUnits(self.paddingEdit.text) }

  return self
}
