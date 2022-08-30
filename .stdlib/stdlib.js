/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include "collections/base.js"
#include "collections/predicate.js"
#include "collections/transform.js"

#include "controls/about.js"
#include "controls/anchor.js"
#include "controls/multi-toggles.js"

#include "io/console.js"
#include "io/file.js"
#include "io/picker.js"

#include "resources/base.js"
#include "resources/plurals.js"
#include "resources/strings.js"

#include "sui/child-button.js"
#include "sui/child-dropdownlist.js"
#include "sui/child-edittext.js"
#include "sui/child-iconbutton.js"
#include "sui/child-image.js"
#include "sui/child-listbox.js"
#include "sui/child-progressbar.js"
#include "sui/child-slider.js"
#include "sui/child-statictext.js"
#include "sui/child-toggles.js"
#include "sui/parent-group.js"
#include "sui/parent-panel.js"
#include "sui/parent-tab.js"
#include "sui/parent-tabbedpanel.js"
#include "sui/window-alert.js"
#include "sui/window-native.js"
#include "sui/window-dialog.js"
#include "sui/window-progress.js"

#include "geometry.js"
#include "internals.js"
#include "math.js"
#include "preconditions.js"
#include "properties.js"
#include "standard.js"
#include "text.js"
#include "time.js"
#include "units.js"

var PATH_STDLIB = new File($.fileName).path

/** True if this script is running on macOS. */
var OS_MAC = $.os.toLowerCase().indexOf("mac") >= 0

var URL_GITHUB = "https://github.com/hendraanggrian/prepress-adobe-scripts/"
var URL_WEBSITE = "https://hendraanggrian.github.io/prepress-adobe-scripts/"

/**
 * Create a temporary file to open url in default browser.
 * @param {String} url URL to open.
 * @see https://community.adobe.com/t5/indesign/js-scriptui-url-links-in-dialogues/td-p/4572773?page=1
 */
function openURL(url) {
  var tempFile = new File(Folder.temp.absoluteURI + "/prepress-adobe-scripts.html")
  tempFile.use("w", function(it) {
    it.write('<html><head><META HTTP-EQUIV=Refresh CONTENT="0; URL=%s"></head><body> <p></body></html>'.format(url))
  })
  tempFile.execute()
}
