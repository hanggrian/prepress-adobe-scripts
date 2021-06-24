/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

// Conventions used in this library:
// * `units` are number with unit name suffix. (e.g.: `5`, `20 mm`)
// * `unitValue` are the number. (e.g. : `5`, `20`)
// * `unitName` are the suffix. (e.g. : `pt`, `mm`)
// * `unitFullName` are the full form name. (e.g.: `Points`, `Millimeters`)

var UNITS = ['Pixels', 'Points', 'Inches', 'Millimeters', 'Centimeters']

/**
 * Build string based on unit value, name and optional fraction.
 * @param {UnitValue} unitValue native unit value.
 * @param {Number} unitName expected conversion, e.g: cm, mm, etc.
 * @param {Number} fraction max decimal place, may be undefined.
 * @returns {String}
 */
function formatUnits(unitValue, unitName, fraction) {
    checkNotNull(unitValue)
    checkNotNull(unitName)
    var value = unitValue.as(unitName)
    var s = fraction !== undefined
        ? value.toFixed(fraction)
        : value.toString()
    return parseFloat(s) + ' ' + unitName
}

/**
 * Converts units to unit value in pixels.
 * @param {String} units units to convert.
 * @returns {Number}
 */
function parseUnits(units) {
    checkNotNull(units)
    if (units.isEmpty()) {
        return 0
    }
    return units.isNumeric()
        ? parseFloat(units)
        : UnitValue(units).as('px')
}