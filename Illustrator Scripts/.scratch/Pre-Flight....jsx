// TODO: check for images below 300 ppi.

#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_LEFT = [90, 21]
var BOUNDS_RIGHT = [150, 21]
var BOUNDS_FIX = [50, 21]

var dialog = new Dialog('Pre-Flight')
var generalColorSpaceText, generalColorSpaceButton
var generalColorModelText
var generalResolutionText
var generalBackgroundText
var generalAntiAliasText
var generalClippingMaskText
var generalSpotColorsText
var fixButtons = []

dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'top'

    // panel with fix buttons
    topGroup.vpanel('General', function(panel) {
        panel.alignChildren = 'fill'
        // color space isn't really a part of raster effects settings
        panel.hgroup(function(group) {
            group.setTooltips('Image color space should be CMYK')
            group.staticText(BOUNDS_LEFT, 'Color space:', JUSTIFY_RIGHT)
            generalColorSpaceText = group.staticText(BOUNDS_RIGHT, document.documentColorSpace.toString().substringAfter('.'), function(it) {
                if (it.text === 'CMYK') {
                    it.text += ' ✔'
                } else {
                    it.text += ' ✘'
                    generalColorSpaceButton = group.button(BOUNDS_FIX, 'Fix', function(button) {
                        it.onClick = function() {
                            alert("Color mode can't be changed within script.\nGo to File > Document Color Mode > CMYK Color.", dialog.title)
                        }
                        fixButtons.push(it)
                    })
                }
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Image color model should be default')
            group.staticText(BOUNDS_LEFT, 'Color model:', JUSTIFY_RIGHT)
            generalColorModelText = group.staticText(BOUNDS_RIGHT, document.rasterEffectSettings.colorModel.toString().substringAfter('.'), function(it) {
                if (it.text === 'DEFAULTCOLORMODEL') {
                    it.text += ' ✔'
                } else {
                    it.text += ' ✘'
                    fixButtons.push(addFixButton(group, it, 'DEFAULTCOLORMODEL ✔', function() {
                        document.rasterEffectSettings.colorModel = RasterizationColorModel.DEFAULTCOLORMODEL
                    }))
                }
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Resolution should be 300')
            group.staticText(BOUNDS_LEFT, 'Resolution:', JUSTIFY_RIGHT)
            generalResolutionText = group.staticText(BOUNDS_RIGHT, document.rasterEffectSettings.resolution, function(it) {
                if (it.text === '300') {
                    it.text += ' ✔'
                } else {
                    it.text += ' ✘'
                    fixButtons.push(addFixButton(group, it, '300 ✔', function() {
                        document.rasterEffectSettings.resolution = 300
                    }))
                }
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Background should be white')
            group.staticText(BOUNDS_LEFT, 'Background:', JUSTIFY_RIGHT)
            generalBackgroundText = group.staticText(BOUNDS_RIGHT, undefined, function(it) {
                if (!document.rasterEffectSettings.transparency) {
                    it.text = 'White ✔'
                } else {
                    it.text = 'Transparent ✘'
                }
                if (it.text.endsWith('✘')) {
                    fixButtons.push(addFixButton(group, it, 'White ✔', function() {
                        document.rasterEffectSettings.transparency = false
                    }))
                }
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Anti-alias should be disabled')
            group.staticText(BOUNDS_LEFT, 'Anti-alias:', JUSTIFY_RIGHT)
            generalAntiAliasText = group.staticText(BOUNDS_RIGHT, undefined, function(it) {
                if (!document.rasterEffectSettings.antiAliasing) {
                    it.text = 'Disabled ✔'
                } else {
                    it.text = 'Enabled ✘'
                }
                if (it.text.endsWith('✘')) {
                    fixButtons.push(addFixButton(group, it, 'Disabled ✔', function() {
                        document.rasterEffectSettings.antiAliasing = false
                    }))
                }
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Clipping mask should not be created')
            group.staticText(BOUNDS_LEFT, 'Clipping mask:', JUSTIFY_RIGHT)
            generalClippingMaskText = group.staticText(BOUNDS_RIGHT, undefined, function(it) {
                if (!document.rasterEffectSettings.clippingMask) {
                    it.text = "Don't create ✔"
                } else {
                    it.text = 'Create ✘'
                }
                if (it.text.endsWith('✘')) {
                    fixButtons.push(addFixButton(group, it, "Don't create ✔", function() {
                        document.rasterEffectSettings.clippingMask = false
                    }))
                }
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Spot colors should be preserved')
            group.staticText(BOUNDS_LEFT, 'Spot colors:', JUSTIFY_RIGHT)
            generalSpotColorsText = group.staticText(BOUNDS_RIGHT, undefined, function(it) {
                if (!document.rasterEffectSettings.convertSpotColors) {
                    it.text = 'Preserve ✔'
                } else {
                    it.text = 'Convert ✘'
                }
                if (it.text.endsWith('✘')) {
                    fixButtons.push(addFixButton(group, it, 'Preserve ✔', function() {
                        document.rasterEffectSettings.convertSpotColors = false
                    }))
                }
            })
        })
    })

    // panels without fix buttons
    topGroup.vgroup(function(group) {
        group.vpanel('Rasters Items', function(panel) {
            panel.setTooltips('Images below 300 resolution')
            if (document.rasterItems.length === 0) {
                panel.text += ' ✔'
                panel.staticText(undefined, 'No raster items')
            } else {
                var isEmpty = true
                for (var i = 0; i < document.rasterItems.length; i++) {
                    var item = document.rasterItems[i]
                    if (item.imageColorSpace != ImageColorSpace.CMYK) {
                        isEmpty = false
                        panel.staticText(undefined, getRasterItemName(item) + ' is ' + item.imageColorSpace + '.')
                    }
                }
                if (isEmpty) {
                    panel.text += ' ✔'
                    panel.staticText(undefined, 'All images are CMYK')
                } else {
                    panel.text += ' ✘'
                }
            }
        })
    })
})

if (fixButtons.length > 0) {
    dialog.setNegativeButton('Fix All', function() {
        for (var i = 0; i < fixButtons.length; i++) {
            fixButtons[i].notify('onClick')
        }
    })
}
dialog.setPositiveButton()
dialog.show()

function addFixButton(parent, staticText, fixedText, onClick) {
    var button = parent.button(BOUNDS_FIX, 'Fix', function(it) {
        it.onClick = function() {
            onClick()
            button.hide()
            staticText.text = fixedText
        }
    })
    return button
}

function getRasterItemName(rasterItem) {
    var s = rasterItem.name
    if (s === '') {
        s = parseFloat(rasterItem.height.toFixed(2)) + '×' + parseFloat(rasterItem.width.toFixed(2)) + ' image'
    }
    return s
}