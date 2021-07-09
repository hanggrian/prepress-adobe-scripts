/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include 'sui/dsl-parents/group.js'
#include 'sui/dsl-parents/panel.js'
#include 'sui/dsl-parents/tab.js'
#include 'sui/dsl-parents/tabbedpanel.js'

#include 'sui/dsl-controls/button.js'
#include 'sui/dsl-controls/checkbox.js'
#include 'sui/dsl-controls/dropdownlist.js'
#include 'sui/dsl-controls/edittext.js'
#include 'sui/dsl-controls/image.js'
#include 'sui/dsl-controls/radiobutton.js'
#include 'sui/dsl-controls/slider.js'
#include 'sui/dsl-controls/statictext.js'

#include 'sui/controls.js'
#include 'sui/dialog.js'
#include 'sui/tooltip.js'
#include 'sui/validator.js'

#include 'collections.js'
#include 'collections-predicate.js'
#include 'collections-transform.js'
#include 'files.js'
#include 'numbers.js'
#include 'preconditions.js'
#include 'properties.js'
#include 'rectangles.js'
#include 'resources.js'
#include 'standard.js'
#include 'strings.js'

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