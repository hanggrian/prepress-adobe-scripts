#include '../.stdlib/stdlib.js'

function assertEquals(expected, actual) {
    check(expected === actual, _getMessage('`' + actual + '` to be `' + expected + '`'))
}

function assertNotEquals(expected, actual) {
    check(expected !== actual, _getMessage('`' + actual + '` to not be `' + expected + '`'))
}

function assertTrue(expected) {
    check(expected === true, _getMessage('to be true'))
}

function assertFalse(expected) {
    check(expected === false, _getMessage('to be false'))
}

function assertNull(actual) {
    checkNull(actual, _getMessage('to be null'))
}

function assertNotNull(actual) {
    checkNotNull(actual, _getMessage('to be not null'))
}

function _getMessage(message) {
    return 'TEST FAIL\nExpected ' + message
}