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
#include 'sui/about.js'
#include 'sui/anchor.js'
#include 'sui/dialog.js'
#include 'sui/internal.js'

#include 'text/string-builder.js'
#include 'text/strings.js'

#include 'dates.js'
#include 'files.js'
#include 'numbers.js'
#include 'preconditions.js'
#include 'properties.js'
#include 'rectangles.js'
#include 'resources.js'
#include 'standard.js'

stdlibPath = new File($.fileName).path
supportPath = new File(stdlibPath + '/../.support-files')

/** Returns true if this script is running on macOS. */
function isMacOS() {
    return $.os.toLowerCase().indexOf('mac') >= 0
}

// https://community.adobe.com/t5/indesign/js-scriptui-url-links-in-dialogues/td-p/4572773?page=1
function openURL(url) {
    linkJumper = new File(Folder.temp.absoluteURI + '/link.html')
    linkJumper.open('w')
    var linkBody = '<html><head><META HTTP-EQUIV=Refresh CONTENT="0; URL=' + url + '"></head><body> <p></body></html>'
    linkJumper.write(linkBody)
    linkJumper.close()
    linkJumper.execute()
}