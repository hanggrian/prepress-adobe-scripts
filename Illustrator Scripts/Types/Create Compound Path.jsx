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

var createdItems = [];
Collections.forEach(
    items,
    function(it) {
      selection = [it]; // isolate selection so that compound path are created individually
      var group = it.createOutline();
      Collections.forEach(
          group.compoundPathItems,
          function(compoundPathItem) {
            Collections.forEach(
                compoundPathItem.pathItems,
                function(pathItem) {
                  pathItem.duplicate(layer, ElementPlacement.PLACEATBEGINNING);
                },
            );
          },
      );
      group.remove();
      app.executeMenuCommand('compoundPath');
      createdItems.push(Collections.first(selection));
    },
);
selection = createdItems;
