/**
 * Direct replacement of `Object > Create Trim Marks` with some fixes:
 * - If the selected art is a Path, crop marks will be created around **fill** as opposed to **border**.
 * - If the selected art is a Clip Group, crop marks will be created around **clip size** as opposed to **content size**.
 * 
 * And also some enhancements:
 * - Customize marks' appearance and placement.
 * - Support for creating multiple marks by duplicating.
 */

#target Illustrator
#include '../.lib/commons-colors.js'
#include '../.lib/ui-duplicate.js'

var LOCATION_TOP_LEFT = 11
var LOCATION_TOP_RIGHT = 1
var LOCATION_RIGHT_TOP = 2
var LOCATION_RIGHT_BOTTOM = 4
var LOCATION_BOTTOM_RIGHT = 5
var LOCATION_BOTTOM_LEFT = 7
var LOCATION_LEFT_BOTTOM = 8
var LOCATION_LEFT_TOP = 10

var DEFAULT_WEIGHT = 0.3 // the same value used in `Object > Create Trim Marks`

var BOUNDS_TEXT = [0, 0, 60, 21]
var BOUNDS_EDIT = [0, 0, 100, 21]
var BOUNDS_CHECK = [0, 0, 13, 13]
var BOUNDS_EDIT_SMALL = [0, 0, 36, 21]

checkSingleSelection()

createDialog('Crop Marks')

dialog.main.alignChildren = 'fill'
dialog.upper = dialog.main.addHGroup()
dialog.lower = dialog.main.addVPanel('Duplicate')

var main = dialog.upper.addVGroup()
main.offset = main.addHGroup()
main.offset.add('statictext', BOUNDS_TEXT, 'Offset:').justify = 'right'
main.offsetEdit = main.offset.add('edittext', BOUNDS_EDIT, '2.5 mm')
main.offsetEdit.validateUnits()
main.offsetEdit.active = true
main.length = main.addHGroup()
main.length.add('statictext', BOUNDS_TEXT, 'Length:').justify = 'right'
main.lengthEdit = main.length.add('edittext', BOUNDS_EDIT, '2.5 mm')
main.lengthEdit.validateUnits()
main.weight = main.addHGroup()
main.weight.add('statictext', BOUNDS_TEXT, 'Weight:').justify = 'right'
main.weightEdit = main.weight.add('edittext', BOUNDS_EDIT, DEFAULT_WEIGHT)
main.weightEdit.validateUnits()
main.color = main.addHGroup()
main.color.add('statictext', BOUNDS_TEXT, 'Color:').justify = 'right'
main.colorList = main.color.add('dropdownlist', BOUNDS_EDIT, COLORS)
main.colorList.selection = 0

dialog.upper.add('statictext', [0, 0, 0, 10]) // gap

var locations = dialog.upper.addHGroup()
locations.alignChildren = 'top'
locations.add('statictext', BOUNDS_TEXT, 'Locations:').justify = 'right'
locations.row = locations.addVGroup()
locations.row1 = locations.row.addHGroup()
locations.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
locations.topLeftCheck = locations.row1.add('checkbox', BOUNDS_CHECK, undefined)
locations.topLeftCheck.value = true
locations.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
locations.topRightCheck = locations.row1.add('checkbox', BOUNDS_CHECK)
locations.topRightCheck.value = true
locations.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
locations.row2 = locations.row.addHGroup()
locations.leftTopCheck = locations.row2.add('checkbox', BOUNDS_CHECK)
locations.leftTopCheck.value = true
locations.row2.add('statictext', BOUNDS_CHECK, '↖︎').justify = 'right'
locations.row2.add('statictext', BOUNDS_CHECK, '↑').justify = 'right'
locations.row2.add('statictext', BOUNDS_CHECK, '↗').justify = 'right'
locations.rightTopCheck = locations.row2.add('checkbox', BOUNDS_CHECK)
locations.rightTopCheck.value = true
locations.row3 = locations.row.addHGroup()
locations.row3.add('statictext', BOUNDS_CHECK).justify = 'right'
locations.row3.add('statictext', BOUNDS_CHECK, '←').justify = 'right'
locations.row3.add('statictext', BOUNDS_CHECK, '●').justify = 'right'
locations.row3.add('statictext', BOUNDS_CHECK, '→').justify = 'right'
locations.row3.add('statictext', BOUNDS_CHECK).justify = 'right'
locations.row4 = locations.row.addHGroup()
locations.leftBottomCheck = locations.row4.add('checkbox', BOUNDS_CHECK)
locations.leftBottomCheck.value = true
locations.row4.add('statictext', BOUNDS_CHECK, '↙').justify = 'right'
locations.row4.add('statictext', BOUNDS_CHECK, '↓').justify = 'right'
locations.row4.add('statictext', BOUNDS_CHECK, '↘').justify = 'right'
locations.rightBottomCheck = locations.row4.add('checkbox', BOUNDS_CHECK)
locations.rightBottomCheck.value = true
locations.row5 = locations.row.addHGroup()
locations.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
locations.bottomLeftCheck = locations.row5.add('checkbox', BOUNDS_CHECK)
locations.bottomLeftCheck.value = true
locations.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
locations.bottomRightCheck = locations.row5.add('checkbox', BOUNDS_CHECK)
locations.bottomRightCheck.value = true
locations.row5.add('statictext', BOUNDS_CHECK).justify = 'right'

dialog.lower.alignChildren = 'fill'
var duplicate = dialog.lower.addDuplicateGroup()

setNeutralAction('Delete', function() { process(true) }, 90)
setNegativeAction('Cancel')
setPositiveAction('OK', function() { process(false) })
show()

function process(isDelete) {
    var offset = parseUnit(main.offsetEdit.text)
    var length = parseUnit(main.lengthEdit.text)
    var weight = parseUnit(main.weightEdit.text)
    var color = parseColor(main.colorList.selection.text)
    var locs = []
    var marks = []
    
    var horizontal = parseInt(duplicate.horizontalEdit.text) || 0
    var vertical = parseInt(duplicate.verticalEdit.text) || 0

    if (horizontal < 1 || vertical < 1) {
        if (locations.topLeftCheck.value) locs.push(LOCATION_TOP_LEFT)
        if (locations.topRightCheck.value) locs.push(LOCATION_TOP_RIGHT)
        if (locations.rightTopCheck.value) locs.push(LOCATION_RIGHT_TOP)
        if (locations.rightBottomCheck.value) locs.push(LOCATION_RIGHT_BOTTOM)
        if (locations.bottomRightCheck.value) locs.push(LOCATION_BOTTOM_RIGHT)
        if (locations.bottomLeftCheck.value) locs.push(LOCATION_BOTTOM_LEFT)
        if (locations.leftBottomCheck.value) locs.push(LOCATION_LEFT_BOTTOM)
        if (locations.leftTopCheck.value) locs.push(LOCATION_LEFT_TOP)

        marks = marks.concat(createCropMarks(selection[0], offset, length, weight, color, locs))
        if (isDelete) selection[0].remove()
    } else {
        // currently ignore location checkboxes in duplication
        duplicate(function(item, h, v) {
            locs = []
            if (h == horizontal - 1) {
                locs.push(LOCATION_RIGHT_TOP, LOCATION_RIGHT_BOTTOM)
            }
            if (v == 0) {
                locs.push(LOCATION_TOP_LEFT, LOCATION_TOP_RIGHT)
            }
            if (v == vertical - 1) {
                locs.push(LOCATION_BOTTOM_LEFT, LOCATION_BOTTOM_RIGHT)
            }
            marks = marks.concat(createCropMarks(item, offset, length, weight, color, locs))
            if (isDelete) item.remove()
        }, function(item, _, v) {
            locs = [LOCATION_LEFT_BOTTOM, LOCATION_LEFT_TOP]
            if (v == 0) {
                locs.push(LOCATION_TOP_LEFT, LOCATION_TOP_RIGHT)
            }
            if (v == vertical - 1) {
                locs.push(LOCATION_BOTTOM_LEFT, LOCATION_BOTTOM_RIGHT)
            }
            marks = marks.concat(createCropMarks(item, offset, length, weight, color, locs))
            if (isDelete) item.remove()
        })
    }
    selection = marks
}

/**
 * Create multiple crop marks around target. The marks are created with clockwise ordering.
 * @param {PageItem} target - art where crop marks will be applied to
 * @param {Number} offset - space between target and crop marks
 * @param {Number} length - crop marks' width
 * @param {Number} weight - crop marks' stroke width
 * @param {CMYKColor} color - crop marks' color
 * @param {Array} locations - combination of 8 possible mark locations as defined in constants
 * @return {Array} created crop marks
 */
function createCropMarks(target, offset, length, weight, color, locations) {
    var marks = []
    var clippingTarget = target.getClippingPathItem()
    var width = clippingTarget.width
    var height = clippingTarget.height
    var startX = clippingTarget.position[0]
    var endX = startX + width
    var startY = clippingTarget.position[1]
    var endY = startY - height

    for (var i = 0; i < locations.length; i++) {
        var location = locations[i]
        switch (location) {
            case LOCATION_TOP_LEFT:
                marks.push(createCropMark(
                    'TOP_LEFT', weight, color,
                    startX,
                    startY + offset,
                    startX,
                    startY + offset + length
                ))
                break;
            case LOCATION_TOP_RIGHT:
                marks.push(createCropMark(
                    'TOP_RIGHT', weight, color,
                    endX,
                    startY + offset,
                    endX,
                    startY + offset + length
                ))
                break;
            case LOCATION_RIGHT_TOP: 
                marks.push(createCropMark(
                    'RIGHT_TOP', weight, color,
                    endX + offset,
                    startY,
                    endX + offset + length,
                    startY
                ))
                break;
            case LOCATION_RIGHT_BOTTOM: 
                marks.push(createCropMark(
                    'RIGHT_BOTTOM', weight, color,
                    endX + offset,
                    endY,
                    endX + offset + length,
                    endY
                ))
                break;
            case LOCATION_BOTTOM_RIGHT: 
                marks.push(createCropMark(
                    'BOTTOM_RIGHT', weight, color,
                    endX,
                    endY - offset,
                    endX,
                    endY - offset - length
                ))
                break;
            case LOCATION_BOTTOM_LEFT: 
                marks.push(createCropMark(
                    'BOTTOM_LEFT', weight, color,
                    startX,
                    endY - offset,
                    startX,
                    endY - offset - length
                ))       
                break;
            case LOCATION_LEFT_BOTTOM: 
                marks.push(createCropMark(
                    'LEFT_BOTTOM', weight, color,
                    startX - offset,
                    endY,
                    startX - offset - length,
                    endY
                ))
                break;
            case LOCATION_LEFT_TOP: 
                marks.push(createCropMark(
                    'LEFT_TOP', weight, color,
                    startX - offset,
                    startY,
                    startX - offset - length,
                    startY
                ))
                break;
            default:
                throw 'Unrecognizable location ' + location
        }
    }
    return marks
}

/**
 * Create individual crop mark from point A to point B.
 * @param {String} suffixName - item name in the layer
 * @param {Number} weight - crop marks' stroke width
 * @param {CMYKColor} color - crop marks' color
 * @param {Number} fromX - starting X point
 * @param {Number} fromY - starting Y point
 * @param {Number} toX - destination X point
 * @param {Number} toY - destination Y point
 * @return {PathItem} created crop mark
 */
function createCropMark(suffixName, weight, color, fromX, fromY, toX, toY) {
    var mark = document.pathItems.add()
    mark.name = 'Crop ' + suffixName
    mark.fillColor = COLOR_NONE
    mark.strokeColor = color
    mark.strokeWidth = weight // important to set weight before color

    var fromPosition = [fromX, fromY]
    var fromPoint = mark.pathPoints.add()
    fromPoint.anchor = fromPosition
    fromPoint.leftDirection = fromPosition
    fromPoint.rightDirection = fromPosition

    var toPosition = [toX, toY]
    var toPoint = mark.pathPoints.add()
    toPoint.anchor = toPosition
    toPoint.leftDirection = toPosition
    toPoint.rightDirection = toPosition

    return mark
}