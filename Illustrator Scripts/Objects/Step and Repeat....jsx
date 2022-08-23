#target Illustrator
#include "../.lib/commons.js"

var SIZE_INPUT = [40, 21]
var SIZE_INPUT_MOVE = [100, 21]

checkHasSelection()

var dialog = new Dialog("Step and Repeat", "step-and-repeat/")
var horizontalEdit, verticalEdit
var moveHorizontalEdit, moveVerticalEdit, moveRelativeCheck
var config = configs.resolve("objects/step_and_repeat")

var bounds = Items.getMaxBounds(selection)
dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.tooltips("2 dimension target")
    group.staticText(undefined, "Copies:").also(JUSTIFY_RIGHT)
    horizontalEdit = group.editText(SIZE_INPUT, config.getInt("horizontal")).also(function(it) {
      it.validateDigits()
      it.activate()
    })
    group.staticText(undefined, "×")
    verticalEdit = group.editText(SIZE_INPUT, config.getInt("vertical")).also(VALIDATE_DIGITS)
  })
  main.vpanel("Move", function(panel) {
    panel.alignChildren = "right"
    panel.hgroup(function(group) {
      group.tooltips("Distance between arts horizontally")
      group.staticText(undefined, "Horizontal:").also(JUSTIFY_RIGHT)
      moveHorizontalEdit = group.editText(SIZE_INPUT_MOVE, formatUnits(bounds.getWidth(), unitName, 2)).also(VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
      group.tooltips("Distance between arts vertically")
      group.staticText(undefined, "Vertical:").also(JUSTIFY_RIGHT)
      moveVerticalEdit = group.editText(SIZE_INPUT_MOVE, formatUnits(bounds.getHeight(), unitName, 2)).also(VALIDATE_UNITS)
    })
    moveRelativeCheck = panel.checkBox(undefined, "Relative Position").also(function(it) {
      it.tooltip("Move the object relative to its current position")
      it.onClick = function() {
        if (it.value) {
          moveHorizontalEdit.text = "0 " + unitName
          moveVerticalEdit.text = "0 " + unitName
        } else {
          moveHorizontalEdit.text = formatUnits(bounds.getWidth(), unitName, 2)
          moveVerticalEdit.text = formatUnits(bounds.getHeight(), unitName, 2)
        }
        moveHorizontalEdit.activate()
      }
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var horizontal = parseInt(horizontalEdit.text) || 0
  var vertical = parseInt(verticalEdit.text) || 0
  var moveHorizontal = parseUnits(moveHorizontalEdit.text)
  var moveVertical = parseUnits(moveVerticalEdit.text)

  if (horizontal < 1 || vertical < 1) {
    errorWithAlert("Minimal value is 1×1")
    return
  }

  var readOnlySelection = selection

  // vertical starts with 0 because the starting point doesn't change
  for (var v = 0; v < vertical; v++) {
    print(v + ". ")
    var finalMoveVertical = moveVertical
    if (moveRelativeCheck.value) {
      finalMoveVertical += bounds.getHeight()
    }
    if (v !== 0) { // skip first
      Collections.forEachReversed(readOnlySelection, function(item) {
        var x = bounds.getLeft() - (bounds.getLeft() - item.position.getLeft())
        var y = bounds.getTop() - (bounds.getTop() - item.position.getTop())
        item.duplicate(layer, ElementPlacement.PLACEATBEGINNING).position = [x, y - v * finalMoveVertical]
      })
    }
    for (var h = 1; h < horizontal; h++) {
      print(h + " ")
      var finalMoveHorizontal = moveHorizontal
      if (moveRelativeCheck.value) {
        finalMoveHorizontal += bounds.getWidth()
      }
      Collections.forEachReversed(readOnlySelection, function(item) {
        var x = bounds.getLeft() - (bounds.getLeft() - item.position.getLeft())
        var y = bounds.getTop() - (bounds.getTop() - item.position.getTop())
        item.duplicate(layer, ElementPlacement.PLACEATBEGINNING).position = [x + h * finalMoveHorizontal, y - v * finalMoveVertical]
      })
    }
    println()
  }

  config.setInt("horizontal", horizontal)
  config.setInt("vertical", vertical)
})
dialog.show()
