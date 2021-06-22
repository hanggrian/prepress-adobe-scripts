exports.assertEquals = function(expected, actual) {
    if (expected !== actual) {
        error('`' + actual + '` to be `' + expected + '`')
    }
}

exports.assertNotEquals = function(expected, actual) {
    if (expected === actual) {
        error('`' + actual + '` to not be `' + expected + '`')
    }
}

exports.assertTrue = function(expected) {
    if (!expected) {
        error('to be true')
    }
}

exports.assertFalse = function(expected) {
    if (expected) {
        error('to be false')
    }
}

exports.assertNull = function(actual) {
    if (actual !== undefined && actual !== null) {
        error('to be null')
    }
}

exports.assertNotNull = function(actual) {
    if (actual === undefined || actual === null) {
        error('to be not null')
    }
}

function error(message) {
    throw new Error('TEST FAIL\nExpected ' + message)
}