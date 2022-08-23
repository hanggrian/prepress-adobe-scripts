#target Illustrator
#include "../../.lib/commons.js"

// var adobePPDs = app.PPDFileList.filter(function(it) { return it.name.startsWith("Adobe") })

var dialog = new Dialog("Export PostScript")
var saveFilePanel
var cyanCheck, magentaCheck, yellowCheck, blackCheck
var saveDirectoryGroup

dialog.vgroup(function(main) {
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    saveFilePanel = new SaveFilePanel(topGroup, "ps")
    topGroup.vpanel("Options", function(panel) {
      panel.hgroup(function(group) {
        group.tooltips("Output mode")
        group.staticText(undefined, "Mode:").also(JUSTIFY_RIGHT)
        group.radioButton(undefined, "Composite")
        group.radioButton(undefined, "Separations").also(SELECTED)
      })
    })
    topGroup.vpanel("Process", function(panel) {
      panel.alignChildren = "fill"
      cyanCheck = panel.checkBox(undefined, "Cyan").also(function(it) {
        it.tooltip("Should ps file include cyan layer")
        it.select()
      })
      magentaCheck = panel.checkBox(undefined, "Magenta").also(function(it) {
        it.tooltip("Should ps file include magenta layer")
        it.select()
      })
      yellowCheck = panel.checkBox(undefined, "Yellow").also(function(it) {
        it.tooltip("Should ps file include yellow layer")
        it.select()
      })
      blackCheck = panel.checkBox(undefined, "Black").also(function(it) {
        it.tooltip("Should ps file include black layer")
        it.select()
      })
    })
  })
  saveDirectoryGroup = new SaveDirectoryGroup(main, [600, 21])
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var options = new PrintJobOptions()
})
dialog.show()
