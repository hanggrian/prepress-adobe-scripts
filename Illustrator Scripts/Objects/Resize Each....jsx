#target Illustrator
#include '../../.stdlib/ui/anchor.js'
#include '../.lib/commons.js'

var BOUNDS_TEXT = [60, 21]
var BOUNDS_EDIT = [150, 21]

checkHasSelection()

var dialog = new Dialog('Resize Each')
var prefill = selection.first()
var widthEdit, widthCheck, heightEdit, heightCheck
var changePositionsCheck, changeFillPatternsCheck, changeFillGradientsCheck, changeStrokePatternsCheck
var documentOriginCheck, anchorGroup

dialog.vgroup(function(main) {
    main.hgroup(function(group) {
        group.alignChildren = 'bottom'
        group.setTooltips("Objects' new width, uncheck to ignore")
        group.staticText(BOUNDS_TEXT, 'Width:', JUSTIFY_RIGHT)
        widthEdit = group.editText(BOUNDS_EDIT, formatUnits(prefill.width, unitName, 2), function(it) {
            it.validateUnits()
            it.activate()
        })
        widthCheck = group.checkBox(undefined, undefined, function(it) {
            it.select()
            it.onClick = function() {
                widthEdit.enabled = it.value
            }
        })
    })
    main.hgroup(function(group) {
        group.alignChildren = 'bottom'
        group.setTooltips("Objects' new height, uncheck to ignore")
        group.staticText(BOUNDS_TEXT, 'Height:', JUSTIFY_RIGHT)
        heightEdit = group.editText(BOUNDS_EDIT, formatUnits(prefill.height, unitName, 2), VALIDATE_UNITS)
        heightCheck = group.checkBox(undefined, undefined, function(it) {
            it.select()
            it.onClick = function() {
                heightEdit.enabled = it.value
            }
        })
    })
    main.hgroup(function(group) {
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
})
dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    process(function(action) {
        selection.forEach(action)
    })
})
dialog.setNeutralButton(undefined, 'Recursive', function() {
    process(function(action) {
        selection.forEachItem(action)
    })
})
dialog.show()

function process(forEach) {
    var width = parseUnits(widthEdit.text)
    var height = parseUnits(heightEdit.text)
    var transformation = documentOriginCheck.value
        ? Transformation.DOCUMENTORIGIN
        : anchorGroup.getTransformation()
    forEach(function(item, i) {
        $.write(i + '. ')
        var scaleX = !widthCheck.value ? 100 : 100 * width / item.width
        var scaleY = !heightCheck.value ? 100 : 100 * height / item.height
        if (!isFinite(scaleX)) {
            scaleX = 100
        }
        if (!isFinite(scaleY)) {
            scaleY = 100
        }
        $.writeln('Scale X=' + scaleX + ' Y=' + scaleY)
        item.resize(scaleX, scaleY,
            changePositionsCheck.value,
            changeFillPatternsCheck.value,
            changeFillGradientsCheck.value,
            changeStrokePatternsCheck.value,
            100,
            transformation)
    })
}