/**
 * See https://illustrator-scripting-guide.readthedocs.io/scripting/measurementUnits/
 */

function cm(value) {
    return value * 28.346
}

function inch(value) {
    return value * 72
}

function mm(value) {
    return value * 2.834645
}

function pica(value) {
    return value * 12
}

function q(value) {
    return value * 0.709
}

function parseUnit(text) {
    var value = ''
    var unit = ''
    var isUnit = false
    
    for (var i = 0; i < text.length; i++) {
        var c = text[i]
        if (c == ' ') {
            // ignore space
        } else if ((c >= '0' && c <= '9') || c == '.') {
            if (isUnit) {
                throw 'Expected letter character for unit'
            }
            value += c
        } else {
            isUnit = true
            unit += c
        }
    }

    value = value.replace(',', '.')
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