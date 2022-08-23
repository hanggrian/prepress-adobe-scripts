#target Illustrator
#include "../.lib/commons.js"

var SIZE_TEXT = [60, 21] // manual sizing because for multiple input column
var SIZE_EDIT = [100, 21]

var dialog = new Dialog("Add Paperbag Dielines", "adding-measuring-dielines/#add-paperbag-dielines")
var widthEdit, heightEdit, depthEdit, upperEdit, lowerEdit, glueLengthEdit, glueShearEdit
var strokeWeightEdit, strokeColorList
var config = configs.resolve("dielines/add_paperbag")

dialog.hgroup(function(main) {
  main.vgroup(function(topGroup) {
    topGroup.vpanel("Area", function(panel) {
      panel.alignChildren = "fill"
      panel.hgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
          group.tooltips("Width of paperbag")
          group.staticText(SIZE_TEXT, "Width:").also(JUSTIFY_RIGHT)
          widthEdit = group.editText(SIZE_EDIT, config.getString("width", "210 mm")).also(function(it) {
            it.validateUnits()
            it.activate()
          })
        })
        midGroup.hgroup(function(group) {
          group.tooltips("Height of paperbag")
          group.staticText(SIZE_TEXT, "Height:").also(JUSTIFY_RIGHT)
          heightEdit = group.editText(SIZE_EDIT, config.getString("height", "297 mm")).also(VALIDATE_UNITS)
        })
      })
      panel.hgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
          group.tooltips("Depth of paperbag")
          group.staticText(SIZE_TEXT, "Depth:").also(JUSTIFY_RIGHT)
          depthEdit = group.editText(SIZE_EDIT, config.getString("depth", "100 mm")).also(VALIDATE_UNITS)
        })
      })
      panel.hgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
          group.tooltips("Length of upper area")
          group.staticText(SIZE_TEXT, "Upper:").also(JUSTIFY_RIGHT)
          upperEdit = group.editText(SIZE_EDIT, config.getString("upper", "30 mm")).also(VALIDATE_UNITS)
        })
        midGroup.hgroup(function(group) {
          group.tooltips("Length of lower area")
          group.staticText(SIZE_TEXT, "Lower:").also(JUSTIFY_RIGHT)
          lowerEdit = group.editText(SIZE_EDIT, config.getString("lower", "60 mm")).also(VALIDATE_UNITS)
        })
      })
      panel.hgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
          group.tooltips("Length of glue area")
          group.staticText(SIZE_TEXT, "Glue:").also(JUSTIFY_RIGHT)
          glueLengthEdit = group.editText(SIZE_EDIT, config.getString("glue_length", "20 mm")).also(VALIDATE_UNITS)
        })
        midGroup.hgroup(function(group) {
          group.tooltips("Length of glue area")
          group.staticText(SIZE_TEXT, "Shear:").also(JUSTIFY_RIGHT)
          glueShearEdit = group.editText(SIZE_EDIT, config.getString("glue_shear", "5 mm")).also(VALIDATE_UNITS)
        })
      })
    })
    topGroup.vpanel("Stroke", function(panel) {
      panel.hgroup(function(midGroup) {
        midGroup.hgroup(function(group) {
          group.tooltips("Stroke width of dielines")
          group.staticText(SIZE_TEXT, "Weight:").also(JUSTIFY_RIGHT)
          strokeWeightEdit = group.editText(SIZE_EDIT, config.getString("stroke_weight", "1 pt")).also(VALIDATE_UNITS)
        })
        midGroup.hgroup(function(group) {
          group.tooltips("Stroke color of dielines")
          group.staticText(SIZE_TEXT, "Color:").also(JUSTIFY_RIGHT)
          strokeColorList = group.dropDownList(SIZE_EDIT, COLORS).also(function(it) {
            it.selectText(config.getString("stroke_color", "Black"))
          })
        })
      })
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton("Full-Size", function() { process(true) })
dialog.setYesButton("Half-Size", function() { process(false) })
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
  config.setString("stroke_color", strokeColorList.selection.text)
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
