#target Illustrator
#include '../.lib/core-strings.js'
#include '../.lib/commons.js'
#include '../.lib/ui.js'

var BOUNDS_LEFT = [0, 0, 75, 21]
var BOUNDS_RIGHT = [0, 0, 150, 21]
var BOUNDS_FIX = [0, 0, 50, 21]

createDialog('Health Check')

var general = dialog.main.addVPanel('General')
general.alignChildren = 'fill'
general.colorMode = general.addHGroup()
general.colorMode.add('statictext', BOUNDS_LEFT, 'Color mode:').justify = 'right'
var colorMode = general.colorMode.add('statictext', BOUNDS_RIGHT, document.documentColorSpace.toString().substringAfter('.'))
if (colorMode.text == 'CMYK') {
    colorMode.text += ' ✔'
} else {
    colorMode.text += ' ✘'
    general.colorMode.add('button', BOUNDS_FIX, 'Fix').onClick = function() {
        alert('Go to File > Document Color Mode > CMYK Color.')
    }
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
    rasterEffects.colorModel.add('button', BOUNDS_FIX, 'Fix').onClick = function() {
        document.rasterEffectSettings.colorModel = RasterizationColorModel.DEFAULTCOLORMODEL
        rasterEffects.colorModel.remove(this)
        colorModel.text = 'DEFAULTCOLORMODEL ✔'
    }
}
rasterEffects.resolution = rasterEffects.addHGroup()
rasterEffects.resolution.add('statictext', BOUNDS_LEFT, 'Resolution:').justify = 'right'
var resolution = rasterEffects.resolution.add('statictext', BOUNDS_RIGHT, document.rasterEffectSettings.resolution)
if (resolution.text == '300') {
    resolution.text += ' ✔'
} else {
    resolution.text += ' ✘'
    rasterEffects.resolution.add('button', BOUNDS_FIX, 'Fix').onClick = function() {
        document.rasterEffectSettings.resolution = 300
        rasterEffects.resolution.remove(this)
        resolution.text = '300 ✔'
    }
}
rasterEffects.background = rasterEffects.addHGroup()
rasterEffects.background.add('statictext', BOUNDS_LEFT, 'Background:').justify = 'right'
var background
if (!document.rasterEffectSettings.transparency) {
    background = rasterEffects.background.add('statictext', BOUNDS_RIGHT, 'White ✔')
} else {
    background = rasterEffects.background.add('statictext', BOUNDS_RIGHT, 'Transparent ❗')
}
if (background.text.endsWith('❗')) {
    rasterEffects.background.add('button', BOUNDS_FIX, 'Fix').onClick = function() {
        document.rasterEffectSettings.transparency = false
        rasterEffects.background.remove(this)
        background.text = 'White ✔'
    }    
}

setPositiveButton('OK')
show()