// Direct replacement of `Object > Create Trim Marks` with some fixes:
// - If the selected art is a Path, trim marks will be created around **fill** as opposed to **stroke**.
// - If the selected art is a Clip Group, trim marks will be created around **clip size** as opposed to **content size**.
//
// And also some enhancements:
// - Customize marks' appearance and placement.
// - Support for creating multiple marks by duplicating.

#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]
var BOUNDS_CHECK = [15, 15]

var dialog = new Dialog('Add Trim Marks (Single)', 'fill')
var offsetEdit, lengthEdit, weightEdit, colorList
var topLeftCheck, topRightCheck, leftTopCheck, rightTopCheck, leftBottomCheck, rightBottomCheck, bottomLeftCheck, bottomRightCheck // single checks
var topCheck, rightCheck, bottomCheck, leftCheck // multiple checks
var isMultiple

dialog.main.orientation = 'row'
dialog.vpanel('Trim Marks', function(panel) {
    panel.alignChildren = 'fill'
    panel.hgroup(function(group) {
        group.setTooltips('Distance between art and trim marks')
        group.staticText(BOUNDS_TEXT, 'Offset:', JUSTIFY_RIGHT)
        offsetEdit = group.editText(BOUNDS_EDIT, unitsOf('2.5 mm'), function(it) {
            it.validateUnits()
            it.activate()
        })
    })
    panel.hgroup(function(group) {
        group.setTooltips('Size of trim marks')
        group.staticText(BOUNDS_TEXT, 'Length:', JUSTIFY_RIGHT)
        lengthEdit = group.editText(BOUNDS_EDIT, unitsOf('2.5 mm'), VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
        group.setTooltips('Thickness of trim marks')
        group.staticText(BOUNDS_TEXT, 'Weight:', JUSTIFY_RIGHT)
        weightEdit = group.editText(BOUNDS_EDIT, '0.3', VALIDATE_UNITS) // the same value used in `Object > Create Trim Marks`
    })
    panel.hgroup(function(group) {
        group.setTooltips('Color of trim marks')
        group.staticText(BOUNDS_TEXT, 'Color:', JUSTIFY_RIGHT)
        colorList = group.dropDownList(BOUNDS_EDIT, COLORS, function(it) {
            it.selection = COLORS.indexOf('Registration')
        })
    })
})
dialog.vpanel('Locations', function(panel) {
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_CHECK)
        topLeftCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Top left')
        })
        topCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Top')
            it.visible = false
        })
        topRightCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Top right')
        })
        group.staticText(BOUNDS_CHECK)
    })
    panel.hgroup(function(group) {
        leftTopCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Left top')
        })
        group.staticText(BOUNDS_CHECK, '\u2196', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u2191', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u2197', JUSTIFY_CENTER)
        rightTopCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Right top')
        })
    })
    panel.hgroup(function(group) {
        leftCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Left')
            it.visible = false
        })
        group.staticText(BOUNDS_CHECK, '\u2190', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u25CF', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u2192', JUSTIFY_CENTER)
        rightCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Right')
            it.visible = false
        })
    })
    panel.hgroup(function(group) {
        leftBottomCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Left bottom')
        })
        group.staticText(BOUNDS_CHECK, '\u2199', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u2193', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u2198', JUSTIFY_CENTER)
        rightBottomCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Right bottom')
        })
    })
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_CHECK)
        bottomLeftCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Bottom left')
        })
        bottomCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Bottom')
            it.visible = false
        })
        bottomRightCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Bottom right')
        })
        group.staticText(BOUNDS_CHECK)
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var offset = parseUnits(offsetEdit.text)
    var length = parseUnits(lengthEdit.text)
    var weight = parseUnits(weightEdit.text)
    var color = parseColor(colorList.selection.text)
    var startX, startY, endX, endY
    selection.forEach(function(item) {
        var clippingItem = item.getClippingPathItem()
        var width = clippingItem.width
        var height = clippingItem.height
        var itemStartX = clippingItem.position.first()
        var itemStartY = clippingItem.position[1]
        var itemEndX = itemStartX + width
        var itemEndY = itemStartY - height
        if (startX === undefined || itemStartX < startX) startX = itemStartX
        if (startY === undefined || itemStartY > startY) startY = itemStartY
        if (endX === undefined || itemEndX > endX) endX = itemEndX
        if (endY === undefined || itemEndY < endY) endY = itemEndY
    })
    selection = isMultiple
        ? processMultiple(offset, length, weight, color, startX, startY, endX, endY)
        : processSingle(offset, length, weight, color, startX, startY, endX, endY)
})
if (selection.length > 1) {
    dialog.setNeutralButton(50, 'Multiple Mode', function() {
        isMultiple = !isMultiple
        dialog.setTitle('Add Trim Marks (' + (isMultiple ? 'Multiple' : 'Single') + ')')
        dialog.neutralButton.text = isMultiple ? 'Single Mode' : 'Multiple Mode'
        topLeftCheck.visible = !isMultiple
        topRightCheck.visible = !isMultiple
        leftTopCheck.visible = !isMultiple
        rightTopCheck.visible = !isMultiple
        leftBottomCheck.visible = !isMultiple
        rightBottomCheck.visible = !isMultiple
        bottomLeftCheck.visible = !isMultiple
        bottomRightCheck.visible = !isMultiple
        leftCheck.visible = isMultiple
        topCheck.visible = isMultiple
        rightCheck.visible = isMultiple
        bottomCheck.visible = isMultiple
        return true
    })
}
dialog.show()

function processSingle(offset, length, weight, color, startX, startY, endX, endY) {
    var paths = []
    if (topLeftCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'TOP',
            startX,
            startY + offset,
            startX,
            startY + offset + length
        ))
    }
    if (topRightCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'TOP',
            endX,
            startY + offset,
            endX,
            startY + offset + length
        ))
    }
    if (rightTopCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'RIGHT',
            endX + offset,
            startY,
            endX + offset + length,
            startY
        ))
    }
    if (rightBottomCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'RIGHT',
            endX + offset,
            endY,
            endX + offset + length,
            endY
        ))
    }
    if (bottomRightCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'BOTTOM',
            endX,
            endY - offset,
            endX,
            endY - offset - length
        ))
    }
    if (bottomLeftCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'BOTTOM',
            startX,
            endY - offset,
            startX,
            endY - offset - length
        ))
    }
    if (leftBottomCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'LEFT',
            startX - offset,
            endY,
            startX - offset - length,
            endY
        ))
    }
    if (leftTopCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'LEFT',
            startX - offset,
            startY,
            startX - offset - length,
            startY
        ))
    }
    return paths
}

function processMultiple(offset, length, weight, color, maxStartX, maxStartY, maxEndX, maxEndY) {
    var paths = []
    selection.forEach(function(item) {
        var clippingItem = item.getClippingPathItem()
        var width = clippingItem.width
        var height = clippingItem.height
        var itemStartX = clippingItem.position.first()
        var itemStartY = clippingItem.position[1]
        var itemEndX = itemStartX + width
        var itemEndY = itemStartY - height
        if (topCheck.value) {
            paths.push([
                'TOP',
                itemStartX,
                maxStartY + offset,
                itemStartX,
                maxStartY + offset + length
            ])
            paths.push([
                'TOP',
                itemEndX,
                maxStartY + offset,
                itemEndX,
                maxStartY + offset + length
            ])
        }
        if (rightCheck.value) {
            paths.push([
                'RIGHT',
                maxEndX + offset,
                itemStartY,
                maxEndX + offset + length,
                itemStartY
            ])
            paths.push([
                'RIGHT',
                maxEndX + offset,
                itemEndY,
                maxEndX + offset + length,
                itemEndY
            ])
        }
        if (bottomCheck.value) {
            paths.push([
                'BOTTOM',
                itemEndX,
                maxEndY - offset,
                itemEndX,
                maxEndY - offset - length
            ])
            paths.push([
                'BOTTOM',
                itemStartX,
                maxEndY - offset,
                itemStartX,
                maxEndY - offset - length
            ])
        }
        if (leftCheck.value) {
            paths.push([
                'LEFT',
                maxStartX - offset,
                itemEndY,
                maxStartX - offset - length,
                itemEndY
            ])
            paths.push([
                'LEFT',
                maxStartX - offset,
                itemStartY,
                maxStartX - offset - length,
                itemStartY
            ])
        }
    })
    var distinctPaths = []
    paths.forEach(function(path) {
        if (!containsPathBounds(distinctPaths, path)) {
            distinctPaths.push(path)
        }
    })
    return distinctPaths.map(function(it) {
        return createTrimMark(weight, color, it[0], it[1], it[2], it[3], it[4])
    })
}

function containsPathBounds(collection, element) {
    var i = collection.length
    while (i--) {
        var _element = collection[i]
        if (_element[0] === element[0] &&
            _element[1] === element[1] &&
            _element[2] === element[2] &&
            _element[3] === element[3]) {
            return true
        }
    }
    return false
}

function createTrimMark(weight, color, suffixName, fromX, fromY, toX, toY) {
    var path = document.pathItems.add()
    path.name = 'Trim' + suffixName
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