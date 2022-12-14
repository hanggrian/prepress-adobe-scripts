//@target illustrator
//@include '../../.lib/commons.js'

// var adobePPDs = app.PPDFileList.filter(function(it) { return it.name.startsWith('Adobe') })

var dialog = new Dialog('Export PostScript')
var saveFilePanel
var cyanCheck, magentaCheck, yellowCheck, blackCheck
var saveDirectoryGroup

dialog.vgroup(function(main) {
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'fill'
    saveFilePanel = new SaveFilePanel(rootPane, 'ps')
    rootPane.vpanel('Options', function(panel) {
      panel.hgroup(function(group) {
        group.helpTips = 'Output mode'
        group.leftStaticText(undefined, 'Mode')
        group.radioButton(undefined, 'Composite')
        group.radioButton(undefined, 'Separations').also(SELECTED)
      })
    })
    rootPane.vpanel('Process', function(panel) {
      panel.alignChildren = 'fill'
      cyanCheck = panel.checkBox(undefined, 'Cyan').also(function(it) {
        it.helpTip = 'Should ps file include cyan layer'
        it.select()
      })
      magentaCheck = panel.checkBox(undefined, 'Magenta').also(function(it) {
        it.helpTip = 'Should ps file include magenta layer'
        it.select()
      })
      yellowCheck = panel.checkBox(undefined, 'Yellow').also(function(it) {
        it.helpTip = 'Should ps file include yellow layer'
        it.select()
      })
      blackCheck = panel.checkBox(undefined, 'Black').also(function(it) {
        it.helpTip = 'Should ps file include black layer'
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
