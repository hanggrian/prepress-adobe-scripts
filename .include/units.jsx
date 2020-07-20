const MULTIPLIER_CM = 28.346
const MULTIPLIER_INCH = 72
const MULTIPLIER_MM = 2.834645
const MULTIPLIER_PICA = 12
const MULTIPLIER_Q = 0.709

/**
 * Converts `centimeter` value to `point`.
 * 
 * @param {number} cm - number to convert
 * @return {number}
 */
function fromCm(cm) {
    return cm * MULTIPLIER_CM
}

/**
 * Converts `point` value to `centimeter`.
 * 
 * @param {number} pt - number to convert
 * @return {number}
 */
function toCm(pt) {
    return pt / MULTIPLIER_CM
}

/**
 * Converts `inch` value to `point`.
 * 
 * @param {number} inch - number to convert
 * @return {number}
 */
function fromInch(inch) {
    return inch * MULTIPLIER_INCH
}

/**
 * Converts `point` value to `inch`.
 * 
 * @param {number} pt - number to convert
 * @return {number}
 */
function toInch(pt) {
    return pt / MULTIPLIER_INCH
}

/**
 * Converts `millimeter` value to `point`.
 * 
 * @param {number} mm - number to convert
 * @return {number}
 */
function fromMm(mm) {
    return mm * MULTIPLIER_MM
}

/**
 * Converts `point` value to `millimeter`.
 * 
 * @param {number} pt - number to convert
 * @return {number}
 */
function toMm(pt) {
    return pt / MULTIPLIER_MM
}

/**
 * Converts `pica` value to `point`.
 * 
 * @param {number} pica - number to convert
 * @return {number}
 */
function fromPica(pica) {
    return pica * MULTIPLIER_PICA
}

/**
 * Converts `point` value to `pica`.
 * 
 * @param {number} pt - number to convert
 * @return {number}
 */
function toPica(pt) {
    return pt / MULTIPLIER_PICA
}

/**
 * Converts `q` value to `point`.
 * 
 * @param {number} q - number to convert
 * @return {number}
 */
function fromQ(q) {
    return q * MULTIPLIER_Q
}

/**
 * Converts `point` value to `q`.
 * 
 * @param {number} pt - number to convert
 * @return {number}
 */
function toQ(pt) {
    return pt / MULTIPLIER_Q
}

/**
 * Converts text to unit value by dividing parts to value and unit type.
 * 
 * @param {text} value - text to convert
 * @return {number}
 */
function parseUnit(text) {
    var value = ''
    var unit = ''
    var isUnit = false
    
    for (var i = 0; i < text.length; i++) {
        var c = text[i]
        if (c == ' ') {
            // ignore space
        } else if ((c >= '0' && c <= '9') || c == '.' || c == ',') {
            if (isUnit) {
                throw 'Expected letter character for unit'
            }
            value += c
        } else {
            isUnit = true
            unit += c
        }
    }

    if (value == '') {
        return 0
    } else {
        value = value.replace(',', '.')
    }

    switch (unit) {
        case '':
        case 'pt':
        case 'point':
            return parseFloat(value)
        case 'cm':
            return fromCm(value)
        case '"':
        case 'in':
        case 'inch':
            return fromInch(value)
        case 'mm':
            return fromMm(value)
        case 'pica':
            return fromPica(value)
        case 'q':
            return fromQ(value)
        default:
            throw 'Undefined unit ' + unit
    }
}