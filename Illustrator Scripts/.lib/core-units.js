// Conventions used in this library:
// * `units` are number with unit name suffix. (e.g.: `5`, `20 mm`)
// * `unitValue` are the number. (e.g. : `5`, `20`)
// * `unitName` are the suffix. (e.g. : `pt`, `mm`)
// * `unitFullName` are the full form name. (e.g.: `Points`, `Millimeters`)

UnitType.PIXELS.rulerUnits = RulerUnits.Pixels
UnitType.POINTS.rulerUnits = RulerUnits.Points
UnitType.INCHES.rulerUnits = RulerUnits.Inches
UnitType.MILLIMETERS.rulerUnits = RulerUnits.Millimeters
UnitType.CENTIMETERS.rulerUnits = RulerUnits.Centimeters

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
