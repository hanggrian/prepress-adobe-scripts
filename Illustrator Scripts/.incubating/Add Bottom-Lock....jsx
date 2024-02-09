//@target illustrator
//@include '../.lib/core.js'

var SIZE_INPUT = [150, 21]

var dialog = new Dialog('Add Bottom-Lock')
var widthEdit, depthEdit, horizontalLockEdit, verticalLockEdit

dialog.vgroup(function(main) {
  main.hgroup(function(rootPane) {
    rootPane.vgroup(function(leftPane) {
      leftPane.hgroup(function(group) {
        group.helpTips = 'Width of box'
        group.staticText(undefined, 'Width').apply(HEADING)
        widthEdit =
            group.editText(SIZE_INPUT, '210 mm').apply(function(it) {
              it.validateUnits()
              it.activate()
            })
      })
      leftPane.hgroup(function(group) {
        group.helpTips = 'Depth of box'
        group.staticText(undefined, 'Depth').apply(HEADING)
        depthEdit = group.editText(SIZE_INPUT, '100 mm').apply(VALIDATE_UNITS)
      })
      leftPane.hgroup(function(group) {
        group.helpTips = 'Length of horizontal lock'
        group.staticText(undefined, 'Horizontal Lock').apply(HEADING)
        horizontalLockEdit = group.editText(SIZE_INPUT, '20 mm').apply(VALIDATE_UNITS)
      })
      leftPane.hgroup(function(group) {
        group.helpTips = 'Length of vertical lock'
        group.staticText(undefined, 'Vertical Lock').apply(HEADING)
        verticalLockEdit = group.editText(SIZE_INPUT, '20 mm').apply(VALIDATE_UNITS)
      })
    })
    rootPane.image(undefined, 'dieline_bottomlock')
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
})
dialog.show()
