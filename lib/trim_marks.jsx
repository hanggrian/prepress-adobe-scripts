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

const DEFAULT_TRIM_MARK_WEIGHT = 0.3

/**
 * Create multiple trim marks around target.
 * 
 * @param {PathItem} target - path where trim marks will be applied to, preferrably Rectangle
 * @param {Number} offset - space between target and trim marks
 * @param {Number} length - trim marks' width
 * @param {Array} locations - combination of 8 possible mark locations as defined in constants
 */
function createTrimMarks(target, offset, length, locations) {
    const width = target.width
    const height = target.height
    const startX = target.position[0]
    const endX = startX + width
    const startY = target.position[1]
    const endY = startY - height

    for (var i = 0; i < locations.length; i++) {
        switch (locations[i]) {
            case MARK_TOP_LEFT: 
                createTrimMark(
                    document,
                    startX,
                    startY + offset,
                    startX,
                    startY + offset + length
                )
                break;
            case MARK_TOP_RIGHT:
                createTrimMark(
                    document,
                    endX,
                    startY + offset,
                    endX,
                    startY + offset + length
                ) 
                break;
            case MARK_RIGHT_TOP: 
                createTrimMark(
                    document,
                    endX + offset,
                    startY,
                    endX + offset + length,
                    startY
                )
                break;
            case MARK_RIGHT_BOTTOM: 
                createTrimMark(
                    document,
                    endX + offset,
                    endY,
                    endX + offset + length,
                    endY
                )
                break;
            case MARK_BOTTOM_RIGHT: 
                createTrimMark(
                    document,
                    endX,
                    endY - offset,
                    endX,
                    endY - offset - length
                )
                break;
            case MARK_BOTTOM_LEFT: 
                createTrimMark(
                    document,
                    startX,
                    endY - offset,
                    startX,
                    endY - offset - length
                )        
                break;
            case MARK_LEFT_BOTTOM: 
                createTrimMark(
                    document,
                    startX - offset,
                    endY,
                    startX - offset - length,
                    endY
                )
                break;
            case MARK_LEFT_TOP: 
                createTrimMark(
                    document,
                    startX - offset,
                    startY,
                    startX - offset - length,
                    startY
                )
                break;
            default:
                throw 'Unrecognizable location ' + locations[i]
        }
    }
}

function createTrimMark(document, fromX, fromY, toX, toY) {
    const path = document.pathItems.add()
    path.fillColor = new NoColor()
    path.strokeColor = document.swatches['[registration]'].color
    path.strokeWidth = DEFAULT_TRIM_MARK_WEIGHT

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