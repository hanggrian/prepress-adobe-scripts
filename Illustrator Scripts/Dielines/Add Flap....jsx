// TODO: Broken, tabbedpanel is null when default dialog button is clicked

#target Illustrator
#include "../.lib/commons.js"

var DIRECTIONS = [
  ["Top", "ic_arrow_top"],
  ["Right", "ic_arrow_right"],
  ["Bottom", "ic_arrow_bottom"],
  ["Left", "ic_arrow_left"]
]
var SIZE_INPUT = [110, 21]
var SIZE_LABEL_TAB = [70, 21] // can't align right on tabbed panel
var SIZE_RADIO = [15, 15]

checkSingleSelection()

var dialog = new Dialog("Add Flap Dieline", "adding-measuring-dielines/#add-flap-dieline")
var lengthEdit, weightEdit, colorList, directionList, tabbedPanel
var glueShearEdit, glueScratchEdit
var tuckSliderGroup, tuckDistanceEdit
var dustShoulderEdit, dustDistanceEdit
var leftRadio, topRadio, rightRadio, bottomRadio
var config = configs.resolve("dielines/add_flap")

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  main.hgroup(function(topGroup) {
    topGroup.vpanel("Flap", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("In horizontal direction, this is height. In vertical direction, this is width.")
        group.staticText(undefined, "Length:").also(JUSTIFY_RIGHT)
        lengthEdit = group.editText(SIZE_INPUT, config.getString("length", "20 mm")).also(function(it) {
          it.validateUnits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tooltips("Stroke width of dielines")
        group.staticText(undefined, "Weight:").also(JUSTIFY_RIGHT)
        weightEdit = group.editText(SIZE_INPUT, config.getString("weight", "1 pt")).also(VALIDATE_UNITS)
      })
      panel.hgroup(function(group) {
        group.tooltips("Stroke color of dielines")
        group.staticText(undefined, "Color:").also(JUSTIFY_RIGHT)
        colorList = group.dropDownList(SIZE_INPUT, COLORS).also(function(it) {
          it.selectText(config.getString("color", "Black"))
        })
      })
      panel.hgroup(function(group) {
        group.tooltips("Where should the flap be added relative to target")
        group.staticText(undefined, "Direction:").also(JUSTIFY_RIGHT)
        directionList = group.dropDownList(SIZE_INPUT, DIRECTIONS).also(function(it) {
          it.selectText(config.getString("direction", "Top"))
        })
      })
    })
  })
  tabbedPanel = main.tabbedPanel(function(panel) {
    panel.preferredSize = [200, 0]
    panel.vtab("Glue Flap", function(tab) {
      tab.hgroup(function(group) {
        group.tooltips("End line of glue flat must be lesser than starting line, shear value make sure of it")
        group.staticText(SIZE_LABEL_TAB, "Shear:").also(JUSTIFY_RIGHT)
        glueShearEdit = group.editText(SIZE_INPUT, "5 mm").also(VALIDATE_UNITS)
      })
      tab.hgroup(function(group) {
        group.tooltips("Distance between scratches, leave blank for no scratches")
        group.staticText(SIZE_LABEL_TAB, "Scratches:").also(JUSTIFY_RIGHT)
        glueScratchEdit = group.editText(SIZE_INPUT, "0 mm").also(function(it) {
          it.validateUnits()
          it.enabled = false
        })
      })
    })
    /* tabbedPanel.vtab("Tuck Flap", function(tab) {
      tab.hgroup(function(group) {
        group.tooltips("How big should the curve be relative to length, in percentage")
        group.staticText(SIZE_LABEL_TAB, "Curve:").also(JUSTIFY_RIGHT)
        tuckSliderGroup = new SliderGroup(group, SIZE_EDIT, 2, 0, 4, 25)
      })
      tab.hgroup(function(group) {
        group.tooltips("Thicker material should have more distance")
        group.staticText(SIZE_LABEL_TAB, "Distance:").also(JUSTIFY_RIGHT)
        tuckDistanceEdit = group.editText(SIZE_EDIT, "0 mm").also(VALIDATE_UNITS)
      })
    }) */
    panel.vtab("Dust Flap", function(tab) {
      tab.hgroup(function(group) {
        group.tooltips("Necessary for locking a tuck flap")
        group.staticText(SIZE_LABEL_TAB, "Shoulder:").also(JUSTIFY_RIGHT)
        dustShoulderEdit = group.editText(SIZE_INPUT, "5 mm").also(VALIDATE_UNITS)
      })
      tab.hgroup(function(group) {
        group.tooltips("Thicker material should have more distance")
        group.staticText(SIZE_LABEL_TAB, "Distance:").also(JUSTIFY_RIGHT)
        dustDistanceEdit = group.editText(SIZE_INPUT, "0 mm").also(VALIDATE_UNITS)
      })
    })
    panel.onChange = function() {
      if (panel.selection === null) {
        return
      } else if (panel.selection.text === "Glue Flap") {
        glueShearEdit.activate()
      } else if (panel.selection.text === "Tuck Flap") {
        tuckCurveEdit.activate()
      } else {
        dustShoulderEdit.activate()
      }
    }
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var length = parseUnits(lengthEdit.text)
  var weight = parseUnits(weightEdit.text)
  var color = parseColor(colorList.selection.text)

  var pathItem = layer.pathItems.add()
  pathItem.filled = false
  pathItem.strokeDashes = []
  pathItem.strokeColor = color
  pathItem.strokeWidth = weight

  if (tabbedPanel.selection.text === "Glue Flap") {
    processGlue(pathItem, length)
  } else if (tabbedPanel.selection.text === "Tuck Flap") {
    processTuck(pathItem, length)
  } else {
    processDust(pathItem, length)
  }
  selection = [pathItem]

  config.setString("length", lengthEdit.text)
  config.setString("weight", weightEdit.text)
  config.setString("color", colorList.selection.text)
  config.setString("direction", directionList.selection.text)
})
dialog.show()

function processGlue(pathItem, length) {
  var glueShear = parseUnits(glueShearEdit.text)
  var glueScratch = parseUnits(glueScratchEdit.text)
  var positions = []
  Collections.first(selection).geometricBounds.run(function(it) {
    if (directionList.selection.text === "Left") {
      positions.push([it.getLeft(), it.getTop()])
      positions.push([it.getLeft() - length, it.getTop() - glueShear])
      positions.push([it.getLeft() - length, it.getBottom() + glueShear])
      positions.push([it.getLeft(), it.getBottom()])
    } else if (directionList.selection.text === "Top") {
      positions.push([it.getLeft(), it.getTop()])
      positions.push([it.getLeft() + glueShear, it.getTop() + length])
      positions.push([it.getRight() - glueShear, it.getTop() + length])
      positions.push([it.getRight(), it.getTop()])
    } else if (directionList.selection.text === "Right") {
      positions.push([it.getRight(), it.getTop()])
      positions.push([it.getRight() + length, it.getTop() - glueShear])
      positions.push([it.getRight() + length, it.getBottom() + glueShear])
      positions.push([it.getRight(), it.getBottom()])
    } else {
      positions.push([it.getLeft(), it.getBottom()])
      positions.push([it.getLeft() + glueShear, it.getBottom() - length])
      positions.push([it.getRight() - glueShear, it.getBottom() - length])
      positions.push([it.getRight(), it.getBottom()])
    }
  })
  pathItem.name = "FlapGLUE"
  pathItem.setEntirePath(positions)
}

function processTuck(pathItem, length) {
  var tuckCurve = parseInt(tuckCurveEdit.text) * length / 100
  var tuckStart = length - tuckCurve
  var tuckDistance = parseUnits(tuckDistanceEdit.text)
  var positions = []
  Collections.first(selection).geometricBounds.run(function(it) {
    if (directionList.selection.text === "Left") {
      positions.push([it.getLeft(), it.getTop() - tuckDistance])
      positions.push([it.getLeft() - tuckStart, it.getTop() - tuckDistance])
      positions.push([it.getLeft() - length, it.getTop() - tuckCurve - tuckDistance])
      positions.push([it.getLeft() - length, it.getBottom() + tuckCurve + tuckDistance])
      positions.push([it.getLeft() - tuckStart, it.getBottom() + tuckDistance])
      positions.push([it.getLeft(), it.getBottom() + tuckDistance])
    } else if (directionList.selection.text === "Top") {
    } else if (directionList.selection.text === "Right") {
    } else {
    }
  })
  pathItem.name = "FlapTUCK"
  positions.forEach(function(it) {
    var point = pathItem.pathPoints.add()
    point.anchor = it
    point.leftDirection = it
    point.rightDirection = it
  })
}

function processDust(pathItem, length) {
  var dustShoulder = parseUnits(dustShoulderEdit.text)
  var dustDistance = parseUnits(dustDistanceEdit.text)
  var positions = []
  Collections.first(selection).geometricBounds.run(function(it) {
    if (directionList.selection.text === "Left") {
      positions.push([it.getLeft(), it.getTop()])
      positions.push([it.getLeft() - dustDistance, it.getTop() - dustDistance])
      positions.push([it.getLeft() - length, it.getTop() - dustDistance])
      positions.push([it.getLeft() - length, it.getBottom() + dustShoulder * 1.5])
      positions.push([it.getLeft() - dustShoulder * 1.5, it.getBottom() + dustShoulder / 2])
      positions.push([it.getLeft() - dustShoulder, it.getBottom()])
      positions.push([it.getLeft(), it.getBottom()])
    } else if (directionList.selection.text === "Top") {
      positions.push([it.getLeft(), it.getTop()])
      positions.push([it.getLeft() + dustDistance, it.getTop() + dustDistance])
      positions.push([it.getLeft() + dustDistance, it.getTop() + length])
      positions.push([it.getRight() - dustShoulder * 1.5, it.getTop() + length])
      positions.push([it.getRight() - dustShoulder / 2, it.getTop() + dustShoulder * 1.5])
      positions.push([it.getRight(), it.getTop() + dustShoulder])
      positions.push([it.getRight(), it.getTop()])
    } else if (directionList.selection.text === "Right") {
      positions.push([it.getRight(), it.getTop()])
      positions.push([it.getRight() + dustDistance, it.getTop() - dustDistance])
      positions.push([it.getRight() + length, it.getTop() - dustDistance])
      positions.push([it.getRight() + length, it.getBottom() + dustShoulder * 1.5])
      positions.push([it.getRight() + dustShoulder * 1.5, it.getBottom() + dustShoulder / 2])
      positions.push([it.getRight() + dustShoulder, it.getBottom()])
      positions.push([it.getRight(), it.getBottom()])
    } else {
      positions.push([it.getLeft(), it.getBottom()])
      positions.push([it.getLeft() + dustDistance, it.getBottom() - dustDistance])
      positions.push([it.getLeft() + dustDistance, it.getBottom() - length])
      positions.push([it.getRight() - dustShoulder * 1.5, it.getBottom() - length])
      positions.push([it.getRight() - dustShoulder / 2, it.getBottom() - dustShoulder * 1.5])
      positions.push([it.getRight(), it.getBottom() - dustShoulder])
      positions.push([it.getRight(), it.getBottom()])
    }
  })
  pathItem.name = "FlapDUST"
  pathItem.setEntirePath(positions)
}
