/**
 * Create trim masks with custom size around the selected path item.
 * The marks are created with clockwise ordering.
 * The selected item will be deleted afterwards.
 */

#target Illustrator
#include '.lib/colors.jsx'
#include '.lib/preconditions.jsx'
#include '.lib/units.jsx'

const MARK_TOP_LEFT = 11
const MARK_TOP_RIGHT = 1
const MARK_RIGHT_TOP = 2
const MARK_RIGHT_BOTTOM = 4
const MARK_BOTTOM_RIGHT = 5
const MARK_BOTTOM_LEFT = 7
const MARK_LEFT_BOTTOM = 8
const MARK_LEFT_TOP = 10
const MARK_ALL = [
    MARK_TOP_LEFT, MARK_TOP_RIGHT, 
    MARK_RIGHT_TOP, MARK_RIGHT_BOTTOM, 
    MARK_BOTTOM_RIGHT, MARK_BOTTOM_LEFT, 
    MARK_LEFT_BOTTOM, MARK_LEFT_TOP
]

const DEFAULT_TRIM_MARK_WEIGHT = 0.3 // The same value used in `Ai menu bar > Object > Create Trim Marks`.

const ACTION_NOTHING = 1
const ACTION_GUIDES = 2
const ACTION_DELETE = 3

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkSingleSelection(selection)

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

dialog.offsetGroup = dialog.add('group')
dialog.offsetGroup.add('statictext', textBounds, 'Offset:').justify = 'right'
dialog.offsetEdit = dialog.offsetGroup.add('edittext', editBounds, '2.5 mm')
dialog.offsetEdit.active = true

dialog.lengthGroup = dialog.add('group')
dialog.lengthGroup.add('statictext', textBounds, 'Length:').justify = 'right'
dialog.lengthEdit = dialog.lengthGroup.add('edittext', editBounds, '2.5 mm')

dialog.weightGroup = dialog.add('group')
dialog.weightGroup.add('statictext', textBounds, 'Weight:').justify = 'right'
dialog.weightEdit = dialog.weightGroup.add('edittext', editBounds, DEFAULT_TRIM_MARK_WEIGHT)

dialog.colorGroup = dialog.add('group')
dialog.colorGroup.add('statictext', textBounds, 'Color:').justify = 'right'
dialog.colorRegistrationRadio = dialog.colorGroup.add('radiobutton', undefined, 'Registration')
dialog.colorRegistrationRadio.value = true
dialog.colorWhiteRadio = dialog.colorGroup.add('radiobutton', undefined, 'White')

var actionBounds = [0, 0, 100, 15]
dialog.actionGroup = dialog.add('group')
dialog.actionGroup.add('statictext', textBounds, 'Selection:').justify = 'right'
dialog.actionInnerGroup = dialog.actionGroup.add('group')
dialog.actionInnerGroup.orientation = 'column'
dialog.actionNothingRadio = dialog.actionInnerGroup.add('radiobutton', actionBounds, 'Do nothing')
dialog.actionGuidesRadio = dialog.actionInnerGroup.add('radiobutton', actionBounds, 'Make guides')
dialog.actionGuidesRadio.value = true
dialog.actionDeleteRadio = dialog.actionInnerGroup.add('radiobutton', actionBounds, 'Delete')

var panelTextBounds = [0, 0, 90, 21]
var panelEditBounds = [0, 0, 35, 21]
dialog.multiplePanel = dialog.add('panel', undefined, 'Multiple')
dialog.multiplePanel.alignChildren = 'fill'

dialog.multiplicationGroup = dialog.multiplePanel.add('group')
dialog.multiplicationGroup.add('statictext', panelTextBounds, 'Multiplication:').justify = 'right'
dialog.horizontalEdit = dialog.multiplicationGroup.add('edittext', panelEditBounds)
dialog.horizontalEdit.justify = 'center' // find out why this doesn't work
dialog.multiplicationGroup.add('statictext', [0, 0, 10, 21], 'x').justify = 'center'
dialog.verticalEdit = dialog.multiplicationGroup.add('edittext', panelEditBounds)
dialog.verticalEdit.justify = 'center' // find out why this doesn't work

dialog.bleedGroup = dialog.multiplePanel.add('group')
dialog.bleedGroup.add('statictext', panelTextBounds, 'Bleed:').justify = 'right'
dialog.bleedEdit = dialog.bleedGroup.add('edittext', editBounds)

dialog.buttonGroup = dialog.add('group')
dialog.buttonGroup.alignment = 'right'
dialog.buttonGroup.add('button', undefined, 'Cancel')
dialog.buttonGroup.add('button', undefined, 'OK').onClick = function() {
    var offset = parseUnit(dialog.offsetEdit.text)
    var length = parseUnit(dialog.lengthEdit.text)
    var weight = parseUnit(dialog.weightEdit.text)
    var color = getColor()
    var action = getAction()
    
    var maxHorizontal = parseInt(dialog.horizontalEdit.text) || 0
    var maxVertical = parseInt(dialog.verticalEdit.text) || 0
    var multiplicationOffset = parseUnit(dialog.bleedEdit.text) * 2

    if (maxHorizontal < 1 || maxVertical < 1) { // multiple disabled
        createTrimMarks(selectedItem, offset, length, weight, color, MARK_ALL)
        doAction(action, selectedItem)
    } else { // multiple enabled
        app.copy()
        selectedItem.remove()

        // vertical is 0 because the starting point doesn't change
        var locations
        for (var vertical = 0; vertical < maxVertical; vertical++) {
            app.paste()
            selection[0].position = [x, y - vertical * (height + multiplicationOffset)]
            locations = [MARK_LEFT_BOTTOM, MARK_LEFT_TOP]
            if (vertical == 0) {
                locations.push(MARK_TOP_LEFT, MARK_TOP_RIGHT)
            }
            if (vertical == maxVertical - 1) {
                locations.push(MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT)
            }
            createTrimMarks(selection[0], offset, length, weight, color, locations)
            doAction(action, selection[0])

            for (var horizontal = 1; horizontal < maxHorizontal; horizontal++) {
                app.paste()
                selection[0].position = [x + horizontal * (width + multiplicationOffset), y - vertical * (height + multiplicationOffset)]
                locations = []
                if (horizontal == maxHorizontal - 1) {
                    locations.push(MARK_RIGHT_TOP, MARK_RIGHT_BOTTOM)
                }
                if (vertical == 0) {
                    locations.push(MARK_TOP_LEFT, MARK_TOP_RIGHT)
                }
                if (vertical == maxVertical - 1) {
                    locations.push(MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT)
                }
                createTrimMarks(selection[0], offset, length, weight, color, locations)
                doAction(action, selection[0])
            }
        }
    }

    document.selection = null
    dialog.close()
}

dialog.show()

function getColor() {
    if (dialog.colorRegistrationRadio.value) {
        return registrationColor()
    } else {
        return COLOR_WHITE
    }
}

function getAction() {
    if (dialog.actionNothingRadio.value) {
        return ACTION_NOTHING
    } else if (dialog.actionGuidesRadio.value) {
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
 * @param {Color} color - trim marks' stroke color
 * @param {Array} locations - combination of 8 possible mark locations as defined in constants
 * @return {void}
 */
function createTrimMarks(target, offset, length, weight, color, locations) {
    var width = target.width
    var height = target.height
    var startX = target.position[0]
    var endX = startX + width
    var startY = target.position[1]
    var endY = startY - height

    for (var i = 0; i < locations.length; i++) {
        switch (locations[i]) {
            case MARK_TOP_LEFT: 
                createTrimMark(
                    startX,
                    startY + offset,
                    startX,
                    startY + offset + length,
                    weight, 
                    color
                )
                break;
            case MARK_TOP_RIGHT:
                createTrimMark(
                    endX,
                    startY + offset,
                    endX,
                    startY + offset + length,
                    weight, 
                    color
                ) 
                break;
            case MARK_RIGHT_TOP: 
                createTrimMark(
                    endX + offset,
                    startY,
                    endX + offset + length,
                    startY,
                    weight, 
                    color
                )
                break;
            case MARK_RIGHT_BOTTOM: 
                createTrimMark(
                    endX + offset,
                    endY,
                    endX + offset + length,
                    endY,
                    weight, 
                    color
                )
                break;
            case MARK_BOTTOM_RIGHT: 
                createTrimMark(
                    endX,
                    endY - offset,
                    endX,
                    endY - offset - length,
                    weight, 
                    color
                )
                break;
            case MARK_BOTTOM_LEFT: 
                createTrimMark(
                    startX,
                    endY - offset,
                    startX,
                    endY - offset - length,
                    weight, 
                    color
                )        
                break;
            case MARK_LEFT_BOTTOM: 
                createTrimMark(
                    startX - offset,
                    endY,
                    startX - offset - length,
                    endY,
                    weight, 
                    color
                )
                break;
            case MARK_LEFT_TOP: 
                createTrimMark(
                    startX - offset,
                    startY,
                    startX - offset - length,
                    startY,
                    weight, 
                    color
                )
                break;
            default:
                throw 'Unrecognizable location ' + locations[i]
        }
    }
}

/**
 * Create individual trim mark from point A to point B.
 * 
 * @param {number} fromX - starting X point
 * @param {number} fromY - starting Y point
 * @param {number} toX - destination X point
 * @param {number} toY - destination Y point
 * @param {number} weight - trim marks' stroke width
 * @param {Color} color - trim marks' stroke color
 * @return {void}
 */
function createTrimMark(fromX, fromY, toX, toY, weight, color) {
    var path = document.pathItems.add()
    path.fillColor = new NoColor()
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
}