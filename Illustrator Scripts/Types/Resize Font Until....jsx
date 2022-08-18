#target Illustrator
#include "../.lib/commons.js"

var BOUNDS_TEXT = [70, 21]
var BOUNDS_EDIT = [150, 21]
var ROUNDINGS = ["None", "Round", "Floor", "Ceil"]

checkSingleSelection()

var item = Collections.first(selection)
checkTypename(item, "TextFrame")

var dialog = new Dialog("Resize Font Until")
var dimensionWidthRadio, dimensionHeightRadio
var dimensionSizeText, dimensionSizeEdit
var roundingList

dialog.vgroup(function(main) {
  main.alignChildren = "left"
  main.hgroup(function(group) {
    group.tooltips("Which bounds to use")
    group.staticText(BOUNDS_TEXT, "Dimension:").also(JUSTIFY_RIGHT)
    dimensionWidthRadio = group.radioButton(undefined, "Width").also(function(it) {
      it.onClick = changeDimensionText
      it.select()
    })
    dimensionHeightRadio = group.radioButton(undefined, "Height").also(function(it) {
      it.onClick = changeDimensionText
    })
  })
  main.hgroup(function(group) {
    group.tooltips("Target size to match")
    dimensionSizeText = group.staticText(BOUNDS_TEXT, "Width:").also(JUSTIFY_RIGHT)
    dimensionSizeEdit = group.editText(BOUNDS_EDIT, formatUnits(item.width, unitName, 2)).also(function(it) {
      it.validateUnits()
      it.activate()
    })
  })
  main.hgroup(function(group) {
    group.tooltips("Method to round final font size")
    group.staticText(BOUNDS_TEXT, "Rounding:").also(JUSTIFY_RIGHT)
    roundingList = group.dropDownList(BOUNDS_EDIT, ROUNDINGS).also(function(it) {
      it.selectText("None")
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var currentFont = item.textRange.characterAttributes.size
  var currentDimension // text's dimension are not an accurate real-world size, use its outline instead
  item.duplicate(layer, ElementPlacement.PLACEATEND).createOutline().run(function(it) {
    currentDimension = dimensionWidthRadio.value ? it.width : it.height
    it.remove()
  })
  var targetDimension = parseUnits(dimensionSizeEdit.text)
  var targetFont = currentFont * targetDimension / currentDimension
  if (roundingList.selection.text === "Round") {
    targetFont = targetFont.round()
  } else if (roundingList.selection.text === "Floor") {
    targetFont = targetFont.floor()
  } else if (roundingList.selection.text === "Ceil") {
    targetFont = targetFont.ceil()
  }
  item.textRange.characterAttributes.size = targetFont
})
dialog.show()

function changeDimensionText() {
  if (dimensionWidthRadio.value) {
    dimensionSizeText.text = "Width:"
    dimensionSizeEdit.text = formatUnits(item.width, unitName, 2)
  } else {
    dimensionSizeText.text = "Height:"
    dimensionSizeEdit.text = formatUnits(item.height, unitName, 2)
  }
}
