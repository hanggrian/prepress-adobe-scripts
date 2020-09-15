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

init('Crop Marks')

root.alignChildren = 'fill'
root.upper = root.addHGroup()
root.lower = root.addVPanel('Duplicate')

root.upperLeft = root.upper.addVGroup()
root.upperLeft.offset = root.upperLeft.addHGroup()
root.upperLeft.offset.add('statictext', BOUNDS_TEXT, 'Offset:').justify = 'right'
var offsetEdit = root.upperLeft.offset.add('edittext', BOUNDS_EDIT, '2.5 mm')
offsetEdit.validateUnits()
offsetEdit.active = true
root.upperLeft.length = root.upperLeft.addHGroup()
root.upperLeft.length.add('statictext', BOUNDS_TEXT, 'Length:').justify = 'right'
var lengthEdit = root.upperLeft.length.add('edittext', BOUNDS_EDIT, '2.5 mm')
lengthEdit.validateUnits()
root.upperLeft.weight = root.upperLeft.addHGroup()
root.upperLeft.weight.add('statictext', BOUNDS_TEXT, 'Weight:').justify = 'right'
var weightEdit = root.upperLeft.weight.add('edittext', BOUNDS_EDIT, DEFAULT_WEIGHT)
weightEdit.validateUnits()
root.upperLeft.color = root.upperLeft.addHGroup()
root.upperLeft.color.add('statictext', BOUNDS_TEXT, 'Color:').justify = 'right'
var colorList = root.upperLeft.color.add('dropdownlist', BOUNDS_EDIT, COLORS)
colorList.selection = 0

root.upper.add('statictext', [0, 0, 0, 10]) // gap
root.upperRight = root.upper.addHGroup()
root.upperRight.alignChildren = 'top'
root.upperRight.add('statictext', BOUNDS_TEXT, 'Locations:').justify = 'right'
root.upperRight.row = root.upperRight.addVGroup()
root.upperRight.row1 = root.upperRight.row.addHGroup()
root.upperRight.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
var topLeftCheck = root.upperRight.row1.add('checkbox', BOUNDS_CHECK, undefined)
root.upperRight.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
var topRightCheck = root.upperRight.row1.add('checkbox', BOUNDS_CHECK)
root.upperRight.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
root.upperRight.row2 = root.upperRight.row.addHGroup()
var leftTopCheck = root.upperRight.row2.add('checkbox', BOUNDS_CHECK)
root.upperRight.row2.add('statictext', BOUNDS_CHECK, '↖︎').justify = 'right'
root.upperRight.row2.add('statictext', BOUNDS_CHECK, '↑').justify = 'right'
root.upperRight.row2.add('statictext', BOUNDS_CHECK, '↗').justify = 'right'
var rightTopCheck = root.upperRight.row2.add('checkbox', BOUNDS_CHECK)
root.upperRight.row3 = root.upperRight.row.addHGroup()
root.upperRight.row3.add('statictext', BOUNDS_CHECK).justify = 'right'
root.upperRight.row3.add('statictext', BOUNDS_CHECK, '←').justify = 'right'
root.upperRight.row3.add('statictext', BOUNDS_CHECK, '●').justify = 'right'
root.upperRight.row3.add('statictext', BOUNDS_CHECK, '→').justify = 'right'
root.upperRight.row3.add('statictext', BOUNDS_CHECK).justify = 'right'
root.upperRight.row4 = root.upperRight.row.addHGroup()
var leftBottomCheck = root.upperRight.row4.add('checkbox', BOUNDS_CHECK)
root.upperRight.row4.add('statictext', BOUNDS_CHECK, '↙').justify = 'right'
root.upperRight.row4.add('statictext', BOUNDS_CHECK, '↓').justify = 'right'
root.upperRight.row4.add('statictext', BOUNDS_CHECK, '↘').justify = 'right'
var rightBottomCheck = root.upperRight.row4.add('checkbox', BOUNDS_CHECK)
root.upperRight.row5 = root.upperRight.row.addHGroup()
root.upperRight.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
var bottomLeftCheck = root.upperRight.row5.add('checkbox', BOUNDS_CHECK)
root.upperRight.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
var bottomRightCheck = root.upperRight.row5.add('checkbox', BOUNDS_CHECK)
root.upperRight.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
topLeftCheck.value = true
topRightCheck.value = true
leftTopCheck.value = true
rightTopCheck.value = true
leftBottomCheck.value = true
rightBottomCheck.value = true
bottomLeftCheck.value = true
bottomRightCheck.value = true

root.lower.alignChildren = 'fill'
root.duplicate = root.lower.addDuplicateGroup()

addAction('Delete', function() { process(true) })
actions.add('statictext', [0, 0, 90, 0])
addAction('Cancel')
addAction('OK', function() { process(false) })
show()

function process(isDelete) {
    var offset = parseUnit(offsetEdit.text)
    var length = parseUnit(lengthEdit.text)
    var weight = parseUnit(weightEdit.text)
    var color = parseColor(colorList.selection.text)
    var locations = []
    var marks = []
    
    var horizontal = parseInt(duplicateHEdit.text) || 0
    var vertical = parseInt(duplicateVEdit.text) || 0

    if (horizontal < 1 || vertical < 1) {
        if (topLeftCheck.value) locations.push(LOCATION_TOP_LEFT)
        if (topRightCheck.value) locations.push(LOCATION_TOP_RIGHT)
        if (rightTopCheck.value) locations.push(LOCATION_RIGHT_TOP)
        if (rightBottomCheck.value) locations.push(LOCATION_RIGHT_BOTTOM)
        if (bottomRightCheck.value) locations.push(LOCATION_BOTTOM_RIGHT)
        if (bottomLeftCheck.value) locations.push(LOCATION_BOTTOM_LEFT)
        if (leftBottomCheck.value) locations.push(LOCATION_LEFT_BOTTOM)
        if (leftTopCheck.value) locations.push(LOCATION_LEFT_TOP)

        marks = marks.concat(createCropMarks(selection[0], offset, length, weight, color, locations))
        if (isDelete) selection[0].remove()
    } else {
        // currently ignore location checkboxes in duplication
        duplicate(function(item, h, v) {
            locations = []
            if (h == horizontal - 1) {
                locations.push(LOCATION_RIGHT_TOP, LOCATION_RIGHT_BOTTOM)
            }
            if (v == 0) {
                locations.push(LOCATION_TOP_LEFT, LOCATION_TOP_RIGHT)
            }
            if (v == vertical - 1) {
                locations.push(LOCATION_BOTTOM_LEFT, LOCATION_BOTTOM_RIGHT)
            }
            marks = marks.concat(createCropMarks(item, offset, length, weight, color, locations))
            if (isDelete) item.remove()
        }, function(item, _, v) {
            locations = [LOCATION_LEFT_BOTTOM, LOCATION_LEFT_TOP]
            if (v == 0) {
                locations.push(LOCATION_TOP_LEFT, LOCATION_TOP_RIGHT)
            }
            if (v == vertical - 1) {
                locations.push(LOCATION_BOTTOM_LEFT, LOCATION_BOTTOM_RIGHT)
            }
            marks = marks.concat(createCropMarks(item, offset, length, weight, color, locations))
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