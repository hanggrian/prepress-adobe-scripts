//@target illustrator
//@include '../../.lib/commons.js'

var COLOR_MODELS = ['Default', 'Grayscale', 'Bitmap']
var SIZE_INPUT = [200, 21]

checkAnySelection()

var dialog = new Dialog(R.string.rasterize_each, 'resizing-rasterizing-each/#rasterize-each')
var colorModelList, resolutionEdit
var backgroundPanel, backgroundWhiteRadio, backgroundTransparentRadio
var antiAliasingPanel, antiAliasingNoneRadio, antiAliasingArtRadio, antiAliasingTypeRadio
var backgroundBlackCheck, clippingMaskCheck, convertSpotColorsCheck, convertTextToOutlinesCheck,
  includeLayersCheck, paddingGroup
var keepSizeCheck, recursiveCheck
var prefs = preferences2.resolve('objects/rasterize_each')

dialog.vgroup(function(main) {
  main.vgroup(function(topPane) {
    topPane.alignChildren = 'right'
    topPane.hgroup(function(group) {
      group.helpTips = R.string.tip_rasterizeeach_colormodel
      group.leftStaticText(undefined, R.string.color_model)
      colorModelList = group.dropDownList(SIZE_INPUT, COLOR_MODELS).also(function(it) {
        it.selection = 0
      })
    })
    topPane.hgroup(function(group) {
      group.helpTips = R.string.tip_rasterizeeach_resolusi
      group.leftStaticText(undefined, R.string.resolution)
      resolutionEdit = group.editText(SIZE_INPUT, '300').also(function(it) {
        it.validateDigits()
        it.activate()
      })
    })
  })
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'fill'
    rootPane.vgroup(function(leftPane) {
      leftPane.alignChildren = 'fill'
      backgroundPanel = leftPane.vpanel(R.string.background, function(panel) {
        panel.alignChildren = 'fill'
        panel.helpTips = R.string.tip_rasterizeeach_background
        backgroundWhiteRadio = panel.radioButton(undefined, R.string.white)
        backgroundTransparentRadio = panel.radioButton(undefined, R.string.transparent)
        panel.selectRadioIndex(prefs.getInt('background'))
      })
      antiAliasingPanel = leftPane.vpanel(R.string.anti_aliasing, function(panel) {
        panel.alignChildren = 'fill'
        panel.helpTips = R.string.tip_rasterizeeach_antialiasing
        antiAliasingNoneRadio = panel.radioButton(undefined, R.string.none)
        antiAliasingArtRadio = panel.radioButton(undefined, R.string.art_optimized)
        antiAliasingTypeRadio = panel.radioButton(undefined, R.string.type_optimized)
        panel.selectRadioIndex(prefs.getInt('anti_aliasing'))
      })
    })
    rootPane.vpanel('Options', function(panel) {
      panel.alignChildren = 'fill'
      backgroundBlackCheck = panel.checkBox(undefined, R.string.against_black_background)
        .also(function(it) {
          it.helpTip = R.string.tip_rasterizeeach_option1
          it.value = prefs.getBoolean('option1')
        })
      clippingMaskCheck = panel.checkBox(undefined, R.string.create_clipping_mask)
        .also(function(it) {
          it.helpTip = R.string.tip_rasterizeeach_option2
          it.value = prefs.getBoolean('option2')
        })
      convertSpotColorsCheck = panel.checkBox(undefined, R.string.convert_spot_colors)
        .also(function(it) {
          it.helpTip = R.string.tip_rasterizeeach_option3
          it.value = prefs.getBoolean('option3')
        })
      convertTextToOutlinesCheck = panel.checkBox(undefined, R.string.convert_text_to_outlines)
        .also(function(it) {
          it.helpTip = R.string.tip_rasterizeeach_option4
          it.value = prefs.getBoolean('option4')
        })
      includeLayersCheck = panel.checkBox(undefined, R.string.include_layers).also(function(it) {
        it.helpTip = R.string.tip_rasterizeeach_option5
        it.value = prefs.getBoolean('option5')
      })
      paddingGroup = new PaddingGroup(panel)
    })
  })
  main.hgroup(function(group) {
    group.alignment = 'right'
    keepSizeCheck = new KeepSizeCheck(group).also(function(it) {
      it.value = prefs.getBoolean('keep_size')
    })
    recursiveCheck = new RecursiveCheck(group).also(function(it) {
      it.value = prefs.getBoolean('recursive')
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
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
  options.padding = paddingGroup.get()

  var selectQueues = []
  var action = function(item, i) {
    print(i + '. ')
    var width = item.width
    var height = item.height
    var position = item.position
    var newItem = document.rasterize(item, item.geometricBounds, options)
    selectQueues.push(newItem)
    if (keepSizeCheck.value && item.typename !== 'TextFrame') {
      print('Keep size, ')
      newItem.width = width + options.padding * 2
      newItem.height = height + options.padding * 2
      newItem.position = position
    }
    println('Done.')
  }
  if (recursiveCheck.value) {
    Collections.forEachItem(selection, action)
  } else {
    Collections.forEach(selection, action)
  }
  selection = selectQueues

  prefs.setInt('background', backgroundPanel.getSelectedRadioIndex())
  prefs.setInt('anti_aliasing', antiAliasingPanel.getSelectedRadioIndex())
  prefs.setBoolean('option1', backgroundBlackCheck.value)
  prefs.setBoolean('option2', clippingMaskCheck.value)
  prefs.setBoolean('option3', convertSpotColorsCheck.value)
  prefs.setBoolean('option4', convertTextToOutlinesCheck.value)
  prefs.setBoolean('option5', includeLayersCheck.value)
  prefs.setBoolean('keep_size', keepSizeCheck.value)
  prefs.setBoolean('recursive', recursiveCheck.value)
})
dialog.show()
