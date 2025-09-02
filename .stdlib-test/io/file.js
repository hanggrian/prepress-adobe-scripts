initTest($.fileName);

test(
    'equals',
    function() {
      var apple1 = new File('apple.png');
      var apple2 = new File('apple.png');
      var orange = new File('orange.png');
      assertTrue(apple1.equals(apple2));
      assertFalse(apple1.equals(orange));
    },
);

test(
    'getExtension',
    function() {
      var apple = new File('apple.png');
      assertNotEquals('apple', apple.getExtension());
      assertEquals('png', apple.getExtension());
    },
);

test(
    'isPdf',
    function() {
      var apple = new File('apple.png');
      var document = new File('document.pdf');
      assertFalse(apple.isPdf());
      assertTrue(document.isPdf());
    },
);
