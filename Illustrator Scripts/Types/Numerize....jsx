//@target illustrator;
//@include '../.lib/commons.js';

var ALPHABETS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
var SIZE_INPUT = [100, 21];

checkAnySelection();

check(
    Collections.anyItem(
        selection,
        function(it) {
          return Items.isText(it);
        },
    ),
    getString(R.string.error_notypes_selection, getString(R.string.types).toLowerCase()),
);

var dialog = new Dialog(R.string.numerize, 'retyping-texts/#numerize');
var startsAtEdit;
var digitsEdit;
var stopsAtGroup;
var stopsAtCheck;
var stopsAtList;
var prefixEdit;
var suffixEdit;
var orderingList;
var recursiveCheck;
var prefs = preferences2.resolve('types/numerize');

dialog.vgroup(function(main) {
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'fill';
    rootPane.vpanel(
        R.string.options,
        function(panel) {
          panel.alignChildren = 'right';
          panel.hgroup(function(group) {
            group.helpTips = R.string.tip_numerize_startsat;
            group.staticText(undefined, R.string.starts_at).apply(HEADING);
            startsAtEdit =
                group
                    .editText(SIZE_INPUT, prefs.getInt('start').toString())
                    .apply(function(it) {
                      it.validateDigits();
                      it.activate();
                    });
          });
          panel.hgroup(function(group) {
            group.helpTips = R.string.tip_numerize_digits;
            group.staticText(undefined, R.string.digits).apply(HEADING);
            digitsEdit =
                group
                    .editText(SIZE_INPUT, prefs.getInt('digit').toString())
                    .apply(VALIDATE_DIGITS);
          });
          stopsAtGroup =
              panel.hgroup(function(group) {
                group.alignChildren = 'bottom';
                group.helpTips = R.string.tip_numerize_stopsat;
                stopsAtCheck =
                    group
                        .checkBox(undefined, getString(R.string.stops_at) + ':')
                        .apply(function(it) {
                          it.justify = 'right';
                          it.value = prefs.getBoolean('stop_enabled');
                          it.addClickListener(function() {
                            stopsAtList.enabled = stopsAtCheck.value;
                          });
                        });
                stopsAtList =
                    group
                        .dropDownList(SIZE_INPUT, ALPHABETS)
                        .apply(function(it) {
                          it.enabled = stopsAtCheck.value;
                          it.selection = prefs.getInt('stop_alphabet');
                        });
              });
        },
    );
    rootPane.vpanel(
        R.string.affix,
        function(panel) {
          panel.alignChildren = 'right';
          panel.hgroup(function(group) {
            group.helpTips = R.string.tip_numerize_prefix;
            group.staticText(undefined, R.string.prefix).apply(HEADING);
            prefixEdit = group.editText(SIZE_INPUT, prefs.getString('prefix'));
          });
          panel.hgroup(function(group) {
            group.helpTips = R.string.tip_numerize_suffix;
            group.staticText(undefined, R.string.suffix).apply(HEADING);
            suffixEdit = group.editText(SIZE_INPUT, prefs.getString('suffix'));
          });
        },
    );
  });
  main.hgroup(function(group) {
    group.alignment = 'right';
    orderingList =
        new OrderingList(group, [Ordering.layerList(), Ordering.positionList()])
            .apply(function(it) {
              it.selection = prefs.getInt('order');
            });
    group.sgroup();
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
      var startsAt = parseInt(startsAtEdit.text) || 1;
      var digits = parseInt(digitsEdit.text) || 0;
      var stopsAt;
      var stopsCount;
      if (stopsAtCheck.value) {
        stopsAt = stopsAtList.selection.index + 1;
        stopsCount = 0;
      }
      var prefix = prefixEdit.text;
      var suffix = suffixEdit.text;

      var items =
          recursiveCheck.value
              ? Collections.filterItem(
                  selection,
                  function(it) {
                    return Items.isText(it);
                  },
              )
              : Collections.filter(
                  selection,
                  function(it) {
                    return Items.isGroup(it) || Items.isText(it);
                  },
              );
      items.sort(orderingList.getComparator());

      Collections.forEach(
          items,
          function(item, i) {
            var s = pad(startsAt, digits);
            if (stopsAtCheck.value) {
              s += ALPHABETS[stopsCount];
            }
            s = prefix + s + suffix;
            println(i + '. ' + s + '.');
            if (!recursiveCheck.value && Items.isGroup(item)) {
              Collections.forEachItem(
                  [item],
                  function(it) {
                    if (Items.isText(it)) {
                      it.contents = s;
                    }
                  },
              );
            } else {
              item.contents = s;
            }
            if (stopsAtCheck.value) {
              stopsCount++;
              if (stopsCount === stopsAt) {
                startsAt++;
                stopsCount = 0;
              }
            } else {
              startsAt++;
            }
          },
      );

      prefs.setInt('start', parseInt(startsAtEdit.text) || 1);
      prefs.setInt('digit', digits);
      prefs.setBoolean('stop_enabled', stopsAtCheck.value);
      if (stopsAtList.selection !== null) {
        prefs.setInt('stop_alphabet', stopsAtList.selection.index);
      }
      prefs.setString('prefix', prefix);
      prefs.setString('suffix', suffix);
      prefs.setInt('order', orderingList.selection.index);
      prefs.setBoolean('recursive', recursiveCheck.value);
      return false;
    },
);
dialog.show();

// https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
