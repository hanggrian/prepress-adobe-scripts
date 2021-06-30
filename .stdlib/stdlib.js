/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include 'sui/dsl/button.js'
#include 'sui/dsl/dropdownlist.js'
#include 'sui/dsl/edittext.js'
#include 'sui/dsl/group.js'
#include 'sui/dsl/image.js'
#include 'sui/dsl/panel.js'
#include 'sui/dsl/space.js'
#include 'sui/dsl/statictext.js'
#include 'sui/dsl/toggle.js'
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
#include 'standard.js'
#include 'strings.js'

/** Returns true if this script is running on macOS. */
function isMacOS() {
    return $.os.toLowerCase().indexOf('mac') >= 0
}

// https://community.adobe.com/t5/indesign/js-scriptui-url-links-in-dialogues/td-p/4572773?page=1
function openURL(url) {
    linkJumper = File(Folder.temp.absoluteURI + '/link.html')
    linkJumper.open('w')
    var linkBody = '<html><head><META HTTP-EQUIV=Refresh CONTENT="0; URL=' + url + '"></head><body> <p></body></html>'
    linkJumper.write(linkBody)
    linkJumper.close()
    linkJumper.execute()
}