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

/**
 * Default trim mark stroke weight.
 * It is also the same value used in `Illustrator > Object > Create Trim Marks`.
 */
const DEFAULT_TRIM_MARK_WEIGHT = 0.3

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
    const path = document.pathItems.add()
    path.fillColor = new NoColor()
    path.strokeColor = color
    path.strokeWidth = weight

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