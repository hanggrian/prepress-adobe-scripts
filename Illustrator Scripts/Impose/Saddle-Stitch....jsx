#target Illustrator
#include "../.lib/core.js"

var SIZE_INPUT = [100, 21]

var dialog = new Dialog(R.string.impose_saddle_stitch, "imposing-layout/#saddle-stitch")
var pdfPanel, pagesPanel, documentPanel
var rtlCheck

var pickedFiles = FilePicker.openFile(dialog.text, FileExtension.values(), true)

if (pickedFiles !== null && Collections.isNotEmpty(pickedFiles)) {
  var files = new FileCollection(pickedFiles)

  dialog.vgroup(function(main) {
    main.alignChildren = "right"
    main.hgroup(function(topGroup) {
      topGroup.alignChildren = "fill"
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
    main.hgroup(function(group) {
      rtlCheck = group.checkBox(undefined, R.string.right_to_left).also(function(it) {
        it.helpTip = R.string.tip_impose_rtl
      })
    })
    updateDocumentDimensionText()
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    var pageStart = pagesPanel.rangeGroup.getStart()
    var pageEnd = pagesPanel.rangeGroup.getEnd()
    var pageLength = pagesPanel.rangeGroup.getLength()
    var artboardLength = pageLength / 2
    var originalPageWidth = pagesPanel.getWidth()
    var originalPageHeight = pagesPanel.getHeight()
    var pageBleed = pagesPanel.getBleed()
    var pageWidth = originalPageWidth + pageBleed * 2
    var pageHeight = originalPageHeight + pageBleed * 2

    if (pageLength % 4 !== 0) {
      Windows.alert(getString(R.string.error_openpages, 4), dialog.text, true)
      return true
    } else if (documentPanel.getWidth() < ((pageWidth - pageBleed) * 2) || documentPanel.getHeight() < (pageHeight)) {
      Windows.alert(R.string.error_opendocuments, dialog.text, true)
      return true
    }
    var document = documentPanel.create(dialog.text, artboardLength)
    var pager = Pager.SADDLE_STITCH.get(document, pageStart, pageEnd, rtlCheck.value)
    var progress = new ProgressPalette(artboardLength, R.string.imposing)

    pager.forEachArtboard(function(artboard, leftIndex, rightIndex) {
      progress.increment()
      var artboardRect = artboard.artboardRect
      var item1 = document.placedItems.add()
      var item2 = document.placedItems.add()
      item1.file = files.get(leftIndex)
      item2.file = files.get(rightIndex)
      var x1, x2
      if (pageBleed === 0) {
        x1 = artboardRect.getLeft() + (artboardRect.getWidth() - pageWidth * 2) / 2
        x2 = x1 + pageWidth
      } else {
        x1 = artboardRect.getLeft() + (artboardRect.getWidth() - (originalPageWidth + pageBleed) * 2) / 2
        x2 = x1 + originalPageWidth
      }
      var y = artboardRect.getTop() - (artboardRect.getHeight() - pageHeight) / 2
      Collections.forEach([item1, item2], function(it) {
        it.width = pageWidth
        it.height = pageHeight
      })
      item1.position = [x1, y]
      item2.position = [x2, y]
      if (pageBleed > 0) {
        clipItem(document, item1, y, x1, // remove right bleed
          originalPageWidth + pageBleed, pageHeight)
        clipItem(document, item2, y, x2 + pageBleed, // remove left bleed
          originalPageWidth + pageBleed, pageHeight)
        // then create center guide
        var guide = document.pathItems.rectangle(
          item1.position.getTop() - pageBleed, item1.position.getLeft() + pageBleed,
          originalPageWidth * 2, originalPageHeight)
        guide.filled = false
        guide.guides = true
      }
    })
    selection = []
  })
  dialog.show()
}

function clipItem(document, item, y, x, width, height) {
  var group = document.groupItems.add()
  item.moveToBeginning(group)
  var clip = document.pathItems.rectangle(y, x, width, height)
  clip.clipping = true
  clip.moveToBeginning(group)
  group.clipped = true
}

function updateDocumentDimensionText(updateWidth, updateHeight) {
  updateWidth = updateWidth === undefined ? true : updateWidth
  updateHeight = updateHeight === undefined ? true : updateHeight

  var pageBleed = pagesPanel.getBleed()
  var pageWidth = pagesPanel.getWidth() + pageBleed // only 1 side of bleed is applied in saddle-stitch
  var pageHeight = pagesPanel.getHeight() + pageBleed * 2
  if (updateWidth) {
    documentPanel.setWidthText(formatUnits(pageWidth * 2, "mm", 0))
  }
  if (updateHeight) {
    documentPanel.setHeightText(formatUnits(pageHeight, "mm", 0))
  }
}
