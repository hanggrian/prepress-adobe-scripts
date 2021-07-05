// Built around https://community.adobe.com/t5/illustrator/change-folder-current-to-location-of-script-jsx-file/td-p/3869656?page=1.

var _resourcesSource = new File($.fileName)

var R = {
    png: {
        logo: 'logo.png',
        // For some reason, relinking PlacedItem to the same PDF but different page won't work.
        // In such case, set `item.file` to blank before `item.relink()`.
        blank: 'blank.png'
    }
}

/**
 * Refer to a file from `.res` directory.
 * @param {String} path relative path.
 * @returns {File}
 */
function getResource(path) {
    return new File(_resourcesSource.path + '/../.res/' + path)
}