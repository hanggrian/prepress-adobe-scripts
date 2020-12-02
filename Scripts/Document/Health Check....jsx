#target Illustrator
#include '../.lib/core-strings.js'
#include '../.lib/commons.js'
#include '../.lib/ui.js'

createDialog('Health Check')

var fixButtons = []
var leftBounds = [0, 0, 90, 21]
var rightBounds = [0, 0, 150, 21]
var fixBounds = [0, 0, 50, 21]

dialog.general = dialog.main.addVPanel('General')
dialog.general.alignChildren = 'fill'
dialog.general.colorMode = dialog.general.addHGroup()
dialog.general.colorMode.addText(leftBounds, 'Color mode:', 'right')
dialog.general.colorModeText = dialog.general.colorMode.addText(rightBounds, document.documentColorSpace.toString().substringAfter('.'))
if (dialog.general.colorModeText.text == 'CMYK') {
    dialog.general.colorModeText.text += ' ✔'
} else {
    dialog.general.colorModeText.text += ' ✘'
    dialog.general.colorMode.firstButton = dialog.general.colorMode.add('button', fixBounds, 'Fix')
    dialog.general.colorMode.firstButton.onClick = function() {
        alert('Go to File > Document Color Mode > CMYK Color.')
    }
    fixButtons.push(dialog.general.colorMode.firstButton)
}

dialog.rasterEffects = dialog.main.addVPanel('Raster Effects')
dialog.rasterEffects.alignChildren = 'fill'
dialog.rasterEffects.colorModel = dialog.rasterEffects.addHGroup()
dialog.rasterEffects.colorModel.addText(leftBounds, 'Color model:', 'right')
dialog.rasterEffects.colorModelText = dialog.rasterEffects.colorModel.addText(rightBounds, document.rasterEffectSettings.colorModel.toString().substringAfter('.'))
if (dialog.rasterEffects.colorModelText.text == 'DEFAULTCOLORMODEL') {
    dialog.rasterEffects.colorModelText.text += ' ✔'
} else {
    dialog.rasterEffects.colorModelText.text += ' ✘'
    fixButtons.push(addFixButton(
        dialog.rasterEffects.colorModel,
        dialog.rasterEffects.colorModelText,
        'DEFAULTCOLORMODEL ✔',
        function() {
            document.rasterEffectSettings.colorModel = RasterizationColorModel.DEFAULTCOLORMODEL
        })
    )
}

dialog.rasterEffects.resolution = dialog.rasterEffects.addHGroup()
dialog.rasterEffects.resolution.addText(leftBounds, 'Resolution:', 'right')
dialog.rasterEffects.resolutionText = dialog.rasterEffects.resolution.addText(rightBounds, document.rasterEffectSettings.resolution)
if (dialog.rasterEffects.resolutionText.text == '300') {
    dialog.rasterEffects.resolutionText.text += ' ✔'
} else {
    dialog.rasterEffects.resolutionText.text += ' ✘'
    fixButtons.push(addFixButton(
        dialog.rasterEffects.resolution,
        dialog.rasterEffects.resolutionText,
        '300 ✔',
        function() {
            document.rasterEffectSettings.resolution = 300
        })
    )
}

dialog.rasterEffects.background = dialog.rasterEffects.addHGroup()
dialog.rasterEffects.background.addText(leftBounds, 'Background:', 'right')
dialog.rasterEffects.backgroundText = dialog.rasterEffects.background.addText(rightBounds)
if (!document.rasterEffectSettings.transparency) {
    dialog.rasterEffects.backgroundText.text = 'White ✔'
} else {
    dialog.rasterEffects.backgroundText.text = 'Transparent ✘'
}
if (dialog.rasterEffects.backgroundText.text.endsWith('✘')) {
    fixButtons.push(addFixButton(
        dialog.rasterEffects.background,
        dialog.rasterEffects.backgroundText,
        'White ✔',
        function() {
            document.rasterEffectSettings.transparency = false
        })
    )
}

dialog.rasterEffects.antiAlias = dialog.rasterEffects.addHGroup()
dialog.rasterEffects.antiAlias.addText(leftBounds, 'Anti-alias:', 'right')
dialog.rasterEffects.antiAliasText = dialog.rasterEffects.antiAlias.addText(rightBounds)
if (!document.rasterEffectSettings.antiAliasing) {
    dialog.rasterEffects.antiAliasText.text = 'Disabled ✔'
} else {
    dialog.rasterEffects.antiAliasText.text = 'Enabled ✘'
}
if (dialog.rasterEffects.antiAliasText.text.endsWith('✘')) {
    fixButtons.push(addFixButton(
        dialog.rasterEffects.antiAlias,
        dialog.rasterEffects.antiAliasText,
        'Disabled ✔',
        function() {
            document.rasterEffectSettings.antiAliasing = false
        })
    )
}

dialog.rasterEffects.clippingMask = dialog.rasterEffects.addHGroup()
dialog.rasterEffects.clippingMask.addText(leftBounds, 'Clipping mask:', 'right')
dialog.rasterEffects.clippingMaskText = dialog.rasterEffects.clippingMask.addText(rightBounds)
if (!document.rasterEffectSettings.clippingMask) {
    dialog.rasterEffects.clippingMaskText.text = "Don't create ✔"
} else {
    dialog.rasterEffects.clippingMaskText.text = 'Create ✘'
}
if (dialog.rasterEffects.clippingMaskText.text.endsWith('✘')) {
    fixButtons.push(addFixButton(
        dialog.rasterEffects.clippingMask,
        dialog.rasterEffects.clippingMaskText,
        "Don't create ✔",
        function() {
            document.rasterEffectSettings.clippingMask = false
        })
    )
}

dialog.rasterEffects.spotColors = dialog.rasterEffects.addHGroup()
dialog.rasterEffects.spotColors.addText(leftBounds, 'Spot colors:', 'right')
dialog.rasterEffects.spotColorsText = dialog.rasterEffects.spotColors.addText(rightBounds)
if (!document.rasterEffectSettings.convertSpotColors) {
    dialog.rasterEffects.spotColorsText.text = 'Preserve ✔'
} else {
    dialog.rasterEffects.spotColorsText.text = 'Convert ✘'
}
if (dialog.rasterEffects.spotColorsText.text.endsWith('✘')) {
    fixButtons.push(addFixButton(
        dialog.rasterEffects.spotColors,
        dialog.rasterEffects.spotColorsText,
        'Preserve ✔',
        function() {
            document.rasterEffectSettings.convertSpotColors = false
        })
    )
}

if (fixButtons.length > 0) {
    setNeutralButton('Fix All', function() {
        for (var i = 0; i < fixButtons.length; i++) {
            fixButtons[i].notify('onClick')
        }
    }, 160)
}
setPositiveButton('OK')
show()

function addFixButton(parent, staticText, fixedText, onClick) {
    var button = parent.add('button', fixBounds, 'Fix')
    button.onClick = function() {
        onClick()
        parent.remove(button)
        staticText.text = fixedText
    }
    return button
}