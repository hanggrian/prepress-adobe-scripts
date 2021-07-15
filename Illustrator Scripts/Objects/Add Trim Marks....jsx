#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]
var BOUNDS_CHECK = [15, 15]

var dialog = new Dialog('Add Trim Marks')
var offsetEdit, lengthEdit, weightEdit, colorList
var topLeftCheck, topRightCheck, leftTopCheck, rightTopCheck, leftBottomCheck, rightBottomCheck, bottomLeftCheck, bottomRightCheck // single checks
var topCheck, rightCheck, bottomCheck, leftCheck // multiple checks
var multipleTargetCheck

dialog.vgroup(function(main) {
    main.alignChildren = 'right'
    main.hgroup(function(topGroup) {
        topGroup.alignChildren = 'fill'
        topGroup.vpanel('Trim Marks', function(panel) {
            panel.hgroup(function(group) {
                group.tips('Distance between art and trim marks')
                group.staticText(BOUNDS_TEXT, 'Offset:').also(JUSTIFY_RIGHT)
                offsetEdit = group.editText(BOUNDS_EDIT, '2.5 mm').also(function(it) {
                    it.validateUnits()
                    it.activate()
                })
            })
            panel.hgroup(function(group) {
                group.tips('Size of trim marks')
                group.staticText(BOUNDS_TEXT, 'Length:').also(JUSTIFY_RIGHT)
                lengthEdit = group.editText(BOUNDS_EDIT, '2.5 mm').also(VALIDATE_UNITS)
            })
            panel.hgroup(function(group) {
                group.tips('Thickness of trim marks')
                group.staticText(BOUNDS_TEXT, 'Weight:').also(JUSTIFY_RIGHT)
                weightEdit = group.editText(BOUNDS_EDIT, '0.3 pt').also(VALIDATE_UNITS) // the same value used in `Object > Create Trim Marks`
            })
            panel.hgroup(function(group) {
                group.tips('Color of trim marks')
                group.staticText(BOUNDS_TEXT, 'Color:').also(JUSTIFY_RIGHT)
                colorList = group.dropDownList(BOUNDS_EDIT, COLORS).also(function(it) {
                    it.selectText('Registration')
                })
            })
        })
        topGroup.vpanel('Locations', function(panel) {
            panel.hgroup(function(group) {
                group.staticText(BOUNDS_CHECK)
                topLeftCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Top left')
                })
                topCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Top')
                    it.visible = false
                })
                topRightCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Top right')
                })
                group.staticText(BOUNDS_CHECK)
            })
            panel.hgroup(function(group) {
                leftTopCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Left top')
                })
                group.staticText(BOUNDS_CHECK, '\u2196').also(JUSTIFY_CENTER)
                group.staticText(BOUNDS_CHECK, '\u2191').also(JUSTIFY_CENTER)
                group.staticText(BOUNDS_CHECK, '\u2197').also(JUSTIFY_CENTER)
                rightTopCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Right top')
                })
            })
            panel.hgroup(function(group) {
                leftCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Left')
                    it.visible = false
                })
                group.staticText(BOUNDS_CHECK, '\u2190').also(JUSTIFY_CENTER)
                group.staticText(BOUNDS_CHECK, '\u25CF').also(JUSTIFY_CENTER)
                group.staticText(BOUNDS_CHECK, '\u2192').also(JUSTIFY_CENTER)
                rightCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Right')
                    it.visible = false
                })
            })
            panel.hgroup(function(group) {
                leftBottomCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Left bottom')
                })
                group.staticText(BOUNDS_CHECK, '\u2199').also(JUSTIFY_CENTER)
                group.staticText(BOUNDS_CHECK, '\u2193').also(JUSTIFY_CENTER)
                group.staticText(BOUNDS_CHECK, '\u2198').also(JUSTIFY_CENTER)
                rightBottomCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Right bottom')
                })
            })
            panel.hgroup(function(group) {
                group.staticText(BOUNDS_CHECK)
                bottomLeftCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Bottom left')
                })
                bottomCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Bottom')
                    it.visible = false
                })
                bottomRightCheck = group.checkBox(BOUNDS_CHECK).also(function(it) {
                    it.select()
                    it.tip('Bottom right')
                })
                group.staticText(BOUNDS_CHECK)
            })
        })
    })
    multipleTargetCheck = main.checkBox(undefined, 'Multiple Target').also(function(it) {
        it.tip('When activated, trim marks will be added to each item')
        it.enabled = selection.length > 1
        it.onClick = function() {
            topLeftCheck.visible = !it.value
            topRightCheck.visible = !it.value
            leftTopCheck.visible = !it.value
            rightTopCheck.visible = !it.value
            leftBottomCheck.visible = !it.value
            rightBottomCheck.visible = !it.value
            bottomLeftCheck.visible = !it.value
            bottomRightCheck.visible = !it.value
            leftCheck.visible = it.value
            topCheck.visible = it.value
            rightCheck.visible = it.value
            bottomCheck.visible = it.value
        }
    })
})
dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var offset = parseUnits(offsetEdit.text)
    var length = parseUnits(lengthEdit.text)
    var weight = parseUnits(weightEdit.text)
    var color = parseColor(colorList.selection.text)
    var maxStartX, maxStartY, maxEndX, maxEndY
    selection.forEach(function(item) {
        var clippingItem = item.getClippingPathItem()
        var width = clippingItem.width
        var height = clippingItem.height
        var itemStartX = clippingItem.position.getLeft()
        var itemStartY = clippingItem.position.getTop()
        var itemEndX = itemStartX + width
        var itemEndY = itemStartY - height
        if (maxStartX === undefined || itemStartX < maxStartX) maxStartX = itemStartX
        if (maxStartY === undefined || itemStartY > maxStartY) maxStartY = itemStartY
        if (maxEndX === undefined || itemEndX > maxEndX) maxEndX = itemEndX
        if (maxEndY === undefined || itemEndY < maxEndY) maxEndY = itemEndY
    })
    selection = multipleTargetCheck.value
        ? processMultiple(offset, length, weight, color, maxStartX, maxStartY, maxEndX, maxEndY)
        : processSingle(offset, length, weight, color, maxStartX, maxStartY, maxEndX, maxEndY)
})
dialog.show()

function processSingle(offset, length, weight, color, maxStartX, maxStartY, maxEndX, maxEndY) {
    var paths = []
    if (topLeftCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'TOP',
            maxStartX,
            maxStartY + offset,
            maxStartX,
            maxStartY + offset + length
        ))
    }
    if (topRightCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'TOP',
            maxEndX,
            maxStartY + offset,
            maxEndX,
            maxStartY + offset + length
        ))
    }
    if (rightTopCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'RIGHT',
            maxEndX + offset,
            maxStartY,
            maxEndX + offset + length,
            maxStartY
        ))
    }
    if (rightBottomCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'RIGHT',
            maxEndX + offset,
            maxEndY,
            maxEndX + offset + length,
            maxEndY
        ))
    }
    if (bottomRightCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'BOTTOM',
            maxEndX,
            maxEndY - offset,
            maxEndX,
            maxEndY - offset - length
        ))
    }
    if (bottomLeftCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'BOTTOM',
            maxStartX,
            maxEndY - offset,
            maxStartX,
            maxEndY - offset - length
        ))
    }
    if (leftBottomCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'LEFT',
            maxStartX - offset,
            maxEndY,
            maxStartX - offset - length,
            maxEndY
        ))
    }
    if (leftTopCheck.value) {
        paths.push(createTrimMark(
            weight, color, 'LEFT',
            maxStartX - offset,
            maxStartY,
            maxStartX - offset - length,
            maxStartY
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
        var itemStartX = clippingItem.position.getLeft()
        var itemStartY = clippingItem.position.getTop()
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
        if (_element[1].round() === element[1].round() &&
            _element[2].round() === element[2].round() &&
            _element[3].round() === element[3].round() &&
            _element[4].round() === element[4].round()) {
            return true
        }
    }
    return false
}

function createTrimMark(weight, color, suffixName, fromX, fromY, toX, toY) {
    $.writeln(suffixName + '. From ' + '[' + fromX + ',' + fromY + '] to [' + toX + ',' + toY + ']')
    var path = document.pathItems.add()
    path.name = 'Trim' + suffixName
    path.filled = false
    path.strokeDashes = []
    path.strokeColor = color
    path.strokeWidth = weight
    path.setEntirePath([[fromX, fromY], [toX, toY]])
    return path
}