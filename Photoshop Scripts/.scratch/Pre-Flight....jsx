/*
<javascriptresource>
<category>2</category>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

var BOUNDS_LEFT = [70, 21]
var BOUNDS_RIGHT = [100, 21]
var BOUNDS_FIX = [50, 21]

var dialog = new Dialog('Pre-Flight')
var generalModeText
var generalResolutionText
var generalBitsText
var fixButtons = []

dialog.hgroup(function(mainGroup) {
    mainGroup.alignChildren = 'top'

    // panel with fix buttons
    mainGroup.vpanel('General', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.setTooltips('Image color mode should be CMYK')
            group.staticText(BOUNDS_LEFT, 'Mode:', JUSTIFY_RIGHT)
            generalModeText = group.staticText(BOUNDS_RIGHT, document.mode.toString().substringAfter('.'), function(it) {
                if (it.text === 'CMYK') {
                    it.text += ' ✔'
                } else {
                    it.text += ' ✘'
                    fixButtons.push(addFixButton(group, it, 'CMYK ✔', function() {
                        document.changeMode(ChangeMode.CMYK)
                    }))
                }
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Resolution should be 300')
            group.staticText(BOUNDS_LEFT, 'Resolution:', JUSTIFY_RIGHT)
            generalResolutionText = group.staticText(BOUNDS_RIGHT, Math.round(document.resolution), function(it) {
                if (it.text === '300') {
                    it.text += ' ✔'
                } else {
                    it.text += ' ✘'
                    fixButtons.push(addFixButton(group, it, '300 ✔', function() {
                        document.resizeImage(undefined, undefined, 300)
                    }))
                }
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Bits depth should be 8')
            group.staticText(BOUNDS_LEFT, 'Bits:', JUSTIFY_RIGHT)
            generalBitsText = group.staticText(BOUNDS_RIGHT, getBits(), function(it) {
                if (it.text === '8') {
                    it.text += ' ✔'
                } else {
                    it.text += ' ✘'
                    fixButtons.push(addFixButton(group, it, '8 ✔', function() {
                        document.bitsPerChannel = BitsPerChannelType.EIGHT
                    }))
                }
            })
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

function getBits() {
    switch (document.bitsPerChannel) {
        case BitsPerChannelType.ONE:
            return 1
        case BitsPerChannelType.EIGHT:
            return 8
        case BitsPerChannelType.SIXTEEN:
            return 16
        default:
            return 32
    }
}

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