#include "../.stdlib/stdlib.js"

// Run this script on any Adobe app to generate resources in form of JavaScript sources.
// Newly generated files by ExtendScript are CRLF,
// They need to be manually converted to LF or the installers will misbehave

var PATH_CURRENT = new File($.fileName).path
var PATH_ROOT = new File(PATH_CURRENT + "/..")
var COMMENT_PSD = "/*\n<javascriptresource>\n<menu>hide</menu>\n</javascriptresource>\n*/\n\n"
var COMMENT_ALL = "// Generated file by codegen, do not directly modify!\n\n"

// stdlib
var stringsInputFile = new File(PATH_CURRENT + "/strings.csv")
var pluralsInputFile
var outputFile = new File(PATH_STDLIB + "/resources/strings.js")
var output = ""
process(stringsInputFile.readText(), function(key, languages, values) {
  output += "  %s: {".format(key)
  Collections.forEach(languages, function(language, i) {
    output += " %s: %s,".format(language, values[i])
  })
  output += " },\n"
})
overwrite(outputFile, COMMENT_PSD + COMMENT_ALL + "R.string = {\n%s}\n".format(output))

// Illustrator
stringsInputFile = new File(PATH_CURRENT + "/strings_ai.csv")
pluralsInputFile = new File(PATH_CURRENT + "/plurals_ai.csv")
outputFile = new File(PATH_ROOT + "/Illustrator Scripts/.lib/core-resources.js")
output = ""
process(stringsInputFile.readText(), function(key, languages, values) {
  output += "R.string.%s = {".format(key)
  Collections.forEach(languages, function(language, i) {
    output += " %s: %s,".format(language, values[i])
  })
  output += " }\n"
})
output += "\n"
process(pluralsInputFile.readText(), function(key, languages, values) {
  output += "R.plurals.%s = {".format(key)
  Collections.forEach(languages, function(language, i) {
    var singleValue, pluralValue
    trimDoubleQuotes(values[i]).split("|").run(function(arr) {
      singleValue = arr[0]
      pluralValue = arr[1]
    })
    output += '\n  %s: { single: "%s", plural: "%s" },'.format(language, singleValue, pluralValue)
  })
  output += " }\n"
})
overwrite(outputFile, COMMENT_ALL + output)

// Photoshop
stringsInputFile = new File(PATH_CURRENT + "/strings_psd.csv")
outputFile = new File(PATH_ROOT + "/Photoshop Scripts/.lib/core-resources.js")
output = ""
process(stringsInputFile.readText(), function(key, languages, values) {
  output += "R.string.%s = {".format(key)
  Collections.forEach(languages, function(language, i) {
    output += " %s: %s,".format(language, values[i])
  })
  output += " }\n"
})
overwrite(outputFile, COMMENT_PSD + COMMENT_ALL + output)

// https://stackoverflow.com/a/7431565/1567541
function process(input, action) {
  var lines = input.split(/\r\n|\n/);
  var headers = lines[0].split(";");
  for (var i = 1; i < lines.length; i++) {
    var line = lines[i].split(";")
    var key = trimDoubleQuotes(line[0])
    var languages = []
    var values = []
    for (var j = 1; j < headers.length; j++) {
      if (line[j] !== '""') {
        languages.push(trimDoubleQuotes(headers[j]))
        values.push(line[j])
      }
    }
    action(key, languages, values)
  }
}

function trimDoubleQuotes(input) { return input.substring(1, input.length - 1) }

function overwrite(file, text) {
  if (file.exists) {
    file.remove()
  }
  file.use("w", function(it) { it.write(text) })
}
