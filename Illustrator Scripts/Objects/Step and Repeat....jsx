#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [40, 21]
var BOUNDS_TEXT_MOVE = [70, 21]
var BOUNDS_EDIT_MOVE = [100, 21]

checkHasSelection()

var dialog = new Dialog('Step and Repeat', 'step-and-repeat')
var horizontalEdit, verticalEdit
var moveHorizontalEdit, moveVerticalEdit, moveRelativeCheck

var bounds = selection.getFarthestBounds()
dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.tips('2 dimension target')
    group.staticText(BOUNDS_TEXT, 'Copies:').also(JUSTIFY_RIGHT)
    horizontalEdit = group.editText(BOUNDS_EDIT).also(function(it) {
      it.validateDigits()
      it.activate()
    })
    group.staticText(undefined, '×')
    verticalEdit = group.editText(BOUNDS_EDIT).also(VALIDATE_DIGITS)
  })
  main.vpanel('Move', function(panel) {
    panel.alignChildren = 'right'
    panel.hgroup(function(group) {
      group.tips('Distance between arts horizontally')
      group.staticText(BOUNDS_TEXT_MOVE, 'Horizontal:').also(JUSTIFY_RIGHT)
      moveHorizontalEdit = group.editText(BOUNDS_EDIT_MOVE, formatUnits(bounds.getWidth(), unitName, 2)).also(VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
      group.tips('Distance between arts vertically')
      group.staticText(BOUNDS_TEXT_MOVE, 'Vertical:').also(JUSTIFY_RIGHT)
      moveVerticalEdit = group.editText(BOUNDS_EDIT_MOVE, formatUnits(bounds.getHeight(), unitName, 2)).also(VALIDATE_UNITS)
    })
    moveRelativeCheck = panel.checkBox(undefined, 'Relative Position').also(function(it) {
      it.tip('Move the object relative to its current position')
      it.onClick = function() {
        if (it.value) {
          moveHorizontalEdit.text = '0 ' + unitName
          moveVerticalEdit.text = '0 ' + unitName
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
    errorWithAlert('Minimal value is 1×1')
    return
  }

  var readOnlySelection = selection

  // vertical starts with 0 because the starting point doesn't change
  for (var v = 0; v < vertical; v++) {
    print(v + '. ')
    var finalMoveVertical = moveVertical
    if (moveRelativeCheck.value) {
      finalMoveVertical += bounds.getHeight()
    }
    if (v !== 0) { // skip first
      readOnlySelection.forEachReversed(function(item) {
        var x = bounds.getLeft() - (bounds.getLeft() - item.position.getLeft())
        var y = bounds.getTop() - (bounds.getTop() - item.position.getTop())
        item.duplicate(layer, ElementPlacement.PLACEATBEGINNING).position = [x, y - v * finalMoveVertical]
      })
    }
    for (var h = 1; h < horizontal; h++) {
      print(h + ' ')
      var finalMoveHorizontal = moveHorizontal
      if (moveRelativeCheck.value) {
        finalMoveHorizontal += bounds.getWidth()
      }
      readOnlySelection.forEachReversed(function(item) {
        var x = bounds.getLeft() - (bounds.getLeft() - item.position.getLeft())
        var y = bounds.getTop() - (bounds.getTop() - item.position.getTop())
        item.duplicate(layer, ElementPlacement.PLACEATBEGINNING).position = [x + h * finalMoveHorizontal, y - v * finalMoveVertical]
      })
    }
    println()
  }
})
dialog.show()
