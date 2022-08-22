#target Illustrator
#include "../../.lib/commons.js"

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()
check(Collections.anyItem(selection, function(it) { return it.clipping }), "No clipping paths in this selection")

var dialog = new Dialog("Resize Clipping Masks")
var widthFromEdit, widthToEdit, heightFromEdit, heightToEdit
var documentOriginCheck, anchorGroup

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  var prefill = Collections.firstItem(selection, function(it) { return it.clipping })
  main.vpanel("Dimension", function(panel) {
    panel.hgroup(function(group) {
      group.staticText(BOUNDS_TEXT, "Width:").also(JUSTIFY_RIGHT)
      widthFromEdit = group.editText(BOUNDS_EDIT, formatUnits(prefill.width, unitName, 2)).also(function(it) {
        it.validateUnits()
        it.activate()
      })
      group.staticText(undefined, "to")
      widthToEdit = group.editText(BOUNDS_EDIT, formatUnits(prefill.width, unitName, 2)).also(VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
      group.staticText(BOUNDS_TEXT, "Height:").also(JUSTIFY_RIGHT)
      heightFromEdit = group.editText(BOUNDS_EDIT, formatUnits(prefill.height, unitName, 2)).also(VALIDATE_UNITS)
      group.staticText(undefined, "to")
      heightToEdit = group.editText(BOUNDS_EDIT, formatUnits(prefill.height, unitName, 2)).also(VALIDATE_UNITS)
    })
  })
  main.vpanel("Anchor", function(panel) {
    panel.alignChildren = "fill"
    documentOriginCheck = panel.checkBox(undefined, "Document Origin").also(function(it) {
      it.tooltip("Use current reference point preference")
      it.onClick = function() {
        anchorGroup.main.enabled = !it.value
      }
    })
    anchorGroup = new AnchorGroup(panel)
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var widthFrom = parseUnits(widthFromEdit.text)
  var heightFrom = parseUnits(heightFromEdit.text)
  var widthTo = parseUnits(widthToEdit.text)
  var heightTo = parseUnits(heightToEdit.text)
  var transformation = documentOriginCheck.value ? Transformation.DOCUMENTORIGIN : anchorGroup.getTransformation()
  var clippingPaths = Collections.filterItem(selection, function(it) {
    return it.clipping &&
      parseInt(it.width) === parseInt(widthFrom) &&
      parseInt(it.height) === parseInt(heightFrom)
  })
  var progress = new ProgressPalette(clippingPaths.length, "Resizing clipping mask")

  Collections.forEach(clippingPaths, function(clippingPath, i) {
    var clippingPath = clippingPaths[i]
    print(i + ". ")
    progress.increment()
    var scaleX = 100 * widthTo / clippingPath.width
    var scaleY = 100 * heightTo / clippingPath.height
    println("Scale X=%d Y=%d.", scaleX, scaleY)
    clippingPath.resize(scaleX, scaleY, true, true, true, true, 100, transformation)
  })
})
dialog.show()
