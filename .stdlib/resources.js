/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var _stdresDir, _resDir, _resLight

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
  },

  /**
   * Refer to png file, which can be dark or light theme.
   * @param {String} name file name without extension.
   * @returns {File}
   */
  getImage: function(name) {
    if (_resLight === undefined) {
      _resLight = preferences2.getString("scripts_theme", "Dark") === "Light"
    }
    var fileName = name + ".png"
    var file
    if (_resLight) {
      file = Resources.get("image-light/" + fileName)
      if (file !== undefined && file.exists) {
        return file
      }
    }
    file = Resources.get("image/" + fileName)
    if (file !== undefined && file.exists) {
      return file
    }
    return undefined
  },

  /**
   * Refer to script file and tell OS to execute it.
   * @param {String} name file name without extension.
   * @returns {File}
   */
  executeScript: function(name) {
    Resources.get("script/" + name + (OS_MAC ? ".command" : ".cmd")).execute()
  }
}
