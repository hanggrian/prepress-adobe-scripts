/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var _stdresDir, _resPath, _resLight

/**
 * Refer to a file from resources directories.
 * @param {String} fullName file name with folder path (if any) and extension.
 * @returns {File}
 */
function getResource(fullName) {
  if (_stdresDir === undefined) {
    _stdresDir = new File(stdlibPath + '/../.stdres')
    _resDir = new File(libPath + '/../.res')
  }
  var file = new File(_resDir + '/' + fullName)
  if (file.exists) {
    return file
  }
  file = new File(_stdresDir + '/' + fullName)
  if (file.exists) {
    return file
  }
  return undefined
}

/**
 * Refer to png file, which can be dark or light theme.
 * @param {String} name file name without extension.
 * @returns {File}
 */
function getImage(name) {
  if (_resLight === undefined) {
    _resLight = preferences.getString('scripts_theme') === 'Light'
  }
  var fileName = name + '.png'
  var file
  if (_resLight) {
    file = getResource('image-light/' + fileName)
    if (file !== undefined && file.exists) {
      return file
    }
  }
  file = getResource('image/' + fileName)
  if (file !== undefined && file.exists) {
    return file
  }
  return undefined
}

/**
 * Refer to an bat or command file.
 * @param {String} name file name without extension.
 * @returns {File}
 */
function executeScript(name) {
  getResource('script/' + name + (OS_MAC ? '.command' : '.cmd')).execute()
}