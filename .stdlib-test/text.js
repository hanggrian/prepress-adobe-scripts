initTest($.fileName);

test(
    'isUpperCase',
    function() {
      var s = 'HELLO WORLD';
      assertTrue(s.isUpperCase());
    },
);

test(
    'isLowerCase',
    function() {
      var s = 'hello world';
      assertTrue(s.isLowerCase());
    },
);

test(
    'trimStart',
    function() {
      var s = '  Hello World  ';
      assertEquals('Hello World  ', s.trimStart());
    },
);

test(
    'trimEnd',
    function() {
      var s = '  Hello World  ';
      assertEquals('  Hello World', s.trimEnd());
    },
);

test(
    'trim',
    function() {
      var s = '  Hello World  ';
      assertEquals('Hello World', s.trim());
    },
);

test(
    'isEmpty',
    function() {
      assertTrue(''.isEmpty());
      assertFalse('Hello World'.isEmpty());
    },
);

test(
    'isNotEmpty',
    function() {
      assertTrue('Hello World'.isNotEmpty());
      assertFalse(''.isNotEmpty());
    },
);

test(
    'isBlank',
    function() {
      assertTrue(' '.isBlank());
      assertFalse('Hello World'.isBlank());
    },
);

test(
    'isNotBlank',
    function() {
      assertTrue('Hello World'.isNotBlank());
      assertFalse(' '.isNotBlank());
    },
);

test(
    'substringBefore',
    function() {
      var s = 'Hello World';
      assertEquals('Hell', s.substringBefore('o'));
      assertEquals('Hello ', s.substringBefore('World'));
    },
);

test(
    'substringBeforeLast',
    function() {
      var s = 'Hello World';
      assertEquals('Hello W', s.substringBeforeLast('o'));
      assertEquals('Hello ', s.substringBeforeLast('World'));
    },
);

test(
    'substringAfter',
    function() {
      var s = 'Hello World';
      assertEquals(' World', s.substringAfter('o'));
      assertEquals('', s.substringAfter('World'));
    },
);

test(
    'substringAfterLast',
    function() {
      var s = 'Hello World';
      assertEquals('rld', s.substringAfterLast('o'));
      assertEquals('', s.substringAfterLast('World'));
    },
);

test(
    'startsWith',
    function() {
      var s = 'Hello World';
      assertTrue(s.startsWith('Hello'));
      assertFalse(s.startsWith('World'));
    },
);

test(
    'endsWith',
    function() {
      var s = 'Hello World';
      assertFalse(s.endsWith('Hello'));
      assertTrue(s.endsWith('World'));
    },
);

test(
    'contains',
    function() {
      var s = 'Hello World';
      assertTrue(s.contains('Hello'));
      assertFalse(s.contains('Helloo'));
    },
);

test(
    'isNumeric',
    function() {
      assertTrue('123'.isNumeric());
      assertTrue('123.02'.isNumeric());
      assertFalse('Hello World'.isNumeric());
    },
);

test(
    'format',
    function() {
      var s = "Hi, my name is %s, I'm a %s.";
      assertEquals("Hi, my name is Hendra, I'm a Potato.", s.format('Hendra', 'Potato'));
    },
);
