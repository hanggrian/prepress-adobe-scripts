/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include 'collections/base.js'
#include 'collections/predicate.js'
#include 'collections/transform.js'

#include 'io/console.js'
#include 'io/file.js'
#include 'io/picker.js'

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
#include 'sui/base/parent-radioscheckbox.js'
#include 'sui/base/parent-tab.js'
#include 'sui/base/parent-tabbedpanel.js'
#include 'sui/window/dialog-alert.js'
#include 'sui/window/dialog.js'
#include 'sui/window/palette-progress.js'
#include 'sui/about.js'
#include 'sui/anchor.js'
#include 'sui/internals.js'

#include 'geometry.js'
#include 'math.js'
#include 'preconditions.js'
#include 'properties.js'
#include 'resources.js'
#include 'standard.js'
#include 'text.js'
#include 'time.js'

stdlibPath = new File($.fileName).path

/** True if this script is running on macOS. */
var OS_MAC = $.os.toLowerCase().indexOf('mac') >= 0

var URL_GITHUB = 'https://github.com/hendraanggrian/prepress-adobe-scripts'
var URL_WEBSITE = 'https://hendraanggrian.github.io/prepress-adobe-scripts'

/**
 * Create a temporary file to open url in default browser.
 * @param {String} url URL to open.
 * @see https://community.adobe.com/t5/indesign/js-scriptui-url-links-in-dialogues/td-p/4572773?page=1
 */
function openURL(url) {
    var tempFile = new File(Folder.temp.absoluteURI + '/prepress-adobe-scripts.html')
    tempFile.use('w', function(it) {
        it.write('<html><head><META HTTP-EQUIV=Refresh CONTENT="0; URL=' + url + '"></head><body> <p></body></html>')
    })
    tempFile.execute()
}