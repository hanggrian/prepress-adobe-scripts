#target Illustrator
#include "../.lib/commons.js"

var DIRECTIONS = [
  ["Top", "ic_arrow_top"],
  ["Right", "ic_arrow_right"],
  ["Bottom", "ic_arrow_bottom"],
  ["Left", "ic_arrow_left"]
]

var BOUNDS_TEXT = [60, 21]
var BOUNDS_TEXT2 = [70, 21]
var BOUNDS_EDIT = [110, 21]
var BOUNDS_RADIO = [15, 15]

checkSingleSelection()

var dialog = new Dialog("Add Flap Dieline", "adding-measuring-dielines/#add-flap-dieline")
var lengthEdit, weightEdit, colorList, directionList
var tabbedPanel
var glueShearEdit, glueScratchEdit
var tuckSliderGroup, tuckDistanceEdit
var dustShoulderEdit, dustDistanceEdit
var leftRadio, topRadio, rightRadio, bottomRadio
var prefs = preferences2.resolve("dielines/add_flap")

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel("Flap", function(panel) {
      panel.hgroup(function(group) {
        group.tooltips("In horizontal direction, this is height. In vertical direction, this is width.")
        group.staticText(BOUNDS_TEXT, "Length:").also(JUSTIFY_RIGHT)
        lengthEdit = group.editText(BOUNDS_EDIT, prefs.getString("length", "20 mm")).also(function(it) {
          it.validateUnits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tooltips("Stroke width of dielines")
        group.staticText(BOUNDS_TEXT, "Weight:").also(JUSTIFY_RIGHT)
        weightEdit = group.editText(BOUNDS_EDIT, prefs.getString("weight", "1 pt")).also(VALIDATE_UNITS)
      })
      panel.hgroup(function(group) {
        group.tooltips("Stroke color of dielines")
        group.staticText(BOUNDS_TEXT, "Color:").also(JUSTIFY_RIGHT)
        colorList = group.dropDownList(BOUNDS_EDIT, COLORS).also(function(it) {
          it.selectText(prefs.getString("color", "Black"))
        })
      })
      panel.hgroup(function(group) {
        group.tooltips("Where should the flap be added relative to target")
        group.staticText(BOUNDS_TEXT, "Direction:").also(JUSTIFY_RIGHT)
        directionList = group.dropDownList(BOUNDS_EDIT, DIRECTIONS).also(function(it) {
          it.selectText(prefs.getString("direction", "Top"))
        })
      })
    })
  })
  tabbedPanel = main.tabbedPanel(function(panel) {
    panel.preferredSize = [200, 0]
    panel.vtab("Glue Flap", function(tab) {
      tab.hgroup(function(topGroup) {
        topGroup.alignChildren = "top"
        topGroup.vgroup(function(midGroup) {
          midGroup.hgroup(function(group) {
            group.tooltips("End line of glue flat must be lesser than starting line, shear value make sure of it")
            group.staticText(BOUNDS_TEXT2, "Shear:").also(JUSTIFY_RIGHT)
            glueShearEdit = group.editText(BOUNDS_EDIT, "5 mm").also(VALIDATE_UNITS)
          })
          midGroup.hgroup(function(group) {
            group.tooltips("Distance between scratches, leave blank for no scratches")
            group.staticText(BOUNDS_TEXT2, "Scratches:").also(JUSTIFY_RIGHT)
            glueScratchEdit = group.editText(BOUNDS_EDIT, "0 mm").also(function(it) {
              it.validateUnits()
              it.enabled = false
            })
          })
        })
      })
    })
    /* tabbedPanel.vtab("Tuck Flap", function(tab) {
        tab.hgroup(function(topGroup) {
            topGroup.alignChildren = "top"
            topGroup.vgroup(function(midGroup) {
                midGroup.hgroup(function(group) {
                    group.tooltips("How big should the curve be relative to length, in percentage")
                    group.staticText(BOUNDS_TEXT2, "Curve:").also(JUSTIFY_RIGHT)
                    tuckSliderGroup = new SliderGroup(group, BOUNDS_EDIT, 2, 0, 4, 25)
                })
                midGroup.hgroup(function(group) {
                    group.tooltips("Thicker material should have more distance")
                    group.staticText(BOUNDS_TEXT2, "Distance:").also(JUSTIFY_RIGHT)
                    tuckDistanceEdit = group.editText(BOUNDS_EDIT, "0 mm").also(VALIDATE_UNITS)
                })
            })
        })
    }) */
    panel.vtab("Dust Flap", function(tab) {
      tab.hgroup(function(topGroup) {
        topGroup.alignChildren = "top"
        topGroup.vgroup(function(midGroup) {
          midGroup.hgroup(function(group) {
            group.tooltips("Necessary for locking a tuck flap")
            group.staticText(BOUNDS_TEXT2, "Shoulder:").also(JUSTIFY_RIGHT)
            dustShoulderEdit = group.editText(BOUNDS_EDIT, "5 mm").also(VALIDATE_UNITS)
          })
          midGroup.hgroup(function(group) {
            group.tooltips("Thicker material should have more distance")
            group.staticText(BOUNDS_TEXT2, "Distance:").also(JUSTIFY_RIGHT)
            dustDistanceEdit = group.editText(BOUNDS_EDIT, "0 mm").also(VALIDATE_UNITS)
          })
        })
      })
    })
    panel.onChange = function() {
      if (panel.selection.text === "Glue Flap") {
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

  prefs.setString("length", lengthEdit.text)
  prefs.setString("weight", weightEdit.text)
  prefs.setString("color", colorList.selection.text)
  prefs.setString("direction", directionList.selection.text)
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
