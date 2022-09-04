#target Illustrator
#include "../.lib/core.js"

var SIZE_INPUT = [100, 21]

var dialog = new Dialog(getString(R.string.impose_n_up, 4), "imposing-layout/#n-up")
var pdfPanel, pagesPanel, documentPanel
var nupGroup

var files = FilePicker.openFile(dialog.getTitle(), FileType.values(), true)

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
    var artboards = pages / 4
    var width = pagesPanel.getWidth()
    var height = pagesPanel.getHeight()
    var bleed = pagesPanel.getBleed()
    var rotatedWidth = nupGroup.isFolding() || nupGroup.isRotate() ? height : width
    var rotatedHeight = nupGroup.isFolding() || nupGroup.isRotate() ? width : height

    var pagesDivisor = !nupGroup.isDuplex() ? 4 : 8
    if (pages % pagesDivisor !== 0) {
      Windows.alert(getString(R.string.error_impose, pagesDivisor), dialog.getTitle(), true)
      return true
    }
    var document = documentPanel.open(dialog.getTitle(),
      artboards,
      (rotatedWidth + bleed * 2) * 2,
      (rotatedHeight + bleed * 2) * 2,
      0)
    var pager
    if (nupGroup.isFolding()) {
      pager = new FourUpFoldingPager(document, start)
    } else {
      pager = !nupGroup.isStack()
        ? (!nupGroup.isDuplex()
          ? new FourUpSimplexPager(document, start)
          : new FourUpDuplexPager(document, start))
        : (!nupGroup.isDuplex()
          ? new FourUpSimplexStackPager(document, start)
          : new FourUpDuplexStackPager(document, start))
    }
    var progress = new ProgressDialog(artboards, R.string.imposing)

    pager.forEachArtboard(function(artboard, top1, top2, bottom1, bottom2) {
      progress.increment()
      var topItem1 = document.placedItems.add()
      var topItem2 = document.placedItems.add()
      var bottomItem1 = document.placedItems.add()
      var bottomItem2 = document.placedItems.add()
      topItem1.file = collection.get(top1)
      topItem2.file = collection.get(top2)
      bottomItem1.file = collection.get(bottom1)
      bottomItem2.file = collection.get(bottom2)
      var x1 = artboard.artboardRect.getLeft()
      var x2 = x1 + rotatedWidth + bleed * 2
      var y1 = artboard.artboardRect.getTop()
      var y2 = y1 - rotatedHeight - bleed * 2
      Collections.forEach([topItem1, topItem2, bottomItem1, bottomItem2],
        function(it) {
          it.width = width + bleed * 2
          it.height = height + bleed * 2
          if (!nupGroup.isFolding() && nupGroup.isRotate()) {
            it.rotate(nupGroup.isDuplex() && Collections.indexOf(document.artboards, artboard).isOdd() ? 270 : 90)
          }
        })
      if (nupGroup.isFolding()) {
        topItem1.rotate(270)
        topItem2.rotate(90)
        bottomItem1.rotate(270)
        bottomItem2.rotate(90)
      }
      topItem1.position = [x1, y1]
      topItem2.position = [x2, y1]
      bottomItem1.position = [x1, y2]
      bottomItem2.position = [x2, y2]
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
      }
    })
    selection = []
  })
  dialog.show()
}
