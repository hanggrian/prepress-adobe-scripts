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
    if (fraction !== undefined) {
        value = value.toFixed(fraction)
    }
    return value.toString() + ' ' + unitName
}

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
        : UnitValue(text).as('pt')
    return fraction === undefined
        ? value
        : value.toFixed(fraction)
}