String.prototype.startsWith || (String.prototype.startsWith = function(word) { return this.lastIndexOf(word, 0) === 0 })
String.prototype.endsWith || (String.prototype.endsWith = function(word) { return this.indexOf(word, this.length - word.length) !== -1 })

String.prototype.isEmpty || (String.prototype.isEmpty = function() { return this.length == 0 })
String.prototype.isNotEmpty || (String.prototype.isNotEmpty = function() { return this.length > 0 })

String.prototype.isNumber || (String.prototype.isNumber = function() { return !isNaN(this) })

String.prototype.isDigits || (String.prototype.isDigits = function() {
    for (var i = 0; i < this.length; i++) {
        if (!this[i].isDigit()) {
            return false
        }
    }
    return true
})
String.prototype.isNotDigits || (String.prototype.isNotDigits = function() { return !this.isDigits() })

String.prototype.isDigit || (String.prototype.isDigit = function() { return this >= '0' && this <= '9' })
String.prototype.isNotDigit || (String.prototype.isNotDigit = function() { return !this.isDigit() })

String.prototype.first || (String.prototype.first = function() { return this[0] })
String.prototype.last || (String.prototype.last = function() { return this[this.length - 1] })

