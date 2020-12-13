#include 'sui.js'

// match regexes are inclusive with optional areas to trim and leading zero
var MATCH_DIGITS = /^[ ]*[0-9]*[ ]*$/
var MATCH_UNITS = /^[ ]*([0-9]*(\.[0-9]+)?|\.[0-9]+)[ ]*(?:in|ft|yd|mi|mm|cm|m|km|pt|pc|tpt|tpc|ci|px|%)?[ ]*$/

// reduce that inclusivity for more readable text
var REPLACE_LEADING_SPACE = /^\s+/
var REPLACE_TRAILING_SPACE = /\s+$/
var REPLACE_LEADING_ZERO = /^0+/

/** Digits are non-negative and non-decimal number. */
EditText.prototype.validateDigits = function() {
    var editText = this
    editText.registerValidator(MATCH_DIGITS, function() { 
        editText.text = editText.text.removeRegexes([REPLACE_LEADING_SPACE, REPLACE_TRAILING_SPACE, REPLACE_LEADING_ZERO])
    })
}

/** Unit measurements are decimal number paired with short text. */
EditText.prototype.validateUnits = function() {
    var editText = this
    editText.registerValidator(MATCH_UNITS, function() {
        var s = editText.text.removeRegexes([REPLACE_LEADING_SPACE, REPLACE_TRAILING_SPACE, REPLACE_LEADING_ZERO])
        var firstAlphabet = /[a-zA-Z]/.exec(s).index
        var left = s.substring(0, firstAlphabet).removeRegexes([REPLACE_TRAILING_SPACE])
        var right = s.substring(firstAlphabet)
        editText.text = left + ' ' + right
    })
}

/**
 * Restricts EditText input to only match regex, reverts to previous value otherwise.
 * @this {EditText} - target field
 * @param {RegExp} regex - pattern to match
 * @param {Function} matchAction - optional runnable with old and new value arguments.
 */
EditText.prototype.registerValidator = function(regex, matchAction) {
    var editText = this
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

String.prototype.removeRegexes = function(regexes) { 
    var s = this
    for (var i = 0; i < regexes.length; i++) s = s.replace(regexes[i], '')
    return s
}