#include 'core.js'

var MULTIPLIER_CM = 28.346
var MULTIPLIER_INCH = 72
var MULTIPLIER_MM = 2.834645
var MULTIPLIER_PICA = 12
var MULTIPLIER_Q = 0.709

/**
 * Converts text to unit value by dividing parts to value and unit type.
 * @param {String} text - text to convert
 * @return {Number}
 */
function parseUnit(text) {
    if (text.length == 0) {
        return 0
    }
    var separatorIndex = text.indexOf(' ')
    if (separatorIndex == -1) {
        return parseFloat(text)
    }
    var value = text.substring(0, separatorIndex)
    var unit = text.substring(separatorIndex + 1)
    if (value == '') {
        return 0
    }
    switch (unit) {
        case '':
        case 'pt':
        case 'point':
            return parseFloat(value)
        case 'cm':
            return value * MULTIPLIER_CM
        case '"':
        case 'in':
        case 'inch':
            return value * MULTIPLIER_INCH
        case 'mm':
            return value * MULTIPLIER_MM
        case 'pica':
            return value * MULTIPLIER_PICA
        case 'q':
            return value * MULTIPLIER_Q
        default:
            throw 'Undefined unit ' + unit
    }
}