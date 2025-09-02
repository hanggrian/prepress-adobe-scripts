initTest($.fileName);

var window = new Window('dialog', 'Test');
var root = window.add('group');

test(
    'setHelpTips',
    function() {
      var parent = root.hgroup();
      parent.staticText(undefined, 'Label');
      parent.editText(undefined, 'Input');
      parent.setHelpTips('Description');
      assertEquals('Description', parent.children[0].helpTip);
      assertEquals('Description', parent.children[1].helpTip);
    },
);

test(
    'groups',
    function() {
      var parent1 = root.hgroup();
      assertEquals('row', parent1.orientation);

      var parent2 = root.vgroup();
      assertEquals('column', parent2.orientation);

      var parent3 = root.sgroup();
      assertEquals('stack', parent3.orientation);
    },
);
