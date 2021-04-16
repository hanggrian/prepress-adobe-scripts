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