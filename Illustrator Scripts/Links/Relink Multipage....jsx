//@target illustrator;
//@include '../.lib/commons.js';

var SIZE_INPUT = [140, 21];

checkAnySelection();

check(
    Collections.anyItem(
        selection,
        function(it) {
          return Items.isPlacedPdf(it);
        },
    ),
    getString(R.string.error_notypes_document, getString(R.string.links).toLowerCase()),
);

var dialog = new Dialog(R.string.relink_multipage, 'relinking-files/#relink-multipage');
var pdfPanel;
var rangingGroup;
var orderingList;
var keepSizeCheck;
var recursiveCheck;
var collection;
var prefs = preferences2.resolve('links/relink_multipage');

var files = FilePicker.openFile(dialog.text, FileExtension.values(), true);

if (files !== null && Collections.isNotEmpty(files)) {
  collection = new FileCollection(files);

  dialog.vgroup(function(main) {
    if (collection.hasPDF) {
      pdfPanel = new OpenPDFPanel(main, SIZE_INPUT);
    }
    main.vpanel(
        R.string.pages,
        function(panel) {
          panel.alignChildren = 'right';
          panel.hgroup(function(group) {
            group.helpTips = R.string.tip_relink_pages;
            group.staticText(undefined, getString(R.string.pages)).apply(HEADING);
            rangingGroup =
                new RangingGroup(group, SIZE_INPUT).apply(function(it) {
                  it.startEdit.activate();
                  it.endEdit.text = collection.length;
                });
          });
        },
    );
    orderingList =
        new OrderingList(main, [Ordering.layerList(), Ordering.positionList()]).apply(
            function(it) {
              it.alignment = 'right';
              it.selection = prefs.getInt('order');
            });
    main.hgroup(function(group) {
      group.alignment = 'right';
      keepSizeCheck =
          new KeepSizeCheck(group).apply(function(it) {
            it.value = prefs.getBoolean('keep_size');
          });
      recursiveCheck =
          new RecursiveCheck(group).apply(function(it) {
            it.value = prefs.getBoolean('recursive');
          });
    });
  });
  dialog.setCancelButton();
  dialog.setDefaultButton(
      undefined,
      function() {
        if (!rangingGroup.isValid()) {
          return Windows.alert(R.string.error_range, dialog.text, true);
        }
        var range = rangingGroup.get();
        var current = range.start;

        var items =
            recursiveCheck.value
                ? Collections.filterItem(
                    selection,
                    function(it) {
                      return Items.isPlacedPdf(it);
                    },
                )
                : Collections.filter(
                    selection,
                    function(it) {
                      return Items.isGroup(it) || Items.isPlacedPdf(it);
                    },
                );
        items.sort(orderingList.getComparator());

        var progress = new ProgressPalette(items.length);
        Collections.forEach(
            items,
            function(item, i) {
              progress.increment(R.string.progress_relink, i + 1);
              print('Item %d page %d.'.format(i, current));
              var file = collection.get(current);
              var relinked = false;
              if (!recursiveCheck.value && Items.isGroup(item)) {
                Collections.forEachItem(
                    [item],
                    function(it) {
                      if (Items.isPlacedPdf(it)) {
                        relinked = relink(it, file);
                      }
                    },
                );
              } else {
                relinked = relink(item, file);
              }
              if (relinked && ++current > range.end) {
                current--;
              }
              println('Done.');
            },
        );
        selection = items;

        prefs.setInt('order', orderingList.selection.index);
        prefs.setBoolean('keep_size', keepSizeCheck.value);
        prefs.setBoolean('recursive', recursiveCheck.value);
        return false;
      },
  );
  dialog.show();
}

function relink(item, file) {
  var width = item.width;
  var height = item.height;
  var position = item.position;
  if (file.isPdf() && Items.isLinkExists(item) && item.file.isPdf()) {
    print('Applying PDF fix, ');
    item.file = getImage('fix_relinkpdf');
  }
  item.file = file;
  if (keepSizeCheck.value) {
    print('Keep size, ');
    item.width = width;
    item.height = height;
    item.position = position;
  }
  return true;
}
