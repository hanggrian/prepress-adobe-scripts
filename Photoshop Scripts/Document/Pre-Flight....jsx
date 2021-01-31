#target Photoshop
#include '../.lib/commons.js'
#include '../.lib/dialog.js'

var dialog = new Dialog('Pre-Flight')

var fixButtons = []
var leftBounds = [0, 0, 70, 21]
var rightBounds = [0, 0, 100, 21]
var fixBounds = [0, 0, 50, 21]

dialog.main2 = dialog.main.addHGroup()
dialog.main2.alignChildren = 'top'

// panel with fix buttons
dialog.general = dialog.main2.addVPanel('General')
dialog.general.alignChildren = 'fill'

dialog.general.mode = dialog.general.addHGroup()
dialog.general.mode.addText(leftBounds, 'Mode:', 'right')
dialog.general.modeText = dialog.general.mode.addText(rightBounds, document.mode.toString().substringAfter('.'))
if (dialog.general.modeText.text == 'CMYK') {
    dialog.general.modeText.text += ' ✔'
} else {
    dialog.general.modeText.text += ' ✘'
    fixButtons.push(addFixButton(
        dialog.general.mode,
        dialog.general.modeText,
        'CMYK ✔',
        function() {
            document.changeMode(ChangeMode.CMYK)
        }))
}
dialog.general.mode.setTooltip('Image color mode should be CMYK.')

dialog.general.resolution = dialog.general.addHGroup()
dialog.general.resolution.addText(leftBounds, 'Resolution:', 'right')
dialog.general.resolutionText = dialog.general.resolution.addText(rightBounds, Math.round(document.resolution))
if (dialog.general.resolutionText.text == '300') {
    dialog.general.resolutionText.text += ' ✔'
} else {
    dialog.general.resolutionText.text += ' ✘'
    fixButtons.push(addFixButton(
        dialog.general.resolution,
        dialog.general.resolutionText,
        '300 ✔',
        function() {
            document.resizeImage(undefined, undefined, 300)
        }))
}
dialog.general.resolution.setTooltip('Resolution should be 300.')

dialog.general.bits = dialog.general.addHGroup()
dialog.general.bits.addText(leftBounds, 'Bits:', 'right')
dialog.general.bitsText = dialog.general.bits.addText(rightBounds, getBits())
if (dialog.general.bitsText.text == '8') {
    dialog.general.bitsText.text += ' ✔'
} else {
    dialog.general.bitsText.text += ' ✘'
    fixButtons.push(addFixButton(
        dialog.general.bits,
        dialog.general.bitsText,
        '8 ✔',
        function() {
            document.bitsPerChannel = BitsPerChannelType.EIGHT
        }))
}
dialog.general.bits.setTooltip('Bits depth should be 8.')

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
    var button = parent.add('button', fixBounds, 'Fix')
    button.onClick = function() {
        onClick()
        button.hide()
        staticText.text = fixedText
    }
    return button
}