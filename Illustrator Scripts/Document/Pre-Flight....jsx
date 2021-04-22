// TODO: check for images below 300 ppi.

#target Illustrator
#include '../.lib/commons.js'

var dialog = new Dialog('Pre-Flight')
var generalColorSpaceText, generalColorSpaceButton
var generalColorModelText
var generalResolutionText
var generalBackgroundText
var generalAntiAliasText
var generalClippingMaskText
var generalSpotColorsText

var fixButtons = []
var leftBounds = [90, 21]
var rightBounds = [150, 21]
var fixBounds = [50, 21]

dialog.hgroup(function(mainGroup) {
    mainGroup.alignChildren = 'top'

    // panel with fix buttons
    mainGroup.vpanel('General', function(panel) {
        panel.alignChildren = 'fill'
        // color space isn't really a part of raster effects settings
        panel.hgroup(function(group) {
            group.setHelpTips('Image color space should be CMYK.')
            group.staticText(leftBounds, 'Color space:', JUSTIFY_RIGHT)
            generalColorSpaceText = group.staticText(rightBounds, document.documentColorSpace.toString().substringAfter('.'), function(it) {
                if (it.text === 'CMYK') {
                    it.text += ' ✔'
                } else {
                    it.text += ' ✘'
                    generalColorSpaceButton = group.button(fixBounds, 'Fix', function(button) {
                        it.onClick = function() {
                            alert("Color mode can't be changed within script.\nGo to File > Document Color Mode > CMYK Color.", dialog.title)
                        }
                        fixButtons.push(it)
                    })
                }
            })
        })
        panel.hgroup(function(group) {
            group.setHelpTips('Image color model should be default.')
            group.staticText(leftBounds, 'Color model:', JUSTIFY_RIGHT)
            generalColorModelText = group.staticText(rightBounds, document.rasterEffectSettings.colorModel.toString().substringAfter('.'), function(it) {
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
            group.setHelpTips('Resolution should be 300.')
            group.staticText(leftBounds, 'Resolution:', JUSTIFY_RIGHT)
            generalResolutionText = group.staticText(rightBounds, document.rasterEffectSettings.resolution, function(it) {
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
            group.setHelpTips('Background should be white.')
            group.staticText(leftBounds, 'Background:', JUSTIFY_RIGHT)
            generalBackgroundText = group.staticText(rightBounds, undefined, function(it) {
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
            group.setHelpTips('Anti-alias should be disabled.')
            group.staticText(leftBounds, 'Anti-alias:', JUSTIFY_RIGHT)
            generalAntiAliasText = group.staticText(rightBounds, undefined, function(it) {
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
            group.setHelpTips('Clipping mask should not be created.')
            group.staticText(leftBounds, 'Clipping mask:', JUSTIFY_RIGHT)
            generalClippingMaskText = group.staticText(rightBounds, undefined, function(it) {
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
            group.setHelpTips('Spot colors should be preserved.')
            group.staticText(leftBounds, 'Spot colors:', JUSTIFY_RIGHT)
            generalSpotColorsText = group.staticText(rightBounds, undefined, function(it) {
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
    mainGroup.vgroup(function(group) {
        group.vpanel('Rasters Items', function(panel) {
            panel.setHelpTips('Images below 300 resolution.')
            if (document.rasterItems.length === 0) {
                panel.text += ' ✔'
                panel.staticText(undefined, 'No raster items.')
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
                    panel.staticText(undefined, 'All images are CMYK.')
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
    var button = parent.button(fixBounds, 'Fix', function(it) {
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