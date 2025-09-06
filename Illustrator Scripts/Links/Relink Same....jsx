//@target illustrator;
//@include '../.lib/commons.js';

var SIZE_INPUT = [140, 21];

checkAnySelection();

var items =
    Collections.filterItem(
        selection,
        function(it) {
          return Items.isPlacedPdf(it);
        },
    );
check(
    Collections.isNotEmpty(items),
    getString(R.string.error_notypes_document, getString(R.string.links).toLowerCase()),
);

var dialog = new Dialog(R.string.relink_same, 'relinking-files/#relink-same');
var pdfPanel;
var pageEdit;
var keepSizeCheck;
var prefs = preferences2.resolve('links/relink_same');

var file = FilePicker.openFile(dialog.text, FileExtension.values());

if (file !== null) {
  dialog.vgroup(function(main) {
    if (file.isPdf()) {
      pdfPanel =
          new OpenPDFPanel(main, SIZE_INPUT).apply(function(panel) {
            panel.hgroup(function(group) {
              group.helpTips = R.string.tip_relink_pages;
              group.staticText(undefined, getString(R.string.pages)).apply(HEADING);
              pageEdit =
                  group
                      .editText(SIZE_INPUT, '1')
                      .apply(function(it) {
                        it.validateDigits();
                        it.activate();
                      });
            });
          });
    }
    main.hgroup(function(group) {
      group.alignment = 'right';
      keepSizeCheck =
          new KeepSizeCheck(group).apply(function(it) {
            it.value = prefs.getBoolean('keep_size');
          });
    });
  });
  dialog.setCancelButton();
  dialog.setDefaultButton(
      undefined,
      function() {
        if (file.isPdf()) {
          var page = parseInt(pageEdit.text) - 1;
          println('PDF page = ' + page + '.');
          preferences.setPDFPage(page);
        }

        var progress = new ProgressPalette(items.length);
        Collections.forEach(
            items,
            function(item, i) {
              progress.increment(R.string.progress_relink, i + 1);
              print(i + '. ');
              relink(item, file);
              println('Done.');
            },
        );
        selection = items;

        prefs.setBoolean('keep_size', keepSizeCheck.value);
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
    print('Appling PDF fix, ');
    item.file = getImage('fix_relinkpdf');
  }
  item.file = file;
  if (keepSizeCheck.value) {
    print('Keep size, ');
    item.width = width;
    item.height = height;
    item.position = position;
  }
}
