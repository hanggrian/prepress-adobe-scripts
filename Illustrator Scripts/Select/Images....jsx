// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

//@target illustrator
//@include '../.lib/commons.js'

var ImageColor = new Enum({
  GRAYSCALE: { text: 'Grayscale', value: ImageColorSpace.GrayScale },
  RGB: { text: 'RGB', value: ImageColorSpace.RGB },
  CMYK: { text: 'CMYK', value: ImageColorSpace.CMYK },
  LAB: { text: 'LAB', value: ImageColorSpace.LAB },
  SEPARATION: { text: 'Separation', value: ImageColorSpace.Separation },
  DEVICEN: { text: 'DeviceN', value: ImageColorSpace.DeviceN },
  INDEXED: { text: 'Indexed', value: ImageColorSpace.Indexed }
})

var ImageStatus = new Enum({
  NO_DATA: { text: 'No Data' },
  DATA_FROM_FILE: { text: 'Data from File' },
  DATA_MODIFIED: { text: 'Data Modified' }
})

var SIZE_INPUT = [100, 21]

check(Collections.isNotEmpty(document.rasterItems),
  getString(R.string.error_notypes_document, R.plurals.raster.plural))
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog(R.string.select_images, 'selecting-items/#select-images')
var dimensionPanel
var colorSpaceList, bitsEdit, transparentList
var embeddedList, overprintList, statusList
var recursiveCheck
var prefs = preferences2.resolve('select/images')

dialog.hgroup(function(main) {
  main.alignChildren = 'fill'
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    dimensionPanel = new SelectDimensionPanel(topGroup, SIZE_INPUT)
    topGroup.vpanel(R.string.image, function(panel) {
      panel.alignChildren = 'right'
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_selectimage_colorspace
        group.leftStaticText(undefined, R.string.color_space)
        colorSpaceList = group.dropDownList(SIZE_INPUT, ImageColor.list())
      })
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_selectimage_bitsperchannel
        group.leftStaticText(undefined, R.string.bits_per_channel)
        bitsEdit = group.editText(SIZE_INPUT).also(VALIDATE_DIGITS)
      })
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_selectimage_transparent
        group.leftStaticText(undefined, R.string.transparent)
        transparentList = group.dropDownList(SIZE_INPUT, SelectOption.list())
      })
    })
  })
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel(R.string.others, function(panel) {
      panel.alignChildren = 'right'
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_selectimage_embedded
        group.leftStaticText(undefined, R.string.embedded)
        embeddedList = group.dropDownList(SIZE_INPUT, SelectOption.list())
      })
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_selectimage_overprint
        group.leftStaticText(undefined, R.string.overprint)
        overprintList = group.dropDownList(SIZE_INPUT, SelectOption.list())
      })
      panel.hgroup(function(group) {
        group.helpTips = R.string.tip_selectimage_status
        group.leftStaticText(undefined, R.string.status)
        statusList = group.dropDownList(SIZE_INPUT, ImageStatus.list())
      })
    })
    if (isFilterMode) {
      recursiveCheck = new RecursiveCheck(topGroup).also(function(it) {
        it.alignment = 'right'
        it.value = prefs.getBoolean('recursive')
      })
    }
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var width = dimensionPanel.getWidth()
  var height = dimensionPanel.getHeight()
  var colorSpace
  if (colorSpaceList.hasSelection()) {
    colorSpace = ImageColor.find(colorSpaceList.selection).value
  }
  var bits = parseInt(bitsEdit.text) || 0
  var transparent = transparentList.hasSelection()
    ? SelectOption.isYes(transparentList.selection) : undefined
  var embedded = embeddedList.hasSelection()
    ? SelectOption.isYes(embeddedList.selection) : undefined
  var overprint = overprintList.hasSelection()
    ? SelectOption.isYes(overprintList.selection) : undefined
  var status
  if (statusList.hasSelection()) {
    status = ImageStatus.find(statusList.selection).value
  }
  selectAll(['RasterItem'], function(item) {
    if (width !== undefined && parseInt(width) !== parseInt(item.width)) return false
    if (height !== undefined && parseInt(height) !== parseInt(item.height)) return false
    if (colorSpace !== undefined && colorSpace !== item.imageColorSpace) return false
    if (bits !== 0 && bits !== parseInt(item.bitsPerChannel)) return false
    if (transparent !== undefined && transparent !== item.transparent) return false
    if (embedded !== undefined && embedded !== item.embedded) return false
    if (overprint !== undefined && overprint !== item.overprint) return false
    if (status !== undefined && status !== item.status) return false
    return true
  }, isFilterMode && recursiveCheck.value)

  if (isFilterMode) prefs.setBoolean('recursive', recursiveCheck.value)
})
dialog.show()
