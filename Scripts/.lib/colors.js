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
 * @param {string} text - text to convert
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

/**
 * Returns true if CMYK colors are equal.
 * 
 * @param {CMYKColor} color1 - CMYK color
 * @param {CMYKColor} color2 - CMYK color
 * @return {bool}
 */
function sameColor(color1, color2) {
    return color1.cyan == color2.cyan &&
        color1.magenta == color2.magenta &&
        color1.yellow == color2.yellow &&
        color1.black == color2.black
}