UnitType.PX.rulerUnits = RulerUnits.Pixels
UnitType.PT.rulerUnits = RulerUnits.Points
UnitType.IN.rulerUnits = RulerUnits.Inches
UnitType.MM.rulerUnits = RulerUnits.Millimeters
UnitType.CM.rulerUnits = RulerUnits.Centimeters

/**
 * Build string based on unit value, name and optional fraction.
 * @param {Number} units unit value in pt.
 * @param {UnitType} unitType expected conversion, e.g: cm, mm, etc.
 * @param {Number} fraction max decimal place, may be undefined.
 * @return {String}
 */
function formatUnits(units, unitType, fraction) {
  checkNotNull(units)
  checkNotNull(unitType)
  var value = new UnitValue(units, "pt").as(unitType.qualifier)
  var s = fraction !== undefined ? value.toFixed(fraction) : value.toString()
  return parseFloat(s) + " " + unitType.qualifier
}

/**
 * Converts units to unit value in points.
 * @param {String} units units to convert.
 * @return {Number}
 */
function parseUnits(units) {
  checkNotNull(units)
  units = units.trim()
  if (units.isEmpty()) {
    return undefined
  }
  return units.isNumeric() ? parseFloat(units) : UnitValue(units).as("pt")
}
