// match regexes are inclusive with optional areas to trim and leading zero
const MATCH_DIGITS = /^[ ]*[0-9]*[ ]*$/
const MATCH_UNITS = /^[ ]*([0-9]*(\.[0-9]+)?|\.[0-9]+)[ ]*(?:pt|point|cm|mm|in|inch|"|pica|q)?[ ]*$/

// reduce that inclusivity for more readable text
const REPLACE_LEADING_SPACE = /^\s+/
const REPLACE_TRAILING_SPACE = /\s+$/
const REPLACE_LEADING_ZERO = /^0+/

/** Digits are non-negative and non-decimal number. */
EditText.prototype.validateDigits || (EditText.prototype.validateDigits = function() {
    var editText = this
    _registerValidator(this, MATCH_DIGITS, function() { 
        editText.text = editText.text.removeRegexes([REPLACE_LEADING_SPACE, REPLACE_TRAILING_SPACE, REPLACE_LEADING_ZERO])
    })
})

/** Unit measurements are decimal number paired with short text. */
EditText.prototype.validateUnits || (EditText.prototype.validateUnits = function() {
    var editText = this
    _registerValidator(this, MATCH_UNITS, function() {
        var s = editText.text.removeRegexes([REPLACE_LEADING_SPACE, REPLACE_TRAILING_SPACE, REPLACE_LEADING_ZERO])
        var firstAlphabet = /[a-zA-Z]/.exec(s).index
        var left = s.substring(0, firstAlphabet).removeRegexes([REPLACE_TRAILING_SPACE])
        var right = s.substring(firstAlphabet)
        editText.text = left + ' ' + right
    })
})

/**
 * Duplicate selected item, only support single selection.
 * 
 * @param {EditText} editText - target field
 * @param {RegExp} regex - pattern to match
 * @param {Function} matchAction - optional runnable with old and new value arguments.
 * @return {void}
 */
function _registerValidator(editText, regex, matchAction) {
    var oldValue = editText.text
    editText.onActivate = function() { oldValue = editText.text }
    editText.onChange = function() {
        if (regex.test(editText.text)) {
            matchAction()
        } else {
            editText.text = oldValue
        }
    }
}

String.prototype.removeRegexes || (String.prototype.removeRegexes = function(regexes) { 
    var s = this
    for (var i = 0; i < regexes.length; i++) s = s.replace(regexes[i], '')
    return s
})