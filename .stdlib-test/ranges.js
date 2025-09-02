initTest($.fileName);

test(
    'start',
    function() {
      var range = new Range(1, 5);
      assertEquals(1, range.start);
    },
);

test(
    'end',
    function() {
      var range = new Range(1, 5);
      assertEquals(5, range.end);
    },
);

test(
    'getLength',
    function() {
      var range = new Range(1, 5);
      assertEquals(5, range.getLength());
    },
);

test(
    'contains',
    function() {
      var range = new Range(1, 5);
      assertFalse(range.contains(0));
      assertTrue(range.contains(1));
      assertTrue(range.contains(3));
      assertTrue(range.contains(5));
      assertFalse(range.contains(6));
    },
);

test(
    'forEachIndex',
    function() {
      var range = new Range(1, 5);
      var total = 0;
      range.forEachIndex(function(i) {
        total += i;
      });
      assertEquals(15, total);
    },
);
