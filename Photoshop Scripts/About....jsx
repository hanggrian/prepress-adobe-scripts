/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

#target Photoshop
#include ".lib/core.js"

var dialog = new Dialog(R.string.aboutscripts)
var aboutPanel

var clientDate = parseDate(Resources.get("VERSION").readText())
var onChangeTheme = function(selection) { configs.edit(function(it) { it.setInt("theme", selection.index) }) }
var onChangeLanguage = function(selection) { configs.edit(function(it) { it.setString("language", selection.text) }) }

dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.alignChildren = "center"
    group.image(undefined, "logo")
    group.staticText([300, 32], getString(R.string.message_aboutscripts, "Photoshop", clientDate.toISOString()),
      { multiline: true })
  })
  aboutPanel = new AboutPanel(main, clientDate, onChangeTheme, onChangeLanguage).also(function(panel) {
    panel.toolsTab.button(undefined, R.string.clear_preferences).also(function(it) {
      it.maximumSize.height = 21
      it.onClick = function() {
        configs.resolve("images/add_bleed").edit(function(it) {
          it.remove("length")
        })
        Windows.alert(R.string.done, R.string.about_scripts)
      }
    })
  })
})
dialog.setCancelButton(R.string.close) // because there is no default button
dialog.setHelpButton(R.string.visit_github, function() { openURL(URL_GITHUB) })
dialog.show()
