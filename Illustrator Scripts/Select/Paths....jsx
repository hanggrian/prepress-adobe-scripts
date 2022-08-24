// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include "../.lib/commons.js"

var YES_OR_NO = ["Yes", "No"]
var SIZE_INPUT = [110, 21]

check(Collections.isNotEmpty(document.pathItems), "No paths in this document")
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog("Select Paths", "selecting-items/#select-paths")
var fillColorList, fillOverprintList
var strokeColorList, strokeWeightEdit, strokeDashedList, strokeOverprintList
var dimensionPanel
var clippingList, closedList, guidesList
var recursiveCheck
var config = configs.resolve("select/paths")

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel("Fill", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("Fill color")
        group.staticText(undefined, "Color:").also(JUSTIFY_RIGHT)
        fillColorList = group.dropDownList(SIZE_INPUT, COLORS)
      })
      panel.hgroup(function(group) {
        group.tooltips("Will art beneath a filled object be overprinted?")
        group.staticText(undefined, "Overprint:").also(JUSTIFY_RIGHT)
        fillOverprintList = group.dropDownList(SIZE_INPUT, YES_OR_NO)
      })
    })
    topGroup.vpanel("Stroke", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("Stroke color")
        group.staticText(undefined, "Color:").also(JUSTIFY_RIGHT)
        strokeColorList = group.dropDownList(SIZE_INPUT, COLORS)
      })
      panel.hgroup(function(group) {
        group.tooltips("Width of stroke")
        group.staticText(undefined, "Weight:").also(JUSTIFY_RIGHT)
        strokeWeightEdit = group.editText(SIZE_INPUT).also(function(it) {
          it.validateUnits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tooltips("Is the stroke dashed?")
        group.staticText(undefined, "Dashed:").also(JUSTIFY_RIGHT)
        strokeDashedList = group.dropDownList(SIZE_INPUT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tooltips("Will art beneath a stroked object be overprinted?")
        group.staticText(undefined, "Overprint:").also(JUSTIFY_RIGHT)
        strokeOverprintList = group.dropDownList(SIZE_INPUT, YES_OR_NO)
      })
    })
  })
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    dimensionPanel = new SelectDimensionPanel(topGroup, SIZE_INPUT)
    topGroup.vpanel("Others", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("Should this be used as a clipping path?")
        group.staticText(undefined, "Clipping:").also(JUSTIFY_RIGHT)
        clippingList = group.dropDownList(SIZE_INPUT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tooltips("Is this path closed?")
        group.staticText(undefined, "Closed:").also(JUSTIFY_RIGHT)
        closedList = group.dropDownList(SIZE_INPUT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tooltips("Is this path a guide object?")
        group.staticText(undefined, "Guides:").also(JUSTIFY_RIGHT)
        guidesList = group.dropDownList(SIZE_INPUT, YES_OR_NO)
      })
    })
    if (isFilterMode) {
      recursiveCheck = new RecursiveCheck(topGroup).also(function(it) {
        it.alignment = "right"
        it.value = config.getBoolean("recursive")
      })
    }
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var fillColor = fillColorList.hasSelection() ? parseColor(fillColorList.selection.text) : undefined
  var fillOverprint = fillOverprintList.hasSelection() ? fillOverprintList.selection.text === "Yes" : undefined
  var strokeColor = strokeColorList.hasSelection() ? parseColor(strokeColorList.selection.text) : undefined
  var strokeWeight = parseUnits(strokeWeightEdit.text)
  var strokeDashed = strokeDashedList.hasSelection() ? strokeDashedList.selection.text === "Yes" : undefined
  var strokeOverprint = strokeOverprintList.hasSelection() ? strokeOverprintList.selection.text === "Yes" : undefined
  var width = dimensionPanel.getWidth()
  var height = dimensionPanel.getHeight()
  var clipping = clippingList.hasSelection() ? clippingList.selection.text === "Yes" : undefined
  var closed = closedList.hasSelection() ? closedList.selection.text === "Yes" : undefined
  var guides = guidesList.hasSelection() ? guidesList.selection.text === "Yes" : undefined
  selectAll(["PathItem"], function(item) {
    if (width !== undefined && parseInt(width) !== parseInt(item.width)) return false
    if (height !== undefined && parseInt(height) !== parseInt(item.height)) return false
    if (clipping !== undefined && clipping !== item.clipping) return false
    if (closed !== undefined && closed !== item.closed) return false
    if (guides !== undefined && guides !== item.guides) return false
    if (fillColor !== undefined && !isColorEqual(fillColor, item.fillColor)) return false
    if (fillOverprint !== undefined  && fillOverprint !== item.fillOverprint) return false
    if (strokeColor !== undefined && !isColorEqual(strokeColor, item.strokeColor)) return false
    if (strokeWeight !== undefined && parseInt(strokeWeight) !== parseInt(item.strokeWidth)) return false
    if (strokeDashed !== undefined && strokeDashed !== Collections.isNotEmpty(item.strokeDashes)) return false
    if (strokeOverprint !== undefined && strokeOverprint !== item.strokeOverprint) return false
    return true
  }, isFilterMode && recursiveCheck.value)

  if (isFilterMode) config.setBoolean("recursive", recursiveCheck.value)
})
dialog.show()
