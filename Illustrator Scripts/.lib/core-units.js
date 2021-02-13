/**
 * Build string based on unit value, name and optional fraction.
 * @param {Number} unitValue unit value in pt.
 * @param {Number} unitName expected conversion, e.g: cm, mm, etc.
 * @param {Number} fraction max decimal place, may be undefined.
 * @return {String}
 */
function formatUnit(unitValue, unitName, fraction) {
    checkNotNull(unitValue)
    checkNotNull(unitName)
    var value = UnitValue(unitValue, 'pt').as(unitName)
    var s = fraction !== undefined
        ? value.toFixed(fraction)
        : value.toString()
    return parseFloat(s) + ' ' + unitName
}

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
        : UnitValue(text).as('pt')
}