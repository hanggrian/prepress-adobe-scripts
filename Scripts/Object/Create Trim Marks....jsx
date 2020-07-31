/**
 * Create trim masks around the selected PathItem.
 * The marks are created with clockwise ordering.
 */

#target Illustrator
#include '../.lib/duplicate.js'
#include '../.lib/colors.js'
#include '../.lib/preconditions.js'
#include '../.lib/units.js'

const LOCATION_TOP_LEFT = 11
const LOCATION_TOP_RIGHT = 1
const LOCATION_RIGHT_TOP = 2
const LOCATION_RIGHT_BOTTOM = 4
const LOCATION_BOTTOM_RIGHT = 5
const LOCATION_BOTTOM_LEFT = 7
const LOCATION_LEFT_BOTTOM = 8
const LOCATION_LEFT_TOP = 10

const DEFAULT_WEIGHT = 0.3 // The same value used in `Ai menu bar > Object > Create Trim Marks`.

const ACTION_GUIDES = 1
const ACTION_DELETE = 2

const BOUNDS_TEXT = [0, 0, 60, 21]
const BOUNDS_EDIT = [0, 0, 80, 21]
const BOUNDS_CHECK = [0, 0, 15, 15]
const BOUNDS_PANEL_TEXT = [0, 0, 75, 21]
const BOUNDS_PANEL_EDIT = [0, 0, 35, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkSingleSelection()

checkTypename(selection[0], 'PathItem')

var multiplicationListener = function() {
    dialog.middle.enabled = horizontalEdit.text.length == 0 || verticalEdit.text.length == 0
}

var dialog = new Window('dialog', 'Create trim marks')
dialog.alignChildren = 'fill'

dialog.upper = dialog.add('group')
dialog.middle = dialog.add('panel', undefined, 'Locations')
dialog.lower = dialog.add('panel', undefined, 'Duplicate')
dialog.buttons = dialog.add('group')

dialog.upper.alignChildren = 'fill'
dialog.upperLeft = dialog.upper.add('group')
dialog.upperLeft.orientation = 'column'
dialog.upperLeft.offset = dialog.upperLeft.add('group')
dialog.upperLeft.offset.add('statictext', BOUNDS_TEXT, 'Offset:').justify = 'right'
var offsetEdit = dialog.upperLeft.offset.add('edittext', BOUNDS_EDIT, '2.5 mm')
offsetEdit.active = true
dialog.upperLeft.length = dialog.upperLeft.add('group')
dialog.upperLeft.length.add('statictext', BOUNDS_TEXT, 'Length:').justify = 'right'
var lengthEdit = dialog.upperLeft.length.add('edittext', BOUNDS_EDIT, '2.5 mm')
dialog.upperLeft.weight = dialog.upperLeft.add('group')
dialog.upperLeft.weight.add('statictext', BOUNDS_TEXT, 'Weight:').justify = 'right'
var weightEdit = dialog.upperLeft.weight.add('edittext', BOUNDS_EDIT, DEFAULT_WEIGHT)
dialog.upperRight = dialog.upper.add('group')
dialog.upperRight.alignChildren = 'fill'
dialog.upperRight.orientation = 'column'
dialog.upperRight.color = dialog.upperRight.add('group')
dialog.upperRight.color.add('statictext', BOUNDS_TEXT, 'Color:').justify = 'right'
var colorList = dialog.upperRight.color.add('dropdownlist', undefined, COLORS)
colorList.selection = 0
dialog.upperRight.action = dialog.upperRight.add('group')
dialog.upperRight.action.alignChildren = 'top'
dialog.upperRight.action.add('statictext', BOUNDS_TEXT, 'Selection:').justify = 'right'
dialog.upperRight.actionInner = dialog.upperRight.action.add('group')
dialog.upperRight.actionInner.alignChildren = 'fill'
dialog.upperRight.actionInner.orientation = 'column'
var actionGuidesRadio = dialog.upperRight.actionInner.add('radiobutton', undefined, 'Make guides')
var actionDeleteRadio = dialog.upperRight.actionInner.add('radiobutton', undefined, 'Delete')

dialog.middle.orientation = 'column'
dialog.middle1 = dialog.middle.add('group')
dialog.middle1.add('statictext', BOUNDS_CHECK).justify = 'right'
var topLeftCheck = dialog.middle1.add('checkbox', BOUNDS_CHECK, undefined)
dialog.middle1.add('statictext', BOUNDS_CHECK).justify = 'right'
var topRightCheck = dialog.middle1.add('checkbox', BOUNDS_CHECK)
dialog.middle1.add('statictext', BOUNDS_CHECK).justify = 'right'
dialog.middle2 = dialog.middle.add('group')
var leftTopCheck = dialog.middle2.add('checkbox', BOUNDS_CHECK)
dialog.middle2.add('statictext', BOUNDS_CHECK, '↖︎').justify = 'right'
dialog.middle2.add('statictext', BOUNDS_CHECK, '↑').justify = 'right'
dialog.middle2.add('statictext', BOUNDS_CHECK, '↗').justify = 'right'
var rightTopCheck = dialog.middle2.add('checkbox', BOUNDS_CHECK)
dialog.middle3 = dialog.middle.add('group')
dialog.middle3.add('statictext', BOUNDS_CHECK).justify = 'right'
dialog.middle3.add('statictext', BOUNDS_CHECK, '←').justify = 'right'
dialog.middle3.add('statictext', BOUNDS_CHECK, '●').justify = 'right'
dialog.middle3.add('statictext', BOUNDS_CHECK, '→').justify = 'right'
dialog.middle3.add('statictext', BOUNDS_CHECK).justify = 'right'
dialog.middle4 = dialog.middle.add('group')
var leftBottomCheck = dialog.middle4.add('checkbox', BOUNDS_CHECK)
dialog.middle4.add('statictext', BOUNDS_CHECK, '↙').justify = 'right'
dialog.middle4.add('statictext', BOUNDS_CHECK, '↓').justify = 'right'
dialog.middle4.add('statictext', BOUNDS_CHECK, '↘').justify = 'right'
var rightBottomCheck = dialog.middle4.add('checkbox', BOUNDS_CHECK)
dialog.middle5 = dialog.middle.add('group')
dialog.middle5.add('statictext', BOUNDS_CHECK).justify = 'right'
var bottomLeftCheck = dialog.middle5.add('checkbox', BOUNDS_CHECK)
dialog.middle5.add('statictext', BOUNDS_CHECK).justify = 'right'
var bottomRightCheck = dialog.middle5.add('checkbox', BOUNDS_CHECK)
dialog.middle5.add('statictext', BOUNDS_CHECK).justify = 'right'
topLeftCheck.value = true
topRightCheck.value = true
leftTopCheck.value = true
rightTopCheck.value = true
leftBottomCheck.value = true
rightBottomCheck.value = true
bottomLeftCheck.value = true
bottomRightCheck.value = true

dialog.lower.alignChildren = 'fill'
dialog.lower.add('group')
dialog.lower.multiplication = dialog.lower.add('group')
dialog.lower.multiplication.add('statictext', BOUNDS_PANEL_TEXT, 'Duplication:').justify = 'right'
var horizontalEdit = dialog.lower.multiplication.add('edittext', BOUNDS_PANEL_EDIT)
horizontalEdit.justify = 'center' // find out why this doesn't work
horizontalEdit.onChanging = multiplicationListener
dialog.lower.multiplication.add('statictext', undefined, 'x').justify = 'center'
var verticalEdit = dialog.lower.multiplication.add('edittext', BOUNDS_PANEL_EDIT)
verticalEdit.justify = 'center' // find out why this doesn't work
verticalEdit.onChanging = multiplicationListener
dialog.lower.offset = dialog.lower.add('group')
dialog.lower.offset.add('statictext', BOUNDS_PANEL_TEXT, 'Offset:').justify = 'right'
var multiplicationOffsetEdit = dialog.lower.offset.add('edittext', BOUNDS_EDIT)

dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()

    var offset = parseUnit(offsetEdit.text)
    var length = parseUnit(lengthEdit.text)
    var weight = parseUnit(weightEdit.text)
    var color = parseColor(colorList.selection.text)
    var action = getAction()
    var locations = []
    var paths = []

    var horizontal = parseInt(horizontalEdit.text) || 0
    var vertical = parseInt(verticalEdit.text) || 0
    var multiplicationOffset = parseUnit(multiplicationOffsetEdit.text)

    if (horizontal < 1 || vertical < 1) { // multiple disabled
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
    } else { // multiple enabled
        duplicate(horizontal, vertical, multiplicationOffset, function(item, h, v) {
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

dialog.show()

function getAction() {
    if (actionGuidesRadio.value) {
        return ACTION_GUIDES
    } else if (actionDeleteRadio.value) {
        return ACTION_DELETE
    } else {
        return 0
    }
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
 * @param {number} offset - space between target and trim marks
 * @param {number} length - trim marks' width
 * @param {number} weight - trim marks' stroke width
 * @param {Color} color - trim marks' color
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