/** 
 * Restricts user input to be numbers only.
 * This is done by scanning each character and remove the non-digits.
 */
EditText.prototype.validateNumber || (EditText.prototype.validateNumber = function() {
    this.onChanging = function() {
        if (!isNaN(this.text)) {
            return
        }
        var s = ''
        for (var i = 0; i < this.text.length; i++) {
            var c = this.text[i]
            if (c >= '0' && c <= '9') {
                s += c
            }
        }
        this.text = s
    }
});

/** 
 * Restricts user input to be units only.
 * This is done by dividing text to array of digits and non-digits consecutively,
 * then clear out unnecessary parts of the array and convert it back to string.
 */
EditText.prototype.validateUnit || (EditText.prototype.validateUnit = function() {
    this.onChanging = function() {
        var value = ''
        var unit = ''

        var isUnit = false
        var isDecimal = false
        for (var i = 0; i < this.text.length; i++) {
            var c = this.text[i]
            if (c == ' ') {
                // ignore space
            } else if (c >= '0' && c <= '9') {
                if (isUnit) {
                    value = '0' // text in left part, flag error
                } else {
                    value += c
                }
            } else if (c == '.' || c == ',') {
                if (isDecimal) {
                    value = '0' // double decimal, flag error
                } else {
                    value += c
                    isDecimal = true
                }
            } else {
                isUnit = true
                unit += c
            }
        }
        this.text = value.replace(',', '.') + ' ' + unit
    }
});