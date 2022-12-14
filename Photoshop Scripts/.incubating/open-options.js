/*<javascriptresource><menu>hide</menu></javascriptresource>*/

var OPEN_PDFBOXTYPES = ['Bounding', '-', 'Art', 'Crop', 'Trim', 'Bleed', 'Media']
var OPEN_DOCUMENTMODES = ['Bitmap', 'CMYK', 'Grayscale', 'Lab', 'RBG']
var OPEN_DOCUMENTBITS = ['1 bit', '8 bit', '16 bit', '32 bit']
var SIZE_DOCUMENT_INPUT = [120, 21]
var SIZE_DOCUMENT_INPUT2 = [70, 21]
var SIZE_DOCUMENT_INPUTMAX = [120 + 70 + 10, 21]

function OpenDocumentPanel(parent) {
  var self = parent.vpanel('Document Preset')
  self.modeList, self.bitsList
  self.resolutionEdit
  self.unitsList
  self.backgrounTransparentRadio, self.backgrounWhiteRadio

  self.alignChildren = 'right'
  self.hgroup(function(group) {
    group.helpTips = 'The color mode and resolution for the new document'
    group.staticText(undefined, 'Color Mode:', JUSTIFY_RIGHT)
    self.modeList = group.dropDownList(SIZE_DOCUMENT_INPUT, OPEN_DOCUMENTMODES, function(it) {
      it.selectText('CMYK')
    })
    self.bitsList = group.dropDownList(SIZE_DOCUMENT_INPUT2, OPEN_DOCUMENTBITS, function(it) {
      it.selectText('8 bit')
    })
  })
  self.hgroup(function(group) {
    group.helpTips = 'The resolution for the new document'
    group.staticText(undefined, 'Resolution:', JUSTIFY_RIGHT)
    self.resolutionEdit = group.editText(SIZE_DOCUMENT_INPUTMAX, '300')
  })
  self.hgroup(function(group) {
    group.helpTips = 'The units for the new document'
    group.staticText(undefined, 'Units:', JUSTIFY_RIGHT)
    self.unitsList = group.dropDownList(SIZE_DOCUMENT_INPUTMAX, UnitType.list(), function(it) {
      it.selectText('Millimeters')
    })
  })
  self.hgroup(function(group) {
    group.helpTips = 'The initial fill of the document'
    group.staticText(undefined, 'Background:', JUSTIFY_RIGHT)
    self.backgrounTransparentRadio = group.radioButton(undefined, 'Transparent').also(SELECTED)
    self.backgrounWhiteRadio = group.radioButton(undefined, 'White')
  })

  self.open = function(title, width, height) {
    var mode, background, bits
    switch (self.modeList.selection.text) {
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
    switch (self.bitsList.selection.text) {
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

  return self
}
