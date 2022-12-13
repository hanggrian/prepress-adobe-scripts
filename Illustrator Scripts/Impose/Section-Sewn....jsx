//@target illustrator
//@include '../.lib/core.js'

var SIZE_INPUT = [100, 21]
var SIZE_DIVISION_EDIT = [60, 21]
var SIZE_DIVISION_BUTTON = [21, 21]
var SIZE_DIVISION_LIST = [60, 100]

var dialog = new Dialog(R.string.impose_section_sewn, 'imposing-layout/#section-sewn')
var pdfPanel, pagesPanel, documentPanel
var rtlCheck

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
    main.hgroup(function(group) {
      rtlCheck = group.checkBox(undefined, R.string.right_to_left).also(function(it) {
        it.helpTip = R.string.tip_impose_rtl
      })
    })
    updateDocumentDimensionText()
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    if (!pagesPanel.rangeGroup.isValid()) {
      return Windows.alert(R.string.error_range, dialog.text, true)
    }
    var pageLength = pagesPanel.rangeGroup.getLength()
    var originalPageWidth = pagesPanel.getWidth()
    var originalPageHeight = pagesPanel.getHeight()
    var pageBleed = pagesPanel.getBleed()
    var pageWidth = originalPageWidth + pageBleed * 2
    var pageHeight = originalPageHeight + pageBleed * 2

    if (pageLength % 4 !== 0) {
      return Windows.alert(getString(R.string.error_impose_openpages, 4), dialog.text, true)
    } else if (documentPanel.getWidth() < ((pageWidth - pageBleed) * 2) ||
      documentPanel.getHeight() < (pageHeight)) {
      return Windows.alert(R.string.error_impose_opendocuments, dialog.text, true)
    }

    var remainingSaddleText, sectionListBox, sectionAddEdit, sectionAddButton, sectionRemoveButton
    var remainingSaddleLength = pageLength / 4
    var nextDialog = new Dialog(R.string.sections)
    nextDialog.hgroup(function(main) {
      main.alignChildren = 'top'
      main.vgroup(function(topGroup) {
        topGroup.alignChildren = 'right'
        topGroup.hgroup(function(group) {
          group.leftStaticText(undefined, R.string.total_saddles)
          group.staticText(undefined, remainingSaddleLength)
        })
        topGroup.hgroup(function(group) {
          group.leftStaticText(undefined, R.string.remaining_saddles)
          remainingSaddleText = group.staticText(undefined, remainingSaddleLength)
        })
        topGroup.hgroup()
        topGroup.hgroup(function(group) {
          sectionAddEdit = group.editText(SIZE_DIVISION_EDIT).also(VALIDATE_DIGITS)
          sectionAddButton = group.iconButton(SIZE_DIVISION_BUTTON, 'ic_add', STYLE_TOOLBUTTON)
            .also(function(it) {
              it.helpTip = R.string.tip_impose_sectionsewn_add
              it.addClickListener(function() {
                var digits = parseInt(sectionAddEdit.text) || 0
                if (digits > 0) {
                  if (remainingSaddleLength - digits < 0) {
                    return Windows.alert(R.string.error_impose_sectionsewn_exceed, dialog.text,
                      true)
                  }
                  remainingSaddleLength -= digits
                  remainingSaddleText.text = remainingSaddleLength
                  sectionListBox.add('item', digits)
                }
              })
            })
          sectionRemoveButton = group.iconButton(SIZE_DIVISION_BUTTON, 'ic_remove',
            STYLE_TOOLBUTTON).also(function(it) {
            it.helpTip = R.string.tip_impose_sectionsewn_remove
            it.addClickListener(function() {
              if (sectionListBox.selection !== undefined) {
                Collections.forEach(sectionListBox.selection, function(selected) {
                  remainingSaddleLength += parseInt(selected.text)
                  remainingSaddleText.text = remainingSaddleLength
                  sectionListBox.remove(selected)
                })
              }
            })
          })
        })
      })
      sectionListBox = main.listBox(SIZE_DIVISION_LIST, [], { multiselect: true })
        .also(function(it) {
          it.helpTip = R.string.tip_impose_sectionsewn_remove
        })
    })
    nextDialog.setCancelButton()
    nextDialog.setDefaultButton(undefined, function() {
      if (remainingSaddleLength !== 0) {
        return Windows.alert(R.string.error_impose_sectionsewn_remaining, nextDialog.text, true)
      }
      var pageIndex = 0
      Collections.forEach(sectionListBox.children, function(sectionItem) {
        var section = parseInt(sectionItem.text)
        var pagesInSection = section * 4
        process(pageIndex, pageIndex + pagesInSection - 1, section * 2,
          originalPageWidth, originalPageHeight, pageBleed, pageWidth, pageHeight)
        pageIndex += pagesInSection
      })
    })
    nextDialog.show()
  })
  dialog.show()
}

function process(pageStart, pageEnd, artboardLength,
  originalPageWidth, originalPageHeight, pageBleed, pageWidth, pageHeight) {
  var document = documentPanel.create(
    '%s %d-%d'.format(R.string.section_sewn, pageStart + 1, pageEnd + 1),
    artboardLength)
  var pager = Pager.SADDLE_STITCH.get(document, pageStart, pageEnd, rtlCheck.value)
  var progress = new ProgressPalette(artboardLength, R.string.imposing)

  Collections.forEach(document.artboards, function(artboard) {
    progress.increment()
    artboard.name = pager.next()

    var artboardRect = artboard.artboardRect
    var item1 = document.placedItems.add()
    var item2 = document.placedItems.add()
    item1.file = files.get(pager.left)
    item2.file = files.get(pager.right)
    var x1, x2
    if (pageBleed === 0) {
      x1 = artboardRect.getLeft() + (artboardRect.getWidth() - pageWidth * 2) / 2
      x2 = x1 + pageWidth
    } else {
      x1 = artboardRect.getLeft() +
        (artboardRect.getWidth() - (originalPageWidth + pageBleed) * 2) / 2
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
    documentPanel.setWidthText(formatUnits(pageWidth * 2, UnitType.MM, 0))
  }
  if (updateHeight) {
    documentPanel.setHeightText(formatUnits(pageHeight, UnitType.MM, 0))
  }
}
