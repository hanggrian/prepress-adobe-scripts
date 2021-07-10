/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var _resourcesDirectory

/**
 * Refer to a file from `.res` directory.
 * @param {String} path file name with extension.
 * @returns {File}
 */
function getResource(path) {
    if (_resourcesDirectory === undefined) {
        var target = app.name.includes('Illustrator') ? 'Illustrator' : 'Photoshop'
        _resourcesDirectory = new File($.fileName).path + '/../' + target + ' Scripts/.res/'
    }
    return new File(_resourcesDirectory + path)
}