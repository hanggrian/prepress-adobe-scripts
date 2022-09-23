/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Any number of radio buttons with their disability attached to left checkbox.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {String} text checkbox's text.
 * @param {Array} radioTexts radio buttons' texts.
 */
function MultiRadioGroup(parent, text, radioTexts) {
  var self = parent.hgroup()
  self.check, self.radios

  self.check = self.checkBox(undefined, text).also(function(check) {
    check.addClickListener(function() {
      Collections.forEach(self.radios, function(it) { it.enabled = check.value })
    })
  })
  self.radios = Collections.map(radioTexts, function(text, i) {
    return self.radioButton(undefined, text).also(function(it) {
      it.enabled = false
      if (i === 0) {
        it.select()
      }
    })
  })

  /**
   * Returns true if checkbox is selected.
   * @return {Boolean}
   */
  self.isSelected = function() { return self.check.value }

  /**
   * Returns index of selected toggle, will still return value if checkbox is not selected.
   * @return {Number}
   */
  self.getSelectedRadioIndex = function() { return Internals.getSelectedRadioIndex(self) }

  return self
}

/**
 * Any number of checkboxes with their disability attached to on/off radio button.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {String} textOff radio's text when in enabled state.
 * @param {String} textOn radio's text when in disabled state.
 * @param {Array} checkTexts checkboxes' texts.
 */
function MultiCheckGroup(parent, textOff, textOn, checkTexts) {
  var self = parent.hgroup()
  self.radioOff, self.radioOn, self.checks

  var radioClickListener = function() { Collections.forEach(self.checks, function(it) { it.enabled = self.radioOn.value }) }
  self.radioOff = self.radioButton(undefined, textOff).also(function(it) {
    it.addClickListener(radioClickListener)
    it.select()
  })
  self.radioOn = self.radioButton(undefined, textOn).also(function(it) {
    it.addClickListener(radioClickListener)
  })
  self.checks = Collections.map(checkTexts, function(text) {
    return self.checkBox(undefined, text).also(function(it) {
      it.enabled = false
    })
  })

  /**
   * Returns true if is in off state.
   * @return {Boolean}
   */
  self.isOff = function() { return self.radioOff.value }

  /**
   * Returns true if is in on state.
   * @return {Boolean}
   */
  self.isOn = function() { return self.radioOn.value }

  /**
   * Returns index of selected toggle, will still return value if in off state.
   * @return {Number}
   */
  self.getSelectedRadioIndex = function() { return Internals.getSelectedRadioIndex(self) }

  return self
}
