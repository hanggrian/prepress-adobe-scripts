// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var YES_OR_NO = ['Yes', 'No']

var BOUNDS_LEFT_TEXT = [60, 21]
var BOUNDS_RIGHT_TEXT = [60, 21]
var BOUNDS_EDIT = [110, 21]

var dialog = new Dialog('Select Paths', 'selecting-items#select-paths--f2')
var fillColorList, fillOverprintList
var strokeColorList, strokeWeightEdit, strokeDashedList, strokeOverprintList
var dimensionPanel
var clippingList, closedList, guidesList

dialog.hgroup(function(main) {
  main.alignChildren = 'fill'
  main.vgroup(function(midGroup) {
    midGroup.vpanel('Fill', function(panel) {
      panel.hgroup(function(group) {
        group.tips('Fill color')
        group.staticText(BOUNDS_RIGHT_TEXT, 'Color:').also(JUSTIFY_RIGHT)
        fillColorList = group.dropDownList(BOUNDS_EDIT, COLORS)
      })
      panel.hgroup(function(group) {
        group.tips('Will art beneath a filled object be overprinted?')
        group.staticText(BOUNDS_RIGHT_TEXT, 'Overprint:').also(JUSTIFY_RIGHT)
        fillOverprintList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
    })
    midGroup.vpanel('Stroke', function(panel) {
      panel.hgroup(function(group) {
        group.tips('Stroke color')
        group.staticText(BOUNDS_RIGHT_TEXT, 'Color:').also(JUSTIFY_RIGHT)
        strokeColorList = group.dropDownList(BOUNDS_EDIT, COLORS)
      })
      panel.hgroup(function(group) {
        group.tips('Width of stroke')
        group.staticText(BOUNDS_RIGHT_TEXT, 'Weight:').also(JUSTIFY_RIGHT)
        strokeWeightEdit = group.editText(BOUNDS_EDIT).also(function(it) {
          it.validateUnits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tips('Is the stroke dashed?')
        group.staticText(BOUNDS_RIGHT_TEXT, 'Dashed:').also(JUSTIFY_RIGHT)
        strokeDashedList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tips('Will art beneath a stroked object be overprinted?')
        group.staticText(BOUNDS_RIGHT_TEXT, 'Overprint:').also(JUSTIFY_RIGHT)
        strokeOverprintList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
    })
  })
  main.vgroup(function(midGroup) {
    dimensionPanel = new SelectDimensionPanel(midGroup, BOUNDS_LEFT_TEXT, BOUNDS_EDIT)
    midGroup.vpanel('Others', function(panel) {
      panel.hgroup(function(group) {
        group.tips('Should this be used as a clipping path?')
        group.staticText(BOUNDS_LEFT_TEXT, 'Clipping:').also(JUSTIFY_RIGHT)
        clippingList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tips('Is this path closed?')
        group.staticText(BOUNDS_LEFT_TEXT, 'Closed:').also(JUSTIFY_RIGHT)
        closedList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tips('Is this path a guide object?')
        group.staticText(BOUNDS_LEFT_TEXT, 'Guides:').also(JUSTIFY_RIGHT)
        guidesList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
      })
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var fillColor = fillColorList.hasSelection() ? parseColor(fillColorList.selection.text) : undefined
  var fillOverprint = fillOverprintList.hasSelection() ? fillOverprintList.selection.text === 'Yes' : undefined
  var strokeColor = strokeColorList.hasSelection() ? parseColor(strokeColorList.selection.text) : undefined
  var strokeWeight = parseUnits(strokeWeightEdit.text)
  var strokeDashed = strokeDashedList.hasSelection() ? strokeDashedList.selection.text === 'Yes' : undefined
  var strokeOverprint = strokeOverprintList.hasSelection() ? strokeOverprintList.selection.text === 'Yes' : undefined
  var width = dimensionPanel.getWidth()
  var height = dimensionPanel.getHeight()
  var clipping = clippingList.hasSelection() ? clippingList.selection.text === 'Yes' : undefined
  var closed = closedList.hasSelection() ? closedList.selection.text === 'Yes' : undefined
  var guides = guidesList.hasSelection() ? guidesList.selection.text === 'Yes' : undefined
  selectAll(['PathItem'], function(item) {
    var condition = true
    if (width !== undefined) {
      condition = condition && parseInt(width) === parseInt(item.width)
    }
    if (height !== undefined) {
      condition = condition && parseInt(height) === parseInt(item.height)
    }
    if (clipping !== undefined) {
      condition = condition && clipping === item.clipping
    }
    if (closed !== undefined) {
      condition = condition && closed === item.closed
    }
    if (guides !== undefined) {
      condition = condition && guides === item.guides
    }
    if (fillColor !== undefined) {
      condition = condition && isColorEqual(fillColor, item.fillColor)
    }
    if (fillOverprint !== undefined) {
      condition = condition && fillOverprint === item.fillOverprint
    }
    if (strokeColor !== undefined) {
      condition = condition && isColorEqual(strokeColor, item.strokeColor)
    }
    if (strokeWeight !== undefined) {
      condition = condition && parseInt(strokeWeight) === parseInt(item.strokeWidth)
    }
    if (strokeDashed !== undefined) {
      condition = condition && strokeDashed === item.strokeDashes.isNotEmpty()
    }
    if (strokeOverprint !== undefined) {
      condition = condition && strokeOverprint === item.strokeOverprint
    }
    return condition
  })
})
dialog.show()