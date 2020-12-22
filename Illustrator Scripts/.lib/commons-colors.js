var COLORS = ['Registration', 'White', '-', 'Cyan', 'Magenta', 'Yellow', 'Black']

var COLOR_WHITE = new CMYKColor()
var COLOR_CYAN = new CMYKColor()
var COLOR_MAGENTA = new CMYKColor()
var COLOR_YELLOW = new CMYKColor()
var COLOR_BLACK = new CMYKColor()
var COLOR_NONE = new NoColor()

COLOR_CYAN.cyan = 100.0
COLOR_MAGENTA.magenta = 100.0
COLOR_YELLOW.yellow = 100.0
COLOR_BLACK.black = 100.0

/**
 * Converts text to color.
 * @param {String} text text to convert
 * @return {CMYKColor}
 */
function parseColor(text) {
    switch (text) {
        case 'Registration':
            return document.swatches['[registration]'].color
        case 'White':
            return COLOR_WHITE
        case 'Cyan':
            return COLOR_CYAN
        case 'Magenta':
            return COLOR_MAGENTA
        case 'Yellow':
            return COLOR_YELLOW
        case 'Black':
            return COLOR_BLACK
        default:
            return COLOR_NONE
    }
}

/**
 * Returns true if both CMYK colors are equal.
 * @this {CMYKColor} color A
 * @param {CMYKColor} other color B
 * @return {Boolean}
 */
CMYKColor.prototype.equalTo = function(other) {
    return this.cyan == other.cyan &&
        this.magenta == other.magenta &&
        this.yellow == other.yellow &&
        this.black == other.black
}