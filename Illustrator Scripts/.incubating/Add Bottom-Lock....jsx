#target Illustrator
#include '../.lib/core.js'

var BOUNDS_TEXT = [100, 21]
var BOUNDS_EDIT = [150, 21]

var dialog = new Dialog('Add Bottom-Lock')
var widthEdit, depthEdit, horizontalLockEdit, verticalLockEdit

dialog.vgroup(function(main) {
    main.hgroup(function(topGroup) {
        topGroup.vgroup(function(midGroup) {
            midGroup.hgroup(function(group) {
                group.setTooltips('Width of box')
                group.staticText(BOUNDS_TEXT, 'Width:').also(JUSTIFY_RIGHT)
                widthEdit = group.editText(BOUNDS_EDIT, '210 mm').also(function(it) {
                    it.validateUnits()
                    it.activate()
                })
            })
            midGroup.hgroup(function(group) {
                group.setTooltips('Depth of box')
                group.staticText(BOUNDS_TEXT, 'Depth:').also(JUSTIFY_RIGHT)
                depthEdit = group.editText(BOUNDS_EDIT, '100 mm').also(VALIDATE_UNITS)
            })
            midGroup.hgroup(function(group) {
                group.setTooltips('Length of horizontal lock')
                group.staticText(BOUNDS_TEXT, 'Horizontal Lock:').also(JUSTIFY_RIGHT)
                horizontalLockEdit = group.editText(BOUNDS_EDIT, '20 mm').also(VALIDATE_UNITS)
            })
            midGroup.hgroup(function(group) {
                group.setTooltips('Length of vertical lock')
                group.staticText(BOUNDS_TEXT, 'Vertical Lock:').also(JUSTIFY_RIGHT)
                verticalLockEdit = group.editText(BOUNDS_EDIT, '20 mm').also(VALIDATE_UNITS)
            })
        })
        topGroup.image(undefined, getResource('dieline_bottomlock.png'))
    })
})
dialog.setNegativeButton('Close')
dialog.setPositiveButton(function() {
})
dialog.show()