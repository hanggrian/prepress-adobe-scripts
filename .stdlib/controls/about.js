/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var ABOUT_THEMES = ["Dark", "Light"]

var SIZE_ABOUT_TAB = [400, 75]
var MARGINS_ABOUT_TAB = [10, 0, 10, 0]

/**
 * Content to display on `About....jsx`.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {String} clientDate date associated in scripts' resources for checking update.
 */
function AboutPanel(parent, clientDate) {
  var self = parent.tabbedPanel()
  self.preferencesTab, self.updatesTab, self.licensingTab, self.toolsTab
  self.statusText, self.downloadButton

  self.preferencesTab = self.vtab("Preferences", function(tab) {
    tab.preferredSize = SIZE_ABOUT_TAB
    tab.margins = MARGINS_ABOUT_TAB
    tab.alignChildren = "left"
    tab.hgroup(function(group) {
      group.tooltips("Defines what icon color to be used.\n" +
        "The script is still dumb and can't yet know UI brightness setting across apps")
      group.staticText(undefined, "Theme:", "right")
      group.dropDownList(undefined, ABOUT_THEMES).also(function(it) {
        it.selectText(configs.getString("scripts_theme", "Dark"))
        it.onChange = function() {
          configs.setString("scripts_theme", it.selection.text)
        }
      })
    })
  })
  self.updatesTab = self.vtab("Updates", function(tab) {
    tab.preferredSize = SIZE_ABOUT_TAB
    tab.margins = MARGINS_ABOUT_TAB
    tab.alignChildren = "left"
    self.statusText = tab.staticText([400, 21], "Click Check Updates to fetch data.")
    tab.hgroup(function(group) {
      group.button(undefined, "Check Updates").also(function(it) {
        it.maximumSize.height = 21
        it.onClick = function() {
          Resources.executeScript("check_updates")
          $.sleep(3000)
          var result = new File("~/prepress-adobe-scripts")
          if (!result.exists) {
            self.statusText.text = "Unable to fetch data."
          } else {
            var serverDate = parseDate(result.readText()
              .substringAfter('"date": "').substringBefore('"').substring(0, 10))
            result.remove()
            if (serverDate > clientDate) {
              self.statusText.text = "Latest version %s is available.".format(serverDate.toISOString())
              self.downloadButton.enabled = true
            } else {
              self.statusText.text = "You have the latest version."
            }
          }
        }
      })
      self.downloadButton = group.button(undefined, "Download").also(function(it) {
        it.maximumSize.height = 21
        it.enabled = false
        it.onClick = function() {
          openURL(URL_GITHUB + "/archive/refs/heads/main.zip")
        }
      })
    })
  })
  self.toolsTab = self.vtab("Tools", function(tab) {
    tab.preferredSize = SIZE_ABOUT_TAB
    tab.margins = MARGINS_ABOUT_TAB
    tab.alignChildren = "left"
  })
  self.licensingTab = self.vtab("Licensing", function(tab) {
    tab.editText(SIZE_ABOUT_TAB, Resources.get("LICENSE").readText(),
      { multiline: true, readonly: true, scrollable: true })
  })

  return self
}
