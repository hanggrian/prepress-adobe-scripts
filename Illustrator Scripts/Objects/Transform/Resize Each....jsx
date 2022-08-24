#target Illustrator
#include "../../.lib/commons.js"

var SIZE_INPUT = [170, 21]

checkHasSelection()

var dialog = new Dialog("Resize Each", "resizing-rasterizing-each/#resize-each")
var prefill = Collections.first(selection)
var widthEdit, widthCheck, heightEdit, heightCheck
var changePositionsCheck, changeFillPatternsCheck, changeFillGradientsCheck, changeStrokePatternsCheck
var documentOriginCheck, anchorGroup
var recursiveCheck
var config = configs.resolve("objects/resize_each")

dialog.vgroup(function(main) {
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "right"
    topGroup.hgroup(function(group) {
      group.alignChildren = "bottom"
      group.tooltips("Objects' new width, uncheck to ignore")
      group.staticText(undefined, "Width:").also(JUSTIFY_RIGHT)
      widthEdit = group.editText(SIZE_INPUT, formatUnits(prefill.width, unitName, 2)).also(function(it) {
        it.validateUnits()
        it.activate()
      })
      widthCheck = group.checkBox().also(function(it) {
        it.select()
        it.onClick = function() {
          widthEdit.enabled = it.value
        }
      })
    })
    topGroup.hgroup(function(group) {
      group.alignChildren = "bottom"
      group.tooltips("Objects' new height, uncheck to ignore")
      group.staticText(undefined, "Height:").also(JUSTIFY_RIGHT)
      heightEdit = group.editText(SIZE_INPUT, formatUnits(prefill.height, unitName, 2)).also(VALIDATE_UNITS)
      heightCheck = group.checkBox().also(function(it) {
        it.select()
        it.onClick = function() {
          heightEdit.enabled = it.value
        }
      })
    })
  })
  main.hgroup(function(group) {
    group.alignChildren = "fill"
    group.vpanel("Change", function(panel) {
      panel.alignChildren = "fill"
      changePositionsCheck = panel.checkBox(undefined, "Positions").also(function(it) {
        it.tooltip("Are art object positions and orientations effected?")
        it.value = config.getBoolean("option1")
      })
      changeFillPatternsCheck = panel.checkBox(undefined, "Fill Patterns").also(function(it) {
        it.tooltip("Are the fill patterns assigned to paths to be transformed?")
        it.value = config.getBoolean("option2")
      })
      changeFillGradientsCheck = panel.checkBox(undefined, "Fill Gradients").also(function(it) {
        it.tooltip("Are the fill gradients assigned to paths to be transformed?")
        it.value = config.getBoolean("option3")
      })
      changeStrokePatternsCheck = panel.checkBox(undefined, "Stroke Patterns").also(function(it) {
        it.tooltip("Are the stroke patterns assigned to paths to be transformed?")
        it.value = config.getBoolean("option4")
      })
    })
    group.vpanel("Anchor", function(panel) {
      panel.alignChildren = "fill"
      documentOriginCheck = panel.checkBox(undefined, "Document Origin").also(function(it) {
        it.tooltip("Use current reference point preference")
        it.onClick = function() {
          anchorGroup.enabled = !it.value
        }
      })
      anchorGroup = new AnchorGroup(panel)
    })
  })
  main.hgroup(function(group) {
    group.alignment = "right"
    recursiveCheck = new RecursiveCheck(group).also(function(it) {
      it.value = config.getBoolean("recursive")
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var width = parseUnits(widthEdit.text)
  var height = parseUnits(heightEdit.text)
  var transformation = documentOriginCheck.value ? Transformation.DOCUMENTORIGIN : anchorGroup.getTransformation()

  var action = function(item, i) {
    print(i + ". ")
    var scaleX = !widthCheck.value ? 100 : 100 * width / item.width
    var scaleY = !heightCheck.value ? 100 : 100 * height / item.height
    if (!isFinite(scaleX)) {
      scaleX = 100
    }
    if (!isFinite(scaleY)) {
      scaleY = 100
    }
    println("Scale X=%d Y=%d.", scaleX, scaleY)
    item.resize(scaleX, scaleY,
      changePositionsCheck.value,
      changeFillPatternsCheck.value,
      changeFillGradientsCheck.value,
      changeStrokePatternsCheck.value,
      100,
      transformation)
  }
  if (recursiveCheck.value) {
    Collections.forEachItem(selection, action)
  } else {
    Collections.forEach(selection, action)
  }

  config.setBoolean("option1", changePositionsCheck.value)
  config.setBoolean("option2", changeFillPatternsCheck.value)
  config.setBoolean("option3", changeFillGradientsCheck.value)
  config.setBoolean("option4", changeStrokePatternsCheck.value)
  config.setBoolean("recursive", recursiveCheck.value)
})
dialog.show()
