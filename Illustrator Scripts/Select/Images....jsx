// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var YES_OR_NO = ['Yes', 'No']
var COLOR_SPACES = ['Grayscale', 'RGB', 'CMYK', 'LAB', 'Separations', 'DeviceN', 'Indexed']
var STATUSES = ['No Data', 'Data from File', 'Data Modified']

var BOUNDS_LEFT_TEXT = [80, 21]
var BOUNDS_RIGHT_TEXT = [60, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Select Images', 'fill')
var widthEdit, heightEdit
var colorSpaceList, bitsEdit, transparentList
var embeddedList, overprintList, statusList

dialog.main.orientation = 'row'
dialog.vgroup(function(mainGroup) {
    mainGroup.vpanel('Dimension', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LEFT_TEXT, 'Width:', JUSTIFY_RIGHT)
            widthEdit = group.editText(BOUNDS_EDIT, undefined, function(it) {
                it.validateUnits()
                it.activate()
            })
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LEFT_TEXT, 'Height:', JUSTIFY_RIGHT)
            heightEdit = group.editText(BOUNDS_EDIT, undefined, VALIDATE_UNITS)
        })
    })
    mainGroup.vpanel('Image', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LEFT_TEXT, 'Color Space:', JUSTIFY_RIGHT)
            colorSpaceList = group.dropDownList(BOUNDS_EDIT, COLOR_SPACES)
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LEFT_TEXT, 'Bits/Channel:', JUSTIFY_RIGHT)
            bitsEdit = group.editText(BOUNDS_EDIT, undefined, VALIDATE_DIGITS)
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LEFT_TEXT, 'Transparent:', JUSTIFY_RIGHT)
            transparentList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
        })
    })
})
dialog.vpanel('Others', function(panel) {
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_LEFT_TEXT, 'Embedded:', JUSTIFY_RIGHT)
        embeddedList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
    })
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_LEFT_TEXT, 'Overprint:', JUSTIFY_RIGHT)
        overprintList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
    })
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_LEFT_TEXT, 'Status:', JUSTIFY_RIGHT)
        statusList = group.dropDownList(BOUNDS_EDIT, STATUSES)
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var width = parseUnits(widthEdit.text)
    var height = parseUnits(heightEdit.text)
    var colorSpace
    if (colorSpaceList.hasSelection()) {
        if (colorSpaceList.selection.text === 'Grayscale') {
            colorSpace = ImageColorSpace.GrayScale
        } else if (colorSpaceList.selection.text === 'RGB') {
            colorSpace = ImageColorSpace.RGB
        } else if (colorSpaceList.selection.text === 'CMYK') {
            colorSpace = ImageColorSpace.CMYK
        } else if (colorSpaceList.selection.text === 'LAB') {
            colorSpace = ImageColorSpace.LAB
        } else if (colorSpaceList.selection.text === 'Separations') {
            colorSpace = ImageColorSpace.Separation
        } else if (colorSpaceList.selection.text === 'DeviceN') {
            colorSpace = ImageColorSpace.DeviceN
        } else {
            colorSpace = ImageColorSpace.Indexed
        }
    }
    var bits = parseInt(bitsEdit.text) || 0
    var transparent = transparentList.hasSelection() ? transparentList.selection.text === 'Yes' : undefined
    var embedded = embeddedList.hasSelection() ? embeddedList.selection.text === 'Yes' : undefined
    var overprint = overprintList.hasSelection() ? overprintList.selection.text === 'Yes' : undefined
    var status
    if (statusList.hasSelection()) {
        if (statusList.selection.text === 'No Data') {
            status = RasterLinkState.NODATA
        } else if (statusList.selection.text === 'Data from File') {
            status = RasterLinkState.DATAFROMFILE
        } else {
            status = RasterLinkState.DATAMODIFIED
        }
    }
    selectAll(['RasterItem'], function(item) {
        var condition = true
        if (width > 0) {
            condition = condition && parseInt(width) === parseInt(item.width)
        }
        if (height > 0) {
            condition = condition && parseInt(height) === parseInt(item.height)
        }
        if (colorSpace !== undefined) {
            condition = condition && colorSpace === item.imageColorSpace
        }
        if (bits > 0) {
            condition = condition && parseInt(bits) === parseInt(item.bitsPerChannel)
        }
        if (transparent !== undefined) {
            condition = condition && transparent === item.transparent
        }
        if (embedded !== undefined) {
            condition = condition && embedded === item.embedded
        }
        if (overprint !== undefined) {
            condition = condition && overprint === item.overprint
        }
        if (status !== undefined) {
            condition = condition && status === item.status
        }
        return condition
    })
})
dialog.show()