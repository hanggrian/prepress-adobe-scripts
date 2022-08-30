#target Illustrator
#include "../.lib/commons.js"

function listRoundings() { return [R.string.none, R.string.nearest, R.string.floor, R.string.ceil] }

var SIZE_LABEL = [80, 21] // manual sizing because content is changable
var SIZE_INPUT = [150, 21]

checkSingleSelection()

var item = Collections.first(selection)
checkTypename(item, "TextFrame")

var dialog = new Dialog(R.string.resize_glyph)
var dimensionWidthRadio, dimensionHeightRadio
var dimensionSizeText, dimensionSizeEdit
var roundingList

dialog.vgroup(function(main) {
  main.alignChildren = "left"
  main.hgroup(function(group) {
    group.tooltips(R.string.tip_resizeglyph_dimension)
    group.leftStaticText(SIZE_LABEL, R.string.dimension)
    dimensionWidthRadio = group.radioButton(undefined, R.string.width).also(function(it) {
      it.onClick = changeDimensionText
      it.select()
    })
    dimensionHeightRadio = group.radioButton(undefined, R.string.height).also(function(it) {
      it.onClick = changeDimensionText
    })
  })
  main.hgroup(function(group) {
    group.tooltips(R.string.tip_resizeglyph_size)
    dimensionSizeText = group.leftStaticText(SIZE_LABEL, R.string.width)
    dimensionSizeEdit = group.editText(SIZE_INPUT, formatUnits(item.width, unitName, 2)).also(function(it) {
      it.validateUnits()
      it.activate()
    })
  })
  main.hgroup(function(group) {
    group.tooltips(R.string.tip_resizeglyph_rounding)
    group.leftStaticText(SIZE_LABEL, R.string.rounding)
    roundingList = group.dropDownList(SIZE_INPUT, listRoundings()).also(function(it) {
      it.selection = 0
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
  if (roundingList.selection.index === 1) {
    targetFont = targetFont.round()
  } else if (roundingList.selection.index === 2) {
    targetFont = targetFont.floor()
  } else if (roundingList.selection.index === 3) {
    targetFont = targetFont.ceil()
  }
  item.textRange.characterAttributes.size = targetFont
})
dialog.show()

function changeDimensionText() {
  if (dimensionWidthRadio.value) {
    dimensionSizeText.text = getString(R.string.width) + ":"
    dimensionSizeEdit.text = formatUnits(item.width, unitName, 2)
  } else {
    dimensionSizeText.text = getString(R.string.height) + ":"
    dimensionSizeEdit.text = formatUnits(item.height, unitName, 2)
  }
}
