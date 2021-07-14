/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include 'collections/base.js'
#include 'collections/predicate.js'
#include 'collections/transform.js'

#include 'sui/base/controls.js'
#include 'sui/base/dialog.js'
#include 'sui/base/tooltip.js'
#include 'sui/base/validators.js'
#include 'sui/base-controls/button.js'
#include 'sui/base-controls/checkbox.js'
#include 'sui/base-controls/dropdownlist.js'
#include 'sui/base-controls/edittext.js'
#include 'sui/base-controls/image.js'
#include 'sui/base-controls/radiobutton.js'
#include 'sui/base-controls/slider.js'
#include 'sui/base-controls/statictext.js'
#include 'sui/base-parents/group.js'
#include 'sui/base-parents/panel.js'
#include 'sui/base-parents/tab.js'
#include 'sui/base-parents/tabbedpanel.js'
#include 'sui/about.js'
#include 'sui/anchor.js'

#include 'text/string-builder.js'
#include 'text/strings.js'

#include 'files.js'
#include 'numbers.js'
#include 'preconditions.js'
#include 'properties.js'
#include 'rectangles.js'
#include 'resources.js'
#include 'standard.js'

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