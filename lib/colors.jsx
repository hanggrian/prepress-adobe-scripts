const COLOR_WHITE = new CMYKColor()
const COLOR_BLACK = new CMYKColor()
const COLOR_NONE = new NoColor()

COLOR_BLACK.black = 100

/**
 * Returns registration color from current document's swatch.
 * 
 * @return {Color}
 */
function registrationColor() {
    return document.swatches['[registration]'].color
}

/**
 * Converts text to color.
 * 
 * @param {text} value - text to convert
 * @return {Color}
 */
function parseColor(text) {
    switch (text) {
        case 'Registration':
            return registrationColor()
        case 'White':
            return COLOR_WHITE
        case 'Black':
            return COLOR_BLACK
        default:
            return COLOR_NONE
    }
}