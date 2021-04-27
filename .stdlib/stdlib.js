#include 'collections.js'
#include 'files.js'
#include 'numbers.js'
#include 'preconditions.js'
#include 'standard.js'
#include 'strings.js'
#include 'sui/controls.js'
#include 'sui/dialog.js'
#include 'sui/validator.js'
#include 'sui/dsl/button.js'
#include 'sui/dsl/dropdownlist.js'
#include 'sui/dsl/edittext.js'
#include 'sui/dsl/group.js'
#include 'sui/dsl/panel.js'
#include 'sui/dsl/space.js'
#include 'sui/dsl/statictext.js'
#include 'sui/dsl/toggle.js'

/** Returns true if this script is running on macOS. */
function isMacOS() { return $.os.toLowerCase().indexOf('mac') >= 0 }

/**
 * Returns true if value is integer or decimal.
 * @param {String} value text to check.
 */
function isNumeric(value) { return /^-{0,1}\d*\.{0,1}\d+$/.test(value) }