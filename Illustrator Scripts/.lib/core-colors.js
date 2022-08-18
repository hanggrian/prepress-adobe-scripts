var COLORS = [
  ["Registration", "color_registration"],
  ["White", "color_white"],
  "-",
  ["Cyan", "color_cyan"],
  ["Magenta", "color_magenta"],
  ["Yellow", "color_yellow"],
  ["Black", "color_black"]
]

var COLOR_WHITE = new CMYKColor()
var COLOR_CYAN = new CMYKColor().also(function(it) { it.cyan = 100 })
var COLOR_MAGENTA = new CMYKColor().also(function(it) { it.magenta = 100 })
var COLOR_YELLOW = new CMYKColor().also(function(it) { it.yellow = 100 })
var COLOR_BLACK = new CMYKColor().also(function(it) { it.black = 100 })
var COLOR_NONE = new NoColor()

/**
 * Converts text to color.
 * @param {String} text text to convert.
 * @returns {CMYKColor}
 */
function parseColor(text) {
  switch (text.trim()) {
    case "Registration":
      return getRegistrationColor()
    case "White":
      return COLOR_WHITE
    case "Cyan":
      return COLOR_CYAN
    case "Magenta":
      return COLOR_MAGENTA
    case "Yellow":
      return COLOR_YELLOW
    case "Black":
      return COLOR_BLACK
    default:
      return undefined
  }
}

/**
 * Refer to current swatch to obtain registration color.
 * @returns {SpotColor}
 */
function getRegistrationColor() { return document.swatches["[registration]"].color }

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
