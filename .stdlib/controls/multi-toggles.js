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
  self.check, self.checkOnClick
  self.radios

  self.check = self.checkBox(undefined, text).also(function(check) {
    check.onClick = function() {
      if (self.checkOnClick !== undefined) {
        self.checkOnClick()
      }
      Collections.forEach(self.radios, function(it) {
        it.enabled = check.value
      })
    }
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
   * @returns {Boolean}
   */
  self.isSelected = function() { return self.check.value }

  /**
   * Returns selected radio button's text, will still return value if checkbox is not selected.
   * @returns {String}
   */
  self.getSelectedRadioText = function() {
    return Collections.first(self.radios, function(it) { return it.value }).text
  }

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
  this.radioOff, this.radioOn
  this.checks

  var radioOnClick = function() {
    Collections.forEach(self.checks, function(it) { it.enabled = self.radioOn.value })
  }
  self.radioOff = self.radioButton(undefined, textOff).also(function(it) {
    it.onClick = radioOnClick
    it.select()
  })
  self.radioOn = self.radioButton(undefined, textOn).also(function(it) {
    it.onClick = radioOnClick
  })
  self.checks = Collections.map(checkTexts, function(text) {
    return self.checkBox(undefined, text).also(function(it) {
      it.enabled = false
    })
  })

  /**
   * Returns true if is in off state.
   * @returns {Boolean}
   */
  self.isOff = function() { return self.radioOff.value }

  /**
   * Returns true if is in on state.
   * @returns {Boolean}
   */
  self.isOn = function() { return self.radioOn.value }

  /**
   * Returns true if checkbox with that text is selected, will still return value if in off state.
   * @returns {String}
   */
  self.isSelectedCheckText = function(text) {
    return Collections.first(self.checks, function(it) { return it.text === text }).value
  }

  return self
}
