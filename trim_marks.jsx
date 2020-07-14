/**
 * Create 2,5mm trim masks with 2,5mm bleed around the selected path item.
 * The marks are created with clockwise ordering.
 */

#target Illustrator
#include 'colors.jsx'

function createTrimMarks(selectedItem, bleedSize, markSize) {
    const width = selectedItem.width
    const height = selectedItem.height
    const startX = selectedItem.position[0]
    const endX = startX + width
    const startY = selectedItem.position[1]
    const endY = startY - height

    createTrimMark(
        document,
        endX,
        startY + bleedSize,
        endX,
        startY + bleedSize + markSize
    )
    createTrimMark(
        document,
        endX + bleedSize,
        startY,
        endX + bleedSize + markSize,
        startY
    )

    createTrimMark(
        document,
        endX + bleedSize,
        endY,
        endX + bleedSize + markSize,
        endY
    )
    createTrimMark(
        document,
        endX,
        endY - bleedSize,
        endX,
        endY - bleedSize - markSize
    )

    createTrimMark(
        document,
        startX,
        endY - bleedSize,
        startX,
        endY - bleedSize - markSize
    )
    createTrimMark(
        document,
        startX - bleedSize,
        endY,
        startX - bleedSize - markSize,
        endY
    )

    createTrimMark(
        document,
        startX - bleedSize,
        startY,
        startX - bleedSize - markSize,
        startY
    )
    createTrimMark(
        document,
        startX,
        startY + bleedSize,
        startX,
        startY + bleedSize + markSize
    )

    selectedItem.remove()
}

function createTrimMark(document, fromX, fromY, toX, toY) {
    const path = document.pathItems.add()
    path.fillColor = new NoColor()
    path.strokeColor = registrationColor(document)
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