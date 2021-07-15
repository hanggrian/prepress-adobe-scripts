#target Illustrator
#include '../.lib/core.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [150, 21]

var dialog = new Dialog('Add Paperbag')
var widthEdit, heightEdit, depthEdit, glueEdit, lidEdit, bottomEdit

dialog.vgroup(function(main) {
    main.hgroup(function(topGroup) {
        topGroup.vgroup(function(midGroup) {
            midGroup.hgroup(function(group) {
                group.tips('Width of paperbag')
                group.staticText(BOUNDS_TEXT, 'Width:').also(JUSTIFY_RIGHT)
                widthEdit = group.editText(BOUNDS_EDIT, '210 mm').also(function(it) {
                    it.validateUnits()
                    it.activate()
                })
            })
            midGroup.hgroup(function(group) {
                group.tips('Height of paperbag')
                group.staticText(BOUNDS_TEXT, 'Height:').also(JUSTIFY_RIGHT)
                heightEdit = group.editText(BOUNDS_EDIT, '297 mm').also(VALIDATE_UNITS)
            })
            midGroup.hgroup(function(group) {
                group.tips('Depth of paperbag')
                group.staticText(BOUNDS_TEXT, 'Depth:').also(JUSTIFY_RIGHT)
                depthEdit = group.editText(BOUNDS_EDIT, '100 mm').also(VALIDATE_UNITS)
            })
            midGroup.hgroup(function(group) {
                group.tips('Length of lid area')
                group.staticText(BOUNDS_TEXT, 'Lid:').also(JUSTIFY_RIGHT)
                lidEdit = group.editText(BOUNDS_EDIT, '30 mm').also(VALIDATE_UNITS)
            })
            midGroup.hgroup(function(group) {
                group.tips('Length of glue area')
                group.staticText(BOUNDS_TEXT, 'Glue:').also(JUSTIFY_RIGHT)
                lidEdit = group.editText(BOUNDS_EDIT, '20 mm').also(VALIDATE_UNITS)
            })
            midGroup.hgroup(function(group) {
                group.tips('How big should the bottom side be relative to depth, in percentage')
                group.staticText(BOUNDS_TEXT, 'Bottom:').also(JUSTIFY_RIGHT)
                new SliderGroup(group, BOUNDS_EDIT, 6, 0, 10, 10)
            })
        })
        topGroup.image(undefined, getResource('dieline_paperbag.png'))
    })
})
dialog.setNegativeButton('Close')
dialog.setPositiveButton(function() {
})
dialog.show()