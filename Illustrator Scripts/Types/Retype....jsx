//@target illustrator;
//@include '../.lib/commons.js';

checkAnySelection();

var items =
    Collections.filterItem(
        selection,
        function(it) {
          return Items.isText(it);
        },
    );
check(
    Collections.isNotEmpty(items),
    getString(R.string.error_notypes_selection, getString(R.string.types).toLowerCase()),
);

var dialog = new Dialog(R.string.retype, 'retyping-texts/#retype');
var inputEdit;

dialog.hgroup(function(main) {
  main.alignChildren = 'top';
  main.staticText(undefined, R.string.content).apply(HEADING);
  inputEdit =
      main
          .editText([400, 100], Collections.first(items).contents, STYLE_MULTILINE)
          .apply(ACTIVATE);
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var input = inputEdit.text;
      Collections.forEach(
          items,
          function(it) {
            it.contents = input;
          },
      );
      return false;
    },
);
dialog.show();
