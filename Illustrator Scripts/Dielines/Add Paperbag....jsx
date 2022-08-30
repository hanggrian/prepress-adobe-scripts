#target Illustrator
#include "../.lib/commons.js"

var SIZE_TEXT_DIVIDER = [60, 21]
var SIZE_EDIT = [100, 21]

var dialog = new Dialog(R.string.add_paperbag_dielines, "adding-measuring-dielines/#add-paperbag-dielines")
var widthEdit, heightEdit, depthEdit, upperEdit, lowerEdit, glueLengthEdit, glueShearEdit
var strokeWeightEdit, strokeColorList
var config = configs.resolve("dielines/add_paperbag")

dialog.hgroup(function(main) {
  main.vgroup(function(topGroup) {
    topGroup.vpanel("Area", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
          group.tooltips(R.string.tip_addpaperbagdielines_width)
          group.leftStaticText(undefined, R.string.width)
          widthEdit = group.editText(SIZE_EDIT, config.getString("width", "210 mm")).also(function(it) {
            it.validateUnits()
            it.activate()
          })
        })
        midGroup.hgroup(function(group) {
          group.tooltips(R.string.tip_addpaperbagdielines_height)
          group.leftStaticText(SIZE_TEXT_DIVIDER, R.string.height)
          heightEdit = group.editText(SIZE_EDIT, config.getString("height", "297 mm")).also(VALIDATE_UNITS)
        })
      })
      panel.hgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
          group.tooltips(R.string.tip_addpaperbagdielines_depth)
          group.leftStaticText(undefined, R.string.depth)
          depthEdit = group.editText(SIZE_EDIT, config.getString("depth", "100 mm")).also(VALIDATE_UNITS)
        })
      })
      panel.hgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
          group.tooltips(R.string.tip_addpaperbagdielines_upper)
          group.leftStaticText(undefined, R.string.upper)
          upperEdit = group.editText(SIZE_EDIT, config.getString("upper", "30 mm")).also(VALIDATE_UNITS)
        })
        midGroup.hgroup(function(group) {
          group.tooltips(R.string.tip_addpaperbagdielines_lower)
          group.leftStaticText(SIZE_TEXT_DIVIDER, R.string.lower)
          lowerEdit = group.editText(SIZE_EDIT, config.getString("lower", "60 mm")).also(VALIDATE_UNITS)
        })
      })
      panel.hgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
          group.tooltips(R.string.tip_addpaperbagdielines_glue)
          group.leftStaticText(undefined, R.string.glue)
          glueLengthEdit = group.editText(SIZE_EDIT, config.getString("glue_length", "20 mm")).also(VALIDATE_UNITS)
        })
        midGroup.hgroup(function(group) {
          group.tooltips(R.string.tip_addpaperbagdielines_shear)
          group.leftStaticText(SIZE_TEXT_DIVIDER, R.string.shear)
          glueShearEdit = group.editText(SIZE_EDIT, config.getString("glue_shear", "5 mm")).also(VALIDATE_UNITS)
        })
      })
    })
    topGroup.vpanel(R.string.stroke, function(panel) {
      panel.hgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
          group.tooltips(R.string.tip_addpaperbagdielines_strokeweight)
          group.leftStaticText(undefined, R.string.weight)
          strokeWeightEdit = group.editText(SIZE_EDIT, config.getString("stroke_weight", "1 pt")).also(VALIDATE_UNITS)
        })
        midGroup.hgroup(function(group) {
          group.tooltips(R.string.tip_addpaperbagdielines_strokecolor)
          group.leftStaticText(SIZE_TEXT_DIVIDER, R.string.color)
          strokeColorList = group.dropDownList(SIZE_EDIT, Colors.list()).also(function(it) {
            it.selection = config.getInt("stroke_color")
          })
        })
      })
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(R.string.full_size, function() { process(true) })
dialog.setYesButton(R.string.half_size, function() { process(false) })
dialog.show()

function process(isFull) {
  var width = parseUnits(widthEdit.text)
  var height = parseUnits(heightEdit.text)
  var depth = parseUnits(depthEdit.text)
  var upper = parseUnits(upperEdit.text)
  var lower = parseUnits(lowerEdit.text)
  var glueLength = parseUnits(glueLengthEdit.text)
  var glueShear = parseUnits(glueShearEdit.text)
  var weight = parseUnits(strokeWeightEdit.text)
  var color = parseColor(strokeColorList.selection.text)

  var paths = []
  var leftMost, topMost, bottomMost, rightMost
  document.artboards[document.artboards.getActiveArtboardIndex()].artboardRect.run(function(it) {
    leftMost = it.getLeft() + it.getWidth() / 10
    topMost = it.getTop() - it.getHeight() / 10
  })
  if (isFull) {
    rightMost = leftMost + glueLength + (width + depth) * 2
  } else {
    rightMost = leftMost + glueLength + width + depth
  }
  bottomMost = topMost - upper - height - lower

  // outer
  paths.push(createLine(weight, color, [
    [leftMost, topMost - glueShear],
    [leftMost + glueLength, topMost],
    [rightMost, topMost],
    [rightMost, bottomMost],
    [leftMost + glueLength, bottomMost],
    [leftMost, bottomMost + glueShear],
    [leftMost, topMost - glueShear]
  ]))

  // inner vertical
  paths.push(createDash(weight, color, [
    [leftMost + glueLength, topMost],
    [leftMost + glueLength, bottomMost]
  ]))
  paths.push(createDash(weight, color, [
    [leftMost + glueLength + width, topMost],
    [leftMost + glueLength + width, bottomMost]
  ]))
  paths.push(createDash(weight, color, [
    [leftMost + glueLength + width + depth * 0.5, topMost],
    [leftMost + glueLength + width + depth * 0.5, bottomMost]
  ]))
  if (isFull) {
    paths.push(createDash(weight, color, [
      [leftMost + glueLength + width + depth, topMost],
      [leftMost + glueLength + width + depth, bottomMost]
    ]))
    paths.push(createDash(weight, color, [
      [leftMost + glueLength + width * 2 + depth, topMost],
      [leftMost + glueLength + width * 2 + depth, bottomMost]
    ]))
    paths.push(createDash(weight, color, [
      [leftMost + glueLength + width * 2 + depth * 1.5, topMost],
      [leftMost + glueLength + width * 2 + depth * 1.5, bottomMost]
    ]))
  }

  // inner horizontal
  paths.push(createDash(weight, color, [
    [leftMost, topMost - upper],
    [rightMost, topMost - upper]
  ]))
  paths.push(createDash(weight, color, [
    [leftMost, topMost - upper - height + depth * 0.5],
    [rightMost, topMost - upper - height + depth * 0.5]
  ]))
  paths.push(createDash(weight, color, [
    [leftMost, topMost - upper - height],
    [rightMost, topMost - upper - height]
  ]))

  // inner diagonal
  var topDiagonal = topMost - upper - height + depth * 0.5
  paths.push(createDash(weight, color, [
    [leftMost, bottomMost + lower + glueLength],
    [leftMost + glueLength + lower, bottomMost]
  ]))
  var secondDiagonalPoints = []
  secondDiagonalPoints.push([leftMost + glueLength + width - lower, bottomMost])
  secondDiagonalPoints.push([leftMost + glueLength + width + depth * 0.5, topDiagonal])
  if (isFull) {
    secondDiagonalPoints.push([leftMost + glueLength + width + depth + lower, bottomMost])
  } else {
    secondDiagonalPoints.push([rightMost, bottomMost + lower])
  }
  paths.push(createDash(weight, color, secondDiagonalPoints))
  if (isFull) {
    paths.push(createDash(weight, color, [
      [leftMost + glueLength + width * 2 + depth - lower, bottomMost],
      [leftMost + glueLength + width * 2 + depth * 1.5, topDiagonal],
      [rightMost, bottomMost + lower]
    ]))
  }

  selection = paths

  config.setString("width", widthEdit.text)
  config.setString("height", heightEdit.text)
  config.setString("depth", depthEdit.text)
  config.setString("upper", upperEdit.text)
  config.setString("lower", lowerEdit.text)
  config.setString("glue_length", glueLengthEdit.text)
  config.setString("glue_shear", glueShearEdit.text)
  config.setString("stroke_weight", strokeWeightEdit.text)
  config.setInt("stroke_color", strokeColorList.selection.index)
}

function createLine(weight, color, positions) {
  var path = layer.pathItems.add()
  path.filled = false
  path.strokeDashes = []
  path.strokeColor = color
  path.strokeWidth = weight
  path.setEntirePath(positions)
  path.closed = true
  return path
}

function createDash(weight, color, positions) {
  var path = layer.pathItems.add()
  path.filled = false
  path.strokeDashes = [12]
  path.strokeColor = color
  path.strokeWidth = weight
  path.setEntirePath(positions)
  return path
}
