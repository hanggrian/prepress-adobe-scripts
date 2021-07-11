#target Illustrator
#include '../.lib/ui/slider.js'
#include '../.lib/core.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [150, 21]

var dialog = new Dialog('Add Paperbag')
var widthEdit, heightEdit, depthEdit, glueEdit, lidEdit, bottomEdit

dialog.hgroup(function(topGroup) {
    topGroup.vgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
            group.setTooltips('Width of paperbag')
            group.staticText(BOUNDS_TEXT, 'Width:', JUSTIFY_RIGHT)
            widthEdit = group.editText(BOUNDS_EDIT, '210 mm', function(it) {
                it.validateUnits()
                it.activate()
            })
        })
        midGroup.hgroup(function(group) {
            group.setTooltips('Height of paperbag')
            group.staticText(BOUNDS_TEXT, 'Height:', JUSTIFY_RIGHT)
            heightEdit = group.editText(BOUNDS_EDIT, '297 mm', VALIDATE_UNITS)
        })
        midGroup.hgroup(function(group) {
            group.setTooltips('Depth of paperbag')
            group.staticText(BOUNDS_TEXT, 'Depth:', JUSTIFY_RIGHT)
            depthEdit = group.editText(BOUNDS_EDIT, '100 mm', VALIDATE_UNITS)
        })
        midGroup.hgroup(function(group) {
            group.setTooltips('Length of lid area')
            group.staticText(BOUNDS_TEXT, 'Lid:', JUSTIFY_RIGHT)
            lidEdit = group.editText(BOUNDS_EDIT, '30 mm', VALIDATE_UNITS)
        })
        midGroup.hgroup(function(group) {
            group.setTooltips('Length of glue area')
            group.staticText(BOUNDS_TEXT, 'Glue:', JUSTIFY_RIGHT)
            lidEdit = group.editText(BOUNDS_EDIT, '20 mm', VALIDATE_UNITS)
        })
        midGroup.hgroup(function(group) {
            group.setTooltips('How big should the bottom side be relative to depth, in percentage')
            group.staticText(BOUNDS_TEXT, 'Bottom:', JUSTIFY_RIGHT)
            new SliderGroup(group, BOUNDS_EDIT, 6, 0, 10, 10)
        })
    })
    topGroup.image(undefined, getResource('dieline_paperbag.png'))
})

dialog.setNegativeButton('Close')
dialog.setPositiveButton(function() {
})
dialog.show()