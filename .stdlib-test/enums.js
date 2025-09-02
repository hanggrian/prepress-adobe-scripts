initTest($.fileName);

test(
    'values',
    function() {
      var fruits =
          new Enum({
            APPLE: {text: 'Apple'},
            ORANGE: {text: 'Orange'},
            BANANA: {text: 'Banana'},
          });
      var result = fruits.values();
      assertEquals('Apple', result[0].text);
      assertEquals('Orange', result[1].text);
      assertEquals('Banana', result[2].text);
    },
);

test(
    'list',
    function() {
      var fruits =
          new Enum(
              {
                APPLE: {text: 'Apple'},
                ORANGE: {text: 'Orange'},
                BANANA: {text: 'Banana'},
              },
              [0, 1],
          );
      var result = fruits.list();
      assertEquals('Apple', result[0]);
      assertEquals('-', result[1]);
      assertEquals('Orange', result[2]);
      assertEquals('-', result[3]);
      assertEquals('Banana', result[4]);
    },
);

test(
    'valueOf',
    function() {
      var fruits =
          new Enum({
            APPLE: {text: 'Apple'},
            ORANGE: {text: 'Orange'},
            BANANA: {text: 'Banana'},
          });
      assertEquals('Apple', fruits.valueOf('APPLE').text);
      assertEquals('Orange', fruits.valueOf('ORANGE').text);
      assertEquals('Banana', fruits.valueOf('BANANA').text);
    },
);

test(
    'valueOfText',
    function() {
      var fruits =
          new Enum({
            APPLE: {text: 'Apple'},
            ORANGE: {text: 'Orange'},
            BANANA: {text: 'Banana'},
          });
      assertEquals('Apple', fruits.find('Apple').text);
      assertEquals('Orange', fruits.find('Orange').text);
      assertEquals('Banana', fruits.find('Banana').text);
    },
);
