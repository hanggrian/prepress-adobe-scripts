/**
 * Built around https://community.adobe.com/t5/illustrator/change-folder-current-to-location-of-script-jsx-file/td-p/3869656?page=1.
 */

var thisFile = new File($.fileName)

/**
 * Refer to a file from `.res` directory.
 * @param {String} path relative path
 * @return {File}
 */
function getResource(path) {
    return File(thisFile.path + '/../.res/' + path)
}