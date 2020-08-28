#include 'core.js'

const COLORS = ['Registration', 'White', '-', 'Cyan', 'Magenta', 'Yellow', 'Black']

const COLOR_WHITE = new CMYKColor()
const COLOR_CYAN = new CMYKColor()
const COLOR_MAGENTA = new CMYKColor()
const COLOR_YELLOW = new CMYKColor()
const COLOR_BLACK = new CMYKColor()
const COLOR_NONE = new NoColor()

COLOR_CYAN.cyan = 100
COLOR_MAGENTA.magenta = 100
COLOR_YELLOW.yellow = 100
COLOR_BLACK.black = 100

/**
 * Returns registration color from current document's swatch.
 * 
 * @return {CMYKColor}
 */
function registrationColor() {
    return document.swatches['[registration]'].color
}

/**
 * Converts text to color.
 * 
 * @param {String} text - text to convert
 * @return {CMYKColor}
 */
function parseColor(text) {
    switch (text) {
        case 'Registration':
            return registrationColor()
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

/** Returns true if both CMYK colors are equal. */
CMYKColor.prototype.equalTo || (CMYKColor.prototype.equalTo = function(other) {
    return this.cyan == other.cyan &&
        this.magenta == other.magenta &&
        this.yellow == other.yellow &&
        this.black == other.black
})