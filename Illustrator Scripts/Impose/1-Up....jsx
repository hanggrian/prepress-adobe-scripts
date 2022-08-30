#target Illustrator
#include "../.lib/core.js"

var SIZE_INPUT = [100, 21]

var dialog = new Dialog(getString(R.string.impose_n_up, 1), "imposing-layout/#n-up")
var pdfPanel, pagesPanel, documentPanel
var nupGroup

var files = FilePicker.openFile(dialog.getTitle(), [
  FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
  FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
], true)

if (files !== null && Collections.isNotEmpty(files)) {
  var collection = new FileCollection(files)

  dialog.vgroup(function(main) {
    main.alignChildren = "right"
    main.hgroup(function(topGroup) {
      topGroup.alignChildren = "fill"
      topGroup.vgroup(function(group) {
        if (collection.hasPDF) {
          pdfPanel = new OpenPDFPanel(group, SIZE_INPUT)
        }
        pagesPanel = new OpenPagesPanel(group, SIZE_INPUT).also(function(panel) {
          panel.rangeGroup.endEdit.text = collection.length
          if (!collection.isSinglePDF) {
            panel.rangeGroup.maxRange = collection.length
          }
          panel.rangeGroup.startEdit.activate()
        })
      })
      documentPanel = new OpenDocumentPanel(topGroup)
    })
    nupGroup = new NUpOptionsGroup(main, false, true, false, false)
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    var start = pagesPanel.rangeGroup.getStart()
    var pages = pagesPanel.rangeGroup.getLength()
    var artboards = pages
    var width = pagesPanel.getWidth()
    var height = pagesPanel.getHeight()
    var bleed = pagesPanel.getBleed()
    var rotatedWidth = !nupGroup.isRotate() ? width : height
    var rotatedHeight = !nupGroup.isRotate() ? height : width

    var document = documentPanel.open(getString(R.string.impose_n_up, 1),
      artboards,
      rotatedWidth,
      rotatedHeight,
      bleed)
    var pager = new OneUpPager(document, start)
    var progress = new ProgressDialog(artboards, R.string.imposing)

    pager.forEachArtboard(function(artboard, index) {
      progress.increment()
      var item = document.placedItems.add()
      item.file = collection.get(index)
      var x = artboard.artboardRect.getLeft()
      var y = artboard.artboardRect.getTop()
      item.width = width + bleed * 2
      item.height = height + bleed * 2
      if (nupGroup.isRotate()) {
        item.rotate(90)
      }
      item.position = [x - bleed, y + bleed]
    })
    selection = []
  })
  dialog.show()
}
