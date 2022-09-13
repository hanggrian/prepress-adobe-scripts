/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include "resources/base.js"
#include "resources/plurals.js"
#include "resources/strings.js"
#include "enums.js"
#include "internals.js"

#include "collections/base.js"
#include "collections/predicate.js"
#include "collections/transform.js"
#include "controls/about.js"
#include "controls/anchor.js"
#include "controls/multi-toggles.js"
#include "io/console.js"
#include "io/file.js"
#include "io/picker.js"
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
#include "sui/window-dialog.js"
#include "sui/window-native.js"
#include "sui/window-progress.js"
#include "geometry.js"
#include "math.js"
#include "preconditions.js"
#include "properties.js"
#include "standard.js"
#include "text.js"
#include "time.js"
#include "units.js"

var Theme = Enums.of({
  DARK: { name: R.string.dark },
  LIGHT: { name: R.string.light }
})

/**
 * @param {String} code 2 letter ISO code.
 */
var Language = Enums.of({
  EN: { name: "English", code: "en" },
  ID: { name: "Indonesia", code: "id" },

  valueOfCode: function(code) { return Collections.first(this.values(), function(it) { return it.code == code }) },

  /**
   * Change scripts' localization.
   * @param {Object} language full language name.
   */
  set: function(language) {
    $.localize = true
    $.locale = language.code
  }
})

var Scripts = {
  PATH_STDLIB: new File($.fileName).path,
  PATH_LIB: undefined,
  PATH_STDRES: undefined,
  PATH_RES: undefined,

  RES_DARK: undefined,
  RES_LANG: undefined,

  OS_MAC: $.os.toLowerCase().indexOf("mac") >= 0,
  APP_AI: app.name === "Adobe Illustrator",

  URL_GITHUB: "https://github.com/hendraanggrian/prepress-adobe-scripts/",
  URL_WEBSITE: "https://hendraanggrian.github.io/prepress-adobe-scripts/",

  /**
   * Refer to a file from preferably local resources, or fallback standard resources if local resource is not found.
   * @param {String} fullName file name with folder path (if any) and extension.
   * @returns {File}
   */
  getResource: function(fullName) {
    if (this.PATH_STDRES === undefined) {
      this.PATH_STDRES = new File(this.PATH_STDLIB + "/../.stdres")
      this.PATH_RES = new File(this.PATH_LIB + "/../.res")
    }
    var file = new File(this.PATH_RES + "/" + fullName)
    if (file.exists) {
      return file
    }
    file = new File(this.PATH_STDRES + "/" + fullName)
    if (file.exists) {
      return file
    }
    return undefined
  },

  /**
   * Open URL with default browser, by writing a temporary HTML file which redirects to the URL.
   * @param {String} url URL to open.
   * @see https://community.adobe.com/t5/indesign/js-scriptui-url-links-in-dialogues/td-p/4572773?page=1
   */
  openUrl: function(url) {
    var tempFile = new File(Folder.temp.absoluteURI + "/prepress-adobe-scripts.html")
    tempFile.writeText('<html><head><META HTTP-EQUIV=Refresh CONTENT="0; URL=%s">'.format(url) +
      "</head><body> <p></body></html>")
    tempFile.execute()
  }
}
