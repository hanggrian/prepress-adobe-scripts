// TODO test string file

initTest($.fileName);

var window = new Window('dialog', 'Test');
var root = window.add('group');

test(
    'addClickListener',
    function() {
      var counter = 0;
      var child = root.iconButton();
      child.addClickListener(function() {
        counter++;
      });
      child.addClickListener(function() {
        counter++;
      });
      child.onClick();
      assertEquals(2, counter);
    },
);

test(
    'image',
    function() {
      var child = root.image([100, 50], undefined, {key: 'value'});
      assertEquals(100, child.bounds.width);
      assertEquals(50, child.bounds.height);
      assertEquals('value', child.properties.key);
    },
);
