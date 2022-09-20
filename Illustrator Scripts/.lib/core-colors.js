/**
 * @param {Function} getValue callable to return `CMYKColor`.
 */
var Color2 = new Enum({
  REGISTRATION: {
    name: R.string.registration,
    image: "color_registration",
    getValue: function() { return document.swatches["[registration]"].color }
  },
  WHITE: {
    name: R.string.white,
    image: "color_white",
    getValue: function() { return new CMYKColor() }
  },
  CYAN: {
    name: R.string.cyan,
    image: "color_cyan",
    getValue: function() { return new CMYKColor().also(function (it) { it.cyan = 100 }) }
  },
  MAGENTA: {
    name: R.string.magenta,
    image: "color_magenta",
    getValue: function() { return new CMYKColor().also(function (it) { it.magenta = 100 }) }
  },
  YELLOW: {
    name: R.string.yellow,
    image: "color_yellow",
    getValue: function() { return new CMYKColor().also(function (it) { it.yellow = 100 }) }
  },
  BLACK: {
    name: R.string.black,
    image: "color_black",
    getValue: function() { return new CMYKColor().also(function (it) { it.black = 100 }) }
  }
}, [1])

/**
 * Returns true if both CMYK colors are equal.
 * Avoid prototype function since `Color` may be `CMYKColor`, `RGBColor` or `SpotColor`.
 * @param {CMYKColor} colorA first color.
 * @param {CMYKColor} colorB second color.
 * @return {Boolean}
 */
function isColorEqual(colorA, colorB) {
  println("Comparing color cyan=[%d,%d] magenta=[%d,%d] yellow=[%d,%d] black=[%d,%d]",
    colorA.cyan, colorB.cyan, colorA.magenta, colorB.magenta, colorA.yellow, colorB.yellow, colorA.black, colorB.black)
  return colorA.cyan === colorB.cyan &&
    colorA.magenta === colorB.magenta &&
    colorA.yellow === colorB.yellow &&
    colorA.black === colorB.black
}
