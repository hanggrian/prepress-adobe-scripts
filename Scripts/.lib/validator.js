#include 'strings.js'

/** 
 * Restricts user input to be digits only.
 * This is done by scanning each char and remove the non-digits, unless the string is already a digit.
 */
EditText.prototype.validateDigits || (EditText.prototype.validateDigits = function() {
    this.onDeactivate = function() { if (this.text.isEmpty()) this.text = '0' }
    this.onChange = function() {
        var s
        if (this.text.isDigits()) {
            s = this.text
        } else {
            s = ''
            for (var i = 0; i < this.text.length; i++) {
                var c = this.text[i]
                if (c.isDigit()) s += c
            }
        }
        while (s.first() == '0') s = s.substring(1)
        this.text = s
    }
})

/** 
 * Restricts user input to be units only.
 * This is done by determining unit name first, then try to collect number by removing unnecessary extra characters.
 */
EditText.prototype.validateUnit || (EditText.prototype.validateUnit = function() {
    this.onDeactivate = function() { if (this.text.isEmpty()) this.text = '0' }
    this.onChange = function() {
        var s = this.text
        var r = ''
        while (s.last().isNotDigit()) {
            s = s.slice(0, -1)
        }
    }
})