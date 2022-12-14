/*
<javascriptresource>
<category>3</category>
</javascriptresource>
*/

//@target photoshop
//@include '.lib/core.js'

var dialog = new Dialog(R.string.about_scripts)
var aboutPanel

var clientDate = parseDate(Scripts.getResource('VERSION').readText())

dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.alignChildren = 'center'
    group.image(undefined, 'logo')
    group.staticText(undefined, getString(R.string.message_aboutscripts, clientDate.toISOString()),
      STYLE_MULTILINE)
  })
  aboutPanel = new AboutPanel(main, clientDate).also(function(panel) {
    panel.preferencesThemeList.addChangeListener(function() {
      preferences2.edit(function(editor) {
        editor.setBoolean('theme_dark', panel.preferencesThemeList.selection.index === 0)
      })
    })
    panel.preferencesLanguageList.addChangeListener(function() {
      preferences2.edit(function(editor) {
        var language = Language.find(panel.preferencesLanguageList.selection)
        editor.setString('language_code', language.code)
      })
      Language.set(language)
    })
    panel.preferencesActivateControl.addClickListener(function() {
      preferences2.edit(function(editor) {
        editor.setBoolean('activate_control_on_show', panel.preferencesActivateControl.value)
      })
    })
    panel.preferencesShowHelp.addClickListener(function() {
      preferences2.edit(function(editor) {
        editor.setBoolean('show_help_button', panel.preferencesShowHelp.value)
      })
    })

    panel.preferencesClearButton.addClickListener(function() {
      preferences2.edit(function(editor) {
        editor.remove('theme_dark')
        editor.remove('language_code')
        editor.remove('activate_control_on_show')
        editor.remove('show_help_button')
      })
      preferences2.resolve('images/add_bleed').edit(function(editor) { editor.remove('length') })
      Windows.alert(R.string.done, R.string.about_scripts)
    })
  })
})
dialog.setCancelButton(R.string.close) // because there is no default button
dialog.setHelpButton(R.string.visit_github, function() {
  Scripts.openUrl(Scripts.URL_GITHUB)
  return true
})
dialog.show()
