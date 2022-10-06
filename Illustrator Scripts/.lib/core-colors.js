var Color2 = new Enum({
  REGISTRATION: {
    text: R.string.registration,
    image: "color_registration",
    get: function() { return document.swatches['[registration]'].color }
  },
  WHITE: {
    text: R.string.white,
    image: "color_white",
    get: function() { return new CMYKColor() }
  },
  CYAN: {
    text: R.string.cyan,
    image: "color_cyan",
    get: function() { return new CMYKColor().also(function (it) { it.cyan = 100 }) }
  },
  MAGENTA: {
    text: R.string.magenta,
    image: "color_magenta",
    get: function() { return new CMYKColor().also(function (it) { it.magenta = 100 }) }
  },
  YELLOW: {
    text: R.string.yellow,
    image: "color_yellow",
    get: function() { return new CMYKColor().also(function (it) { it.yellow = 100 }) }
  },
  BLACK: {
    text: R.string.black,
    image: "color_black",
    get: function() { return new CMYKColor().also(function (it) { it.black = 100 }) }
  }
}, [1])

/**
 * Returns true if both CMYK colors are equal.
 * Avoid prototype function since `Color` may be `CMYKColor`, `RGBColor` or `SpotColor`.
 * @param {!CMYKColor} colorA
 * @param {!CMYKColor} colorB
 * @return {boolean}
 */
function isColorEqual(colorA, colorB) {
  checkNotNull(colorA)
  checkNotNull(colorB)
  println('Comparing color cyan=[%d,%d] magenta=[%d,%d] yellow=[%d,%d] black=[%d,%d]',
    colorA.cyan, colorB.cyan, colorA.magenta, colorB.magenta, colorA.yellow, colorB.yellow, colorA.black, colorB.black)
  return colorA.cyan === colorB.cyan &&
    colorA.magenta === colorB.magenta &&
    colorA.yellow === colorB.yellow &&
    colorA.black === colorB.black
}
