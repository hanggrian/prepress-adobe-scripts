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

var dialog = new Dialog('Select Images')
var dimensionPanel
var colorSpaceList, bitsEdit, transparentList
var embeddedList, overprintList, statusList

dialog.hgroup(function(main) {
    main.alignChildren = 'fill'
    main.vgroup(function(topGroup) {
        dimensionPanel = new SelectDimensionPanel(topGroup, BOUNDS_LEFT_TEXT, BOUNDS_EDIT)
        topGroup.vpanel('Image', function(panel) {
            panel.hgroup(function(group) {
                group.tips('The color space of the raster image')
                group.staticText(BOUNDS_LEFT_TEXT, 'Color Space:').also(JUSTIFY_RIGHT)
                colorSpaceList = group.dropDownList(BOUNDS_EDIT, COLOR_SPACES)
            })
            panel.hgroup(function(group) {
                group.tips('The number of bits per channel')
                group.staticText(BOUNDS_LEFT_TEXT, 'Bits/Channel:').also(JUSTIFY_RIGHT)
                bitsEdit = group.editText(BOUNDS_EDIT).also(VALIDATE_DIGITS)
            })
            panel.hgroup(function(group) {
                group.tips('Is the raster art transparent?')
                group.staticText(BOUNDS_LEFT_TEXT, 'Transparent:').also(JUSTIFY_RIGHT)
                transparentList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
            })
        })
    })
    main.vpanel('Others', function(panel) {
        panel.hgroup(function(group) {
            group.tips('Is the raster art embedded within the illustration?')
            group.staticText(BOUNDS_LEFT_TEXT, 'Embedded:').also(JUSTIFY_RIGHT)
            embeddedList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
        })
        panel.hgroup(function(group) {
            group.tips('Is the raster art overprinting?')
            group.staticText(BOUNDS_LEFT_TEXT, 'Overprint:').also(JUSTIFY_RIGHT)
            overprintList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
        })
        panel.hgroup(function(group) {
            group.tips('Status of the linked image')
            group.staticText(BOUNDS_LEFT_TEXT, 'Status:').also(JUSTIFY_RIGHT)
            statusList = group.dropDownList(BOUNDS_EDIT, STATUSES)
        })
    })
})
dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var width = dimensionPanel.getWidth()
    var height = dimensionPanel.getHeight()
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