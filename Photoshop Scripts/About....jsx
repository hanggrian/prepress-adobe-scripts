/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

#target Photoshop
#include ".lib/core.js"

var dialog = new Dialog(R.string.about_scripts)
var aboutPanel

var clientDate = parseDate(App.getResource("VERSION").readText())

dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.alignChildren = "center"
    group.image(undefined, "logo")
    group.staticText([300, 32], getString(R.string.message_aboutscripts, "Photoshop", clientDate.toISOString()),
      { multiline: true })
  })
  aboutPanel = new AboutPanel(main, clientDate).also(function(panel) {
    panel.preferencesThemeList.onChange = function() {
      configs.edit(function(editor) {
        editor.setBoolean("theme_dark", panel.preferencesThemeList.selection.index === 0)
      })
    }
    panel.preferencesLanguageList.onChange = function() {
      configs.edit(function(editor) {
        var language = Language.valueOf(panel.preferencesLanguageList.selection)
        editor.setString("language_code", language.code)
      })
      Language.set(language)
    }
    panel.preferencesClearButton.onClick = function() {
      configs.edit(function(editor) {
        editor.remove("theme_dark")
        editor.remove("language_code")
      })
      configs.resolve("images/add_bleed").edit(function(editor) { editor.remove("length") })
      Windows.alert(R.string.done, R.string.about_scripts)
    }
  })
})
dialog.setCancelButton(R.string.close) // because there is no default button
dialog.setHelpButton(R.string.visit_github, function() { App.openUrl(App.URL_GITHUB) })
dialog.show()
