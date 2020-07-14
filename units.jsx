/**
 * See https://illustrator-scripting-guide.readthedocs.io/scripting/measurementUnits/
 */

#target Illustrator

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
    var isCharacterUnit = false
    
    for (var i = 0; i < text.length; i++) {
        var c = text[i]
        if (c == ' ') {
            // ignore space
        } else if ((c >= '0' && c <= '9') || c == '.') {
            if (isCharacterUnit) {
                throw 'Expected letter character for unit'
            }
            value += c
        } else {
            isCharacterUnit = true
            unit += c
        }
    }

    if (unit == '' || unit == 'pt' || unit == 'point') {
        return value
    } else if (unit == 'cm') {
        return cm(value)
    } else if (unit == '"' || unit == 'in' || unit == 'inch') {
        return inch(value)
    } else if (unit == 'mm') {
        return mm(value)
    } else if (unit == 'pica') {
        return pica(value)
    } else if (unit == 'q') {
        return q(value)
    } else {
        throw 'Undefined unit ' + unit
    }
}