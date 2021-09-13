/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var _stdresDir, _resPath, _resLight

/**
 * Refer to a file from resources directories.
 * @param {String} name file name with extension.
 * @returns {File}
 */
function getResource(name) {
    if (_stdresDir === undefined) {
        _stdresDir = new File(stdlibPath + '/../.stdres')
        _resDir = new File(libPath + '/../.res')
    }
    var file = new File(_resDir + '/' + name)
    if (file.exists) {
        return file
    }
    file = new File(_stdresDir + '/' + name)
    if (file.exists) {
        return file
    }
    return undefined
}

/**
 * Refer to an image file, which can be dark or light theme.
 * @param {String} name file name with extension.
 * @returns {File}
 */
function getImage(name) {
    if (_resLight === undefined) {
        _resLight = preferences.getString('scripts_theme') === 'Light'
    }
    var file
    if (_resLight) {
        file = getResource('image-light/' + name)
        if (file !== undefined && file.exists) {
            return file
        }
    }
    file = getResource('image/' + name)
    if (file !== undefined && file.exists) {
        return file
    }
    return undefined
}