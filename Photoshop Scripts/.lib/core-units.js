UnitType.PX.units = Units.PIXELS
UnitType.PT.units = Units.POINTS
UnitType.IN.units = Units.INCHES
UnitType.MM.units = Units.MM
UnitType.CM.units = Units.CM

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
  var value = unitValue.as(unitType.qualifier)
  var s = fraction !== undefined ? value.toFixed(fraction) : value.toString()
  return parseFloat(s) + ' ' + unitType.qualifier
}

/**
 * Converts units to unit value in pixels.
 * @param {string} units units to convert.
 * @return {number}
 */
function parseUnits(units) {
  checkNotNull(units)
  units = units.trim()
  if (units.isEmpty()) {
    return undefined
  }
  return units.isNumeric() ? parseFloat(units) : new UnitValue(units).as('px')
}
