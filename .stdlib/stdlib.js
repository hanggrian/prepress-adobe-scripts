/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include 'resources/base.js'
#include 'resources/plurals.js'
#include 'resources/strings.js'
#include 'enums.js'
#include 'internals.js'

#include 'collections/base.js'
#include 'collections/predicate.js'
#include 'collections/transform.js'
#include 'controls/about.js'
#include 'controls/anchor.js'
#include 'controls/multi-toggles.js'
#include 'io/console.js'
#include 'io/file.js'
#include 'io/picker.js'
#include 'sui/child-button.js'
#include 'sui/child-dropdownlist.js'
#include 'sui/child-edittext.js'
#include 'sui/child-iconbutton.js'
#include 'sui/child-image.js'
#include 'sui/child-listbox.js'
#include 'sui/child-progressbar.js'
#include 'sui/child-slider.js'
#include 'sui/child-statictext.js'
#include 'sui/child-toggles.js'
#include 'sui/parent-group.js'
#include 'sui/parent-panel.js'
#include 'sui/parent-tab.js'
#include 'sui/parent-tabbedpanel.js'
#include 'sui/window-builtin.js'
#include 'sui/window-dialog.js'
#include 'sui/window-palette.js'
#include 'geometry.js'
#include 'math.js'
#include 'objects.js'
#include 'preconditions.js'
#include 'standard.js'
#include 'text.js'
#include 'time.js'
#include 'units.js'

var Theme = new Enum({
  DARK: { text: R.string.dark },
  LIGHT: { text: R.string.light }
})

var Language = new Enum({
  EN: { text: "English", code: "en" },
  ID: { text: "Indonesia", code: "id" },

  valueOfCode: function(code) { return Collections.first(Language.values(), function(it) { return it.code == code }) },

  /**
   * Change scripts' localization.
   * @param {!Object} language enum Language.
   */
  set: function(language) {
    checkNotNull(language)
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

  OS_MAC: $.os.toLowerCase().indexOf('mac') >= 0,
  APP_AI: app.name === 'Adobe Illustrator',

  URL_GITHUB: 'https://github.com/hendraanggrian/prepress-adobe-scripts/',
  URL_WEBSITE: 'https://hendraanggrian.github.io/prepress-adobe-scripts/',

  /**
   * Refer to a file from preferably local resources, or fallback standard resources if local resource is not found.
   * @param {string} fullName
   * @return {!File}
   */
  getResource: function(fullName) {
    checkNotNull(fullName)
    if (Scripts.PATH_STDRES === undefined) {
      Scripts.PATH_STDRES = new File(Scripts.PATH_STDLIB + '/../.stdres')
      Scripts.PATH_RES = new File(Scripts.PATH_LIB + '/../.res')
    }
    var file = new File(Scripts.PATH_RES + '/' + fullName)
    if (file.exists) {
      return file
    }
    file = new File(Scripts.PATH_STDRES + '/' + fullName)
    if (file.exists) {
      return file
    }
    return undefined
  },

  /**
   * Open URL with default browser, by writing a temporary HTML file which redirects to the URL.
   * @param {string} url
   * @see https://community.adobe.com/t5/indesign/js-scriptui-url-links-in-dialogues/td-p/4572773?page=1
   */
  openUrl: function(url) {
    checkNotNull(url)
    var tempFile = new File(Folder.temp.absoluteURI + '/prepress-adobe-scripts.html')
    tempFile.writeText('<html><head><META HTTP-EQUIV=Refresh CONTENT="0; URL=%s">'.format(url) +
      '</head><body> <p></body></html>')
    tempFile.execute()
  }
}
