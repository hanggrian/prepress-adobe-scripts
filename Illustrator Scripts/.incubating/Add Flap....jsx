#target Illustrator
#include '../.lib/commons.js'

checkSingleSelection()

var BOUNDS_TEXT = [60, 21]
var BOUNDS_TEXT2 = [70, 21]
var BOUNDS_EDIT = [100, 21]
var BOUNDS_RADIO = [15, 15]

var dialog = new Dialog('Add Tuck Flap')
var lengthEdit, weightEdit, colorList
var tabbedPanel
var tuckArcEdit, tuckOffsetEdit
var glueShearEdit, glueScratchEdit
var dustShoulderEdit, dustAngle1Edit, dustAngle2Edit, dustDistanceEdit
var leftRadio, topRadio, rightRadio, bottomRadio

dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel('Flap', function(panel) {
        panel.hgroup(function(group) {
            group.setTooltips('In horizontal direction, this is height. In vertical direction, this is width.')
            group.staticText(BOUNDS_TEXT, 'Length:', JUSTIFY_RIGHT)
            lengthEdit = group.editText(BOUNDS_EDIT, '20 mm', function(it) {
                it.validateUnits()
                it.activate()
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Stroke width of dielines')
            group.staticText(BOUNDS_TEXT, 'Weight:', JUSTIFY_RIGHT)
            weightEdit = group.editText(BOUNDS_EDIT, '1 pt', VALIDATE_UNITS)
        })
        panel.hgroup(function(group) {
            group.setTooltips('Stroke color of dielines')
            group.staticText(BOUNDS_TEXT, 'Color:', JUSTIFY_RIGHT)
            colorList = group.dropDownList(BOUNDS_EDIT, COLORS, function(it) {
                it.selectText('Black')
            })
        })
    })
    topGroup.vpanel('Direction', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_RADIO)
            topRadio = group.radioButton(BOUNDS_RADIO, undefined, function(it) {
                it.setTooltip('Top')
                registerRadioClick(it)
            })
            group.staticText(BOUNDS_RADIO)
        })
        panel.hgroup(function(group) {
            leftRadio = group.radioButton(BOUNDS_RADIO, undefined, function(it) {
                it.setTooltip('Left')
                registerRadioClick(it)
                it.select()
            })
            group.staticText(BOUNDS_RADIO, '\u25CF', JUSTIFY_CENTER)
            rightRadio = group.radioButton(BOUNDS_RADIO, undefined, function(it) {
                it.setTooltip('Right')
                registerRadioClick(it)
            })
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_RADIO)
            bottomRadio = group.radioButton(BOUNDS_RADIO, undefined, function(it) {
                it.setTooltip('Bottom')
                registerRadioClick(it)
            })
            group.staticText(BOUNDS_RADIO)
        })
    })
})
tabbedPanel = dialog.tabbedPanel(function(tabbedPanel) {
    tabbedPanel.preferredSize = [300, 0]
    tabbedPanel.vtab('Glue Flap', function(tab) {
        tab.hgroup(function(topGroup) {
            topGroup.alignChildren = 'top'
            topGroup.vgroup(function(midGroup) {
                midGroup.hgroup(function(group) {
                    group.setTooltips('End line of glue flat must be lesser than starting line, shear value make sure of it')
                    group.staticText(BOUNDS_TEXT2, 'Shear:', JUSTIFY_RIGHT)
                    glueShearEdit = group.editText(BOUNDS_EDIT, '5 mm', VALIDATE_UNITS)
                })
                midGroup.hgroup(function(group) {
                    group.setTooltips('Distance between scratches, leave blank for no scratches')
                    group.staticText(BOUNDS_TEXT2, 'Scratches:', JUSTIFY_RIGHT)
                    glueScratchEdit = group.editText(BOUNDS_EDIT, '0 mm', VALIDATE_UNITS)
                })
            })
            topGroup.image(undefined, getResource('flap_glue.png'))
        })
    })
    tabbedPanel.vtab('Tuck Flap', function(tab) {
        tab.hgroup(function(topGroup) {
            topGroup.alignChildren = 'top'
            topGroup.vgroup(function(midGroup) {
                midGroup.hgroup(function(group) {
                    group.setTooltips('How big should the arc be relative to length, in percentage')
                    group.staticText(BOUNDS_TEXT2, 'Arc:', JUSTIFY_RIGHT)
                    tuckArcEdit = group.editText(BOUNDS_EDIT, '50', VALIDATE_DIGITS)
                })
                midGroup.hgroup(function(group) {
                    group.setTooltips('Thicker material should have more distance')
                    group.staticText(BOUNDS_TEXT2, 'Distance:', JUSTIFY_RIGHT)
                    tuckOffsetEdit = group.editText(BOUNDS_EDIT, '0 mm', VALIDATE_UNITS)
                })
            })
            topGroup.image(undefined, getResource('flap_tuck.png'))
        })
    })
    tabbedPanel.vtab('Dust Flap', function(tab) {
        tab.hgroup(function(topGroup) {
            topGroup.alignChildren = 'top'
            topGroup.vgroup(function(midGroup) {
                midGroup.hgroup(function(group) {
                    group.setTooltips('Necessary for locking a tuck flap')
                    group.staticText(BOUNDS_TEXT2, 'Shoulder:', JUSTIFY_RIGHT)
                    dustShoulderEdit = group.editText(BOUNDS_EDIT, '5 mm', VALIDATE_UNITS)
                })
                midGroup.hgroup(function(group) {
                    group.setTooltips('First angle of shoulder, usually 45 or lower')
                    group.staticText(BOUNDS_TEXT2, '1st Angle:', JUSTIFY_RIGHT)
                    dustAngle1Edit = group.editText(BOUNDS_EDIT, '45', VALIDATE_DIGITS)
                })
                midGroup.hgroup(function(group) {
                    group.setTooltips('Second angle of shoulder, usually lower than first')
                    group.staticText(BOUNDS_TEXT2, '2nd Angle:', JUSTIFY_RIGHT)
                    dustAngle2Edit = group.editText(BOUNDS_EDIT, '15', VALIDATE_DIGITS)
                })
                midGroup.hgroup(function(group) {
                    group.setTooltips('Thicker material should have more distance')
                    group.staticText(BOUNDS_TEXT2, 'Distance:', JUSTIFY_RIGHT)
                    dustDistanceEdit = group.editText(BOUNDS_EDIT, '0 mm', VALIDATE_UNITS)
                })
            })
            topGroup.image(undefined, getResource('flap_dust.png'))
        })
    })
})

dialog.setNegativeButton('Close')
dialog.setPositiveButton(function() {
    var length = parseUnits(lengthEdit.text)
    var weight = parseUnits(weightEdit.text)
    var color = parseColor(colorList.selection.text)
    var tuckArc = parseUnits(tuckArcEdit.text)
    var tuckOffset = parseUnits(tuckOffsetEdit.text)
    var glueShear = parseUnits(glueShearEdit.text)
    var glueScratch = parseUnits(glueScratchEdit.text)
    var dustShoulder = parseUnits(dustShoulderEdit.text)
    var dustAngle1 = parseInt(dustAngle1Edit.text)
    var dustAngle2 = parseInt(dustAngle2Edit.text)
    var dustDistance = parseUnits(dustDistanceEdit.text)
    var fromPosition, toPosition

    selection.first().geometricBounds.let(function(it) {
        if (leftRadio.value) {
            fromPosition = [it.getLeft(), it.getTop()]
            toPosition = [it.getLeft(), it.getBottom()]
        } else if (topRadio.value) {
            fromPosition = [it.getLeft(), it.getTop()]
            toPosition = [it.getRight(), it.getTop()]
        } else if (rightRadio.value) {
            fromPosition = [it.getRight(), it.getTop()]
            toPosition = [it.getRight(), it.getBottom()]
        } else {
            fromPosition = [it.getLeft(), it.getBottom()]
            toPosition = [it.getRight(), it.getBottom()]
        }
    })

    var path = document.pathItems.add()
    path.fillColor = COLOR_NONE
    path.strokeColor = color
    path.strokeWidth = weight

    if (tabbedPanel.selection.text === 'Tuck Flap') {
        var fromPoint = path.pathPoints.add()
        fromPoint.anchor = fromPosition
        fromPoint.leftDirection = fromPosition
        fromPoint.rightDirection = fromPosition

        var toPoint = path.pathPoints.add()
        toPoint.anchor = toPosition
        toPoint.leftDirection = toPosition
        toPoint.rightDirection = toPosition
    } else if (tabbedPanel.selection.text === 'Glue Flap') {

    } else {

    }

    selection = [path]
})
dialog.show()

function registerRadioClick(radio) {
    radio.onClick = function() {
        if (radio != topRadio) topRadio.value = false
        if (radio != leftRadio) leftRadio.value = false
        if (radio != rightRadio) rightRadio.value = false
        if (radio != bottomRadio) bottomRadio.value = false
    }
}