/** Restricts user input to be number only. */
EditText.prototype.validateNumber || (EditText.prototype.validateNumber = function() {
    this.onChanging = function() {
        if (isNaN(this.text)) {
            var s = ''
            for (var i = 0; i < this.text.length; i++) {
                var c = this.text[i]
                if (c >= '0' && c <= '9') {
                    s += c
                }
            }
            this.text = s
        }
    }
});