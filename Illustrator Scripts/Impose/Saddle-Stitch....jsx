//@target illustrator;
//@include '../.lib/core.js';

var SIZE_INPUT = [100, 21];

var dialog = new Dialog(R.string.impose_saddle_stitch, 'imposing-layout/#saddle-stitch');
var pdfPanel;
var pagesPanel;
var documentPanel;
var rtlCheck;

var pickedFiles = FilePicker.openFile(dialog.text, FileExtension.values(), true);

if (pickedFiles !== null && Collections.isNotEmpty(pickedFiles)) {
  var files = new FileCollection(pickedFiles);

  dialog.vgroup(function(main) {
    main.hgroup(function(rootPane) {
      rootPane.alignChildren = 'fill';
      rootPane.vgroup(function(leftPane) {
        if (files.hasPDF) {
          pdfPanel = new OpenPDFPanel(leftPane, SIZE_INPUT);
        }
        pagesPanel =
            new OpenPagesPanel(leftPane, SIZE_INPUT).apply(function(it) {
              it.rangingGroup.startEdit.activate();
              it.rangingGroup.endEdit.text = files.length;
              if (!files.isSinglePDF) {
                it.rangingGroup.maxRange = files.length;
              }
              it.widthEdit.addChangeListener(function() {
                updateDocumentDimensionText(true, false);
              });
              it.heightEdit.addChangeListener(function() {
                updateDocumentDimensionText(false, true);
              });
              it.bleedEdit.addChangeListener(updateDocumentDimensionText);
            });
      });
      documentPanel = new OpenDocumentPanel(rootPane);
    });
    main.hgroup(function(group) {
      group.alignment = 'right';
      rtlCheck =
          group
              .checkBox(undefined, R.string.right_to_left)
              .apply(function(it) {
                it.helpTip = R.string.tip_impose_rtl;
              });
    });
    updateDocumentDimensionText();
  });
  dialog.setCancelButton();
  dialog.setDefaultButton(
      undefined,
      function() {
        if (!pagesPanel.rangingGroup.isValid()) {
          return Windows.alert(R.string.error_range, dialog.text, true);
        }
        var pageRange = pagesPanel.getRange();
        var artboardLength = pageRange.getLength() / 2;
        var originalPageWidth = pagesPanel.getWidth();
        var originalPageHeight = pagesPanel.getHeight();
        var pageBleed = pagesPanel.getBleed();
        var pageWidth = originalPageWidth + pageBleed * 2;
        var pageHeight = originalPageHeight + pageBleed * 2;

        if (pageRange.getLength() % 4 !== 0) {
          return Windows.alert(getString(R.string.error_impose_openpages, 4), dialog.text, true);
        } else if (parseInt(documentPanel.getWidth()) < parseInt((pageWidth - pageBleed) * 2) ||
            parseInt(documentPanel.getHeight()) < parseInt(pageHeight)
        ) {
          return Windows.alert(R.string.error_impose_opendocuments, dialog.text, true);
        }
        var document =
            documentPanel.create(
                '%s %s'.format(
                    Pager.SADDLE_STITCH.text,
                    getString(
                        R.string.page_D_D,
                        pagesPanel.rangingGroup.getStart(),
                        pagesPanel.rangingGroup.getEnd(),
                    ),
                ),
                artboardLength,
            );
        var pager =
            Pager.SADDLE_STITCH.get(document, pageRange.start, pageRange.end, rtlCheck.value);
        var progress = new ProgressPalette(artboardLength, R.string.imposing);

        Collections.forEach(
            document.artboards,
            function(artboard) {
              progress.increment();
              artboard.name = pager.next();

              var artboardRect = artboard.artboardRect;
              var item1 = document.placedItems.add();
              var item2 = document.placedItems.add();
              item1.file = files.get(pager.left);
              item2.file = files.get(pager.right);
              var x1;
              var x2;
              if (pageBleed === 0) {
                x1 = artboardRect.getLeft() + (artboardRect.getWidth() - pageWidth * 2) / 2;
                x2 = x1 + pageWidth;
              } else {
                x1 =
                    artboardRect.getLeft() +
                    (artboardRect.getWidth() - (originalPageWidth + pageBleed) * 2) / 2;
                x2 = x1 + originalPageWidth;
              }
              var y = artboardRect.getTop() - (artboardRect.getHeight() - pageHeight) / 2;
              Collections.forEach(
                  [item1, item2],
                  function(it) {
                    it.width = pageWidth;
                    it.height = pageHeight;
                  },
              );
              item1.position = [x1, y];
              item2.position = [x2, y];
              if (pageBleed > 0) {
                // remove right bleed
                clipItem(document, item1, y, x1, originalPageWidth + pageBleed, pageHeight);
                // remove left bleed
                clipItem(
                    document,
                    item2,
                    y,
                    x2 + pageBleed,
                    originalPageWidth + pageBleed,
                    pageHeight,
                );
                // then create center guide
                var guide =
                    document.pathItems.rectangle(
                        item1.position.getTop() - pageBleed,
                        item1.position.getLeft() + pageBleed,
                        originalPageWidth * 2,
                        originalPageHeight,
                    );
                guide.filled = false;
                guide.guides = true;
              }
            },
        );
        selection = [];
        return false;
      },
  );
  dialog.show();
}

function clipItem(document, item, y, x, width, height) {
  var group = document.groupItems.add();
  item.moveToBeginning(group);
  var clip = document.pathItems.rectangle(y, x, width, height);
  clip.clipping = true;
  clip.moveToBeginning(group);
  group.clipped = true;
}

function updateDocumentDimensionText(updateWidth, updateHeight) {
  updateWidth = updateWidth === undefined ? true : updateWidth;
  updateHeight = updateHeight === undefined ? true : updateHeight;

  var pageBleed = pagesPanel.getBleed();
  var pageWidth = pagesPanel.getWidth() + pageBleed; // only 1 side of bleed is applied in saddle-stitch
  var pageHeight = pagesPanel.getHeight() + pageBleed * 2;
  if (updateWidth) {
    documentPanel.setWidthText(formatUnits(pageWidth * 2, UnitType.MM, 0));
  }
  if (updateHeight) {
    documentPanel.setHeightText(formatUnits(pageHeight, UnitType.MM, 0));
  }
}
