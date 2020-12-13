#include 'core.js'

var MULTIPLIER_CM = 28.346
var MULTIPLIER_INCH = 72
var MULTIPLIER_MM = 2.834645
var MULTIPLIER_PICA = 12
var MULTIPLIER_Q = 0.709

/**
 * Convert points to centimeter.
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
Number.prototype.toCm = function(fraction) {
    var n = this / MULTIPLIER_CM
    return fraction === undefined ? n : n.toFixed(fraction)
}

/**
 * Convert centimeter to points.
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
Number.prototype.fromCm = function(fraction) {
    var n = this * MULTIPLIER_CM
    return fraction === undefined ? n : n.toFixed(fraction)
}

/**
 * Convert points to inch.
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
Number.prototype.toInch = function(fraction) {
    var n = this / MULTIPLIER_INCH
    return fraction === undefined ? n : n.toFixed(fraction)
}

/**
 * Convert inch to points.
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
Number.prototype.fromInch = function(fraction) {
    var n = this * MULTIPLIER_INCH
    return fraction === undefined ? n : n.toFixed(fraction)
}

/**
 * Convert points to millimeter.
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
Number.prototype.toMm = function(fraction) {
    var n = this / MULTIPLIER_MM
    return fraction === undefined ? n : n.toFixed(fraction)
}

/**
 * Convert millimeter to points.
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
Number.prototype.fromMm = function(fraction) {
    var n = this * MULTIPLIER_MM
    return fraction === undefined ? n : n.toFixed(fraction)
}

/**
 * Convert points to pica.
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
Number.prototype.toPica = function(fraction) {
    var n = this / MULTIPLIER_PICA
    return fraction === undefined ? n : n.toFixed(fraction)
}

/**
 * Convert pica to points.
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
Number.prototype.fromPica = function(fraction) {
    var n = this * MULTIPLIER_PICA
    return fraction === undefined ? n : n.toFixed(fraction)
}

/**
 * Convert points to q.
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
Number.prototype.toQ = function(fraction) {
    var n = this / MULTIPLIER_Q
    return fraction === undefined ? n : n.toFixed(fraction)
}

/**
 * Convert q to points.
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
Number.prototype.fromQ = function(fraction) {
    var n = this * MULTIPLIER_Q
    return fraction === undefined ? n : n.toFixed(fraction)
}

/**
 * Converts text to unit value by dividing parts to value and unit type.
 * @param {String} text - text to convert
 * @param {Number} fraction - max decimal place, may be undefined
 * @return {Number}
 */
function parseUnit(text, fraction) {
    if (text.isEmpty()) {
        return 0
    }
    var separatorIndex = text.indexOf(' ')
    if (separatorIndex == -1) {
        return parseFloat(text)
    }
    var valueString = text.substring(0, separatorIndex)
    var unitString = text.substring(separatorIndex + 1)
    if (valueString == '') {
        return 0
    }
    var value = parseFloat(valueString)
    switch (unitString) {
        case '':
        case 'pt':
        case 'point':
            return fraction === undefined ? value : value.toFixed(fraction)
        case 'cm':
            return value.fromCm(fraction)
        case '"':
        case 'in':
        case 'inch':
            return value.fromInch(fraction)
        case 'mm':
            return value.fromMm(fraction)
        case 'pica':
            return value.fromPica(fraction)
        case 'q':
            return value.fromQ(fraction)
        default:
            throw 'Undefined unit ' + unitString
    }
}