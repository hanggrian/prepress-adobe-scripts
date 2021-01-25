/**
 * Converts text to unit value by dividing parts to value and unit type.
 * @param {String} text text to convert.
 * @param {Number} fraction max decimal place, may be undefined.
 * @return {Number}
 */
function parseUnit(text, fraction) {
    checkNotNull(text)
    if (text.isEmpty()) {
        return 0
    }
    var value = isNumeric(text)
        ? parseFloat(text)
        : UnitValue(text).as('px')
    return fraction === undefined
        ? value
        : value.toFixed(fraction)
}