#target Illustrator
#include '.lib/core.js'

var dialog = new Dialog('About Scripts')
var aboutPanel

var clientDate = parseDate(getResource('VERSION').readText())

dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.alignChildren = 'center'
    group.image(undefined, 'logo')
    group.staticText([300, 32], 'Prepress Adobe Scripts for Illustrator\nLast updated ' + clientDate.toISOString(), { multiline: true })
  })
  aboutPanel = new AboutTabbedPanel(main, clientDate)
  aboutPanel.main.vtab('Tools', function(tab) {
    tab.preferredSize = BOUNDS_ABOUT_TAB
    tab.margins = MARGINS_ABOUT_TAB
    tab.alignChildren = 'left'
    tab.button(undefined, 'Disable External JSX Warning').also(function(it) {
      it.onClick = function() {
        app.preferences.setBooleanPreference('ShowExternalJSXWarning', false)
        alert('Done', 'About Scripts')
      }
    })
  })
})
dialog.setCancelButton('Close') // because there is no default button
dialog.setHelpButton('Visit GitHub', function() { openURL(URL_GITHUB) })
dialog.show()
