/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var OPEN_PDFBOXTYPES = ['Bounding', '-', 'Art', 'Crop', 'Trim', 'Bleed', 'Media']
var OPEN_DOCUMENTMODES = ['Bitmap', 'CMYK', 'Grayscale', 'Lab', 'RBG']
var OPEN_DOCUMENTBITS = ['1 bit', '8 bit', '16 bit', '32 bit']

var BOUNDS_DOCUMENT_TEXT = [90, 21]
var BOUNDS_DOCUMENT_EDIT = [120, 21]
var BOUNDS_DOCUMENT_EDIT2 = [70, 21]
var BOUNDS_DOCUMENT_EDITMAX = [120 + 70 + 10, 21]

function OpenDocumentPanel(parent) {
    var self = this
    this.modeList, this.bitsList
    this.resolutionEdit
    this.unitsList
    this.backgrounTransparentRadio, this.backgrounWhiteRadio

    this.main = parent.vpanel('Document Preset', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.tips('The color mode and resolution for the new document')
            group.staticText(BOUNDS_DOCUMENT_TEXT, 'Color Mode:', JUSTIFY_RIGHT)
            self.modeList = group.dropDownList(BOUNDS_DOCUMENT_EDIT, OPEN_DOCUMENTMODES, function(it) {
                it.selectText('CMYK')
            })
            self.bitsList = group.dropDownList(BOUNDS_DOCUMENT_EDIT2, OPEN_DOCUMENTBITS, function(it) {
                it.selectText('8 bit')
            })
        })
        panel.hgroup(function(group) {
            group.tips('The resolution for the new document')
            group.staticText(BOUNDS_DOCUMENT_TEXT, 'Resolution:', JUSTIFY_RIGHT)
            self.resolutionEdit = group.editText(BOUNDS_DOCUMENT_EDITMAX, '300')
        })
        panel.hgroup(function(group) {
            group.tips('The units for the new document')
            group.staticText(BOUNDS_DOCUMENT_TEXT, 'Units:', JUSTIFY_RIGHT)
            self.unitsList = group.dropDownList(BOUNDS_DOCUMENT_EDITMAX, UNITS, function(it) {
                it.selectText('Millimeters')
            })
        })
        panel.hgroup(function(group) {
            group.tips('The initial fill of the document')
            group.staticText(BOUNDS_DOCUMENT_TEXT, 'Background:', JUSTIFY_RIGHT)
            self.backgrounTransparentRadio = group.radioButton(undefined, 'Transparent').also(SELECTED)
            self.backgrounWhiteRadio = group.radioButton(undefined, 'White')
        })
    })

    this.open = function(title, width, height) {
        var mode, background, bits
        switch(self.modeList.selection.text) {
            case 'Bitmap':
                mode = NewDocumentMode.BITMAP
                break;
            case 'CMYK':
                mode = NewDocumentMode.CMYK
                break;
            case 'Grayscale':
                mode = NewDocumentMode.GRAYSCALE
                break;
            case 'Lab':
                mode = NewDocumentMode.LAB
                break;
            default:
                mode = NewDocumentMode.RGB
                break;
        }
        var resolution = parseUnit(self.resolutionEdit.text)
        if (self.backgrounTransparentRadio.value) {
            background = DocumentFill.TRANSPARENT
        } else {
            background = DocumentFill.WHITE
        }
        switch(self.bitsList.selection.text) {
            case '1 bit':
                bits = BitsPerChannelType.EIGHT
                break;
            case '8 bit':
                bits = BitsPerChannelType.ONE
                break;
            case '16 bit':
                bits = BitsPerChannelType.SIXTEEN
                break;
            default:
                bits = BitsPerChannelType.THIRTYTWO
                break;
        }
        return app.documents.add(width, height, resolution, title, mode, background, 1.0, bits)
    }
}