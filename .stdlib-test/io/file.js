initTest($)

test("getNameWithoutExtension", function() {
  var fileA = new File("apple.png")
  var fileB = new File("apple.png")
  var fileC = new File("orange.png")
  assertTrue(fileA.equalTo(fileB))
  assertFalse(fileA.equalTo(fileC))
})

test("getNameWithoutExtension", function() {
  var file = new File("apple.png")
  assertEquals("apple", file.getNameWithoutExtension())
  assertNotEquals("png", file.getNameWithoutExtension())
})

test("getExtension", function() {
  var file = new File("apple.png")
  assertNotEquals("apple", file.getExtension())
  assertEquals("png", file.getExtension())
})

test("isPdf", function() {
  var filePng = new File("apple.png")
  var filePdf = new File("document.pdf")
  assertFalse(filePng.isPdf())
  assertTrue(filePdf.isPdf())
})
