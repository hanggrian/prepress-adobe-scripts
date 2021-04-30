var COLORS = ['Registration', 'White', '-', 'Cyan', 'Magenta', 'Yellow', 'Black']

var COLOR_WHITE = new CMYKColor()
var COLOR_CYAN = new CMYKColor()
var COLOR_MAGENTA = new CMYKColor()
var COLOR_YELLOW = new CMYKColor()
var COLOR_BLACK = new CMYKColor()
var COLOR_NONE = new NoColor()

COLOR_CYAN.cyan = 100
COLOR_MAGENTA.magenta = 100
COLOR_YELLOW.yellow = 100
COLOR_BLACK.black = 100

/**
 * Converts text to color.
 * @param {String} text text to convert.
 * @returns {CMYKColor}
 */
function parseColor(text) {
    switch (text) {
        case 'Registration':
            return getRegistrationColor()
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
 * Refer to current swatch to obtain registration color.
 * @returns {SpotColor}
 */
function getRegistrationColor() {
    return document.swatches['[registration]'].color
}

/**
 * Returns true if both CMYK colors are equal.
 * Avoid prototype function since `Color` may be `CMYKColor` or `SpotColor` (Registration).
 * @this {CMYKColor} color A.
 * @param {CMYKColor} other color B.
 * @returns {Boolean}
 */
function isColorEqual(colorA, colorB) {
    return colorA.cyan === colorB.cyan &&
        colorA.magenta === colorB.magenta &&
        colorA.yellow === colorB.yellow &&
        colorA.black === colorB.black
}