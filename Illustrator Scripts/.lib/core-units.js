UnitType.PX.rulerUnits = RulerUnits.Pixels
UnitType.PT.rulerUnits = RulerUnits.Points
UnitType.IN.rulerUnits = RulerUnits.Inches
UnitType.MM.rulerUnits = RulerUnits.Millimeters
UnitType.CM.rulerUnits = RulerUnits.Centimeters

/**
 * Build string based on unit value, name and optional fraction.
 * @param {number} unitValue unit value in pt.
 * @param {!Object} unitType enum UnitType.
 * @param {?number=} fraction max decimal place.
 * @return {string}
 */
function formatUnits(unitValue, unitType, fraction) {
  checkNotNull(unitValue)
  checkNotNull(unitType)
  var value = new UnitValue(unitValue, 'pt').as(unitType.qualifier)
  var s = fraction !== undefined ? value.toFixed(fraction) : value.toString()
  return parseFloat(s) + ' ' + unitType.qualifier
}

/**
 * Converts units to unit value in points.
 * @param {string} units units to convert.
 * @return {number}
 */
function parseUnits(units) {
  checkNotNull(units)
  units = units.trim()
  if (units.isEmpty()) {
    return undefined
  }
  return units.isNumeric() ? parseFloat(units) : new UnitValue(units).as('pt')
}
