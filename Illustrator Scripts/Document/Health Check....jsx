/**
 * TODO: check for images below 300 ppi.
 */

#target Illustrator
#include '../../.sharedlib/core-strings.js'
#include '../../.sharedlib/sui.js'
#include '../.lib/commons.js'

createDialog('Health Check')

var fixButtons = []
var leftBounds = [0, 0, 90, 21]
var rightBounds = [0, 0, 150, 21]
var fixBounds = [0, 0, 50, 21]

dialog.main2 = dialog.main.addHGroup()
dialog.main2.alignChildren = 'top'

// panel with fix buttons
dialog.general = dialog.main2.addVPanel('General')
dialog.general.alignChildren = 'fill'

// color space isn't really a part of raster effects settings
dialog.general.colorSpace = dialog.general.addHGroup()
dialog.general.colorSpace.addText(leftBounds, 'Color space:', 'right')
dialog.general.colorSpaceText = dialog.general.colorSpace.addText(rightBounds, document.documentColorSpace.toString().substringAfter('.'))
if (dialog.general.colorSpaceText.text == 'CMYK') {
    dialog.general.colorSpaceText.text += ' ✔'
} else {
    dialog.general.colorSpaceText.text += ' ✘'
    dialog.general.colorSpace.firstButton = dialog.general.colorSpace.add('button', fixBounds, 'Fix')
    dialog.general.colorSpace.firstButton.onClick = function() {
        alert("Color mode can't be changed within script.\nGo to File > Document Color Mode > CMYK Color.", 'Unfixable setting')
    }
    fixButtons.push(dialog.general.colorSpace.firstButton)
}

dialog.general.colorModel = dialog.general.addHGroup()
dialog.general.colorModel.addText(leftBounds, 'Color model:', 'right')
dialog.general.colorModelText = dialog.general.colorModel.addText(rightBounds, document.rasterEffectSettings.colorModel.toString().substringAfter('.'))
if (dialog.general.colorModelText.text == 'DEFAULTCOLORMODEL') {
    dialog.general.colorModelText.text += ' ✔'
} else {
    dialog.general.colorModelText.text += ' ✘'
    fixButtons.push(addFixButton(
        dialog.general.colorModel,
        dialog.general.colorModelText,
        'DEFAULTCOLORMODEL ✔',
        function() { 
            document.rasterEffectSettings.colorModel = RasterizationColorModel.DEFAULTCOLORMODEL 
        }))
}

dialog.general.resolution = dialog.general.addHGroup()
dialog.general.resolution.addText(leftBounds, 'Resolution:', 'right')
dialog.general.resolutionText = dialog.general.resolution.addText(rightBounds, document.rasterEffectSettings.resolution)
if (dialog.general.resolutionText.text == '300') {
    dialog.general.resolutionText.text += ' ✔'
} else {
    dialog.general.resolutionText.text += ' ✘'
    fixButtons.push(addFixButton(
        dialog.general.resolution,
        dialog.general.resolutionText,
        '300 ✔',
        function() {
            document.rasterEffectSettings.resolution = 300
        }))
}

dialog.general.background = dialog.general.addHGroup()
dialog.general.background.addText(leftBounds, 'Background:', 'right')
dialog.general.backgroundText = dialog.general.background.addText(rightBounds)
if (!document.rasterEffectSettings.transparency) {
    dialog.general.backgroundText.text = 'White ✔'
} else {
    dialog.general.backgroundText.text = 'Transparent ✘'
}
if (dialog.general.backgroundText.text.endsWith('✘')) {
    fixButtons.push(addFixButton(
        dialog.general.background,
        dialog.general.backgroundText,
        'White ✔',
        function() {
            document.rasterEffectSettings.transparency = false
        }))
}

dialog.general.antiAlias = dialog.general.addHGroup()
dialog.general.antiAlias.addText(leftBounds, 'Anti-alias:', 'right')
dialog.general.antiAliasText = dialog.general.antiAlias.addText(rightBounds)
if (!document.rasterEffectSettings.antiAliasing) {
    dialog.general.antiAliasText.text = 'Disabled ✔'
} else {
    dialog.general.antiAliasText.text = 'Enabled ✘'
}
if (dialog.general.antiAliasText.text.endsWith('✘')) {
    fixButtons.push(addFixButton(
        dialog.general.antiAlias,
        dialog.general.antiAliasText,
        'Disabled ✔',
        function() {
            document.rasterEffectSettings.antiAliasing = false
        }))
}

dialog.general.clippingMask = dialog.general.addHGroup()
dialog.general.clippingMask.addText(leftBounds, 'Clipping mask:', 'right')
dialog.general.clippingMaskText = dialog.general.clippingMask.addText(rightBounds)
if (!document.rasterEffectSettings.clippingMask) {
    dialog.general.clippingMaskText.text = "Don't create ✔"
} else {
    dialog.general.clippingMaskText.text = 'Create ✘'
}
if (dialog.general.clippingMaskText.text.endsWith('✘')) {
    fixButtons.push(addFixButton(
        dialog.general.clippingMask,
        dialog.general.clippingMaskText,
        "Don't create ✔",
        function() {
            document.rasterEffectSettings.clippingMask = false
        }))
}

dialog.general.spotColors = dialog.general.addHGroup()
dialog.general.spotColors.addText(leftBounds, 'Spot colors:', 'right')
dialog.general.spotColorsText = dialog.general.spotColors.addText(rightBounds)
if (!document.rasterEffectSettings.convertSpotColors) {
    dialog.general.spotColorsText.text = 'Preserve ✔'
} else {
    dialog.general.spotColorsText.text = 'Convert ✘'
}
if (dialog.general.spotColorsText.text.endsWith('✘')) {
    fixButtons.push(addFixButton(
        dialog.general.spotColors,
        dialog.general.spotColorsText,
        'Preserve ✔',
        function() {
            document.rasterEffectSettings.convertSpotColors = false
        }))
}

// panels without fix buttons
dialog.content = dialog.main2.addVGroup()
dialog.content.rasters = dialog.content.addVPanel('Rasters Items')
if (document.rasterItems.length == 0) {
    dialog.content.rasters.text += ' ✔'
    dialog.content.rasters.addText(undefined, 'No raster items.')
} else {
    var isEmpty = true
    for (var i = 0; i < document.rasterItems.length; i++) {
        var item = document.rasterItems[i]
        if (item.imageColorSpace != ImageColorSpace.CMYK) {
            isEmpty = false
            dialog.content.rasters.addText(undefined, getRasterItemName(item) + ' is ' + item.imageColorSpace + '.')
        }
    }
    if (isEmpty) {
        dialog.content.rasters.text += ' ✔'
        dialog.content.rasters.addText(undefined, 'All images are CMYK.')
    } else {
        dialog.content.rasters.text += ' ✘'
    }
}

if (fixButtons.length > 0) {
    setNegativeButton('Fix All', function() {
        for (var i = 0; i < fixButtons.length; i++) {
            fixButtons[i].notify('onClick')
        }
    })
}
setPositiveButton('OK')
show()

function addFixButton(parent, staticText, fixedText, onClick) {
    var button = parent.add('button', fixBounds, 'Fix')
    button.onClick = function() {
        onClick()
        button.hide()
        staticText.text = fixedText
    }
    return button
}

function getRasterItemName(rasterItem) {
    var s = rasterItem.name
    if (s == '') {
        s = parseFloat(rasterItem.height.toFixed(2)) + '×' + parseFloat(rasterItem.width.toFixed(2)) + ' image'
    }
    return s
}