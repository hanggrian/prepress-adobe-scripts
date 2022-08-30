#target Illustrator
#include "../.lib/core.js"

var SIZE_INPUT = [100, 21]

var dialog = new Dialog(getString(R.string.impose_n_up, 8), "imposing-layout/#n-up")
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
    nupGroup = new NUpOptionsGroup(main)
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    var start = pagesPanel.rangeGroup.getStart()
    var pages = pagesPanel.rangeGroup.getLength()
    var artboards = pages / 8
    var width = pagesPanel.getWidth()
    var height = pagesPanel.getHeight()
    var bleed = pagesPanel.getBleed()
    var rotatedWidth = !nupGroup.isFolding() && nupGroup.isRotate() ? height : width
    var rotatedHeight = !nupGroup.isFolding() && nupGroup.isRotate() ? width : height

    var pagesDivisor = nupGroup.isDuplex() ? 8 : 16
    if (pages % pagesDivisor !== 0) {
      errorWithAlert("Pages must be divisible by " + pagesDivisor)
    }
    var document = documentPanel.open(getString(R.string.impose_n_up, 8),
      artboards,
      (rotatedWidth + bleed * 2) * 4,
      (rotatedHeight + bleed * 2) * 2,
      0)
    var pager
    if (nupGroup.isFolding()) {
      pager = new EightUpFoldingPager(document, start)
    } else {
      pager = !nupGroup.isStack()
        ? (!nupGroup.isDuplex()
          ? new EightUpSimplexPager(document, start)
          : new EightUpDuplexPager(document, start))
        : (!nupGroup.isDuplex()
          ? new EightUpSimplexStackPager(document, start)
          : new EightUpDuplexStackPager(document, start))
    }
    var progress = new ProgressDialog(artboards, R.string.imposing)

    pager.forEachArtboard(function(artboard,
      top1, top2, top3, top4, bottom1, bottom2, bottom3, bottom4) {
      progress.increment()
      var topItem1 = document.placedItems.add()
      var topItem2 = document.placedItems.add()
      var topItem3 = document.placedItems.add()
      var topItem4 = document.placedItems.add()
      var bottomItem1 = document.placedItems.add()
      var bottomItem2 = document.placedItems.add()
      var bottomItem3 = document.placedItems.add()
      var bottomItem4 = document.placedItems.add()
      topItem1.file = collection.get(top1)
      topItem2.file = collection.get(top2)
      topItem3.file = collection.get(top3)
      topItem4.file = collection.get(top4)
      bottomItem1.file = collection.get(bottom1)
      bottomItem2.file = collection.get(bottom2)
      bottomItem3.file = collection.get(bottom3)
      bottomItem4.file = collection.get(bottom4)
      var x1 = artboard.artboardRect.getLeft()
      var x2 = x1 + rotatedWidth + bleed * 2
      var x3 = x2 + rotatedWidth + bleed * 2
      var x4 = x3 + rotatedWidth + bleed * 2
      var y1 = artboard.artboardRect.getTop()
      var y2 = y1 - rotatedHeight - bleed * 2
      Collections.forEach([topItem1, topItem2, topItem3, topItem4, bottomItem1, bottomItem2, bottomItem3, bottomItem4],
        function(it) {
          it.width = width + bleed * 2
          it.height = height + bleed * 2
          if (!nupGroup.isFolding() && nupGroup.isRotate()) {
            it.rotate(nupGroup.isDuplex() && Collections.indexOf(document.artboards, artboard).isOdd() ? 270 : 90)
          }
        })
      if (nupGroup.isFolding()) {
        topItem1.rotate(180)
        topItem2.rotate(180)
        topItem3.rotate(180)
        topItem4.rotate(180)
      }
      topItem1.position = [x1, y1]
      topItem2.position = [x2, y1]
      topItem3.position = [x3, y1]
      topItem4.position = [x4, y1]
      bottomItem1.position = [x1, y2]
      bottomItem2.position = [x2, y2]
      bottomItem3.position = [x3, y2]
      bottomItem4.position = [x4, y2]
      if (bleed > 0) {
        var topGuide1 = document.pathItems.rectangle(
          y1 - bleed,
          x1 + bleed,
          rotatedWidth,
          rotatedHeight)
        topGuide1.filled = false
        topGuide1.guides = true
        var topGuide2 = document.pathItems.rectangle(
          y1 - bleed,
          x2 + bleed,
          rotatedWidth,
          rotatedHeight)
        topGuide2.filled = false
        topGuide2.guides = true
        var topGuide3 = document.pathItems.rectangle(
          y1 - bleed,
          x3 + bleed,
          rotatedWidth,
          rotatedHeight)
        topGuide3.filled = false
        topGuide3.guides = true
        var topGuide4 = document.pathItems.rectangle(
          y1 - bleed,
          x4 + bleed,
          rotatedWidth,
          rotatedHeight)
        topGuide4.filled = false
        topGuide4.guides = true
        var bottomGuide1 = document.pathItems.rectangle(
          y2 - bleed,
          x1 + bleed,
          rotatedWidth,
          rotatedHeight)
        bottomGuide1.filled = false
        bottomGuide1.guides = true
        var bottomGuide2 = document.pathItems.rectangle(
          y2 - bleed,
          x2 + bleed,
          rotatedWidth,
          rotatedHeight)
        bottomGuide2.filled = false
        bottomGuide2.guides = true
        var bottomGuide3 = document.pathItems.rectangle(
          y2 - bleed,
          x3 + bleed,
          rotatedWidth,
          rotatedHeight)
        bottomGuide3.filled = false
        bottomGuide3.guides = true
        var bottomGuide4 = document.pathItems.rectangle(
          y2 - bleed,
          x4 + bleed,
          rotatedWidth,
          rotatedHeight)
        bottomGuide4.filled = false
        bottomGuide4.guides = true
      }
    })
    selection = []
  })
  dialog.show()
}
