//@target illustrator
//@include '../.lib/core.js'

var SIZE_INPUT = [100, 21]

var dialog = new Dialog(getString(R.string.impose_D_up, 8), 'imposing-layout/#n-up')
var pdfPanel, pagesPanel, documentPanel
var nupGroup

var pickedFiles = FilePicker.openFile(dialog.text, FileExtension.values(), true)

if (pickedFiles !== null && Collections.isNotEmpty(pickedFiles)) {
  var files = new FileCollection(pickedFiles)

  dialog.vgroup(function(main) {
    main.alignChildren = 'right'
    main.hgroup(function(topGroup) {
      topGroup.alignChildren = 'fill'
      topGroup.vgroup(function(group) {
        if (files.hasPDF) {
          pdfPanel = new OpenPDFPanel(group, SIZE_INPUT)
        }
        pagesPanel = new OpenPagesPanel(group, SIZE_INPUT).also(function(it) {
          it.rangeGroup.startEdit.activate()
          it.rangeGroup.endEdit.text = files.length
          if (!files.isSinglePDF) {
            it.rangeGroup.maxRange = files.length
          }
          it.widthEdit.addChangeListener(function() { updateDocumentDimensionText(true, false) })
          it.heightEdit.addChangeListener(function() { updateDocumentDimensionText(false, true) })
          it.bleedEdit.addChangeListener(updateDocumentDimensionText)
        })
      })
      documentPanel = new OpenDocumentPanel(topGroup)
    })
    nupGroup = new NUpOptionsGroup(main).also(function(it) {
      it.foldingCheck.addClickListener(updateDocumentDimensionText)
      it.rotateCheck.addClickListener(updateDocumentDimensionText)
    })
    updateDocumentDimensionText()
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    if (!pagesPanel.rangeGroup.isValid()) {
      return Windows.alert(R.string.error_range, dialog.text, true)
    }
    var pageStart = pagesPanel.rangeGroup.getStart()
    var pageLength = pagesPanel.rangeGroup.getLength()
    var artboardLength = pageLength / 8
    var pageBleed = pagesPanel.getBleed()
    var pageWidth = pagesPanel.getWidth() + pageBleed * 2
    var pageHeight = pagesPanel.getHeight() + pageBleed * 2
    var rotatedPageWidth = !nupGroup.isFolding() && nupGroup.isRotate() ? pageHeight : pageWidth
    var rotatedPageHeight = !nupGroup.isFolding() && nupGroup.isRotate() ? pageWidth : pageHeight

    var pageDivisor = !nupGroup.isDuplex() ? 8 : 16
    if (pageLength % pageDivisor !== 0) {
      return Windows.alert(getString(R.string.error_openpages, pageDivisor), dialog.text, true)
    } else if (documentPanel.getWidth() < (rotatedPageWidth * 4) ||
      documentPanel.getHeight() < (rotatedPageHeight * 2)) {
      return Windows.alert(R.string.error_opendocuments, dialog.text, true)
    }
    var document = documentPanel.create(dialog.text, artboardLength)
    var pager = Pager.EIGHT_UP.get(document, pageStart, nupGroup.isFolding(), nupGroup.isDuplex(),
      nupGroup.isStack())
    var progress = new ProgressPalette(artboardLength, R.string.imposing)

    Collections.forEach(document.artboards, function(artboard) {
      progress.increment()
      artboard.name = pager.next()

      var artboardRect = artboard.artboardRect
      var topItem1 = document.placedItems.add()
      var topItem2 = document.placedItems.add()
      var topItem3 = document.placedItems.add()
      var topItem4 = document.placedItems.add()
      var bottomItem1 = document.placedItems.add()
      var bottomItem2 = document.placedItems.add()
      var bottomItem3 = document.placedItems.add()
      var bottomItem4 = document.placedItems.add()
      topItem1.file = files.get(pager.top1)
      topItem2.file = files.get(pager.top2)
      topItem3.file = files.get(pager.top3)
      topItem4.file = files.get(pager.top4)
      bottomItem1.file = files.get(pager.bottom1)
      bottomItem2.file = files.get(pager.bottom2)
      bottomItem3.file = files.get(pager.bottom3)
      bottomItem4.file = files.get(pager.bottom4)
      var x1 = artboardRect.getLeft() + (artboardRect.getWidth() - rotatedPageWidth * 4) / 2
      var x2 = x1 + rotatedPageWidth
      var x3 = x2 + rotatedPageWidth
      var x4 = x3 + rotatedPageWidth
      var y1 = artboardRect.getTop() - (artboardRect.getHeight() - rotatedPageHeight * 2) / 2
      var y2 = y1 - rotatedPageHeight
      Collections.forEach([
          topItem1,
          topItem2,
          topItem3,
          topItem4,
          bottomItem1,
          bottomItem2,
          bottomItem3,
          bottomItem4],
        function(it) {
          it.width = pageWidth
          it.height = pageHeight
          if (!nupGroup.isFolding() && nupGroup.isRotate()) {
            it.rotate(
              nupGroup.isDuplex() && Collections.indexOf(document.artboards, artboard).isOdd()
                ? 270
                : 90)
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
      if (pageBleed > 0) {
        Items.addBleedGuide(document, topItem1, pageBleed)
        Items.addBleedGuide(document, topItem2, pageBleed)
        Items.addBleedGuide(document, topItem3, pageBleed)
        Items.addBleedGuide(document, topItem4, pageBleed)
        Items.addBleedGuide(document, bottomItem1, pageBleed)
        Items.addBleedGuide(document, bottomItem2, pageBleed)
        Items.addBleedGuide(document, bottomItem3, pageBleed)
        Items.addBleedGuide(document, bottomItem4, pageBleed)
      }
    })
    selection = []
  })
  dialog.show()
}

function updateDocumentDimensionText(updateWidth, updateHeight) {
  updateWidth = updateWidth === undefined ? true : updateWidth
  updateHeight = updateHeight === undefined ? true : updateHeight

  var pageBleed = pagesPanel.getBleed()
  var pageWidth = pagesPanel.getWidth() + pageBleed * 2
  var pageHeight = pagesPanel.getHeight() + pageBleed * 2
  if (updateWidth) {
    var rotatedPageWidth = !nupGroup.isFolding() && nupGroup.isRotate() ? pageHeight : pageWidth
    documentPanel.setWidthText(formatUnits(rotatedPageWidth * 4, UnitType.MM, 0))
  }
  if (updateHeight) {
    var rotatedPageHeight = !nupGroup.isFolding() && nupGroup.isRotate() ? pageWidth : pageHeight
    documentPanel.setHeightText(formatUnits(rotatedPageHeight * 2, UnitType.MM, 0))
  }
}
