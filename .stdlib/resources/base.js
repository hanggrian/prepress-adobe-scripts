/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

// replacement of JSON files in resources because JSON parsing isn't officialy supported by ExtendScript
var R = {}

/**
 * Refer to png file, which can be dark or light theme.
 * @param {String} name file name without extension.
 * @returns {File}
 */
function getImage(name) {
  if (Scripts.RES_DARK === undefined) {
    Scripts.RES_DARK = configs.getBoolean("theme_dark")
  }
  var file
  if (!Scripts.RES_DARK) {
    file = Scripts.getResource("image-light/" + name + ".png")
    if (file !== undefined) {
      return file
    }
  }
  file = Scripts.getResource("image/" + name + ".png")
  if (file !== undefined) {
    return file
  }
  error("Image %s not found".format(name))
}

/**
 * Refer to string value from JSON object, which can be specific language.
 * @returns {String}
 */
function getString() {
  if (Scripts.RES_LANG === undefined) {
    Scripts.RES_LANG = configs.getString("language_code", Language.EN.code)
  }
  var format = Array.prototype.shift.call(arguments)
  return Internals.formatString(format[Scripts.RES_LANG], arguments)
}

/**
 * Refer to plural string value from JSON object, which can be specific language.
 * @returns {String}
 */
function getPlural() {
  if (Scripts.RES_LANG === undefined) {
    Scripts.RES_LANG = configs.getString("language_code", Language.EN.code)
  }
  var format = Array.prototype.shift.call(arguments)
  var quantityQualifier = Array.prototype.shift.call(arguments) <= 1 ? "single" : "plural"
  return Internals.formatString(format[quantityQualifier][Scripts.RES_LANG], arguments)
}

/**
 * Refer to script file and tell OS to execute it.
 * @param {String} name file name without extension.
 * @returns {File}
 */
function getScript(name) { return Scripts.getResource("script/" + name + (Scripts.OS_MAC ? ".command" : ".cmd")) }
