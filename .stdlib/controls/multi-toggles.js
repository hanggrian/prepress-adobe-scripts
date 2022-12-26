/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Any number of radio buttons with their disability attached to left checkbox.
 * @param {!Group|!Panel|!Window} parent
 * @param {?string} text checkbox's text.
 * @param {!Array<string>} radioTexts radio buttons' texts.
 */
function MultiRadioGroup(parent, text, radioTexts) {
  checkNotNull(parent)
  checkNotNull(radioTexts)

  var self = parent.hgroup()
  self.check, self.radios

  self.check = self.checkBox(undefined, text).apply(function(check) {
    check.addClickListener(function() {
      Collections.forEach(self.radios, function(it) { it.enabled = check.value })
    })
  })
  if (radioTexts != null) {
    self.radios = Collections.map(radioTexts, function(text, i) {
      return self.radioButton(undefined, text).apply(function(it) {
        it.enabled = false
        if (i === 0) {
          it.select()
        }
      })
    })
  }

  /** @return {boolean} */
  self.isSelected = function() { return self.check.value }

  /**
   * Returns index of selected toggle, will still return value if checkbox is not selected.
   * @return {number}
   */
  self.getSelectedRadioIndex = function() { return Internals.getSelectedRadioIndex(self) }

  return self
}

/**
 * Any number of checkboxes with their disability attached to on/off radio button.
 * @param {!Group|!Panel|!Window} parent
 * @param {?string} textOff radio's text when in enabled state.
 * @param {?string} textOn radio's text when in disabled state.
 * @param {!Array<string>} checkTexts checkboxes' texts.
 */
function MultiCheckGroup(parent, textOff, textOn, checkTexts) {
  checkNotNull(parent)
  checkNotNull(checkTexts)

  var self = parent.hgroup()
  self.radioOff, self.radioOn, self.checks

  var radioClickListener = function() {
    Collections.forEach(self.checks, function(it) { it.enabled = self.radioOn.value })
  }
  self.radioOff = self.radioButton(undefined, textOff).apply(function(it) {
    it.addClickListener(radioClickListener)
    it.select()
  })
  self.radioOn = self.radioButton(undefined, textOn).apply(function(it) {
    it.addClickListener(radioClickListener)
  })
  if (checkTexts != null) {
    self.checks = Collections.map(checkTexts, function(text) {
      return self.checkBox(undefined, text).apply(function(it) {
        it.enabled = false
      })
    })
  }

  /** @return {boolean} */
  self.isOff = function() { return self.radioOff.value }

  /** @return {boolean} */
  self.isOn = function() { return self.radioOn.value }

  /**
   * Returns index of selected toggle, will still return value if in off state.
   * @return {number}
   */
  self.getSelectedRadioIndex = function() { return Internals.getSelectedRadioIndex(self) }

  return self
}
