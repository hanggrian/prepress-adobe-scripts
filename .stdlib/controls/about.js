/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var SIZE_ABOUT_TAB = [400, 75]
var MARGINS_ABOUT_TAB = [10, 0, 10, 0]

var Abouts = {
  listThemes: function() { return [R.string.dark, R.string.light] },
  LANGUAGES: ["English", "Indonesia"]
}

/**
 * Content to display on `About....jsx`.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {String} clientDate date associated in scripts' resources for checking update.
 * @param {Function} onChangeTheme change theme preference action, the method differs each app.
 * @param {Function} onChangeLanguage change language preference action, the method differs each app.
 */
function AboutPanel(parent, clientDate, onChangeTheme, onChangeLanguage) {
  var self = parent.tabbedPanel()
  self.preferencesTab, self.updatesTab, self.licensingTab, self.toolsTab
  self.statusText, self.downloadButton

  self.preferencesTab = self.vtab(R.string.preferences, function(tab) {
    tab.preferredSize = SIZE_ABOUT_TAB
    tab.margins = MARGINS_ABOUT_TAB
    tab.alignChildren = "left"
    tab.hgroup(function(group) {
      group.tooltips(R.string.tip_aboutscripts_theme)
      group.leftStaticText(undefined, R.string.theme)
      group.dropDownList(undefined, Abouts.listThemes()).also(function(it) {
        it.selection = configs.getInt("theme")
        it.onChange = function() {
          onChangeTheme(it.selection)
        }
      })
    })
    tab.hgroup(function(group) {
      group.tooltips(R.string.tip_aboutscripts_language)
      group.leftStaticText(undefined, R.string.language)
      group.dropDownList(undefined, Abouts.LANGUAGES).also(function(it) {
        it.selectText(configs.getString("language", "English"))
        it.onChange = function() {
          onChangeLanguage(it.selection)
        }
      })
    })
  })
  self.updatesTab = self.vtab(R.string.updates, function(tab) {
    tab.preferredSize = SIZE_ABOUT_TAB
    tab.margins = MARGINS_ABOUT_TAB
    tab.alignChildren = "left"
    self.statusText = tab.staticText([400, 21], R.string.message_aboutscripts_updates)
    tab.hgroup(function(group) {
      group.button(undefined, R.string.check_updates).also(function(it) {
        it.maximumSize.height = 21
        it.onClick = function() {
          getScript("check_updates").execute()
          $.sleep(3000)
          var result = new File("~/prepress-adobe-scripts")
          if (!result.exists) {
            self.statusText.text = getString(R.string.message_aboutscripts_updates_failed)
          } else {
            var serverDate = parseDate(result.readText()
              .substringAfter('"date": "').substringBefore('"').substring(0, 10))
            result.remove()
            if (serverDate > clientDate) {
              self.statusText.text = getString(R.string.message_aboutscripts_updates_available, serverDate.toISOString())
              self.downloadButton.enabled = true
            } else {
              self.statusText.text = getString(R.string.message_aboutscripts_updates_unavailable)
            }
          }
        }
      })
      self.downloadButton = group.button(undefined, R.string.download).also(function(it) {
        it.maximumSize.height = 21
        it.enabled = false
        it.onClick = function() {
          openURL(URL_GITHUB + "/archive/refs/heads/main.zip")
        }
      })
    })
  })
  self.toolsTab = self.vtab(R.string.tools, function(tab) {
    tab.preferredSize = SIZE_ABOUT_TAB
    tab.margins = MARGINS_ABOUT_TAB
    tab.alignChildren = "left"
  })
  self.licensingTab = self.vtab(R.string.licensing, function(tab) {
    tab.editText(SIZE_ABOUT_TAB, Resources.get("LICENSE").readText(),
      { multiline: true, readonly: true, scrollable: true })
  })

  return self
}
