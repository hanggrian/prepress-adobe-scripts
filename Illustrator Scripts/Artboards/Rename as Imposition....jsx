//@target illustrator;
//@include '../.lib/commons.js';

var SIZE_INPUT = [120, 21];

var dialog = new Dialog(R.string.rename_as_imposition);
var startEdit;
var impositionList;
var nupGroup;

dialog.vgroup(function(main) {
  main.alignChildren = 'right';
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_renameasimposition_start;
    group.staticText(undefined, R.string.start).apply(HEADING);
    startEdit =
        group
            .editText(SIZE_INPUT, '1')
            .apply(function(it) {
              it.validateDigits();
              it.activate();
            });
  });
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_renameasimposition_mode;
    group.staticText(undefined, R.string.mode).apply(HEADING);
    impositionList =
        group
            .dropDownList(SIZE_INPUT, Pager.list())
            .apply(function(it) {
              it.addChangeListener(function() {
                var pager = Pager.find(it.selection);
                var duplexAndStackEnabled =
                    pager === Pager.TWO_UP || pager === Pager.FOUR_UP || pager === Pager.EIGHT_UP;
                nupGroup.foldingCheck.enabled = pager === Pager.FOUR_UP || pager === Pager.EIGHT_UP;
                nupGroup.duplexCheck.enabled = duplexAndStackEnabled;
                nupGroup.stackCheck.enabled = duplexAndStackEnabled;
              });
            });
  });
  nupGroup =
      new NUpOptionsGroup(main, true, false).apply(function(it) {
        it.alignChildren = 'right';
        it.orientation = 'column';
        it.foldingCheck.enabled = false;
        it.duplexCheck.enabled = false;
        it.stackCheck.enabled = false;
      });
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var start = parseInt(startEdit.text) - 1;
      var pager = Pager.find(impositionList.selection);
      if (pager === Pager.TWO_UP) {
        pager = pager.get(document, start, nupGroup.isDuplex(), nupGroup.isStack());
      } else if (pager === Pager.FOUR_UP || pager === Pager.EIGHT_UP) {
        pager =
            pager.get(
                document,
                start,
                nupGroup.isFolding(),
                nupGroup.isDuplex(),
                nupGroup.isStack(),
            );
      } else {
        pager = pager.get(document, start, document.artboards.length + 1);
      }
      Collections.forEach(
          document.artboards,
          function(it) {
            it.name = pager.next();
          });
      return false;
    },
);
dialog.show();
