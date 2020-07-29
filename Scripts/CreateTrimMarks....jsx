/**
 * Create trim masks around the selected PathItem.
 * The marks are created with clockwise ordering.
 */

#target Illustrator
#include '.lib/colors.jsx'
#include '.lib/preconditions.jsx'
#include '.lib/units.jsx'

const LOCATION_TOP_LEFT = 11
const LOCATION_TOP_RIGHT = 1
const LOCATION_RIGHT_TOP = 2
const LOCATION_RIGHT_BOTTOM = 4
const LOCATION_BOTTOM_RIGHT = 5
const LOCATION_BOTTOM_LEFT = 7
const LOCATION_LEFT_BOTTOM = 8
const LOCATION_LEFT_TOP = 10

const DEFAULT_WEIGHT = 0.3 // The same value used in `Ai menu bar > Object > Create Trim Marks`.

const ACTION_NOTHING = 1
const ACTION_GUIDES = 2
const ACTION_DELETE = 3

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkSingleSelection()

var selectedItem = selection[0]

checkTypename(selectedItem, 'PathItem')

var width = selectedItem.width
var height = selectedItem.height
var x = selectedItem.position[0]
var y = selectedItem.position[1]

var dialog = new Window('dialog', 'Create trim marks')
dialog.alignChildren = 'fill'

var textBounds = [0, 0, 60, 21]
var editBounds = [0, 0, 80, 21]
var checkBounds = [0, 0, 15, 15]
var panelTextBounds = [0, 0, 90, 21]
var panelEditBounds = [0, 0, 35, 21]

var multiplicationListener = function() {
    dialog.middle.enabled = horizontalEdit.text.length == 0 || verticalEdit.text.length == 0
}

dialog.upper = dialog.add('group')
dialog.middle = dialog.add('panel', undefined, 'Locations')
dialog.middle.orientation = 'column'
dialog.lower = dialog.add('panel', undefined, 'Multiple')
dialog.lower.alignChildren = 'fill'

dialog.upperLeft = dialog.upper.add('group')
dialog.upperLeft.orientation = 'column'
dialog.upperLeft.offset = dialog.upperLeft.add('group')
dialog.upperLeft.offset.add('statictext', textBounds, 'Offset:').justify = 'right'
var offsetEdit = dialog.upperLeft.offset.add('edittext', editBounds, '2.5 mm')
offsetEdit.active = true
dialog.upperLeft.length = dialog.upperLeft.add('group')
dialog.upperLeft.length.add('statictext', textBounds, 'Length:').justify = 'right'
var lengthEdit = dialog.upperLeft.length.add('edittext', editBounds, '2.5 mm')
dialog.upperLeft.weight = dialog.upperLeft.add('group')
dialog.upperLeft.weight.add('statictext', textBounds, 'Weight:').justify = 'right'
var weightEdit = dialog.upperLeft.weight.add('edittext', editBounds, DEFAULT_WEIGHT)

dialog.upperRight = dialog.upper.add('group')
dialog.upperRight.orientation = 'column'
dialog.upperRight.action = dialog.upperRight.add('group')
dialog.upperRight.action.alignChildren = 'top'
dialog.upperRight.action.add('statictext', textBounds, 'Selection:').justify = 'right'
dialog.upperRight.actionInner = dialog.upperRight.action.add('group')
dialog.upperRight.actionInner.alignChildren = 'fill'
dialog.upperRight.actionInner.orientation = 'column'
var actionNothingRadio = dialog.upperRight.actionInner.add('radiobutton', undefined, 'Do nothing')
var actionGuidesRadio = dialog.upperRight.actionInner.add('radiobutton', undefined, 'Make guides')
actionGuidesRadio.value = true
var actionDeleteRadio = dialog.upperRight.actionInner.add('radiobutton', undefined, 'Delete')

dialog.middle1 = dialog.middle.add('group')
dialog.middle1.add('statictext', checkBounds).justify = 'right'
var topLeftCheck = dialog.middle1.add('checkbox', checkBounds, undefined)
dialog.middle1.add('statictext', checkBounds).justify = 'right'
var topRightCheck = dialog.middle1.add('checkbox', checkBounds)
dialog.middle1.add('statictext', checkBounds).justify = 'right'
dialog.middle2 = dialog.middle.add('group')
var leftTopCheck = dialog.middle2.add('checkbox', checkBounds)
dialog.middle2.add('statictext', checkBounds, '↖︎').justify = 'right'
dialog.middle2.add('statictext', checkBounds, '↑').justify = 'right'
dialog.middle2.add('statictext', checkBounds, '↗').justify = 'right'
var rightTopCheck = dialog.middle2.add('checkbox', checkBounds)
dialog.middle3 = dialog.middle.add('group')
dialog.middle3.add('statictext', checkBounds).justify = 'right'
dialog.middle3.add('statictext', checkBounds, '←').justify = 'right'
dialog.middle3.add('statictext', checkBounds, '●').justify = 'right'
dialog.middle3.add('statictext', checkBounds, '→').justify = 'right'
dialog.middle3.add('statictext', checkBounds).justify = 'right'
dialog.middle4 = dialog.middle.add('group')
var leftBottomCheck = dialog.middle4.add('checkbox', checkBounds)
dialog.middle4.add('statictext', checkBounds, '↙').justify = 'right'
dialog.middle4.add('statictext', checkBounds, '↓').justify = 'right'
dialog.middle4.add('statictext', checkBounds, '↘').justify = 'right'
var rightBottomCheck = dialog.middle4.add('checkbox', checkBounds)
dialog.middle5 = dialog.middle.add('group')
dialog.middle5.add('statictext', checkBounds).justify = 'right'
var bottomLeftCheck = dialog.middle5.add('checkbox', checkBounds)
dialog.middle5.add('statictext', checkBounds).justify = 'right'
var bottomRightCheck = dialog.middle5.add('checkbox', checkBounds)
dialog.middle5.add('statictext', checkBounds).justify = 'right'
topLeftCheck.value = true
topRightCheck.value = true
leftTopCheck.value = true
rightTopCheck.value = true
leftBottomCheck.value = true
rightBottomCheck.value = true
bottomLeftCheck.value = true
bottomRightCheck.value = true

dialog.lower.add('group')
dialog.lowerMultiplication = dialog.lower.add('group')
dialog.lowerMultiplication.add('statictext', panelTextBounds, 'Multiplication:').justify = 'right'
var horizontalEdit = dialog.lowerMultiplication.add('edittext', panelEditBounds)
horizontalEdit.justify = 'center' // find out why this doesn't work
horizontalEdit.onChanging = multiplicationListener
dialog.lowerMultiplication.add('statictext', undefined, 'x').justify = 'center'
var verticalEdit = dialog.lowerMultiplication.add('edittext', panelEditBounds)
verticalEdit.justify = 'center' // find out why this doesn't work
verticalEdit.onChanging = multiplicationListener

dialog.lowerBleed = dialog.lower.add('group')
dialog.lowerBleed.add('statictext', panelTextBounds, 'Bleed:').justify = 'right'
var bleedEdit = dialog.lowerBleed.add('edittext', editBounds)

dialog.buttons = dialog.add('group')
dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()

    var offset = parseUnit(offsetEdit.text)
    var length = parseUnit(lengthEdit.text)
    var weight = parseUnit(weightEdit.text)
    var action = getAction()
    var locations = []
    var paths = []

    var maxHorizontal = parseInt(horizontalEdit.text) || 0
    var maxVertical = parseInt(verticalEdit.text) || 0
    var multiplicationOffset = parseUnit(bleedEdit.text) * 2

    if (maxHorizontal < 1 || maxVertical < 1) { // multiple disabled
        if (topLeftCheck.value) locations.push(LOCATION_TOP_LEFT)
        if (topRightCheck.value) locations.push(LOCATION_TOP_RIGHT)
        if (rightTopCheck.value) locations.push(LOCATION_RIGHT_TOP)
        if (rightBottomCheck.value) locations.push(LOCATION_RIGHT_BOTTOM)
        if (bottomRightCheck.value) locations.push(LOCATION_BOTTOM_RIGHT)
        if (bottomLeftCheck.value) locations.push(LOCATION_BOTTOM_LEFT)
        if (leftBottomCheck.value) locations.push(LOCATION_LEFT_BOTTOM)
        if (leftTopCheck.value) locations.push(LOCATION_LEFT_TOP)

        paths = paths.concat(createTrimMarks(selectedItem, offset, length, weight, locations))
        doAction(action, selectedItem)
    } else { // multiple enabled
        app.copy()
        selectedItem.remove()

        // vertical is 0 because the starting point doesn't change
        for (var vertical = 0; vertical < maxVertical; vertical++) {
            app.paste()
            selection[0].position = [x, y - vertical * (height + multiplicationOffset)]
            locations = [LOCATION_LEFT_BOTTOM, LOCATION_LEFT_TOP]
            if (vertical == 0) {
                locations.push(LOCATION_TOP_LEFT, LOCATION_TOP_RIGHT)
            }
            if (vertical == maxVertical - 1) {
                locations.push(LOCATION_BOTTOM_LEFT, LOCATION_BOTTOM_RIGHT)
            }
            paths = paths.concat(createTrimMarks(selection[0], offset, length, weight, locations))
            doAction(action, selection[0])

            for (var horizontal = 1; horizontal < maxHorizontal; horizontal++) {
                app.paste()
                selection[0].position = [x + horizontal * (width + multiplicationOffset), y - vertical * (height + multiplicationOffset)]
                locations = []
                if (horizontal == maxHorizontal - 1) {
                    locations.push(LOCATION_RIGHT_TOP, LOCATION_RIGHT_BOTTOM)
                }
                if (vertical == 0) {
                    locations.push(LOCATION_TOP_LEFT, LOCATION_TOP_RIGHT)
                }
                if (vertical == maxVertical - 1) {
                    locations.push(LOCATION_BOTTOM_LEFT, LOCATION_BOTTOM_RIGHT)
                }
                paths = paths.concat(createTrimMarks(selection[0], offset, length, weight, locations))
                doAction(action, selection[0])
            }
        }
    }

    selection = paths
}

dialog.show()

function getAction() {
    if (actionNothingRadio.value) {
        return ACTION_NOTHING
    } else if (actionGuidesRadio.value) {
        return ACTION_GUIDES
    } else {
        return ACTION_DELETE
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
 * @param {Array} locations - combination of 8 possible mark locations as defined in constants
 * @return {Array} created trim marks
 */
function createTrimMarks(target, offset, length, weight, locations) {
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
                    weight
                ))
                break;
            case LOCATION_TOP_RIGHT:
                paths.push(createTrimMark(
                    endX,
                    startY + offset,
                    endX,
                    startY + offset + length,
                    weight
                ))
                break;
            case LOCATION_RIGHT_TOP: 
                paths.push(createTrimMark(
                    endX + offset,
                    startY,
                    endX + offset + length,
                    startY,
                    weight
                ))
                break;
            case LOCATION_RIGHT_BOTTOM: 
                paths.push(createTrimMark(
                    endX + offset,
                    endY,
                    endX + offset + length,
                    endY,
                    weight
                ))
                break;
            case LOCATION_BOTTOM_RIGHT: 
                paths.push(createTrimMark(
                    endX,
                    endY - offset,
                    endX,
                    endY - offset - length,
                    weight
                ))
                break;
            case LOCATION_BOTTOM_LEFT: 
                paths.push(createTrimMark(
                    startX,
                    endY - offset,
                    startX,
                    endY - offset - length,
                    weight
                ))       
                break;
            case LOCATION_LEFT_BOTTOM: 
                paths.push(createTrimMark(
                    startX - offset,
                    endY,
                    startX - offset - length,
                    endY,
                    weight
                ))
                break;
            case LOCATION_LEFT_TOP: 
                paths.push(createTrimMark(
                    startX - offset,
                    startY,
                    startX - offset - length,
                    startY,
                    weight
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
 * @return {Object} created trim mark
 */
function createTrimMark(fromX, fromY, toX, toY, weight) {
    var path = document.pathItems.add()
    path.fillColor = new NoColor()
    path.strokeColor = registrationColor()
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