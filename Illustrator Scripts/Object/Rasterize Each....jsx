// The problem with native `Object > Rasterize...` is that they always change size after rasterization.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/checks.js'

var COLOR_MODELS = ['Default', 'Grayscale', 'Bitmap']

var BOUNDS_TEXT = [100, 21]
var BOUNDS_EDIT = [200, 21]
var BOUNDS_EDIT_SMALL = [75, 21]

checkHasSelection()

var dialog = new Dialog('Rasterize Each')
var prefill = selection.first()
var colorModelList, resolutionEdit
var backgroundWhiteRadio, backgroundTransparentRadio
var antiAliasingNoneRadio, antiAliasingArtRadio, antiAliasingTypeRadio
var backgroundBlackCheck, clippingMaskCheck, convertSpotColorsCheck, convertTextToOutlinesCheck, includeLayersCheck, paddingEdit
var recursiveGroup

dialog.hgroup(function(group) {
    group.setTooltips('The color model for the rasterization')
    group.staticText(BOUNDS_TEXT, 'Color Model:', JUSTIFY_RIGHT)
    colorModelList = group.dropDownList(BOUNDS_EDIT, COLOR_MODELS, function(it) {
        it.selection = COLOR_MODELS.indexOf('Default')
    })
})
dialog.hgroup(function(group) {
    group.setTooltips('The rasterization resolution in dots-per-inch (dpi)')
    group.staticText(BOUNDS_TEXT, 'Resolution:', JUSTIFY_RIGHT)
    resolutionEdit = group.editText(BOUNDS_EDIT, '300', function(it) {
        it.validateDigits()
        it.activate()
    })
})
dialog.hgroup(function(mainGroup) {
    mainGroup.alignChildren = 'fill'
    mainGroup.vgroup(function(innerGroup) {
        innerGroup.alignChildren = 'fill'
        innerGroup.vpanel('Background', function(panel) {
            panel.alignChildren = 'fill'
            panel.setTooltips('Should the resulting image use transparency')
            backgroundWhiteRadio = panel.radioButton(undefined, 'White', SELECTED)
            backgroundTransparentRadio = panel.radioButton(undefined, 'Transparent')
        })
        innerGroup.vpanel('Anti-Aliasing', function(panel) {
            panel.alignChildren = 'fill'
            panel.setTooltips('The type of antialiasing method')
            antiAliasingNoneRadio = panel.radioButton(undefined, 'None')
            antiAliasingArtRadio = panel.radioButton(undefined, 'Art Optimized')
            antiAliasingTypeRadio = panel.radioButton(undefined, 'Type Optimized')
            if (selection.filterItem(function(it) { return it.typename === 'TextFrame' }).isNotEmpty()) {
                antiAliasingTypeRadio.value = true
            } else {
                antiAliasingArtRadio.value = true
            }
        })
    })
    mainGroup.vpanel('Options', function(panel) {
        panel.alignChildren = 'fill'
        backgroundBlackCheck = panel.checkBox(undefined, 'Against Black Background', function(check) {
            check.setTooltip('Should rasterize against a black background instead of white')
        })
        clippingMaskCheck = panel.checkBox(undefined, 'Create Clipping Mask', function(check) {
            check.setTooltip('Should a clipping mask be created for the resulting image')
        })
        convertSpotColorsCheck = panel.checkBox(undefined, 'Convert Spot Colors', function(check) {
            check.setTooltip('Whether to convert all spot colors to process colors in the resulting image')
        })
        convertTextToOutlinesCheck = panel.checkBox(undefined, 'Convert Text to Outlines', function(check) {
            check.setTooltip('Should all text be converted to outlines before rasterization')
        })
        includeLayersCheck = panel.checkBox(undefined, 'Include Layers', function(check) {
            check.setTooltip('Should the resulting image incorporates the layer attributes (such as opacity and blend mode)')
        })
        panel.hgroup(function(group) {
            group.setTooltips('The amount of white space (in points) to be added around the object during rasterization')
            group.staticText(undefined, 'Add')
            paddingEdit = group.editText(BOUNDS_EDIT_SMALL, unitsOf('0 mm'), VALIDATE_UNITS)
            group.staticText(undefined, 'Around Object')
        })
    })
})
recursiveGroup = new RecursiveGroup(dialog.main)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
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
    recursiveGroup.forEachAware(selection, function(item) {
        var width = item.width
        var height = item.height
        var position = item.position
        var newItem = document.rasterize(item, item.controlBounds, options)
        // maintain dimension, ignore if text
        if (item.typename !== 'TextFrame') {
            newItem.width = width + options.padding * 2
            newItem.height = height + options.padding * 2
            newItem.position = position
        }
    })
})
dialog.show()