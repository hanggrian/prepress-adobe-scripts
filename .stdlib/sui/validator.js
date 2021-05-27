// match regexes are inclusive with optional areas to trim and leading zero
var MATCH_DIGITS = /^[ ]*[0-9]*[ ]*$/
var MATCH_UNITS = /^[ ]*([0-9]*(\.[0-9]+)?|\.[0-9]+)[ ]*(?:in|mi|mm|cm|pt|px)?[ ]*$/

// reduce that inclusivity for more readable text
var REPLACE_LEADING_SPACE = /^\s+/
var REPLACE_TRAILING_SPACE = /\s+$/
var REPLACE_LEADING_ZERO = /0+(?!$)/

/** Digits are non-negative and non-decimal number. */
EditText.prototype.validateDigits = function() {
    this.registerValidator(MATCH_DIGITS, function(_, newValue) {
        return newValue.removeRegexes([REPLACE_LEADING_SPACE, REPLACE_TRAILING_SPACE, REPLACE_LEADING_ZERO])
    })
}

/** Unit measurements are decimal number paired with short text. */
EditText.prototype.validateUnits = function() {
    this.registerValidator(MATCH_UNITS, function(oldValue, newValue) {
        var alphabetRegex = /[a-zA-Z]/
        var exec

        // check for old unit type
        var old = oldValue.removeRegexes([REPLACE_LEADING_SPACE, REPLACE_TRAILING_SPACE, REPLACE_LEADING_ZERO])
        var oldUnitType
        exec = alphabetRegex.exec(old)
        if (exec !== null) {
            oldUnitType = old.substring(exec.index)
        }

        // parse new unit value and type
        var _new = newValue.removeRegexes([REPLACE_LEADING_SPACE, REPLACE_TRAILING_SPACE, REPLACE_LEADING_ZERO])
        exec = alphabetRegex.exec(_new)
        if (exec !== null) {
            // new unit type found, use it
            var newUnitValue = _new.substring(0, exec.index).removeRegexes([REPLACE_TRAILING_SPACE])
            var newUnitType = _new.substring(exec.index)
            return newUnitValue + ' ' + newUnitType
        } else {
            // new unit type not found, use old unit value if exist
            return oldUnitType !== undefined
                ? _new + ' ' + oldUnitType
                : _new
        }
    })
}

/**
 * Restricts EditText input to only match regex, reverts to previous value otherwise.
 * @this {EditText} target field.
 * @param {RegExp} regex pattern to match.
 * @param {Function} valueProvider consumer with `oldValue`, `newValue` parameters and final value return.
 */
EditText.prototype.registerValidator = function(regex, valueProvider) {
    var editText = this
    var oldValue = editText.text
    editText.onActivate = function() { oldValue = editText.text }
    editText.onChange = function() {
        var newValue = editText.text
        editText.text = regex.test(newValue)
            ? valueProvider(oldValue, newValue)
            : oldValue
    }
}

String.prototype.removeRegexes = function(regexes) {
    var s = this
    for (var i = 0; i < regexes.length; i++) {
        s = s.replace(regexes[i], '')
    }
    return s
}