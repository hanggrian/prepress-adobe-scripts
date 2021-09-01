/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var _stdresDir, _resDir, _resLight

/**
 * Refer to a file from `.res` directory.
 * @param {String} name file name with extension.
 * @returns {File}
 */
function getResource(name) {
    if (_resLight === undefined) {
        _stdresDir = new File(new File($.fileName) + '/../.stdres')
        _resDir = new File(libPath + '/../.res')
        _resLight = preferences.getString('scripts_theme') === 'Light'
    }
    var file
    if (_resLight) {
        file = new File(_resDir + '/light/' + name)
        if (file.exists) {
            return file
        }
        file = new File(_stdresDir + '/light/' + name)
        if (file.exists) {
            return file
        }
    }
    file = new File(_resDir + '/' + name)
    if (file.exists) {
        return file
    }
    file = new File(_stdresDir + '/' + name)
    if (file.exists) {
        return file
    }
    error('Resource {0} not found'.format(name))
}