#target Illustrator
#include "../.lib/core.js"

var SIZE_INPUT = [150, 21]

var dialog = new Dialog("Add Bottom-Lock")
var widthEdit, depthEdit, horizontalLockEdit, verticalLockEdit

dialog.vgroup(function(main) {
  main.hgroup(function(topGroup) {
    topGroup.vgroup(function(midGroup) {
      midGroup.hgroup(function(group) {
        group.tooltips("Width of box")
        group.staticText(undefined, "Width:").also(JUSTIFY_RIGHT)
        widthEdit = group.editText(SIZE_INPUT, "210 mm").also(function(it) {
          it.validateUnits()
          it.activate()
        })
      })
      midGroup.hgroup(function(group) {
        group.tooltips("Depth of box")
        group.staticText(undefined, "Depth:").also(JUSTIFY_RIGHT)
        depthEdit = group.editText(SIZE_INPUT, "100 mm").also(VALIDATE_UNITS)
      })
      midGroup.hgroup(function(group) {
        group.tooltips("Length of horizontal lock")
        group.staticText(undefined, "Horizontal Lock:").also(JUSTIFY_RIGHT)
        horizontalLockEdit = group.editText(SIZE_INPUT, "20 mm").also(VALIDATE_UNITS)
      })
      midGroup.hgroup(function(group) {
        group.tooltips("Length of vertical lock")
        group.staticText(undefined, "Vertical Lock:").also(JUSTIFY_RIGHT)
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
