// The problem with native `Context Menu > Transform > Transform Each...` is that they scale by percentage.

#target Illustrator
#include '../../.stdlib/ui/anchor.js'
#include '../.lib/commons.js'
#include '../.lib/ui/recursive.js'

var BOUNDS_TEXT = [60, 21]
var BOUNDS_EDIT = [150, 21]

checkHasSelection()

var dialog = new Dialog('Resize Each')
var prefill = selection.first()
var widthEdit, heightEdit
var changePositionsCheck, changeFillPatternsCheck, changeFillGradientsCheck, changeStrokePatternsCheck
var documentOriginCheck, anchorGroup
var recursiveGroup

dialog.hgroup(function(group) {
    group.setTooltips("Objects' new width")
    group.staticText(BOUNDS_TEXT, 'Width:', JUSTIFY_RIGHT)
    widthEdit = group.editText(BOUNDS_EDIT, formatUnits(prefill.width, unitName, 2), function(it) {
        it.validateUnits()
        it.activate()
    })
})
dialog.hgroup(function(group) {
    group.setTooltips("Objects' new height")
    group.staticText(BOUNDS_TEXT, 'Height:', JUSTIFY_RIGHT)
    heightEdit = group.editText(BOUNDS_EDIT, formatUnits(prefill.height, unitName, 2), VALIDATE_UNITS)
})
dialog.hgroup(function(group) {
    group.alignChildren = 'fill'
    group.vpanel('Change', function(panel) {
        panel.alignChildren = 'fill'
        changePositionsCheck = panel.checkBox(undefined, 'Positions', function(it) {
            it.setTooltip('Are art object positions and orientations effected?')
            it.select()
        })
        changeFillPatternsCheck = panel.checkBox(undefined, 'Fill Patterns', function(it) {
            it.setTooltip('Are the fill patterns assigned to paths to be transformed?')
            it.select()
        })
        changeFillGradientsCheck = panel.checkBox(undefined, 'Fill Gradients', function(it) {
            it.setTooltip('Are the fill gradients assigned to paths to be transformed?')
            it.select()
        })
        changeStrokePatternsCheck = panel.checkBox(undefined, 'Stroke Patterns', function(it) {
            it.setTooltip('Are the stroke patterns assigned to paths to be transformed?')
            it.select()
        })
    })
    group.vpanel('Anchor', function(panel) {
        panel.alignChildren = 'fill'
        documentOriginCheck = panel.checkBox(undefined, 'Default', function(it) {
            it.setTooltip('Use current reference point preference')
            it.onClick = function() {
                anchorGroup.main.enabled = !it.value
            }
        })
        anchorGroup = new AnchorGroup(panel)
    })
})
recursiveGroup = new RecursiveGroup(dialog.main)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var width = parseUnits(widthEdit.text)
    var height = parseUnits(heightEdit.text)
    var transformation = documentOriginCheck.value
        ? Transformation.DOCUMENTORIGIN
        : anchorGroup.getTransformation()
    recursiveGroup.forEach(selection, function(it) {
        var scaleX = 100 * width / it.width
        var scaleY = 100 * height / it.height
        if (scaleX !== 100 && scaleY !== 100) {
            it.resize(scaleX, scaleY,
                changePositionsCheck.value,
                changeFillPatternsCheck.value,
                changeFillGradientsCheck.value,
                changeStrokePatternsCheck.value,
                100,
                transformation)
        }
    })
})
dialog.show()