initTest($.fileName);

test(
    'parseUnits',
    function() {
      assertEquals('7', Math.round(parseUnits('2.5 mm')));
    },
);
