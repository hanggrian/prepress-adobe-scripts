#target Illustrator
#include '../.lib/ui/slider.js'
#include '../.lib/commons.js'

checkSingleSelection()

var BOUNDS_TEXT = [60, 21]
var BOUNDS_TEXT2 = [70, 21]
var BOUNDS_EDIT = [100, 21]
var BOUNDS_RADIO = [15, 15]

var dialog = new Dialog('Add Flap')
var lengthEdit, weightEdit, colorList
var tabbedPanel
var glueShearEdit, glueScratchEdit
var tuckSliderGroup, tuckDistanceEdit
var dustShoulderEdit, dustDistanceEdit
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
                    glueScratchEdit = group.editText(BOUNDS_EDIT, '0 mm', function(it) {
                        it.validateUnits()
                        it.enabled = false
                    })
                })
            })
            topGroup.image(undefined, getResource('dieline_glueflap.png'))
        })
    })
    /* tabbedPanel.vtab('Tuck Flap', function(tab) {
        tab.hgroup(function(topGroup) {
            topGroup.alignChildren = 'top'
            topGroup.vgroup(function(midGroup) {
                midGroup.hgroup(function(group) {
                    group.setTooltips('How big should the curve be relative to length, in percentage')
                    group.staticText(BOUNDS_TEXT2, 'Curve:', JUSTIFY_RIGHT)
                    tuckSliderGroup = new SliderGroup(group, BOUNDS_EDIT, 2, 0, 4, 25)
                })
                midGroup.hgroup(function(group) {
                    group.setTooltips('Thicker material should have more distance')
                    group.staticText(BOUNDS_TEXT2, 'Distance:', JUSTIFY_RIGHT)
                    tuckDistanceEdit = group.editText(BOUNDS_EDIT, '0 mm', VALIDATE_UNITS)
                })
            })
            topGroup.image(undefined, getResource('dieline_tuckflap.png'))
        })
    }) */
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
                    group.setTooltips('Thicker material should have more distance')
                    group.staticText(BOUNDS_TEXT2, 'Distance:', JUSTIFY_RIGHT)
                    dustDistanceEdit = group.editText(BOUNDS_EDIT, '0 mm', VALIDATE_UNITS)
                })
            })
            topGroup.image(undefined, getResource('dieline_dustflap.png'))
        })
    })
    tabbedPanel.onChange = function() {
        if (tabbedPanel.selection.text === 'Glue Flap') {
            glueShearEdit.activate()
        } else if (tabbedPanel.selection.text === 'Tuck Flap') {
            tuckCurveEdit.activate()
        } else {
            dustShoulderEdit.activate()
        }
    }
})

dialog.setNegativeButton('Close')
dialog.setPositiveButton(function() {
    var length = parseUnits(lengthEdit.text)
    var weight = parseUnits(weightEdit.text)
    var color = parseColor(colorList.selection.text)

    var path = document.pathItems.add()
    path.fillColor = COLOR_NONE
    path.strokeColor = color
    path.strokeWidth = weight

    if (tabbedPanel.selection.text === 'Glue Flap') {
        processGlue(length, path)
    } else if (tabbedPanel.selection.text === 'Tuck Flap') {
        processTuck(length, path)
    } else {
        processDust(length, path)
    }
    selection = [path]
})
dialog.show()

function processGlue(length, path) {
    var glueShear = parseUnits(glueShearEdit.text)
    var glueScratch = parseUnits(glueScratchEdit.text)
    var positions = []
    selection.first().geometricBounds.let(function(it) {
        if (leftRadio.value) {
            positions.push([it.getLeft(), it.getTop()])
            positions.push([it.getLeft() - length, it.getTop() - glueShear])
            positions.push([it.getLeft() - length, it.getBottom() + glueShear])
            positions.push([it.getLeft(), it.getBottom()])
        } else if (topRadio.value) {
            positions.push([it.getLeft(), it.getTop()])
            positions.push([it.getLeft() + glueShear, it.getTop() + length])
            positions.push([it.getRight() - glueShear, it.getTop() + length])
            positions.push([it.getRight(), it.getTop()])
        } else if (rightRadio.value) {
            positions.push([it.getRight(), it.getTop()])
            positions.push([it.getRight() + length, it.getTop() - glueShear])
            positions.push([it.getRight() + length, it.getBottom() + glueShear])
            positions.push([it.getRight(), it.getBottom()])
        } else {
            positions.push([it.getLeft(), it.getBottom()])
            positions.push([it.getLeft() + glueShear, it.getBottom() - length])
            positions.push([it.getRight() - glueShear, it.getBottom() - length])
            positions.push([it.getRight(), it.getBottom()])
        }
    })
    path.name = 'FlapGLUE'
    path.setEntirePath(positions)
}

function processTuck(length, path) {
    var tuckCurve = parseInt(tuckCurveEdit.text) * length / 100
    var tuckStart = length - tuckCurve
    var tuckDistance = parseUnits(tuckDistanceEdit.text)
    var positions = []
    selection.first().geometricBounds.let(function(it) {
        if (leftRadio.value) {
            positions.push([it.getLeft(), it.getTop() - tuckDistance])
            positions.push([it.getLeft() - tuckStart, it.getTop() - tuckDistance])
            positions.push([it.getLeft() - length, it.getTop() - tuckCurve - tuckDistance])
            positions.push([it.getLeft() - length, it.getBottom() + tuckCurve + tuckDistance])
            positions.push([it.getLeft() - tuckStart, it.getBottom() + tuckDistance])
            positions.push([it.getLeft(), it.getBottom() + tuckDistance])
        } else if (topRadio.value) {
        } else if (rightRadio.value) {
        } else {
        }
    })
    path.name = 'FlapTUCK'
    positions.forEach(function(it) {
        var point = path.pathPoints.add()
        point.anchor = it
        point.leftDirection = it
        point.rightDirection = it
    })
}

function processDust(length, path) {
    var dustShoulder = parseUnits(dustShoulderEdit.text)
    var dustDistance = parseUnits(dustDistanceEdit.text)
    var positions = []
    selection.first().geometricBounds.let(function(it) {
        if (leftRadio.value) {
            positions.push([it.getLeft(), it.getTop()])
            positions.push([it.getLeft() - dustDistance, it.getTop() - dustDistance])
            positions.push([it.getLeft() - length, it.getTop() - dustDistance])
            positions.push([it.getLeft() - length, it.getBottom() + dustShoulder * 1.5])
            positions.push([it.getLeft() - dustShoulder * 1.5, it.getBottom() + dustShoulder / 2])
            positions.push([it.getLeft() - dustShoulder, it.getBottom()])
            positions.push([it.getLeft(), it.getBottom()])
        } else if (topRadio.value) {
            positions.push([it.getLeft(), it.getTop()])
            positions.push([it.getLeft() + dustDistance, it.getTop() + dustDistance])
            positions.push([it.getLeft() + dustDistance, it.getTop() + length])
            positions.push([it.getRight() - dustShoulder * 1.5, it.getTop() + length])
            positions.push([it.getRight() - dustShoulder / 2, it.getTop() + dustShoulder * 1.5])
            positions.push([it.getRight(), it.getTop() + dustShoulder])
            positions.push([it.getRight(), it.getTop()])
        } else if (rightRadio.value) {
            positions.push([it.getRight(), it.getTop()])
            positions.push([it.getRight() + dustDistance, it.getTop() - dustDistance])
            positions.push([it.getRight() + length, it.getTop() - dustDistance])
            positions.push([it.getRight() + length, it.getBottom() + dustShoulder * 1.5])
            positions.push([it.getRight() + dustShoulder * 1.5, it.getBottom() + dustShoulder / 2])
            positions.push([it.getRight() + dustShoulder, it.getBottom()])
            positions.push([it.getRight(), it.getBottom()])
        } else {
            positions.push([it.getLeft(), it.getBottom()])
            positions.push([it.getLeft() + dustDistance, it.getBottom() - dustDistance])
            positions.push([it.getLeft() + dustDistance, it.getBottom() - length])
            positions.push([it.getRight() - dustShoulder * 1.5, it.getBottom() - length])
            positions.push([it.getRight() - dustShoulder / 2, it.getBottom() - dustShoulder * 1.5])
            positions.push([it.getRight(), it.getBottom() - dustShoulder])
            positions.push([it.getRight(), it.getBottom()])
        }
    })
    path.name = 'FlapDUST'
    path.setEntirePath(positions)
}

function registerRadioClick(radio) {
    radio.onClick = function() {
        if (radio != topRadio) topRadio.value = false
        if (radio != leftRadio) leftRadio.value = false
        if (radio != rightRadio) rightRadio.value = false
        if (radio != bottomRadio) bottomRadio.value = false
    }
}