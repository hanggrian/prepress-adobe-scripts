/*
<javascriptresource>
<category>2</category>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

var dialog = new Dialog('Pre-Flight')
var generalModeText
var generalResolutionText
var generalBitsText

var fixButtons = []
var leftBounds = [70, 21]
var rightBounds = [100, 21]
var fixBounds = [50, 21]

dialog.hgroup(function(mainGroup) {
    mainGroup.alignChildren = 'top'

    // panel with fix buttons
    mainGroup.vpanel('General', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.setHelpTips('Image color mode should be CMYK.')
            group.staticText(leftBounds, 'Mode:', JUSTIFY_RIGHT)
            generalModeText = group.staticText(rightBounds, document.mode.toString().substringAfter('.'), function(it) {
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
            group.setHelpTips('Resolution should be 300.')
            group.staticText(leftBounds, 'Resolution:', JUSTIFY_RIGHT)
            generalResolutionText = group.staticText(rightBounds, Math.round(document.resolution), function(it) {
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
            group.setHelpTips('Bits depth should be 8.')
            group.staticText(leftBounds, 'Bits:', JUSTIFY_RIGHT)
            generalBitsText = group.staticText(rightBounds, getBits(), function(it) {
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
    var button = parent.button(fixBounds, 'Fix', function(it) {
        it.onClick = function() {
            onClick()
            button.hide()
            staticText.text = fixedText
        }
    })
    return button
}