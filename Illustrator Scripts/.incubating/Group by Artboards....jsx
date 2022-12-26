//@target illustrator
//@include '../.lib/commons.js'

var dialog = new Dialog('Group by Artboards')
var groupRadio, clipGroupRadio

dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.helpTips = 'Should the objects within artboards be clipped?'
    group.staticText(undefined, 'Type').apply(HEADING)
    groupRadio = group.radioButton(undefined, 'Group').apply(SELECTED)
    clipGroupRadio = group.radioButton(undefined, 'Clip Group')
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
})
dialog.show()
