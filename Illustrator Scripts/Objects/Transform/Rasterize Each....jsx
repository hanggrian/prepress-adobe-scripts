#target Illustrator
#include "../../.lib/commons.js"

var COLOR_MODELS = ["Default", "Grayscale", "Bitmap"]
var SIZE_INPUT = [200, 21]

checkHasSelection()

var dialog = new Dialog("Rasterize Each", "resizing-rasterizing-each/#rasterize-each")
var prefill = Collections.first(selection)
var colorModelList, resolutionEdit
var backgroundPanel, backgroundWhiteRadio, backgroundTransparentRadio
var antiAliasingPanel, antiAliasingNoneRadio, antiAliasingArtRadio, antiAliasingTypeRadio
var backgroundBlackCheck, clippingMaskCheck, convertSpotColorsCheck, convertTextToOutlinesCheck, includeLayersCheck, paddingEdit
var recursiveCheck, keepSizeCheck
var config = configs.resolve("objects/rasterize_each")

dialog.vgroup(function(main) {
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "right"
    topGroup.hgroup(function(group) {
      group.tooltips("The color model for the rasterization")
      group.staticText(undefined, "Color Model:").also(JUSTIFY_RIGHT)
      colorModelList = group.dropDownList(SIZE_INPUT, COLOR_MODELS).also(function(it) {
        it.selectText("Default")
      })
    })
    topGroup.hgroup(function(group) {
      group.tooltips("The rasterization resolution in dots-per-inch (dpi)")
      group.staticText(undefined, "Resolution:").also(JUSTIFY_RIGHT)
      resolutionEdit = group.editText(SIZE_INPUT, "300").also(function(it) {
        it.validateDigits()
        it.activate()
      })
    })
  })
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vgroup(function(innerGroup) {
      innerGroup.alignChildren = "fill"
      backgroundPanel = innerGroup.vpanel("Background", function(panel) {
        panel.alignChildren = "fill"
        panel.tooltips("Should the resulting image use transparency")
        backgroundWhiteRadio = panel.radioButton(undefined, "White")
        backgroundTransparentRadio = panel.radioButton(undefined, "Transparent")
        panel.selectRadioText(config.getString("background", "White"))
      })
      antiAliasingPanel = innerGroup.vpanel("Anti-Aliasing", function(panel) {
        panel.alignChildren = "fill"
        panel.tooltips("The type of antialiasing method")
        antiAliasingNoneRadio = panel.radioButton(undefined, "None")
        antiAliasingArtRadio = panel.radioButton(undefined, "Art Optimized")
        antiAliasingTypeRadio = panel.radioButton(undefined, "Type Optimized")
        panel.selectRadioText(config.getString("anti_aliasing", "Art Optimized"))
      })
    })
    topGroup.vpanel("Options", function(panel) {
      panel.alignChildren = "fill"
      backgroundBlackCheck = panel.checkBox(undefined, "Against Black Background").also(function(it) {
        it.tooltip("Should rasterize against a black background instead of white")
        it.value = config.getBoolean("option1")
      })
      clippingMaskCheck = panel.checkBox(undefined, "Create Clipping Mask").also(function(it) {
        it.tooltip("Should a clipping mask be created for the resulting image")
        it.value = config.getBoolean("option2")
      })
      convertSpotColorsCheck = panel.checkBox(undefined, "Convert Spot Colors").also(function(it) {
        it.tooltip("Whether to convert all spot colors to process colors in the resulting image")
        it.value = config.getBoolean("option3")
      })
      convertTextToOutlinesCheck = panel.checkBox(undefined, "Convert Text to Outlines").also(function(it) {
        it.tooltip("Should all text be converted to outlines before rasterization")
        it.value = config.getBoolean("option4")
      })
      includeLayersCheck = panel.checkBox(undefined, "Include Layers").also(function(it) {
        it.tooltip("Should the resulting image incorporates the layer attributes (such as opacity and blend mode)")
        it.value = config.getBoolean("option5")
      })
      panel.hgroup(function(group) {
        group.tooltips("The amount of white space (in points) to be added around the object during rasterization")
        group.staticText(undefined, "Add")
        paddingEdit = group.editText([70, 21], unitsOf("0 mm")).also(VALIDATE_UNITS)
        group.staticText(undefined, "Around Object")
      })
    })
  })
  main.hgroup(function(group) {
    group.alignment = "right"
    recursiveCheck = new RecursiveCheck(group).also(function(it) {
      it.value = config.getBoolean("recursive")
    })
    keepSizeCheck = new KeepSizeCheck(group).also(function(it) {
      it.value = config.getBoolean("keep_size")
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var options = new RasterizeOptions()
  if (colorModelList.selection.text === "Default") {
    options.colorModel = RasterizationColorModel.DEFAULTCOLORMODEL
  } else if (colorModelList.selection.text === "Grayscale") {
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
  var action = function(item, i) {
    print(i + ". ")
    var width = item.width
    var height = item.height
    var position = item.position
    var newItem = document.rasterize(item, item.geometricBounds, options)
    selectQueues.push(newItem)
    if (keepSizeCheck.value && item.typename !== "TextFrame") {
      print("Keep size, ")
      newItem.width = width + options.padding * 2
      newItem.height = height + options.padding * 2
      newItem.position = position
    }
    println("Done.")
  }
  if (recursiveCheck.value) {
    Collections.forEachItem(selection, action)
  } else {
    Collections.forEach(selection, action)
  }
  selection = selectQueues

  config.setString("background", backgroundPanel.getSelectedRadioText())
  config.setString("anti_aliasing", antiAliasingPanel.getSelectedRadioText())
  config.setBoolean("option1", backgroundBlackCheck.value)
  config.setBoolean("option2", clippingMaskCheck.value)
  config.setBoolean("option3", convertSpotColorsCheck.value)
  config.setBoolean("option4", convertTextToOutlinesCheck.value)
  config.setBoolean("option5", includeLayersCheck.value)
  config.setBoolean("recursive", recursiveCheck.value)
  config.setBoolean("keep_size", keepSizeCheck.value)
})
dialog.show()
