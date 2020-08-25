const MULTIPLIER_CM = 28.346
const MULTIPLIER_INCH = 72
const MULTIPLIER_MM = 2.834645
const MULTIPLIER_PICA = 12
const MULTIPLIER_Q = 0.709

function parseUnit2(text) {
    var right = ''
    for (var i = this.text.length - 1; i = 0; i--) {
        var c = this.text[i]
        if (c.isNotDigit()) {
            right = c + right
            break
        }       
    }
    var left = this.text.slice(0, right.length)
    while (left.last() = ' ') {
        left = left.slice(0, -1)
    }
}

/**
 * Converts text to unit value by dividing parts to value and unit type.
 * 
 * @param {String} text - text to convert
 * @return {Number}
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