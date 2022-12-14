/*<javascriptresource><menu>hide</menu></javascriptresource>*/

var STYLE_MULTILINE = { multiline: true }

// match regexes are inclusive with optional areas to trim and leading zero
var MATCH_DIGITS = /^[ ]*[0-9]*[ ]*$/
var MATCH_UNITS = /^[ ]*([0-9]*(\.[0-9]+)?|\.[0-9]+)[ ]*(?:in|mi|mm|cm|pt|px)?[ ]*$/

// reduce that inclusivity for more readable text
var REPLACE_LEADING_SPACE = /^\s+/
var REPLACE_TRAILING_SPACE = /\s+$/
var REPLACE_LEADING_ZERO = /^(?:0+(?=[1-9])|0+(?=0$))/mg // https://stackoverflow.com/questions/60509557/regex-remove-leading-zeros-but-keep-single-zero

/** Restricts input to be digits-only (digits are non-negative and non-decimal number). */
EditText.prototype.validateDigits = function() {
  Internals.registerValidator(this, MATCH_DIGITS, function(_, newValue) {
    return Internals.removeRegexes(newValue,
      [REPLACE_LEADING_SPACE, REPLACE_TRAILING_SPACE, REPLACE_LEADING_ZERO])
  })
}

/** Restricts input to units-only (units are decimal number paired with short text). */
EditText.prototype.validateUnits = function() {
  Internals.registerValidator(this, MATCH_UNITS, function(oldValue, newValue) {
    var alphabetRegex = /[a-zA-Z]/
    var exec

    // check for old unit type
    var old = Internals.removeRegexes(oldValue,
      [REPLACE_LEADING_SPACE, REPLACE_TRAILING_SPACE, REPLACE_LEADING_ZERO])
    var oldUnitType
    exec = alphabetRegex.exec(old)
    if (exec !== null) {
      oldUnitType = old.substring(exec.index)
    }

    // parse new unit value and type
    var _new = Internals.removeRegexes(newValue,
      [REPLACE_LEADING_SPACE, REPLACE_TRAILING_SPACE, REPLACE_LEADING_ZERO])
    exec = alphabetRegex.exec(_new)
    if (exec !== null) { // new unit type found, use it
      var newUnitValue = Internals.removeRegexes(_new.substring(0, exec.index),
        [REPLACE_TRAILING_SPACE])
      var newUnitType = _new.substring(exec.index)
      return newUnitValue + ' ' + newUnitType
    } else { // new unit type not found, use old unit value if exist
      if (_new.isEmpty()) _new = '0' // in event when all text is removed, use 0
      return oldUnitType !== undefined ? _new + ' ' + oldUnitType : _new
    }
  })
}

var ACTIVATE = function(editText) { editText.activate() }
var VALIDATE_DIGITS = function(editText) { editText.validateDigits() }
var VALIDATE_UNITS = function(editText) { editText.validateUnits() }

/** Focus on this edit text. */
EditText.prototype.activate = function() {
  if (!preferences2.getBoolean('activate_control_on_show')) {
    return
  }
  this.active = true
}

/**
 * Allows for multiple change listeners to occur by invoking all of them in collective listener.
 * @param {function()} listener
 */
EditText.prototype.addChangeListener = function(listener) {
  Internals.addListener(this, 'onChange', listener)
}

/**
 * Add children to group.
 * @param {?Array<number>=} size
 * @param {?string|?Object=} text
 * @param {?Object=} properties
 * @return {!EditText}
 */
Group.prototype.editText = function(size, text, properties) {
  return Internals.addEditText(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {?Array<number>=} size
 * @param {?string|?Object=} text
 * @param {?Object=} properties
 * @return {!EditText}
 */
Panel.prototype.editText = function(size, text, properties) {
  return Internals.addEditText(this, size, text, properties)
}

Internals.addEditText = function(root, size, text, properties) {
  var child = root.add('edittext', Internals.sizeOrBounds(size), text, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
