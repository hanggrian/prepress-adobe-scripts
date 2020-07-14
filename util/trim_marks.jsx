/**
 * Constants below represents location of trim marks correspondent to clock hands.
 */

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

function createTrimMarks(selectedItem, bleed, mark, markLocations) {
    const width = selectedItem.width
    const height = selectedItem.height
    const startX = selectedItem.position[0]
    const endX = startX + width
    const startY = selectedItem.position[1]
    const endY = startY - height

    for (var i = 0; i < markLocations.length; i++) {
        switch (markLocations[i]) {
            case MARK_TOP_LEFT: 
                createTrimMark(
                    document,
                    startX,
                    startY + bleed,
                    startX,
                    startY + bleed + mark
                )
                break;
            case MARK_TOP_RIGHT:
                createTrimMark(
                    document,
                    endX,
                    startY + bleed,
                    endX,
                    startY + bleed + mark
                ) 
                break;
            case MARK_RIGHT_TOP: 
                createTrimMark(
                    document,
                    endX + bleed,
                    startY,
                    endX + bleed + mark,
                    startY
                )
                break;
            case MARK_RIGHT_BOTTOM: 
                createTrimMark(
                    document,
                    endX + bleed,
                    endY,
                    endX + bleed + mark,
                    endY
                )
                break;
            case MARK_BOTTOM_RIGHT: 
                createTrimMark(
                    document,
                    endX,
                    endY - bleed,
                    endX,
                    endY - bleed - mark
                )
                break;
            case MARK_BOTTOM_LEFT: 
                createTrimMark(
                    document,
                    startX,
                    endY - bleed,
                    startX,
                    endY - bleed - mark
                )        
                break;
            case MARK_LEFT_BOTTOM: 
                createTrimMark(
                    document,
                    startX - bleed,
                    endY,
                    startX - bleed - mark,
                    endY
                )
                break;
            case MARK_LEFT_TOP: 
                createTrimMark(
                    document,
                    startX - bleed,
                    startY,
                    startX - bleed - mark,
                    startY
                )
                break;
            default:
                throw 'Unrecognizable location ' + markLocations[i]
        }
    }
}

function createTrimMark(document, fromX, fromY, toX, toY) {
    const path = document.pathItems.add()
    path.fillColor = new NoColor()
    path.strokeColor = document.swatches['[registration]'].color
    path.strokeWidth = 0.3 // default size

    const fromPosition = [fromX, fromY]
    const fromPoint = path.pathPoints.add()
    fromPoint.anchor = fromPosition
    fromPoint.leftDirection = fromPosition
    fromPoint.rightDirection = fromPosition

    const toPosition = [toX, toY]
    const toPoint = path.pathPoints.add()
    toPoint.anchor = toPosition
    toPoint.leftDirection = toPosition
    toPoint.rightDirection = toPosition
}