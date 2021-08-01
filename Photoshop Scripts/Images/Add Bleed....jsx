/*
<javascriptresource>
<name>Add Bleed to Images...</name>
<category>2</category>
<enableinfo>true</enableinfo>
<about>Increase canvas size and create new guide layout separating content and bleed area.</about>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

var dialog = new Dialog('Add Bleed to Images')
var bleedEdit
var flattenImageCheck
var useGuidesCheck, clearGuidesCheck
var selectBleedCheck, correctionEdit

dialog.vgroup(function(main) {
    main.alignChildren = 'fill'
    main.hgroup(function(group) {
        group.tips('Bleed are distributed around image')
        group.staticText(undefined, 'Bleed:').also(JUSTIFY_RIGHT)
        bleedEdit = group.editText([150, 21], unitsOf('2.5 mm')).also(function(it) {
            it.validateUnits()
            it.activate()
        })
    })
    flattenImageCheck = main.checkBox(undefined, 'Flatten Image').also(function(it) {
        it.tip('Layers will be flattened')
        it.select()
    })
    main.hgroup(function(group) {
        group.tips('Guides will mark where bleed are added')
        useGuidesCheck = group.checkBox(undefined, 'Use Guides').also(function(it) {
            it.select()
            it.onClick = function() {
                clearGuidesCheck.enabled = it.value
            }
        })
        clearGuidesCheck = group.checkBox(undefined, 'Clear Current')
    })
    main.hgroup(function(group) {
        group.tips('Select bleed with x correction')
        selectBleedCheck = group.checkBox(undefined, 'Select Bleed with').also(function(it) {
            it.onClick = function() {
                correctionEdit.enabled = it.value
                if (it.value) {
                    correctionEdit.activate()
                } else {
                    bleedEdit.activate()
                }
            }
        })
        correctionEdit = group.editText([50, 21], '0 px').also(function(it) {
            it.validateUnits()
            it.enabled = false
        })
        group.staticText(undefined, 'Correction')
    })
})
dialog.setCancelButton('Cancel')
dialog.setOKButton(function() {
    var bleeds = new UnitValue(bleedEdit.text) * 2
    var correction = parseUnits(correctionEdit.text)
    for (var i = 0; i < app.documents.length; i++) {
        var document = app.documents[i]
        app.activeDocument = document
        var originalWidth = document.width
        var originalHeight = document.height
        var leftGuide, topGuide, rightGuide, bottomGuide
        if (flattenImageCheck.value) {
            document.flatten()
        }
        if (useGuidesCheck.value) {
            if (clearGuidesCheck.value) {
                while (document.guides.length > 0) { // TODO: find out why forEach only clearing parts
                    document.guides.first().remove()
                }
            }
            leftGuide = document.guides.add(Direction.VERTICAL, 0)
            topGuide = document.guides.add(Direction.HORIZONTAL, 0)
            rightGuide = document.guides.add(Direction.VERTICAL, document.width)
            bottomGuide = document.guides.add(Direction.HORIZONTAL, document.height)
        }
        document.resizeCanvas(originalWidth + bleeds, originalHeight + bleeds)
        if (selectBleedCheck.value) {
            var leftCoordinate = leftGuide.coordinate.as('px') + correction
            var topCoordinate = topGuide.coordinate.as('px') + correction
            var rightCoordinate = rightGuide.coordinate.as('px') - correction
            var bottomCoordinate = bottomGuide.coordinate.as('px') - correction
            document.selection.select([
                [leftCoordinate, topCoordinate],
                [leftCoordinate, bottomCoordinate],
                [rightCoordinate, bottomCoordinate],
                [rightCoordinate, topCoordinate]
            ])
            document.selection.invert()
        }
    }
})
dialog.show()