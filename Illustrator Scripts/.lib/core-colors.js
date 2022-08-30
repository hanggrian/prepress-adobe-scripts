var Colors = {
  list: function () {
    return [
      [R.string.registration, "color_registration"],
      [R.string.white, "color_white"],
      "-",
      [R.string.cyan, "color_cyan"],
      [R.string.magenta, "color_magenta"],
      [R.string.yellow, "color_yellow"],
      [R.string.black, "color_black"]
    ]
  },
  WHITE: new CMYKColor(),
  CYAN: new CMYKColor().also(function (it) { it.cyan = 100 }),
  MAGENTA: new CMYKColor().also(function (it) { it.magenta = 100 }),
  YELLOW: new CMYKColor().also(function (it) { it.yellow = 100 }),
  BLACK: new CMYKColor().also(function (it) { it.black = 100 }),
  NONE: new NoColor()
}

/**
 * Converts text to color.
 * @param {String} text text to convert.
 * @returns {CMYKColor}
 */
function parseColor(text) {
  switch (text.trim()) {
    case getString(R.string.registration):
      return getRegistrationColor()
    case getString(R.string.white):
      return Colors.WHITE
    case getString(R.string.cyan):
      return Colors.CYAN
    case getString(R.string.magenta):
      return Colors.MAGENTA
    case getString(R.string.yellow):
      return Colors.YELLOW
    case getString(R.string.black):
      return Colors.BLACK
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
