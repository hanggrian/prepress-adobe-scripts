// Conventions used in this library:
// * `units` are number with unit name suffix. (e.g.: `5`, `20 mm`)
// * `unitValue` are the number. (e.g. : `5`, `20`)
// * `unitName` are the suffix. (e.g. : `pt`, `mm`)
// * `unitFullName` are the full form name. (e.g.: `Points`, `Millimeters`)

/**
 * Build string based on unit value, name and optional fraction.
 * @param {Number} unitValue unit value in pt.
 * @param {Number} unitName expected conversion, e.g: cm, mm, etc.
 * @param {Number} fraction max decimal place, may be undefined.
 * @returns {String}
 */
function formatUnits(unitValue, unitName, fraction) {
  checkNotNull(unitValue)
  checkNotNull(unitName)
  var value = new UnitValue(unitValue, "pt").as(unitName)
  var s = fraction !== undefined ? value.toFixed(fraction) : value.toString()
  return parseFloat(s) + " " + unitName
}

/**
 * Converts units to unit value in points.
 * @param {String} units units to convert.
 * @returns {Number}
 */
function parseUnits(units) {
  checkNotNull(units)
  units = units.trim()
  if (units.isEmpty()) {
    return undefined
  }
  return units.isNumeric() ? parseFloat(units) : UnitValue(units).as("pt")
}

/**
 * Converts text to ruler unit.
 * @param {String} unitFullName as listed in `UNITS`.
 * @returns {RulerUnits}
 */
function parseRulerUnits(unitFullName) {
  switch (unitFullName.trim()) {
    case getString(R.string.pixels):
      return RulerUnits.Pixels
    case getString(R.string.points):
      return RulerUnits.Points
    case getString(R.string.inches):
      return RulerUnits.Inches
    case getString(R.string.millimeters):
      return RulerUnits.Millimeters
    case getString(R.string.centimeters):
      return RulerUnits.Centimeters
    default:
      errorWithAlert("Unsupported units")
  }
}
