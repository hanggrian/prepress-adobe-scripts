/**
 * Returns given value in `centimeter` representation.
 * 
 * @param {number} value - number to convert
 * @return {number}
 */
function cm(value) {
    return value * 28.346
}

/**
 * Returns given value in `inch` representation.
 * 
 * @param {number} value - number to convert
 * @return {number}
 */
function inch(value) {
    return value * 72
}
/**
 * Returns given value in `millimeter` representation.
 * 
 * @param {number} value - number to convert
 * @return {number}
 */
function mm(value) {
    return value * 2.834645
}

/**
 * Returns given value in `pica` representation.
 * 
 * @param {number} value - number to convert
 * @return {number}
 */
function pica(value) {
    return value * 12
}

/**
 * Returns given value in `q` representation.
 * 
 * @param {number} value - number to convert
 * @return {number}
 */
function q(value) {
    return value * 0.709
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
            return cm(value)
        case '"':
        case 'in':
        case 'inch':
            return inch(value)
        case 'mm':
            return mm(value)
        case 'pica':
            return pica(value)
        case 'q':
            return q(value)
        default:
            throw 'Undefined unit ' + unit
    }
}