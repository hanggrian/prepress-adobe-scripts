#target Illustrator
#include "../.lib/core.js"

var SIZE_INPUT = [100, 21]

var dialog = new Dialog(getString(R.string.impose_D_up, 2), "imposing-layout/#n-up")
var pdfPanel, pagesPanel, documentPanel
var nupGroup

var files = FilePicker.openFile(dialog.text, FileType.values(), true)

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
    nupGroup = new NUpOptionsGroup(main, false)
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    var start = pagesPanel.rangeGroup.getStart()
    var pages = pagesPanel.rangeGroup.getLength()
    var artboards = pages / 2
    var width = pagesPanel.getWidth()
    var height = pagesPanel.getHeight()
    var bleed = pagesPanel.getBleed()
    var rotatedWidth = !nupGroup.isRotate() ? width : height
    var rotatedHeight = !nupGroup.isRotate() ? height : width

    var pagesDivisor = !nupGroup.isDuplex() ? 2 : 4
    if (pages % pagesDivisor !== 0) {
      Windows.alert(getString(R.string.error_impose, pagesDivisor), dialog.text, true)
      return true
    }
    var document = documentPanel.open(dialog.text,
      artboards,
      (rotatedWidth + bleed * 2) * 2,
      (rotatedHeight + bleed * 2),
      0)
    var pager = !nupGroup.isStack()
      ? (!nupGroup.isDuplex()
        ? new TwoUpSimplexPager(document, start)
        : new TwoUpDuplexPager(document, start))
      : (!nupGroup.isDuplex()
        ? new TwoUpSimplexStackPager(document, start)
        : new TwoUpDuplexStackPager(document, start))
    var progress = new ProgressPalette(artboards, R.string.imposing)

    pager.forEachArtboard(function(artboard, left, right) {
      progress.increment()
      var item1 = document.placedItems.add()
      var item2 = document.placedItems.add()
      item1.file = collection.get(left)
      item2.file = collection.get(right)
      var x1 = artboard.artboardRect.getLeft()
      var x2 = x1 + rotatedWidth + bleed * 2
      var y = artboard.artboardRect.getTop()
      Collections.forEach([item1, item2],
        function(it) {
          it.width = width + bleed * 2
          it.height = height + bleed * 2
          if (nupGroup.isRotate()) {
            it.rotate(nupGroup.isDuplex() && Collections.indexOf(document.artboards, artboard).isOdd() ? 270 : 90)
          }
        })
      item1.position = [x1, y]
      item2.position = [x2, y]
      if (bleed > 0) {
        var guide1 = document.pathItems.rectangle(
          y - bleed,
          x1 + bleed,
          rotatedWidth,
          rotatedHeight)
        guide1.filled = false
        guide1.guides = true
        var guide2 = document.pathItems.rectangle(
          y - bleed,
          x2 + bleed,
          rotatedWidth,
          rotatedHeight)
        guide2.filled = false
        guide2.guides = true
      }
    })
    selection = []
  })
  dialog.show()
}
