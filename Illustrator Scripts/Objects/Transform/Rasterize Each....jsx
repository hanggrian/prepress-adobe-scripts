#target Illustrator
#include '../../.lib/commons.js'

var COLOR_MODELS = ['Default', 'Grayscale', 'Bitmap']

var BOUNDS_TEXT = [80, 21]
var BOUNDS_EDIT = [200, 21]
var BOUNDS_EDIT_SMALL = [70, 21]

checkHasSelection()

var dialog = new Dialog('Rasterize Each', 'resizing-rasterizing-each#rasterize-each')
var prefill = selection.first()
var colorModelList, resolutionEdit
var backgroundWhiteRadio, backgroundTransparentRadio
var antiAliasingNoneRadio, antiAliasingArtRadio, antiAliasingTypeRadio
var backgroundBlackCheck, clippingMaskCheck, convertSpotColorsCheck, convertTextToOutlinesCheck, includeLayersCheck, paddingEdit
var maintainSizeGroup

dialog.vgroup(function (main) {
  main.hgroup(function (group) {
    group.tips('The color model for the rasterization')
    group.staticText(BOUNDS_TEXT, 'Color Model:').also(JUSTIFY_RIGHT)
    colorModelList = group.dropDownList(BOUNDS_EDIT, COLOR_MODELS).also(function (it) {
      it.selectText('Default')
    })
  })
  main.hgroup(function (group) {
    group.tips('The rasterization resolution in dots-per-inch (dpi)')
    group.staticText(BOUNDS_TEXT, 'Resolution:').also(JUSTIFY_RIGHT)
    resolutionEdit = group.editText(BOUNDS_EDIT, '300').also(function (it) {
      it.validateDigits()
      it.activate()
    })
  })
  main.hgroup(function (topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vgroup(function (innerGroup) {
      innerGroup.alignChildren = 'fill'
      innerGroup.vpanel('Background', function (panel) {
        panel.alignChildren = 'fill'
        panel.tips('Should the resulting image use transparency')
        backgroundWhiteRadio = panel.radioButton(undefined, 'White').also(SELECTED)
        backgroundTransparentRadio = panel.radioButton(undefined, 'Transparent')
      })
      innerGroup.vpanel('Anti-Aliasing', function (panel) {
        panel.alignChildren = 'fill'
        panel.tips('The type of antialiasing method')
        antiAliasingNoneRadio = panel.radioButton(undefined, 'None')
        antiAliasingArtRadio = panel.radioButton(undefined, 'Art Optimized')
        antiAliasingTypeRadio = panel.radioButton(undefined, 'Type Optimized')
        if (selection.filterItem(function (it) { return it.typename === 'TextFrame' }).isNotEmpty()) {
          antiAliasingTypeRadio.value = true
        } else {
          antiAliasingArtRadio.value = true
        }
      })
    })
    topGroup.vpanel('Options', function (panel) {
      panel.alignChildren = 'fill'
      backgroundBlackCheck = panel.checkBox(undefined, 'Against Black Background').also(function (check) {
        check.tip('Should rasterize against a black background instead of white')
      })
      clippingMaskCheck = panel.checkBox(undefined, 'Create Clipping Mask').also(function (check) {
        check.tip('Should a clipping mask be created for the resulting image')
      })
      convertSpotColorsCheck = panel.checkBox(undefined, 'Convert Spot Colors').also(function (check) {
        check.tip('Whether to convert all spot colors to process colors in the resulting image')
      })
      convertTextToOutlinesCheck = panel.checkBox(undefined, 'Convert Text to Outlines').also(function (check) {
        check.tip('Should all text be converted to outlines before rasterization')
      })
      includeLayersCheck = panel.checkBox(undefined, 'Include Layers').also(function (check) {
        check.tip('Should the resulting image incorporates the layer attributes (such as opacity and blend mode)')
      })
      panel.hgroup(function (group) {
        group.tips('The amount of white space (in points) to be added around the object during rasterization')
        group.staticText(undefined, 'Add')
        paddingEdit = group.editText(BOUNDS_EDIT_SMALL, unitsOf('0 mm')).also(VALIDATE_UNITS)
        group.staticText(undefined, 'Around Object')
      })
    })
  })
  maintainSizeGroup = new MaintainSizeGroup(main)
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function () {
  process(function (action) {
    selection.forEach(action)
  })
})
dialog.setYesButton('Recursive', function () {
  process(function (action) {
    selection.forEachItem(action)
  })
})
dialog.show()

function process(forEach) {
  var options = new RasterizeOptions()
  if (colorModelList.selection.text === 'Default') {
    options.colorModel = RasterizationColorModel.DEFAULTCOLORMODEL
  } else if (colorModelList.selection.text === 'Grayscale') {
    options.colorModel = RasterizationColorModel.GRAYSCALE
  } else {
    options.colorModel = RasterizationColorModel.BITMAP
  }
  options.resolution = parseInt(resolutionEdit.text)
  options.transparency = backgroundTransparentRadio.value
  if (antiAliasingNoneRadio.value) {
    options.antiAliasingMethod = AntiAliasingMethod.None
  } else if (antiAliasingArtRadio.value) {
    options.antiAliasingMethod = AntiAliasingMethod.ARTOPTIMIZED
  } else {
    options.antiAliasingMethod = AntiAliasingMethod.TYPEOPTIMIZED
  }
  options.backgroundBlack = backgroundBlackCheck.value
  options.clippingMask = clippingMaskCheck.value
  options.convertSpotColors = convertSpotColorsCheck.value
  options.convertTextToOutlines = convertTextToOutlinesCheck.value
  options.includeLayers = includeLayersCheck.value
  options.padding = parseUnits(paddingEdit.text)

  var selectQueues = []
  forEach(function (item, i) {
    print(i + '. ')
    var width = item.width
    var height = item.height
    var position = item.position
    var newItem = document.rasterize(item, item.geometricBounds, options)
    selectQueues.push(newItem)
    if (maintainSizeGroup.isSelected() && item.typename !== 'TextFrame') {
      print('Keep size, ')
      newItem.width = width + options.padding * 2
      newItem.height = height + options.padding * 2
      newItem.position = position
    }
    println('Done')
  })
  selection = selectQueues
}