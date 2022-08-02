/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

#target Photoshop
#include '.lib/core.js'

var dialog = new Dialog('About Scripts')
var aboutPanel

var clientDate = parseDate(getResource('VERSION').readText())

dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.alignChildren = 'center'
    group.image(undefined, 'logo')
    group.staticText([300, 32], 'Prepress Adobe Scripts for Photoshop\nLast updated ' + clientDate.toISOString(), { multiline: true })
  })
  aboutPanel = new AboutTabbedPanel(main, clientDate).also(function(panel) {
    panel.toolsTab.button(undefined, 'Clear Preferences').also(function(it) {
      it.maximumSize.height = 21
      it.onClick = function() {
        preferences2.resolve('images/add_bleed').edit(function(it) {
          it.remove('length')
        })
        alert('Done', 'About Scripts')
      }
    })
  })
})
dialog.setCancelButton('Close') // because there is no default button
dialog.setHelpButton('Visit GitHub', function() { openURL(URL_GITHUB) })
dialog.show()
