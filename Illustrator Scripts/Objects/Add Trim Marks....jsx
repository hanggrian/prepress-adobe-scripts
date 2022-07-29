#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [110, 21]
var BOUNDS_CHECK = [15, 15]

var dialog = new Dialog('Add Trim Marks', 'add-trim-marks')
var offsetEdit, lengthEdit, weightEdit, colorList
var topLeftCheck, topRightCheck, leftTopCheck, rightTopCheck, leftBottomCheck, rightBottomCheck, bottomLeftCheck, bottomRightCheck // single checks
var topCheck, rightCheck, bottomCheck, leftCheck // multiple checks
var multipleTargetMultiRadioCheckGroup
var prefs = preferences.resolve('objects/add_trim_marks')

dialog.vgroup(function(main) {
  main.alignChildren = 'right'
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel('Trim Marks', function(panel) {
      panel.hgroup(function(group) {
        group.tips('Distance between art and trim marks')
        group.staticText(BOUNDS_TEXT, 'Offset:').also(JUSTIFY_RIGHT)
        offsetEdit = group.editText(BOUNDS_EDIT, prefs.getString('offset', '2.5 mm')).also(function(it) {
          it.validateUnits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tips('Size of trim marks')
        group.staticText(BOUNDS_TEXT, 'Length:').also(JUSTIFY_RIGHT)
        lengthEdit = group.editText(BOUNDS_EDIT, prefs.getString('length', '2.5 mm')).also(VALIDATE_UNITS)
      })
      panel.hgroup(function(group) {
        group.tips('Thickness of trim marks')
        group.staticText(BOUNDS_TEXT, 'Weight:').also(JUSTIFY_RIGHT)
        weightEdit = group.editText(BOUNDS_EDIT, prefs.getString('weight', '0.3 pt')).also(VALIDATE_UNITS) // the same value used in `Object > Create Trim Marks`
      })
      panel.hgroup(function(group) {
        group.tips('Color of trim marks')
        group.staticText(BOUNDS_TEXT, 'Color:').also(JUSTIFY_RIGHT)
        colorList = group.dropDownList(BOUNDS_EDIT, COLORS).also(function(it) {
          it.selectText(prefs.getString('color', 'Registration'))
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
        group.image(BOUNDS_CHECK, 'ic_arrow_topleft')
        group.image(BOUNDS_CHECK, 'ic_arrow_top')
        group.image(BOUNDS_CHECK, 'ic_arrow_topright')
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
        group.image(BOUNDS_CHECK, 'ic_arrow_left')
        group.image(BOUNDS_CHECK, 'ic_arrow_center')
        group.image(BOUNDS_CHECK, 'ic_arrow_right')
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
        group.image(BOUNDS_CHECK, 'ic_arrow_bottomleft')
        group.image(BOUNDS_CHECK, 'ic_arrow_bottom')
        group.image(BOUNDS_CHECK, 'ic_arrow_bottomright')
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
  multipleTargetMultiRadioCheckGroup = new MultiRadioCheckGroup(main, 'Multiple Target', ['Default', 'Recursive']).also(function(it) {
    it.main.tips('When activated, trim marks will be added to each item')
    it.checkOnClick = function() {
      topLeftCheck.visible = !it.isSelected()
      topRightCheck.visible = !it.isSelected()
      leftTopCheck.visible = !it.isSelected()
      rightTopCheck.visible = !it.isSelected()
      leftBottomCheck.visible = !it.isSelected()
      rightBottomCheck.visible = !it.isSelected()
      bottomLeftCheck.visible = !it.isSelected()
      bottomRightCheck.visible = !it.isSelected()
      leftCheck.visible = it.isSelected()
      topCheck.visible = it.isSelected()
      rightCheck.visible = it.isSelected()
      bottomCheck.visible = it.isSelected()
    }
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var offset = parseUnits(offsetEdit.text)
  var length = parseUnits(lengthEdit.text)
  var weight = parseUnits(weightEdit.text)
  var color = parseColor(colorList.selection.text)
  var maxBounds = selection.getFarthestBounds()
  multipleTargetMultiRadioCheckGroup.isSelected()
    ? processMultiple(offset, length, weight, color, maxBounds)
    : processSingle(offset, length, weight, color, maxBounds)

  prefs.setString('offset', offsetEdit.text)
  prefs.setString('length', lengthEdit.text)
  prefs.setString('weight', weightEdit.text)
  prefs.setString('color', colorList.selection.text)
})
dialog.show()

function processSingle(offset, length, weight, color, maxBounds) {
  var paths = []
  if (topLeftCheck.value) {
    paths.push(createTrimMark(
      weight, color, 'TOP',
      maxBounds.getLeft(),
      maxBounds.getTop() + offset,
      maxBounds.getLeft(),
      maxBounds.getTop() + offset + length
    ))
  }
  if (topRightCheck.value) {
    paths.push(createTrimMark(
      weight, color, 'TOP',
      maxBounds.getRight(),
      maxBounds.getTop() + offset,
      maxBounds.getRight(),
      maxBounds.getTop() + offset + length
    ))
  }
  if (rightTopCheck.value) {
    paths.push(createTrimMark(
      weight, color, 'RIGHT',
      maxBounds.getRight() + offset,
      maxBounds.getTop(),
      maxBounds.getRight() + offset + length,
      maxBounds.getTop()
    ))
  }
  if (rightBottomCheck.value) {
    paths.push(createTrimMark(
      weight, color, 'RIGHT',
      maxBounds.getRight() + offset,
      maxBounds.getBottom(),
      maxBounds.getRight() + offset + length,
      maxBounds.getBottom()
    ))
  }
  if (bottomRightCheck.value) {
    paths.push(createTrimMark(
      weight, color, 'BOTTOM',
      maxBounds.getRight(),
      maxBounds.getBottom() - offset,
      maxBounds.getRight(),
      maxBounds.getBottom() - offset - length
    ))
  }
  if (bottomLeftCheck.value) {
    paths.push(createTrimMark(
      weight, color, 'BOTTOM',
      maxBounds.getLeft(),
      maxBounds.getBottom() - offset,
      maxBounds.getLeft(),
      maxBounds.getBottom() - offset - length
    ))
  }
  if (leftBottomCheck.value) {
    paths.push(createTrimMark(
      weight, color, 'LEFT',
      maxBounds.getLeft() - offset,
      maxBounds.getBottom(),
      maxBounds.getLeft() - offset - length,
      maxBounds.getBottom()
    ))
  }
  if (leftTopCheck.value) {
    paths.push(createTrimMark(
      weight, color, 'LEFT',
      maxBounds.getLeft() - offset,
      maxBounds.getTop(),
      maxBounds.getLeft() - offset - length,
      maxBounds.getTop()
    ))
  }
  return paths
}

function processMultiple(offset, length, weight, color, maxBounds) {
  var paths = []
  var action = function(item) {
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
        maxBounds.getTop() + offset,
        itemStartX,
        maxBounds.getTop() + offset + length
      ])
      paths.push([
        'TOP',
        itemEndX,
        maxBounds.getTop() + offset,
        itemEndX,
        maxBounds.getTop() + offset + length
      ])
    }
    if (rightCheck.value) {
      paths.push([
        'RIGHT',
        maxBounds.getRight() + offset,
        itemStartY,
        maxBounds.getRight() + offset + length,
        itemStartY
      ])
      paths.push([
        'RIGHT',
        maxBounds.getRight() + offset,
        itemEndY,
        maxBounds.getRight() + offset + length,
        itemEndY
      ])
    }
    if (bottomCheck.value) {
      paths.push([
        'BOTTOM',
        itemEndX,
        maxBounds.getBottom() - offset,
        itemEndX,
        maxBounds.getBottom() - offset - length
      ])
      paths.push([
        'BOTTOM',
        itemStartX,
        maxBounds.getBottom() - offset,
        itemStartX,
        maxBounds.getBottom() - offset - length
      ])
    }
    if (leftCheck.value) {
      paths.push([
        'LEFT',
        maxBounds.getLeft() - offset,
        itemEndY,
        maxBounds.getLeft() - offset - length,
        itemEndY
      ])
      paths.push([
        'LEFT',
        maxBounds.getLeft() - offset,
        itemStartY,
        maxBounds.getLeft() - offset - length,
        itemStartY
      ])
    }
  }
  if (multipleTargetMultiRadioCheckGroup.getSelectedRadio() === 'Recursive') {
    selection.forEachItem(action)
  } else {
    selection.forEach(action)
  }
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
    if (isEqualRounded(_element[1], element[1]) &&
      isEqualRounded(_element[2], element[2]) &&
      isEqualRounded(_element[3], element[3]) &&
      isEqualRounded(_element[4], element[4])) {
      return true
    }
  }
  return false
}

function createTrimMark(weight, color, suffixName, fromX, fromY, toX, toY) {
  println('{0}. From [{1}, {2}] to [{3}, {4}]', suffixName, fromX, fromY, toX, toY)
  var path = layer.pathItems.add()
  path.name = 'Trim' + suffixName
  path.filled = false
  path.strokeDashes = []
  path.strokeColor = color
  path.strokeWidth = weight
  path.setEntirePath([[fromX, fromY], [toX, toY]])
  return path
}
