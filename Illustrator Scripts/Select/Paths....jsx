// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include "../.lib/commons.js"

var YES_OR_NO = ["Yes", "No"]

var BOUNDS_LEFT_TEXT = [60, 21]
var BOUNDS_RIGHT_TEXT = [60, 21]
var BOUNDS_EDIT = [110, 21]

check(Collections.isNotEmpty(document.pathItems), "No paths in this document")
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog("Select Paths", "selecting-items/#select-paths")
var fillColorList, fillOverprintList
var strokeColorList, strokeWeightEdit, strokeDashedList, strokeOverprintList
var dimensionPanel
var clippingList, closedList, guidesList
var recursiveCheck
var prefs = preferences2.resolve("select/paths")

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  main.vgroup(function(topGroup) {
    topGroup.vpanel("Fill", function(panel) {
      panel.hgroup(function(group) {
        group.tooltips("Fill color")
        group.staticText(BOUNDS_RIGHT_TEXT, "Color:").also(JUSTIFY_RIGHT)
        fillColorList = group.dropDownList(BOUNDS_EDIT, COLORS)
      })
      panel.hgroup(function(group) {
        group.tooltips("Will art beneath a filled object be overprinted?")
        group.staticText(BOUNDS_RIGHT_TEXT, "Overprint:").also(JUSTIFY_RIGHT)
        fillOverprintList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
    })
    topGroup.vpanel("Stroke", function(panel) {
      panel.hgroup(function(group) {
        group.tooltips("Stroke color")
        group.staticText(BOUNDS_RIGHT_TEXT, "Color:").also(JUSTIFY_RIGHT)
        strokeColorList = group.dropDownList(BOUNDS_EDIT, COLORS)
      })
      panel.hgroup(function(group) {
        group.tooltips("Width of stroke")
        group.staticText(BOUNDS_RIGHT_TEXT, "Weight:").also(JUSTIFY_RIGHT)
        strokeWeightEdit = group.editText(BOUNDS_EDIT).also(function(it) {
          it.validateUnits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tooltips("Is the stroke dashed?")
        group.staticText(BOUNDS_RIGHT_TEXT, "Dashed:").also(JUSTIFY_RIGHT)
        strokeDashedList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tooltips("Will art beneath a stroked object be overprinted?")
        group.staticText(BOUNDS_RIGHT_TEXT, "Overprint:").also(JUSTIFY_RIGHT)
        strokeOverprintList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
    })
  })
  main.vgroup(function(topGroup) {
    dimensionPanel = new SelectDimensionPanel(topGroup, BOUNDS_LEFT_TEXT, BOUNDS_EDIT)
    topGroup.vpanel("Others", function(panel) {
      panel.hgroup(function(group) {
        group.tooltips("Should this be used as a clipping path?")
        group.staticText(BOUNDS_LEFT_TEXT, "Clipping:").also(JUSTIFY_RIGHT)
        clippingList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tooltips("Is this path closed?")
        group.staticText(BOUNDS_LEFT_TEXT, "Closed:").also(JUSTIFY_RIGHT)
        closedList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tooltips("Is this path a guide object?")
        group.staticText(BOUNDS_LEFT_TEXT, "Guides:").also(JUSTIFY_RIGHT)
        guidesList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
    })
    if (isFilterMode) {
      recursiveCheck = new RecursiveCheck(topGroup).also(function(it) {
        it.main.alignment = "right"
        it.main.value = prefs.getBoolean("recursive")
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
  }, isFilterMode && recursiveCheck.isSelected())

  prefs.setBoolean("recursive", recursiveCheck.isSelected())
})
dialog.show()
