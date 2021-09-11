/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include 'collections/base.js'
#include 'collections/predicate.js'
#include 'collections/transform.js'

#include 'sui/base/control-button.js'
#include 'sui/base/control-dropdownlist.js'
#include 'sui/base/control-edittext.js'
#include 'sui/base/control-iconbutton.js'
#include 'sui/base/control-image.js'
#include 'sui/base/control-listbox.js'
#include 'sui/base/control-progressbar.js'
#include 'sui/base/control-slider.js'
#include 'sui/base/control-statictext.js'
#include 'sui/base/control-toggles.js'
#include 'sui/base/parent-group.js'
#include 'sui/base/parent-panel.js'
#include 'sui/base/parent-tab.js'
#include 'sui/base/parent-tabbedpanel.js'
#include 'sui/window/dialog-alert.js'
#include 'sui/window/dialog.js'
#include 'sui/window/palette-progress.js'
#include 'sui/about.js'
#include 'sui/anchor.js'
#include 'sui/internals.js'

#include 'text/string-builder.js'
#include 'text/strings.js'

#include 'bounds.js'
#include 'dates.js'
#include 'files.js'
#include 'numbers.js'
#include 'preconditions.js'
#include 'properties.js'
#include 'resources.js'
#include 'standard.js'

stdlibPath = new File($.fileName).path

/** True if this script is running on macOS. */
var OS_MAC = $.os.toLowerCase().indexOf('mac') >= 0