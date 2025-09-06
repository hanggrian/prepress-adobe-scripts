//@target illustrator;
//@include '../.lib/core.js';

var SIZE_INPUT = [100, 21];
var SIZE_DIVISION_EDIT = [60, 21];
var SIZE_DIVISION_BUTTON = [30, 30];
var SIZE_DIVISION_LIST = [200, 150];

var dialog = new Dialog(R.string.impose_section_sewn, 'imposing-layout/#section-sewn');
var pdfPanel;
var pagesPanel;
var documentPanel;
var rtlCheck;

var nextDialog = new Dialog(R.string.sections);
var remainingSaddleText;
var sectionList;
var sectionAddEdit;
var sectionAddButton;
var sectionRemoveButton;
var sections = [];

var pickedFiles = FilePicker.openFile(dialog.text, FileExtension.values(), true);

if (pickedFiles !== null && Collections.isNotEmpty(pickedFiles)) {
  var files = new FileCollection(pickedFiles);

  dialog.vgroup(function(main) {
    main.alignChildren = 'right';
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
        var originalPageWidth = pagesPanel.getWidth();
        var originalPageHeight = pagesPanel.getHeight();
        var pageBleed = pagesPanel.getBleed();
        var pageWidth = originalPageWidth + pageBleed * 2;
        var pageHeight = originalPageHeight + pageBleed * 2;

        if (pageRange.getLength() % 4 !== 0) {
          return Windows.alert(getString(R.string.error_impose_openpages, 4), dialog.text, true);
        } else if (parseInt(documentPanel.getWidth()) <
            parseInt((originalPageWidth + pageBleed) * 2) ||
            parseInt(documentPanel.getHeight()) < parseInt(pageHeight)) {
          return Windows.alert(R.string.error_impose_opendocuments, dialog.text, true);
        }

        var requiredSheetLength = pageRange.getLength() / 4;
        nextDialog.hgroup(function(main) {
          main.alignChildren = 'top';
          main.vgroup(function(rootPane) {
            rootPane.alignChildren = 'right';
            rootPane.hgroup(function(group) {
              group.staticText(undefined, R.string.total_sheets).apply(HEADING);
              group.staticText(undefined, requiredSheetLength);
            });
            rootPane.hgroup(function(group) {
              group.staticText(undefined, R.string.remaining_sheets).apply(HEADING);
              remainingSaddleText =
                  group.staticText(undefined, requiredSheetLength).apply(JUSTIFY_RIGHT);
            });
            rootPane.hgroup();
            rootPane.hgroup(function(group) {
              group.helpTips = R.string.tip_impose_sectionsewn_add;
              group.staticText(undefined, R.string.add).apply(HEADING);
              sectionAddEdit =
                  group
                      .editText(SIZE_DIVISION_EDIT)
                      .apply(function(it) {
                        it.validateDigits();
                        it.activate();
                      });
            });
            rootPane.hgroup(function(group) {
              sectionAddButton =
                  group
                      .iconButton(SIZE_DIVISION_BUTTON, 'btn_add', STYLE_TOOLBUTTON)
                      .apply(function(it) {
                        it.addClickListener(function() {
                          var sheetLength = parseInt(sectionAddEdit.text) || 0;
                          if (sheetLength <= 0) {
                            return;
                          }
                          var currentSheetLength = getCurrentSheetLength() + sheetLength;
                          if (currentSheetLength > requiredSheetLength) {
                            return Windows.alert(
                                R.string.error_impose_sectionsewn_exceed,
                                dialog.text,
                                true,
                            );
                          }
                          sections.push(sheetLength);
                          populateSectionList(pageRange);
                          remainingSaddleText.text = requiredSheetLength - currentSheetLength;
                        });
                      });
              sectionRemoveButton =
                  group
                      .iconButton(SIZE_DIVISION_BUTTON, 'btn_remove', STYLE_TOOLBUTTON)
                      .apply(function(it) {
                        it.addClickListener(function() {
                          if (sectionList.selection === undefined) {
                            return;
                          }
                          // removing element in array by index is only safe to do backwards
                          // indices of list selection is not guaranteed in order, therefore sort first
                          var listItems = sectionList.selection;
                          listItems.sort(function(a, b) {
                            return b - a;
                          });
                          Collections.forEach(
                              listItems,
                              function(listItem) {
                                sections.splice(listItem.index, 1);
                              },
                          );
                          populateSectionList(pageRange);
                          remainingSaddleText.text = requiredSheetLength - getCurrentSheetLength();
                        });
                      });
            });
          });
          main.sgroup();
          sectionList =
              main
                  .listBox(SIZE_DIVISION_LIST, [], {multiselect: true})
                  .apply(function(it) {
                    it.helpTip = R.string.tip_impose_sectionsewn_remove;
                  });
        });
        nextDialog.setCancelButton();
        nextDialog.setDefaultButton(
            undefined,
            function() {
              if (remainingSaddleText.text !== '0') {
                return Windows.alert(
                    R.string.error_impose_sectionsewn_remaining,
                    nextDialog.text,
                    true,
                );
              }
              var pageIndex = pageRange.start;
              Collections.forEach(
                  sections,
                  function(sheetLength, index) {
                    var sectionPageLength = sheetLength * 4;
                    process(
                        index + 1,
                        pageIndex,
                        pageIndex + sectionPageLength - 1,
                        sheetLength * 2,
                        originalPageWidth,
                        originalPageHeight,
                        pageBleed,
                        pageWidth,
                        pageHeight,
                    );
                    pageIndex += sectionPageLength;
                  },
              );
              return false;
            },
        );
        nextDialog.show();
        return false;
      },
  );
  dialog.show();
}

function getCurrentSheetLength() {
  var result = 0;
  Collections.forEach(
      sections,
      function(sheetLength) {
        result += sheetLength;
      },
  );
  return result;
}

function populateSectionList(pageRange) {
  var currentPage = pageRange.startExclusive;
  sectionList.removeAll();
  Collections.forEach(
      sections,
      function(sheetLength, index) {
        var sectionPageEnd = currentPage + sheetLength * 4;
        sectionList.add(
            'item', '%d. %s (%s)'.format(
                index + 1,
                getPlural(R.plurals.D_sheet, sheetLength, sheetLength),
                getString(R.string.page_D_D, currentPage, sectionPageEnd - 1),
            ),
        );
        currentPage = sectionPageEnd;
      },
  );
}

function process(
    sectionIndex,
    pageStart,
    pageEnd,
    artboardLength,
    originalPageWidth,
    originalPageHeight,
    pageBleed,
    pageWidth,
    pageHeight
) {
  var document =
      documentPanel.create(
          '%s %d %s'.format(
              R.string.section_sewn,
              sectionIndex,
              getString(R.string.page_D_D, pageStart + 1, pageEnd + 1),
          ),
          artboardLength,
      );
  var pager = Pager.SADDLE_STITCH.get(document, pageStart, pageEnd, rtlCheck.value);
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
        var x1, x2;
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
          clipItem(document, item2, y, x2 + pageBleed, originalPageWidth + pageBleed, pageHeight);
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
  // only 1 side of bleed is applied in saddle-stitch
  var pageWidth = pagesPanel.getWidth() + pageBleed;
  var pageHeight = pagesPanel.getHeight() + pageBleed * 2;
  if (updateWidth) {
    documentPanel.setWidthText(formatUnits(pageWidth * 2, UnitType.MM, 0));
  }
  if (updateHeight) {
    documentPanel.setHeightText(formatUnits(pageHeight, UnitType.MM, 0));
  }
}
