/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include '../../.stdlib/stdlib.js'

#include 'core-units.js'

var _resourcesPrefix = new File($.fileName).path + '/../.res/'

/**
 * Refer to a file from `.res` directory.
 * @param {String} path file name with extension.
 * @returns {File}
 */
function getResource(path) {
    return new File(_resourcesPrefix + path)
}