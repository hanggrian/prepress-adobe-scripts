/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var _stdresDir, _resDir
var _resLight, _resLang

// replacement of JSON files in resources because JSON parsing isn't officialy supported by ExtendScript
var R = {}

/**
 * Refer to png file, which can be dark or light theme.
 * @param {String} name file name without extension.
 * @returns {File}
 */
function getImage(name) {
  if (_resLight === undefined) {
    _resLight = configs.getInt("theme")
  }
  var file
  if (_resLight === 1) {
    file = Resources.get("image-light/" + name + ".png")
    if (file !== undefined && file.exists) {
      return file
    }
  }
  file = Resources.get("image/" + name + ".png")
  if (file !== undefined && file.exists) {
    return file
  }
  return undefined
}

/**
 * Refer to string value from JSON object, which can be specific language.
 * @returns {String}
 */
function getString() {
  if (_resLang === undefined) {
    _resLang = configs.getString("language", "English")
  }
  var langCode = Internals.getLanguageCode(_resLang)
  var string = Array.prototype.shift.call(arguments)
  string = string[langCode] !== undefined ? string[langCode] : string.en
  return Internals.formatString(string, arguments)
}

/**
 * Refer to plural string value from JSON object, which can be specific language.
 * @returns {String}
 */
function getPlural() {
  if (_resLang === undefined) {
    _resLang = configs.getString("language", "English")
  }
  var langCode = Internals.getLanguageCode(_resLang)
  var string = Array.prototype.shift.call(arguments)
  var quantityCode = Array.prototype.shift.call(arguments) <= 1 ? "single" : "plural"
  string = string[langCode] !== undefined ? string[langCode][quantityCode] : string.en[quantityCode]
  return Internals.formatString(string, arguments)
}

/**
 * Refer to script file and tell OS to execute it.
 * @param {String} name file name without extension.
 * @returns {File}
 */
function getScript(name) {
  return Resources.get("scripts/" + name + (OS_MAC ? ".command" : ".cmd"))
}

var Resources = {
  /**
   * Refer to a file from resources directories.
   * @param {String} fullName file name with folder path (if any) and extension.
   * @returns {File}
   */
  get: function(fullName) {
    if (_stdresDir === undefined) {
      _stdresDir = new File(PATH_STDLIB + "/../.stdres")
      _resDir = new File(PATH_LIB + "/../.res")
    }
    var file = new File(_resDir + "/" + fullName)
    if (file.exists) {
      return file
    }
    file = new File(_stdresDir + "/" + fullName)
    if (file.exists) {
      return file
    }
    return undefined
  }
}
