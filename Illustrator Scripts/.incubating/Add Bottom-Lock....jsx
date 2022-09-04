#target Illustrator
#include "../.lib/core.js"

var SIZE_INPUT = [150, 21]

var dialog = new Dialog("Add Bottom-Lock")
var widthEdit, depthEdit, horizontalLockEdit, verticalLockEdit

dialog.vgroup(function(main) {
  main.hgroup(function(topGroup) {
    topGroup.vgroup(function(midGroup) {
      midGroup.hgroup(function(group) {
        group.helpTips = "Width of box"
        group.leftStaticText(undefined, "Width")
        widthEdit = group.editText(SIZE_INPUT, "210 mm").also(function(it) {
          it.validateUnits()
          it.activate()
        })
      })
      midGroup.hgroup(function(group) {
        group.helpTips = "Depth of box"
        group.leftStaticText(undefined, "Depth")
        depthEdit = group.editText(SIZE_INPUT, "100 mm").also(VALIDATE_UNITS)
      })
      midGroup.hgroup(function(group) {
        group.helpTips = "Length of horizontal lock"
        group.leftStaticText(undefined, "Horizontal Lock")
        horizontalLockEdit = group.editText(SIZE_INPUT, "20 mm").also(VALIDATE_UNITS)
      })
      midGroup.hgroup(function(group) {
        group.helpTips = "Length of vertical lock"
        group.leftStaticText(undefined, "Vertical Lock")
        verticalLockEdit = group.editText(SIZE_INPUT, "20 mm").also(VALIDATE_UNITS)
      })
    })
    topGroup.image(undefined, "dieline_bottomlock")
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
})
dialog.show()
