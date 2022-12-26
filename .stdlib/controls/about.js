/*<javascriptresource><menu>hide</menu></javascriptresource>*/

var SIZE_ABOUT_TAB = [400, 100]
var MARGINS_ABOUT_TAB = [10, 0, 10, 0]

/**
 * Content to display on `About....jsx`.
 * Because preferences are kept differently across app, implement its saving logic in `About....jsx`.
 * @param {!Group|!Panel|!Window} parent
 * @param {!Date} clientDate date associated in scripts' resources for checking update.
 */
function AboutPanel(parent, clientDate) {
  checkNotNull(parent)
  checkNotNull(clientDate)

  var self = parent.tabbedPanel()
  self.preferencesTab, self.preferencesThemeList, self.preferencesLanguageList,
    self.preferencesActivateControl, self.preferencesClearButton
  self.updatesTab, self.updatesStatusText, self.updatesDownloadButton
  self.licensingTab

  self.preferencesTab = self.vtab(R.string.preferences, function(tab) {
    tab.preferredSize = SIZE_ABOUT_TAB
    tab.margins = MARGINS_ABOUT_TAB
    tab.alignChildren = 'left'
    tab.hgroup(function(group) {
      group.helpTips = R.string.tip_aboutscripts_theme
      group.staticText(undefined, R.string.theme).apply(HEADING)
      self.preferencesThemeList = group.dropDownList(undefined, Theme.list()).apply(function(it) {
        it.selection = preferences2.getBoolean('theme_dark') ? 0 : 1
      })
      group.sgroup()
      group.helpTips = R.string.tip_aboutscripts_language
      group.staticText(undefined, R.string.language).apply(HEADING)
      self.preferencesLanguageList = group.dropDownList(undefined, Language.list())
        .apply(function(it) {
          var currentCode = preferences2.getString('language_code', Language.EN.code)
          it.selectText(Language.valueOfCode(currentCode).text)
        })
    })
    tab.hgroup(function(group) {
      group.helpTips = R.string.tip_aboutscripts_activatecontrolonstart
      self.preferencesActivateControl = group.checkBox(undefined,
        R.string.activate_control_on_start).apply(function(it) {
        it.value = preferences2.getBoolean('activate_control_on_start')
      })
    })
    self.preferencesClearButton = tab.button(undefined, R.string.clear_preferences)
      .apply(function(it) {
        it.maximumSize.height = 20
      })
  })
  self.updatesTab = self.vtab(R.string.updates, function(tab) {
    tab.preferredSize = SIZE_ABOUT_TAB
    tab.margins = MARGINS_ABOUT_TAB
    tab.alignChildren = 'left'
    self.updatesStatusText = tab.staticText([400, 21], R.string.message_aboutscripts_updates)
    tab.hgroup(function(group) {
      group.button(undefined, R.string.check_updates).apply(function(it) {
        it.maximumSize.height = 20
        it.addClickListener(function() {
          getScript('check_updates').execute()
          $.sleep(3000)
          var updateFile = new File('~/prepress-adobe-scripts')
          if (!updateFile.exists) {
            self.updatesStatusText.text = R.string.message_aboutscripts_updates_failed
          } else {
            var serverDate = parseDate(updateFile.readText()
              .substringAfter('"date": "').substringBefore('"').substring(0, 10))
            updateFile.remove()
            if (serverDate > clientDate) {
              self.updatesStatusText.text =
                getString(R.string.message_aboutscripts_updates_available, serverDate.toISOString())
              self.updatesDownloadButton.enabled = true
            } else {
              self.updatesStatusText.text = R.string.message_aboutscripts_updates_unavailable
            }
          }
        })
      })
      self.updatesDownloadButton = group.button(undefined, R.string.download).apply(function(it) {
        it.maximumSize.height = 20
        it.enabled = false
        it.addClickListener(function() {
          Scripts.openUrl(Scripts.URL_GITHUB + 'archive/refs/heads/main.zip')
        })
      })
    })
  })
  self.licensingTab = self.vtab(R.string.licensing, function(tab) {
    tab.editText(SIZE_ABOUT_TAB, Scripts.getResource('LICENSE').readText(),
      { multiline: true, readonly: true, scrollable: true })
  })

  return self
}
