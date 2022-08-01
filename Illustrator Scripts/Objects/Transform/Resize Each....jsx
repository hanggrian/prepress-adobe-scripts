#target Illustrator
#include '../../.lib/commons.js'

var BOUNDS_TEXT = [60, 21]
var BOUNDS_EDIT = [180, 21]

checkHasSelection()

var dialog = new Dialog('Resize Each', 'resizing-rasterizing-each#resize-each---f5')
var prefill = selection.first()
var widthEdit, widthCheck, heightEdit, heightCheck
var changePositionsCheck, changeFillPatternsCheck, changeFillGradientsCheck, changeStrokePatternsCheck
var documentOriginCheck, anchorGroup
var recursiveCheck
var prefs = preferences2.resolve('objects/resize_each')

dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.alignChildren = 'bottom'
    group.tips("Objects' new width, uncheck to ignore")
    group.staticText(BOUNDS_TEXT, 'Width:').also(JUSTIFY_RIGHT)
    widthEdit = group.editText(BOUNDS_EDIT, formatUnits(prefill.width, unitName, 2)).also(function(it) {
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
  main.hgroup(function(group) {
    group.alignChildren = 'bottom'
    group.tips("Objects' new height, uncheck to ignore")
    group.staticText(BOUNDS_TEXT, 'Height:').also(JUSTIFY_RIGHT)
    heightEdit = group.editText(BOUNDS_EDIT, formatUnits(prefill.height, unitName, 2)).also(VALIDATE_UNITS)
    heightCheck = group.checkBox().also(function(it) {
      it.select()
      it.onClick = function() {
        heightEdit.enabled = it.value
      }
    })
  })
  main.hgroup(function(group) {
    group.alignChildren = 'fill'
    group.vpanel('Change', function(panel) {
      panel.alignChildren = 'fill'
      changePositionsCheck = panel.checkBox(undefined, 'Positions').also(function(it) {
        it.tip('Are art object positions and orientations effected?')
        it.value = prefs.getBoolean('option1')
      })
      changeFillPatternsCheck = panel.checkBox(undefined, 'Fill Patterns').also(function(it) {
        it.tip('Are the fill patterns assigned to paths to be transformed?')
        it.value = prefs.getBoolean('option2')
      })
      changeFillGradientsCheck = panel.checkBox(undefined, 'Fill Gradients').also(function(it) {
        it.tip('Are the fill gradients assigned to paths to be transformed?')
        it.value = prefs.getBoolean('option3')
      })
      changeStrokePatternsCheck = panel.checkBox(undefined, 'Stroke Patterns').also(function(it) {
        it.tip('Are the stroke patterns assigned to paths to be transformed?')
        it.value = prefs.getBoolean('option4')
      })
    })
    group.vpanel('Anchor', function(panel) {
      panel.alignChildren = 'fill'
      documentOriginCheck = panel.checkBox(undefined, 'Document Origin').also(function(it) {
        it.tip('Use current reference point preference')
        it.onClick = function() {
          anchorGroup.main.enabled = !it.value
        }
      })
      anchorGroup = new AnchorGroup(panel)
    })
  })
  main.hgroup(function(it) {
    it.alignment = 'right'
    recursiveCheck = new RecursiveCheck(it).also(function(it) {
      it.main.value = prefs.getBoolean('recursive')
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var width = parseUnits(widthEdit.text)
  var height = parseUnits(heightEdit.text)
  var transformation = documentOriginCheck.value ? Transformation.DOCUMENTORIGIN : anchorGroup.getTransformation()

  var action = function(item, i) {
    print(i + '. ')
    var scaleX = !widthCheck.value ? 100 : 100 * width / item.width
    var scaleY = !heightCheck.value ? 100 : 100 * height / item.height
    if (!isFinite(scaleX)) {
      scaleX = 100
    }
    if (!isFinite(scaleY)) {
      scaleY = 100
    }
    println('Scale X={0} Y={1}', scaleX, scaleY)
    item.resize(scaleX, scaleY,
      changePositionsCheck.value,
      changeFillPatternsCheck.value,
      changeFillGradientsCheck.value,
      changeStrokePatternsCheck.value,
      100,
      transformation)
  }
  if (recursiveCheck.isSelected()) {
    selection.forEachItem(action)
  } else {
    selection.forEach(action)
  }

  prefs.setBoolean('option1', changePositionsCheck.value)
  prefs.setBoolean('option2', changeFillPatternsCheck.value)
  prefs.setBoolean('option3', changeFillGradientsCheck.value)
  prefs.setBoolean('option4', changeStrokePatternsCheck.value)
  prefs.setBoolean('recursive', recursiveCheck.isSelected())
})
dialog.show()
