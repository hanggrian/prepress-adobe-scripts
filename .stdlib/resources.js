var _resourcesPath // this value must be overriden

/**
 * Refer to a file from `.res` directory.
 * @param {String} name file name with extension.
 * @returns {File}
 */
function getResource(name) {
    return new File(_resourcesPath + name)
}