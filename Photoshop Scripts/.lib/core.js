/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include '../../.stdlib/stdlib.js'

#include 'core-units.js'

// See https://community.adobe.com/t5/illustrator/change-folder-current-to-location-of-script-jsx-file/td-p/3869656?page=1.
var _resourcesSource = new File($.fileName)

/**
 * Refer to a file from `.res` directory.
 * @param {String} path relative path.
 * @returns {File}
 */
function getResource(path) {
    return new File(_resourcesSource.path + '/../.res/' + path)
}