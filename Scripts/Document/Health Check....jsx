#target Illustrator
#include '../.lib/core-strings.js'
#include '../.lib/commons.js'
#include '../.lib/ui.js'

var BOUNDS_LEFT = [0, 0, 90, 21]
var BOUNDS_RIGHT = [0, 0, 150, 21]
var BOUNDS_FIX = [0, 0, 50, 21]

createDialog('Health Check')

var fixButtons = []

var general = dialog.main.addVPanel('General')
general.alignChildren = 'fill'

general.colorMode = general.addHGroup()
general.colorMode.add('statictext', BOUNDS_LEFT, 'Color mode:').justify = 'right'
var colorMode = general.colorMode.add('statictext', BOUNDS_RIGHT, document.documentColorSpace.toString().substringAfter('.'))
if (colorMode.text == 'CMYK') {
    colorMode.text += ' ✔'
} else {
    colorMode.text += ' ✘'
    var firstButton = general.colorMode.add('button', BOUNDS_FIX, 'Fix')
    firstButton.onClick = function() {
        alert('Go to File > Document Color Mode > CMYK Color.')
    }
    fixButtons.push(firstButton)
}

var rasterEffects = dialog.main.addVPanel('Raster Effects')
rasterEffects.alignChildren = 'fill'

rasterEffects.colorModel = rasterEffects.addHGroup()
rasterEffects.colorModel.add('statictext', BOUNDS_LEFT, 'Color model:').justify = 'right'
var colorModel = rasterEffects.colorModel.add('statictext', BOUNDS_RIGHT, document.rasterEffectSettings.colorModel.toString().substringAfter('.'))
if (colorModel.text == 'DEFAULTCOLORMODEL') {
    colorModel.text += ' ✔'
} else {
    colorModel.text += ' ✘'
    fixButtons.push(addFixButton(rasterEffects.colorModel, colorModel, 'DEFAULTCOLORMODEL ✔', function() {
        document.rasterEffectSettings.colorModel = RasterizationColorModel.DEFAULTCOLORMODEL
    }))
}

rasterEffects.resolution = rasterEffects.addHGroup()
rasterEffects.resolution.add('statictext', BOUNDS_LEFT, 'Resolution:').justify = 'right'
var resolution = rasterEffects.resolution.add('statictext', BOUNDS_RIGHT, document.rasterEffectSettings.resolution)
if (resolution.text == '300') {
    resolution.text += ' ✔'
} else {
    resolution.text += ' ✘'
    fixButtons.push(addFixButton(rasterEffects.resolution, resolution, '300 ✔', function() {
        document.rasterEffectSettings.resolution = 300
    }))
}

rasterEffects.background = rasterEffects.addHGroup()
rasterEffects.background.add('statictext', BOUNDS_LEFT, 'Background:').justify = 'right'
var background
if (!document.rasterEffectSettings.transparency) {
    background = rasterEffects.background.add('statictext', BOUNDS_RIGHT, 'White ✔')
} else {
    background = rasterEffects.background.add('statictext', BOUNDS_RIGHT, 'Transparent ✘')
}
if (background.text.endsWith('✘')) {
    fixButtons.push(addFixButton(rasterEffects.background, background, 'White ✔', function() {
        document.rasterEffectSettings.transparency = false
    }))
}

rasterEffects.antiAlias = rasterEffects.addHGroup()
rasterEffects.antiAlias.add('statictext', BOUNDS_LEFT, 'Anti-alias:').justify = 'right'
var antiAlias
if (!document.rasterEffectSettings.antiAliasing) {
    antiAlias = rasterEffects.antiAlias.add('statictext', BOUNDS_RIGHT, 'Disabled ✔')
} else {
    antiAlias = rasterEffects.antiAlias.add('statictext', BOUNDS_RIGHT, 'Enabled ✘')
}
if (antiAlias.text.endsWith('✘')) {
    fixButtons.push(addFixButton(rasterEffects.antiAlias, antiAlias, 'Disabled ✔', function() {
        document.rasterEffectSettings.antiAliasing = false
    }))
}

rasterEffects.clippingMask = rasterEffects.addHGroup()
rasterEffects.clippingMask.add('statictext', BOUNDS_LEFT, 'Clipping mask:').justify = 'right'
var clippingMask
if (!document.rasterEffectSettings.clippingMask) {
    clippingMask = rasterEffects.clippingMask.add('statictext', BOUNDS_RIGHT, "Don't create ✔")
} else {
    clippingMask = rasterEffects.clippingMask.add('statictext', BOUNDS_RIGHT, 'Create ✘')
}
if (clippingMask.text.endsWith('✘')) {
    fixButtons.push(addFixButton(rasterEffects.clippingMask, clippingMask, "Don't create ✔", function() {
        document.rasterEffectSettings.clippingMask = false
    }))
}

rasterEffects.spotColors = rasterEffects.addHGroup()
rasterEffects.spotColors.add('statictext', BOUNDS_LEFT, 'Spot colors:').justify = 'right'
var spotColors
if (!document.rasterEffectSettings.convertSpotColors) {
    spotColors = rasterEffects.spotColors.add('statictext', BOUNDS_RIGHT, 'Preserve ✔')
} else {
    spotColors = rasterEffects.spotColors.add('statictext', BOUNDS_RIGHT, 'Convert ✘')
}
if (spotColors.text.endsWith('✘')) {
    fixButtons.push(addFixButton(rasterEffects.spotColors, spotColors, 'Preserve ✔', function() {
        document.rasterEffectSettings.convertSpotColors = false
    }))
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

function addFixButton(parent, staticText, text, onClick) {
    var button = parent.add('button', BOUNDS_FIX, 'Fix')
    button.onClick = function() {
        onClick()
        parent.remove(button)
        staticText.text = text
    }
    return button
}