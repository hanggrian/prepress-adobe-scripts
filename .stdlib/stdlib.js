#include 'collections/action.js'
#include 'collections/base.js'
#include 'collections/predicate.js'
#include 'collections/transform.js'
#include 'sui/dsl/button.js'
#include 'sui/dsl/dropdownlist.js'
#include 'sui/dsl/edittext.js'
#include 'sui/dsl/group.js'
#include 'sui/dsl/panel.js'
#include 'sui/dsl/space.js'
#include 'sui/dsl/statictext.js'
#include 'sui/dsl/toggle.js'
#include 'sui/controls.js'
#include 'sui/dialog.js'
#include 'sui/tooltip.js'
#include 'sui/validator.js'
#include 'files.js'
#include 'numbers.js'
#include 'preconditions.js'
#include 'properties.js'
#include 'standard.js'
#include 'strings.js'

/** Returns true if this script is running on macOS. */
function isMacOS() {
    return $.os.toLowerCase().indexOf('mac') >= 0
}