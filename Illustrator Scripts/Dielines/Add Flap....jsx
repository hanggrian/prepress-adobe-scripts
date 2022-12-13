//@target illustrator
//@include '../.lib/commons.js'

var Direction = new Enum({
  TOP: { text: R.string.top, image: 'ic_arrow_top' },
  RIGHT: { text: R.string.right, image: 'ic_arrow_right' },
  BOTTOM: { text: R.string.bottom, image: 'ic_arrow_bottom' },
  LEFT: { text: R.string.left, image: 'ic_arrow_left' }
})

var SIZE_INPUT = [110, 21]
var SIZE_LABEL_TAB = [70, 21] // can't align right on tabbed panel
var SIZE_RADIO = [15, 15]

checkSingleSelection()

var dialog = new Dialog(R.string.add_flap_dieline, 'adding-measuring-dielines/#add-flap-dieline')
var lengthEdit, weightEdit, colorList, directionList, tabbedPanel
var glueShearEdit, glueScratchEdit
var tuckSliderGroup, tuckDistanceEdit
var dustShoulderEdit, dustDistanceEdit
var leftRadio, topRadio, rightRadio, bottomRadio
var prefs = preferences2.resolve('dielines/add_flap')
var currentTab = R.string.glue_flap // do not use tabbedpanel.selection as it crashes on macOS

dialog.hgroup(function(main) {
  main.alignChildren = 'fill'
  main.hgroup(function(topGroup) {
    topGroup.vpanel(R.string.flap, function(panel) {
      panel.alignChildren = 'right'
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_addflapdieline_length
        group.leftStaticText(undefined, R.string.length)
        lengthEdit = group.editText(SIZE_INPUT, prefs.getString('length', '20 mm'))
          .also(function(it) {
            it.validateUnits()
            it.activate()
          })
      })
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_addflapdieline_weight
        group.leftStaticText(undefined, R.string.weight)
        weightEdit = group.editText(SIZE_INPUT, prefs.getString('weight', '1 pt'))
          .also(VALIDATE_UNITS)
      })
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_addflapdieline_color
        group.leftStaticText(undefined, R.string.color)
        colorList = group.dropDownList(SIZE_INPUT, Color2.list()).also(function(it) {
          it.selection = prefs.getInt('color')
        })
      })
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_addflapdieline_direction
        group.leftStaticText(undefined, R.string.direction)
        directionList = group.dropDownList(SIZE_INPUT, Direction.list()).also(function(it) {
          it.selection = prefs.getInt('direction')
        })
      })
    })
  })
  tabbedPanel = main.tabbedPanel(function(panel) {
    panel.preferredSize = [200, 0]
    panel.vtab(R.string.glue_flap, function(tab) {
      tab.hgroup(function(group) {
        group.helpTips = R.string.tip_addflapdieline_glueflap_shear
        group.leftStaticText(SIZE_LABEL_TAB, R.string.shear)
        glueShearEdit = group.editText(SIZE_INPUT, '5 mm').also(VALIDATE_UNITS)
      })
      tab.hgroup(function(group) {
        group.helpTips = R.string.tip_addflapdieline_glueflap_scratches
        group.leftStaticText(SIZE_LABEL_TAB, R.string.scratches)
        glueScratchEdit = group.editText(SIZE_INPUT, '0 mm').also(function(it) {
          it.validateUnits()
          it.enabled = false
        })
      })
    })
    /* tabbedPanel.vtab(R.string.tuck_flap, function(tab) {
      tab.hgroup(function(group) {
        group.helpTips = R.string.tip_addflapdieline_tuckflap_curve
        group.leftStaticText(SIZE_LABEL_TAB, R.string.curve)
        tuckSliderGroup = new SliderGroup(group, SIZE_EDIT, 2, 0, 4, 25)
      })
      tab.hgroup(function(group) {
        group.helpTips = R.string.tip_addflapdieline_tuckflap_distance
        group.leftStaticText(SIZE_LABEL_TAB, R.string.distance)
        tuckDistanceEdit = group.editText(SIZE_EDIT, '0 mm').also(VALIDATE_UNITS)
      })
    }) */
    panel.vtab(R.string.dust_flap, function(tab) {
      tab.hgroup(function(group) {
        group.helpTips = R.string.tip_addflapdieline_dustflap_shoulder
        group.leftStaticText(SIZE_LABEL_TAB, R.string.shoulder)
        dustShoulderEdit = group.editText(SIZE_INPUT, '5 mm').also(VALIDATE_UNITS)
      })
      tab.hgroup(function(group) {
        group.helpTips = R.string.tip_addflapdieline_dustflap_distance
        group.leftStaticText(SIZE_LABEL_TAB, R.string.distance)
        dustDistanceEdit = group.editText(SIZE_INPUT, '0 mm').also(VALIDATE_UNITS)
      })
    })
    panel.addChangeListener(function() {
      if (panel.selection === null) {
        return
      }
      currentTab = panel.selection.text
      if (currentTab === R.string.glue_flap) {
        glueShearEdit.activate()
      } else if (currentTab === R.string.tuck_flap) {
        tuckCurveEdit.activate()
      } else {
        dustShoulderEdit.activate()
      }
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var length = parseUnits(lengthEdit.text)
  var weight = parseUnits(weightEdit.text)
  var color = Color2.find(colorList.selection)
  var direction = Direction.find(directionList.selection)

  var pathItem = layer.pathItems.add()
  pathItem.filled = false
  pathItem.strokeDashes = []
  pathItem.strokeColor = color.get()
  pathItem.strokeWidth = weight

  if (currentTab === R.string.glue_flap) {
    processGlue(pathItem, length, direction)
  } else if (currentTab === R.string.tuck_flap) {
    processTuck(pathItem, length, direction)
  } else {
    processDust(pathItem, length, direction)
  }
  selection = [pathItem]

  prefs.setString('length', lengthEdit.text)
  prefs.setString('weight', weightEdit.text)
  prefs.setInt('color', colorList.selection.index)
  prefs.setInt('direction', directionList.selection.index)
})
dialog.show()

function processGlue(pathItem, length, direction) {
  var glueShear = parseUnits(glueShearEdit.text)
  var glueScratch = parseUnits(glueScratchEdit.text)
  var positions = []
  Collections.first(selection).geometricBounds.run(function(it) {
    if (direction === Direction.LEFT) {
      positions.push([it.getLeft(), it.getTop()])
      positions.push([it.getLeft() - length, it.getTop() - glueShear])
      positions.push([it.getLeft() - length, it.getBottom() + glueShear])
      positions.push([it.getLeft(), it.getBottom()])
    } else if (direction === Direction.TOP) {
      positions.push([it.getLeft(), it.getTop()])
      positions.push([it.getLeft() + glueShear, it.getTop() + length])
      positions.push([it.getRight() - glueShear, it.getTop() + length])
      positions.push([it.getRight(), it.getTop()])
    } else if (direction === Direction.RIGHT) {
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
  pathItem.name = 'FlapGLUE'
  pathItem.setEntirePath(positions)
}

function processTuck(pathItem, length, direction) {
  var tuckCurve = parseInt(tuckCurveEdit.text) * length / 100
  var tuckStart = length - tuckCurve
  var tuckDistance = parseUnits(tuckDistanceEdit.text)
  var positions = []
  Collections.first(selection).geometricBounds.run(function(it) {
    if (direction === Direction.LEFT) {
      positions.push([it.getLeft(), it.getTop() - tuckDistance])
      positions.push([it.getLeft() - tuckStart, it.getTop() - tuckDistance])
      positions.push([it.getLeft() - length, it.getTop() - tuckCurve - tuckDistance])
      positions.push([it.getLeft() - length, it.getBottom() + tuckCurve + tuckDistance])
      positions.push([it.getLeft() - tuckStart, it.getBottom() + tuckDistance])
      positions.push([it.getLeft(), it.getBottom() + tuckDistance])
    } else if (direction === Direction.TOP) {
    } else if (direction === Direction.RIGHT) {
    } else {
    }
  })
  pathItem.name = 'FlapTUCK'
  Collections.forEach(positions, function(it) {
    var point = pathItem.pathPoints.add()
    point.anchor = it
    point.leftDirection = it
    point.rightDirection = it
  })
}

function processDust(pathItem, length, direction) {
  var dustShoulder = parseUnits(dustShoulderEdit.text)
  var dustDistance = parseUnits(dustDistanceEdit.text)
  var positions = []
  Collections.first(selection).geometricBounds.run(function(it) {
    if (direction === Direction.LEFT) {
      positions.push([it.getLeft(), it.getTop()])
      positions.push([it.getLeft() - dustDistance, it.getTop() - dustDistance])
      positions.push([it.getLeft() - length, it.getTop() - dustDistance])
      positions.push([it.getLeft() - length, it.getBottom() + dustShoulder * 1.5])
      positions.push([it.getLeft() - dustShoulder * 1.5, it.getBottom() + dustShoulder / 2])
      positions.push([it.getLeft() - dustShoulder, it.getBottom()])
      positions.push([it.getLeft(), it.getBottom()])
    } else if (direction === Direction.TOP) {
      positions.push([it.getLeft(), it.getTop()])
      positions.push([it.getLeft() + dustDistance, it.getTop() + dustDistance])
      positions.push([it.getLeft() + dustDistance, it.getTop() + length])
      positions.push([it.getRight() - dustShoulder * 1.5, it.getTop() + length])
      positions.push([it.getRight() - dustShoulder / 2, it.getTop() + dustShoulder * 1.5])
      positions.push([it.getRight(), it.getTop() + dustShoulder])
      positions.push([it.getRight(), it.getTop()])
    } else if (direction === Direction.RIGHT) {
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
  pathItem.name = 'FlapDUST'
  pathItem.setEntirePath(positions)
}
