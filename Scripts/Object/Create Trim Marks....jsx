/**
 * Create trim masks around the selected PathItem.
 * The marks are created with clockwise ordering.
 */

#target Illustrator
#include '../.lib/sui/duplicate.js'
#include '../.lib/colors.js'
#include '../.lib/preconditions.js'

const LOCATION_TOP_LEFT = 11
const LOCATION_TOP_RIGHT = 1
const LOCATION_RIGHT_TOP = 2
const LOCATION_RIGHT_BOTTOM = 4
const LOCATION_BOTTOM_RIGHT = 5
const LOCATION_BOTTOM_LEFT = 7
const LOCATION_LEFT_BOTTOM = 8
const LOCATION_LEFT_TOP = 10

const DEFAULT_WEIGHT = 0.3 // The same value used in `Ai menu bar > Object > Create Trim Marks`.

const ACTION_DEFAULT = 'OK'
const ACTION_GUIDES = 'Guides'
const ACTION_DELETE = 'Delete'

const BOUNDS_TEXT = [0, 0, 60, 21]
const BOUNDS_EDIT = [0, 0, 100, 21]
const BOUNDS_CHECK = [0, 0, 13, 13]
const BOUNDS_EDIT_SMALL = [0, 0, 36, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkSingleSelection()

checkTypename(selection[0], 'PathItem')

var dialog = Dialog('Create trim marks')

dialog.root.alignChildren = 'fill'
dialog.upper = dialog.root.addHGroup()
dialog.lower = dialog.root.addVPanel('Duplicate')

dialog.upperLeft = dialog.upper.addVGroup()
dialog.upperLeft.offset = dialog.upperLeft.addHGroup()
dialog.upperLeft.offset.add('statictext', BOUNDS_TEXT, 'Offset:').justify = 'right'
var offsetEdit = dialog.upperLeft.offset.add('edittext', BOUNDS_EDIT, '2.5 mm')
offsetEdit.validateUnits()
offsetEdit.active = true
dialog.upperLeft.length = dialog.upperLeft.addHGroup()
dialog.upperLeft.length.add('statictext', BOUNDS_TEXT, 'Length:').justify = 'right'
var lengthEdit = dialog.upperLeft.length.add('edittext', BOUNDS_EDIT, '2.5 mm')
lengthEdit.validateUnits()
dialog.upperLeft.weight = dialog.upperLeft.addHGroup()
dialog.upperLeft.weight.add('statictext', BOUNDS_TEXT, 'Weight:').justify = 'right'
var weightEdit = dialog.upperLeft.weight.add('edittext', BOUNDS_EDIT, DEFAULT_WEIGHT)
weightEdit.validateUnits()
dialog.upperLeft.color = dialog.upperLeft.addHGroup()
dialog.upperLeft.color.add('statictext', BOUNDS_TEXT, 'Color:').justify = 'right'
var colorList = dialog.upperLeft.color.add('dropdownlist', BOUNDS_EDIT, COLORS)
colorList.selection = 0

dialog.upper.add('statictext', [0, 0, 0, 10]) // gap
dialog.upperRight = dialog.upper.addHGroup()
dialog.upperRight.alignChildren = 'top'
dialog.upperRight.add('statictext', BOUNDS_TEXT, 'Locations:').justify = 'right'
dialog.upperRight.row = dialog.upperRight.addVGroup()
dialog.upperRight.row1 = dialog.upperRight.row.addHGroup()
dialog.upperRight.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
var topLeftCheck = dialog.upperRight.row1.add('checkbox', BOUNDS_CHECK, undefined)
dialog.upperRight.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
var topRightCheck = dialog.upperRight.row1.add('checkbox', BOUNDS_CHECK)
dialog.upperRight.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
dialog.upperRight.row2 = dialog.upperRight.row.addHGroup()
var leftTopCheck = dialog.upperRight.row2.add('checkbox', BOUNDS_CHECK)
dialog.upperRight.row2.add('statictext', BOUNDS_CHECK, '↖︎').justify = 'right'
dialog.upperRight.row2.add('statictext', BOUNDS_CHECK, '↑').justify = 'right'
dialog.upperRight.row2.add('statictext', BOUNDS_CHECK, '↗').justify = 'right'
var rightTopCheck = dialog.upperRight.row2.add('checkbox', BOUNDS_CHECK)
dialog.upperRight.row3 = dialog.upperRight.row.addHGroup()
dialog.upperRight.row3.add('statictext', BOUNDS_CHECK).justify = 'right'
dialog.upperRight.row3.add('statictext', BOUNDS_CHECK, '←').justify = 'right'
dialog.upperRight.row3.add('statictext', BOUNDS_CHECK, '●').justify = 'right'
dialog.upperRight.row3.add('statictext', BOUNDS_CHECK, '→').justify = 'right'
dialog.upperRight.row3.add('statictext', BOUNDS_CHECK).justify = 'right'
dialog.upperRight.row4 = dialog.upperRight.row.addHGroup()
var leftBottomCheck = dialog.upperRight.row4.add('checkbox', BOUNDS_CHECK)
dialog.upperRight.row4.add('statictext', BOUNDS_CHECK, '↙').justify = 'right'
dialog.upperRight.row4.add('statictext', BOUNDS_CHECK, '↓').justify = 'right'
dialog.upperRight.row4.add('statictext', BOUNDS_CHECK, '↘').justify = 'right'
var rightBottomCheck = dialog.upperRight.row4.add('checkbox', BOUNDS_CHECK)
dialog.upperRight.row5 = dialog.upperRight.row.addHGroup()
dialog.upperRight.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
var bottomLeftCheck = dialog.upperRight.row5.add('checkbox', BOUNDS_CHECK)
dialog.upperRight.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
var bottomRightCheck = dialog.upperRight.row5.add('checkbox', BOUNDS_CHECK)
dialog.upperRight.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
topLeftCheck.value = true
topRightCheck.value = true
leftTopCheck.value = true
rightTopCheck.value = true
leftBottomCheck.value = true
rightBottomCheck.value = true
bottomLeftCheck.value = true
bottomRightCheck.value = true

dialog.lower.alignChildren = 'fill'
dialog.duplicate = dialog.lower.addDuplicateGroup()

dialog.addAction(ACTION_GUIDES, function() { process(ACTION_GUIDES) })
dialog.addAction(ACTION_DELETE, function() { process(ACTION_DELETE) })
dialog.actions.add('statictext', [0, 0, 10, 0]) // gap
dialog.addAction('Cancel')
dialog.addAction(ACTION_DEFAULT, function() { process(ACTION_DEFAULT) })
dialog.show()

function process(action) {
    var offset = parseUnit(offsetEdit.text)
    var length = parseUnit(lengthEdit.text)
    var weight = parseUnit(weightEdit.text)
    var color = parseColor(colorList.selection.text)
    var locations = []
    var paths = []
    
    var horizontal = parseInt(duplicateHEdit.text) || 0
    var vertical = parseInt(duplicateVEdit.text) || 0
    var gap = parseUnit(duplicateGapEdit.text)

    if (horizontal < 1 || vertical < 1) {
        if (topLeftCheck.value) locations.push(LOCATION_TOP_LEFT)
        if (topRightCheck.value) locations.push(LOCATION_TOP_RIGHT)
        if (rightTopCheck.value) locations.push(LOCATION_RIGHT_TOP)
        if (rightBottomCheck.value) locations.push(LOCATION_RIGHT_BOTTOM)
        if (bottomRightCheck.value) locations.push(LOCATION_BOTTOM_RIGHT)
        if (bottomLeftCheck.value) locations.push(LOCATION_BOTTOM_LEFT)
        if (leftBottomCheck.value) locations.push(LOCATION_LEFT_BOTTOM)
        if (leftTopCheck.value) locations.push(LOCATION_LEFT_TOP)

        paths = paths.concat(createTrimMarks(selection[0], offset, length, weight, color, locations))
        doAction(action, selection[0])
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
            paths = paths.concat(createTrimMarks(item, offset, length, weight, color, locations))
            doAction(action, item)
        }, function(item, h, v) {
            locations = [LOCATION_LEFT_BOTTOM, LOCATION_LEFT_TOP]
            if (v == 0) {
                locations.push(LOCATION_TOP_LEFT, LOCATION_TOP_RIGHT)
            }
            if (v == vertical - 1) {
                locations.push(LOCATION_BOTTOM_LEFT, LOCATION_BOTTOM_RIGHT)
            }
            paths = paths.concat(createTrimMarks(item, offset, length, weight, color, locations))
            doAction(action, item)
        })
    }

    selection = paths
}

function doAction(action, item) {
    switch (action) {
        case ACTION_GUIDES:
            item.filled = false
            item.guides = true
            break;
        case ACTION_DELETE:
            item.remove()
            break;
    }
}

/**
 * Create multiple trim marks around target.
 * 
 * @param {PathItem} target - path where trim marks will be applied to, preferrably Rectangle
 * @param {Number} offset - space between target and trim marks
 * @param {Number} length - trim marks' width
 * @param {Number} weight - trim marks' stroke width
 * @param {CMYKColor} color - trim marks' color
 * @param {Array} locations - combination of 8 possible mark locations as defined in constants
 * @return {Array} created trim marks
 */
function createTrimMarks(target, offset, length, weight, color, locations) {
    var paths = []
    var width = target.width
    var height = target.height
    var startX = target.position[0]
    var endX = startX + width
    var startY = target.position[1]
    var endY = startY - height

    for (var i = 0; i < locations.length; i++) {
        switch (locations[i]) {
            case LOCATION_TOP_LEFT: 
                paths.push(createTrimMark(
                    startX,
                    startY + offset,
                    startX,
                    startY + offset + length,
                    weight, color
                ))
                break;
            case LOCATION_TOP_RIGHT:
                paths.push(createTrimMark(
                    endX,
                    startY + offset,
                    endX,
                    startY + offset + length,
                    weight, color
                ))
                break;
            case LOCATION_RIGHT_TOP: 
                paths.push(createTrimMark(
                    endX + offset,
                    startY,
                    endX + offset + length,
                    startY,
                    weight, color
                ))
                break;
            case LOCATION_RIGHT_BOTTOM: 
                paths.push(createTrimMark(
                    endX + offset,
                    endY,
                    endX + offset + length,
                    endY,
                    weight, color
                ))
                break;
            case LOCATION_BOTTOM_RIGHT: 
                paths.push(createTrimMark(
                    endX,
                    endY - offset,
                    endX,
                    endY - offset - length,
                    weight, color
                ))
                break;
            case LOCATION_BOTTOM_LEFT: 
                paths.push(createTrimMark(
                    startX,
                    endY - offset,
                    startX,
                    endY - offset - length,
                    weight, color
                ))       
                break;
            case LOCATION_LEFT_BOTTOM: 
                paths.push(createTrimMark(
                    startX - offset,
                    endY,
                    startX - offset - length,
                    endY,
                    weight, color
                ))
                break;
            case LOCATION_LEFT_TOP: 
                paths.push(createTrimMark(
                    startX - offset,
                    startY,
                    startX - offset - length,
                    startY,
                    weight, color
                ))
                break;
            default:
                throw 'Unrecognizable location ' + locations[i]
        }
    }
    return paths
}

/**
 * Create individual trim mark from point A to point B.
 * 
 * @param {number} fromX - starting X point
 * @param {number} fromY - starting Y point
 * @param {number} toX - destination X point
 * @param {number} toY - destination Y point
 * @param {number} weight - trim marks' stroke width
 * @param {Color} color - trim marks' color
 * @return {PathItem} created trim mark
 */
function createTrimMark(fromX, fromY, toX, toY, weight, color) {
    var path = document.pathItems.add()
    path.fillColor = COLOR_NONE
    path.strokeColor = color
    path.strokeWidth = weight

    var fromPosition = [fromX, fromY]
    var fromPoint = path.pathPoints.add()
    fromPoint.anchor = fromPosition
    fromPoint.leftDirection = fromPosition
    fromPoint.rightDirection = fromPosition

    var toPosition = [toX, toY]
    var toPoint = path.pathPoints.add()
    toPoint.anchor = toPosition
    toPoint.leftDirection = toPosition
    toPoint.rightDirection = toPosition

    return path
}