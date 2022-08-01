/*
<javascriptresource>
<name>Add Bleed to Images...</name>
<category>2</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

var dialog = new Dialog('Add Bleed to Images', 'add-bleed-to-images')
var lengthEdit
var anchorGroup
var flattenImageCheck, guidesRadiosCheckGroup, selectBleedCheck, correctionEdit
var prefs = preferences2.resolve('images/add_bleed')

dialog.vgroup(function(main) {
  main.alignChildren = 'fill'
  main.hgroup(function(group) {
    group.tips('Bleed are distributed around image')
    group.staticText([120, 21], 'Length:').also(JUSTIFY_RIGHT)
    lengthEdit = group.editText([200, 21], prefs.getString('length', '2.5 mm')).also(function(it) {
      it.validateUnits()
      it.activate()
    })
  })
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel('Anchor', function(panel) {
      anchorGroup = new AnchorGroup(panel, true)
    })
    topGroup.vpanel('Options', function(group) {
      group.alignChildren = 'fill'
      flattenImageCheck = group.checkBox(undefined, 'Flatten Image').also(function(it) {
        it.tip('Layers will be flattened')
        it.select()
      })
      guidesRadiosCheckGroup = new MultiRadioCheckGroup(group, 'Use Guides', ['Append', 'Replace']).also(function(it) {
        it.main.tips('Guides will mark where bleed are added')
        it.check.select()
        it.check.onClick()
      })
      group.hgroup(function(innerGroup) {
        innerGroup.tips('Select bleed with x correction')
        selectBleedCheck = innerGroup.checkBox(undefined, 'Select Bleed with').also(function(it) {
          it.onClick = function() {
            correctionEdit.enabled = it.value
            if (it.value) {
              correctionEdit.activate()
            } else {
              lengthEdit.activate()
            }
          }
        })
        correctionEdit = innerGroup.editText([50, 21], '0 px').also(function(it) {
          it.validateUnits()
          it.enabled = false
        })
        innerGroup.staticText(undefined, 'Correction')
      })
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var bleed = new UnitValue(lengthEdit.text)
  var anchor = anchorGroup.getAnchorPosition()
  var correction = parseUnits(correctionEdit.text)
  process(bleed, anchor, correction, document)
})
dialog.setYesButton('All', function() {
  var bleed = new UnitValue(lengthEdit.text)
  var anchor = anchorGroup.getAnchorPosition()
  var correction = parseUnits(correctionEdit.text)
  var progress = new ProgressPalette(app.documents.length, 'Adding bleed')
  for (var i = 0; i < app.documents.length; i++) {
    progress.increment()
    process(bleed, anchor, correction, app.documents[i])
  }
})
dialog.show()

function process(bleed, anchor, correction, document) {
  app.activeDocument = document
  var pushLeft = false, pushTop = false, pushRight = false, pushBottom = false
  var guideLeft = false, guideTop = false, guideRight = false, guideBottom = false
  var targetWidth = document.width, targetHeight = document.height

  if (anchorGroup.isCenter()) {
    pushTop = true
    pushBottom = true
    pushLeft = true
    pushRight = true
    targetWidth += bleed * 2
    targetHeight += bleed * 2
  } else {
    if (anchorGroup.isHorizontalTop()) {
      pushBottom = true
      targetHeight += bleed
    } else if (anchorGroup.isHorizontalBottom()) {
      pushTop = true
      targetHeight += bleed
    }
    if (anchorGroup.isVerticalLeft()) {
      pushRight = true
      targetWidth += bleed
    } else if (anchorGroup.isVerticalRight()) {
      pushLeft = true
      targetWidth += bleed
    }
  }

  if (guidesRadiosCheckGroup.isSelected()) {
    if (guidesRadiosCheckGroup.getSelectedRadio() === 'Replace') {
      while (document.guides.length > 0) { // TODO: find out why forEach only clearing parts
        document.guides.first().remove()
      }
    }
    guideLeft = document.guides.add(Direction.VERTICAL, 0)
    guideTop = document.guides.add(Direction.HORIZONTAL, 0)
    guideRight = document.guides.add(Direction.VERTICAL, document.width)
    guideBottom = document.guides.add(Direction.HORIZONTAL, document.height)
  }
  if (flattenImageCheck.value) {
    document.flatten()
  }
  document.resizeCanvas(targetWidth, targetHeight, anchor)
  if (selectBleedCheck.value) {
    var left = guideLeft.coordinate.as('px') + (pushLeft ? correction : 0)
    var top = guideTop.coordinate.as('px') + (pushTop ? correction : 0)
    var right = guideRight.coordinate.as('px') - (pushRight ? correction : 0)
    var bottom = guideBottom.coordinate.as('px') - (pushBottom ? correction : 0)
    document.selection.select([
      [left, top],
      [left, bottom],
      [right, bottom],
      [right, top]
    ])
    document.selection.invert()
  }

  prefs.edit(function(it) {
    it.setString('length', lengthEdit.text)
  })
}
