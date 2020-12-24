#include 'core-collections.js'
#include 'core-preconditions.js'
#include 'core-strings.js'

/** Returns true if this script is running on macOS. */
function isMacOS() { return $.os.toLowerCase().indexOf('mac') >= 0 }

/**
 * Returns true if value is integer or decimal.
 * @param {String} value text to check.
 */
function isNumeric(value) { return /^-{0,1}\d*\.{0,1}\d+$/.test(value) }