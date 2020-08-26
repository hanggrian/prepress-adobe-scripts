/**
 * Create trim masks around the selected PathItem.
 * The marks are created with clockwise ordering.
 */

#target Illustrator
#include '../.lib/sui/dialog.js'
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
dialog.main = dialog.root.add('group')
dialog.mini = dialog.root.add('group')

dialog.main.orientation = 'column'
dialog.main.offset = dialog.main.add('group')
dialog.main.offset.add('statictext', BOUNDS_TEXT, 'Offset:').justify = 'right'
dialog.main.offsetEdit = dialog.main.offset.add('edittext', BOUNDS_EDIT, '2.5 mm')
dialog.main.offsetEdit.validateUnits()
dialog.main.offsetEdit.active = true
dialog.main.length = dialog.main.add('group')
dialog.main.length.add('statictext', BOUNDS_TEXT, 'Length:').justify = 'right'
dialog.main.lengthEdit = dialog.main.length.add('edittext', BOUNDS_EDIT, '2.5 mm')
dialog.main.lengthEdit.validateUnits()
dialog.main.weight = dialog.main.add('group')
dialog.main.weight.add('statictext', BOUNDS_TEXT, 'Weight:').justify = 'right'
dialog.main.weightEdit = dialog.main.weight.add('edittext', BOUNDS_EDIT, DEFAULT_WEIGHT)
dialog.main.weightEdit.validateUnits()
dialog.main.color = dialog.main.add('group')
dialog.main.color.add('statictext', BOUNDS_TEXT, 'Color:').justify = 'right'
dialog.main.colorList = dialog.main.color.add('dropdownlist', BOUNDS_EDIT, COLORS)
dialog.main.colorList.selection = 0
dialog.main.add('statictext', [0, 0, 0, 5]) // gap
dialog.main.locations = dialog.main.add('group')
dialog.main.locations.orientation = 'row'
dialog.main.locations.alignChildren = 'top'
dialog.main.locations.add('statictext', BOUNDS_TEXT, 'Locations:').justify = 'right'
dialog.main.locations.row = dialog.main.locations.add('group')
dialog.main.locations.row.orientation = 'column'
dialog.main.locations.row1 = dialog.main.locations.row.add('group')
dialog.main.locations.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
var topLeftCheck = dialog.main.locations.row1.add('checkbox', BOUNDS_CHECK, undefined)
dialog.main.locations.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
var topRightCheck = dialog.main.locations.row1.add('checkbox', BOUNDS_CHECK)
dialog.main.locations.row1.add('statictext', BOUNDS_CHECK).justify = 'right'
dialog.main.locations.row2 = dialog.main.locations.row.add('group')
var leftTopCheck = dialog.main.locations.row2.add('checkbox', BOUNDS_CHECK)
dialog.main.locations.row2.add('statictext', BOUNDS_CHECK, '↖︎').justify = 'right'
dialog.main.locations.row2.add('statictext', BOUNDS_CHECK, '↑').justify = 'right'
dialog.main.locations.row2.add('statictext', BOUNDS_CHECK, '↗').justify = 'right'
var rightTopCheck = dialog.main.locations.row2.add('checkbox', BOUNDS_CHECK)
dialog.main.locations.row3 = dialog.main.locations.row.add('group')
dialog.main.locations.row3.add('statictext', BOUNDS_CHECK).justify = 'right'
dialog.main.locations.row3.add('statictext', BOUNDS_CHECK, '←').justify = 'right'
dialog.main.locations.row3.add('statictext', BOUNDS_CHECK, '●').justify = 'right'
dialog.main.locations.row3.add('statictext', BOUNDS_CHECK, '→').justify = 'right'
dialog.main.locations.row3.add('statictext', BOUNDS_CHECK).justify = 'right'
dialog.main.locations.row4 = dialog.main.locations.row.add('group')
var leftBottomCheck = dialog.main.locations.row4.add('checkbox', BOUNDS_CHECK)
dialog.main.locations.row4.add('statictext', BOUNDS_CHECK, '↙').justify = 'right'
dialog.main.locations.row4.add('statictext', BOUNDS_CHECK, '↓').justify = 'right'
dialog.main.locations.row4.add('statictext', BOUNDS_CHECK, '↘').justify = 'right'
var rightBottomCheck = dialog.main.locations.row4.add('checkbox', BOUNDS_CHECK)
dialog.main.locations.row5 = dialog.main.locations.row.add('group')
dialog.main.locations.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
var bottomLeftCheck = dialog.main.locations.row5.add('checkbox', BOUNDS_CHECK)
dialog.main.locations.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
var bottomRightCheck = dialog.main.locations.row5.add('checkbox', BOUNDS_CHECK)
dialog.main.locations.row5.add('statictext', BOUNDS_CHECK).justify = 'right'
topLeftCheck.value = true
topRightCheck.value = true
leftTopCheck.value = true
rightTopCheck.value = true
leftBottomCheck.value = true
rightBottomCheck.value = true
bottomLeftCheck.value = true
bottomRightCheck.value = true

dialog.mini.orientation = 'column'
dialog.mini.alignChildren = 'fill'
dialog.mini.alignment = 'bottom'
dialog.duplicate = dialog.mini.addPanel('Duplicate').addDuplicate()
dialog.mini.add('statictext', [0, 0, 0, 45]) // gap
dialog.buttons2 = dialog.mini.add('group')
dialog.buttons2.orientation = 'column'
dialog.buttons2.alignment = 'right'
dialog.buttons2.add('button', undefined, ACTION_GUIDES).onClick = function() { 
    dialog.close()
    process(ACTION_GUIDES) 
}
dialog.buttons2.add('button', undefined, ACTION_DELETE).onClick = function() { 
    dialog.close()
    process(ACTION_DELETE) 
}

dialog.onAction(function() { process(ACTION_DEFAULT) })
dialog.show()

function process(action) {
    var offset = parseUnit(dialog.main.offsetEdit.text)
    var length = parseUnit(dialog.main.lengthEdit.text)
    var weight = parseUnit(dialog.main.weightEdit.text)
    var color = parseColor(dialog.main.colorList.selection.text)
    var locations = []
    var paths = []
    
    var horizontal = parseInt(dialog.duplicate.copiesHEdit.text) || 0
    var vertical = parseInt(dialog.duplicate.copiesVEdit.text) || 0
    var gap = parseUnit(dialog.duplicate.gapEdit.text)

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
        duplicate(horizontal, vertical, gap, function(item, h, v) {
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