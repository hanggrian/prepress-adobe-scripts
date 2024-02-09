// Run this script on any Adobe app to generate string resources in form of JavaScript sources.

//@include '../.stdlib/stdlib.js'
//@include 'lib/rules.js'

var PATH_CURRENT = new File($.fileName).path
var PATH_ROOT = new File(PATH_CURRENT + '/..')
var COMMENT_ALL = '// Generated by `codegen`, do not modify this file!\n\n'
var COMMENT_PSD = '/*<javascriptresource><menu>hide</menu></javascriptresource>*/\n\n'

var stringsInputFile, pluralsInputFile, outputFile, output
var message = 'Generated:'

// stdlib
stringsInputFile = new File(PATH_CURRENT + '/strings.csv')
outputFile = new File(Scripts.PATH_STDLIB + '/resources/strings.js')
output = ''
forEachLine(stringsInputFile, function(key, languages, values) {
  output += '  %s: {%s},\n'.format(key, getContent(languages, values))
})
message += overwrite(outputFile, COMMENT_ALL + COMMENT_PSD + 'R.string = {\n%s}\n'.format(output))

// illustrator
stringsInputFile = new File(PATH_CURRENT + '/strings_ai.csv')
pluralsInputFile = new File(PATH_CURRENT + '/plurals_ai.csv')
outputFile = new File(PATH_ROOT + '/Illustrator Scripts/.lib/core-resources.js')
output = ''
forEachLine(stringsInputFile, function(key, languages, values, _) {
  output += 'R.string.%s = { %s }\n'.format(key, getContent(languages, values))
})
output += '\n'
forEachLine(
    pluralsInputFile,
    function(key, languages, values) {
      var singleValues = [], pluralValues = []
      Collections.forEach(values, function(value, i) {
        value.split(';').run(function(it) {
          singleValues[i] = it[0]
          pluralValues[i] = it[1]
        })
      })
      output +=
          'R.plurals.%s = {\n  single: {%s},\n  plural: {%s},\n}\n'.format(
              key,
              getContent(languages, singleValues),
              getContent(languages, pluralValues),
          )
    },
    false,
)
message += overwrite(outputFile, COMMENT_ALL + output)

// photoshop
stringsInputFile = new File(PATH_CURRENT + '/strings_psd.csv')
outputFile = new File(PATH_ROOT + '/Photoshop Scripts/.lib/core-resources.js')
output = ''
forEachLine(stringsInputFile, function(key, languages, values, _) {
  output += 'R.string.%s = {%s}\n'.format(key, getContent(languages, values))
})
message += overwrite(outputFile, COMMENT_ALL + COMMENT_PSD + output)

alert(message, 'Generate String Resources')

/**
 * TODO find out why `File.prototype` is failing.
 * Iterate each CSV lines, except the first (the header).
 * @param file {!File}
 * @param action {function(string, !Array<string>, !Array<string>)}
 * @param enforceRules {?boolean=} set to false when generating plurals.
 * @see https://stackoverflow.com/a/7431565/1567541
 */
function forEachLine(file, action, enforceRules) {
  enforceRules = enforceRules !== false
  var lines = file.readText().split(/\r\n|\n/)
  var headers = readLine(lines.shift())
  for (var i = 0; i < lines.length; i++) {
    var line = readLine(lines[i])
    var key = line[0]
    var languages = []
    var values = []
    for (var j = 1; j < headers.length; j++) {
      if (enforceRules) {
        checkRules(key, headers[j], line[j])
      }
      languages.push(headers[j])
      values.push(line[j])
    }
    action(key, languages, values)
  }
}

/**
 * Get the JSON string content within the brackets.
 * @param languages {!Array<string>}
 * @param values {!Array<string>}
 * @return {string}
 */
function getContent(languages, values) {
  var content = ''
  Collections.forEach(languages, function(language, i) {
    var format = '%s: "%s"'
    if (i < Collections.lastIndex(languages)) {
      format += ', '
    }
    content += format.format(language, values[i])
  })
  return content
}

/**
 * Split a line in CSV file into array of parts.
 * @param line {string}
 * @return {string[]}
 */
function readLine(line) {
  var result = line.split('","')
  var lastIndex = result.length - 1
  result[0] = result[0].substring(1)
  result[lastIndex] = result[lastIndex].substring(0, result[lastIndex].length - 1)
  return result
}

/**
 * TODO find out why `File.prototype` is failing.
 * Rewrite file with new content.
 * @param file {!File}
 * @param text {string}
 */
function overwrite(file, text) {
  if (file.exists) {
    file.remove()
  }
  file.writeText(text)
  return '\n- %s'.format(unescape(file.absoluteURI.substringAfter('prepress-adobe-scripts/')))
}