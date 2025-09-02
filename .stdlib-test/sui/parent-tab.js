// TODO assert tab's title

initTest($.fileName);

var window = new Window('dialog', 'Test');
var root = window.add('tabbedpanel');

test(
    'tabs',
    function() {
      var parent1 = root.htab('Page');
      // assertEquals('Page', parent1.text);
      assertEquals('row', parent1.orientation);

      var parent2 = root.vtab('Page');
      // assertEquals('Page', parent2.text);
      assertEquals('column', parent2.orientation);

      var parent3 = root.stab('Page');
      // assertEquals('Page', parent3.text);
      assertEquals('stack', parent3.orientation);
    },
);
