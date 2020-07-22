const COLOR_WHITE = new CMYKColor()

/**
 * Returns registration color from current document's swatch.
 * 
 * @return {Color}
 */
function registrationColor() {
    return document.swatches['[registration]'].color
}
