//@target illustrator;
//@include '../.lib/core.js';

var SIZE_INPUT = [100, 21];

var dialog = new Dialog(getString(R.string.impose_D_up, 2), 'imposing-layout/#n-up');
var pdfPanel;
var pagesPanel;
var documentPanel;
var nupGroup;

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
    nupGroup =
        new NUpOptionsGroup(main, false).apply(function(it) {
          it.rotateCheck.addClickListener(updateDocumentDimensionText);
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
        var pageBleed = pagesPanel.getBleed();
        var pageWidth = pagesPanel.getWidth() + pageBleed * 2;
        var pageHeight = pagesPanel.getHeight() + pageBleed * 2;
        var rotatedPageWidth = nupGroup.isRotate() ? pageHeight : pageWidth;
        var rotatedPageHeight = nupGroup.isRotate() ? pageWidth : pageHeight;

        var pageDivisor = !nupGroup.isDuplex() ? 2 : 4;
        if (pageRange.getLength() % pageDivisor !== 0) {
          return Windows.alert(
              getString(R.string.error_impose_openpages, pageDivisor),
              dialog.text,
              true,
          );
        } else if (parseInt(documentPanel.getWidth()) < parseInt(rotatedPageWidth * 2) ||
            parseInt(documentPanel.getHeight()) < parseInt(rotatedPageHeight)
        ) {
          return Windows.alert(R.string.error_impose_opendocuments, dialog.text, true);
        }
        var document =
            documentPanel.create(
                '%s %s'.format(
                    Pager.TWO_UP.text,
                    getString(
                        R.string.page_D_D,
                        pagesPanel.rangingGroup.getStart(),
                        pagesPanel.rangingGroup.getEnd(),
                    ),
                ),
                artboardLength,
            );
        var pager =
            Pager.TWO_UP.get(document, pageRange.start, nupGroup.isDuplex(), nupGroup.isStack());
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
              var x1 =
                  artboardRect.getLeft() + (artboardRect.getWidth() - rotatedPageWidth * 2) / 2;
              var x2 = x1 + rotatedPageWidth;
              var y = artboardRect.getTop() - (artboardRect.getHeight() - rotatedPageHeight) / 2;
              Collections.forEach(
                  [item1, item2],
                  function(it) {
                    it.width = pageWidth;
                    it.height = pageHeight;
                    if (nupGroup.isRotate()) {
                      it.rotate(
                          nupGroup.isDuplex() &&
                          Collections.indexOf(document.artboards, artboard).isOdd()
                              ? 270
                              : 90,
                      );
                    }
                  },
              );
              item1.position = [x1, y];
              item2.position = [x2, y];
              if (pageBleed > 0) {
                Items.addBleedGuide(document, item1, pageBleed);
                Items.addBleedGuide(document, item2, pageBleed);
              }
            },
        );
        selection = [];
        return false;
      },
  );
  dialog.show();
}

function updateDocumentDimensionText(updateWidth, updateHeight) {
  updateWidth = updateWidth === undefined ? true : updateWidth;
  updateHeight = updateHeight === undefined ? true : updateHeight;

  var pageBleed = pagesPanel.getBleed();
  var pageWidth = pagesPanel.getWidth() + pageBleed * 2;
  var pageHeight = pagesPanel.getHeight() + pageBleed * 2;
  if (updateWidth) {
    var rotatedPageWidth = nupGroup.isRotate() ? pageHeight : pageWidth;
    documentPanel.setWidthText(formatUnits(rotatedPageWidth * 2, UnitType.MM, 0));
  }
  if (updateHeight) {
    var rotatedPageHeight = nupGroup.isRotate() ? pageWidth : pageHeight;
    documentPanel.setHeightText(formatUnits(rotatedPageHeight, UnitType.MM, 0));
  }
}
