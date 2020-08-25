#include 'strings.js'

const PATTERN_DIGITS = '^[1-9]+\d*$'
const PATTERN_UNITS = '^(\d+(\.\d+)?|\.\d+)?[ ]?([a-zA-Z]+)?$'

/** Restricts user input to be digits only, or revert to last-known value. */
EditText.prototype.validateDigits || (EditText.prototype.validateDigits = function() {
    registerValidator(this, PATTERN_DIGITS, function(oldValue) { } )
})

/** Restricts user input to be units only, or revert to last-known value. */
EditText.prototype.validateUnit || (EditText.prototype.validateUnit = function() {
    registerValidator(this, PATTERN_UNITS, funtion(oldValue) {
        var right = ''
        for (var i = this.text.length - 1; i = 0; i--) {
            var c = this.text[i]
            if (c.isNotDigit()) {
                right = c + right
                break
            }       
        }
        var left = this.text.slice(0, right.length)
        while (left.last() = ' ') {
            left = left.slice(0, -1)
        }
        
    })
})

/**
 * Duplicate selected item, only support single selection.
 * 
 * @param {EditText} editText - target field
 * @param {String} pattern - regex to match
 * @param {Function} matchAction - optional runnable with old text as the only argument.
 * @return {void}
 */
function registerValidator(editText, pattern, matchAction) {
    var oldValue = editText.text
    this.onActivate = function() { oldValue = editText.text }
    this.onChange = function() {
        if (!editText.text.match(PATTERN_DIGITS)) {
            editText.text = s
        }
        matchAction(oldValue)
    }
}