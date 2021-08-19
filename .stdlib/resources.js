/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var _stdresPath, _stdresLightPath, _resPath, _resLightPath
var _resLight

/**
 * Refer to a file from `.res` directory.
 * @param {String} name file name with extension.
 * @returns {File}
 */
function getResource(name) {
    if (_resLight === undefined) {
        _stdresPath = new File(new File($.fileName).path + '/../.stdres')
        _resPath = new File(libPath + '/../.res')
        _resLight = preferences.getString('scripts_theme') === 'Light'
    }
    var file
    if (_resLight) {
        if (_stdresLightPath === undefined && _resLightPath === undefined) {
            _stdresLightPath = new File('/../.stdres-light')
            _resLightPath = new File(libPath + '/../.res-light')
        }
        file = new File(_resLightPath + '/' + name)
        if (file.exists) {
            return file
        }
        file = new File(_stdresLightPath + '/' + name)
        if (file.exists) {
            return file
        }
    }
    file = new File(_resPath + '/' + name)
    if (file.exists) {
        return file
    }
    file = new File(_stdresPath + '/' + name)
    if (file.exists) {
        return file
    }
    error('Resource {0} not found'.format(name))
}