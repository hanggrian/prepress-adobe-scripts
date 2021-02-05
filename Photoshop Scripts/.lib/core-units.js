/**
 * Converts text to unit value by dividing parts to value and unit type.
 * @param {String} text text to convert.
 * @return {Number}
 */
function parseUnit(text) {
    checkNotNull(text)
    if (text.isEmpty()) {
        return 0
    }
    return isNumeric(text)
        ? parseFloat(text)
        : UnitValue(text).as('px')
}