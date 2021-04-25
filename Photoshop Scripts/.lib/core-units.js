// Conventions used in this library:
// * `units` are number with unit name suffix. (e.g.: `5`, `20 mm`)
// * `unitValue` are the number. (e.g. : `5`, `20`)
// * `unitName` are the suffix. (e.g. : `pt`, `mm`)
// * `unitFullName` are the full form name. (e.g.: `Points`, `Millimeters`)

/**
 * Converts units to unit value in points.
 * @param {String} units units to convert.
 * @return {Number}
 */
function parseUnits(units) {
    checkNotNull(units)
    if (units.isEmpty()) {
        return 0
    }
    return isNumeric(units)
        ? parseFloat(units)
        : UnitValue(units).as('px')
}