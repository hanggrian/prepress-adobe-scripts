/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

UnitType.PX.units = Units.PIXELS
UnitType.PT.units = Units.POINTS
UnitType.IN.units = Units.INCHES
UnitType.MM.units = Units.MM
UnitType.CM.units = Units.CM

/**
 * Build string based on unit value, name and optional fraction.
 * @param {UnitValue} unitValue native unit value.
 * @param {UnitType} unitType expected conversion, e.g: cm, mm, etc.
 * @param {Number} fraction max decimal place, may be null.
 * @return {String}
 */
function formatUnits(unitValue, unitType, fraction) {
  checkNotNull(unitValue)
  checkNotNull(unitType)
  var value = unitValue.as(unitType.qualifier)
  var s = fraction !== undefined ? value.toFixed(fraction) : value.toString()
  return parseFloat(s) + " " + unitType.qualifier
}

/**
 * Converts units to unit value in pixels.
 * @param {String} units units to convert.
 * @return {Number}
 */
function parseUnits(units) {
  checkNotNull(units)
  units = units.trim()
  if (units.isEmpty()) {
    return undefined
  }
  return units.isNumeric() ? parseFloat(units) : UnitValue(units).as("px")
}
