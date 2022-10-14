#target illustrator
#include '../.lib/core.js'

var SIZE_INPUT = [100, 21]

var dialog = new Dialog(getString(R.string.impose_D_up, 1), 'imposing-layout/#n-up')
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
    nupGroup = new NUpOptionsGroup(main, false, true, false, false).also(function(it) {
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
    var artboardLength = pageLength
    var pageBleed = pagesPanel.getBleed()
    var pageWidth = pagesPanel.getWidth() + pageBleed * 2
    var pageHeight = pagesPanel.getHeight() + pageBleed * 2
    var rotatedPageWidth = nupGroup.isRotate() ? pageHeight : pageWidth
    var rotatedPageHeight = nupGroup.isRotate() ? pageWidth : pageHeight

    if (documentPanel.getWidth() < (rotatedPageWidth) || documentPanel.getHeight() <
      (rotatedPageHeight)) {
      return Windows.alert(R.string.error_opendocuments, dialog.text, true)
    }
    var document = documentPanel.create(dialog.text, artboardLength)
    var pager = Pager.ONE_UP.get(document, pageStart)
    var progress = new ProgressPalette(artboardLength, R.string.imposing)

    Collections.forEach(document.artboards, function(artboard) {
      progress.increment()
      artboard.name = pager.next()

      var artboardRect = artboard.artboardRect
      var item = document.placedItems.add()
      item.file = files.get(pager.index)
      var x = artboardRect.getLeft() + (artboardRect.getWidth() - rotatedPageWidth) / 2
      var y = artboardRect.getTop() - (artboardRect.getHeight() - rotatedPageHeight) / 2
      item.width = pageWidth
      item.height = pageHeight
      if (nupGroup.isRotate()) {
        item.rotate(90)
      }
      item.position = [x, y]
      if (pageBleed > 0) {
        Items.addBleedGuide(document, item, pageBleed)
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
    var rotatedPageWidth = nupGroup.isRotate() ? pageHeight : pageWidth
    documentPanel.setWidthText(formatUnits(rotatedPageWidth, UnitType.MM, 0))
  }
  if (updateHeight) {
    var rotatedPageHeight = nupGroup.isRotate() ? pageWidth : pageHeight
    documentPanel.setHeightText(formatUnits(rotatedPageHeight, UnitType.MM, 0))
  }
}
