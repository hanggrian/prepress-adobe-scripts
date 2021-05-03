var PREFERENCES_ROOT = 'Prepress Adobe Scripts/'

/** Global access to preferences. */
var preferences = app.preferences

/** Alias of `PDFFileOptions.pageToOpen`. */
Preferences.prototype.setPDFPage = function(page) {
    this.PDFFileOptions.pageToOpen = page + 1
}

/** Alias of `pDFCropToBox.pageToOpen`. */
Preferences.prototype.setPDFCrop = function(boxType) {
    this.PDFFileOptions.pDFCropToBox = boxType 
}

/** Alias of `photoshopFileOptions.layerComp`. */
Preferences.prototype.setPhotoshopLayerComp = function(layerComp) {
    this.photoshopFileOptions.layerComp = layerComp
}

/** Alias of `photoshopFileOptions.preserveHiddenLayers`. */
Preferences.prototype.setPhotoshopPreserveHiddenLayers = function(preserveHiddenLayers) {
    this.photoshopFileOptions.preserveHiddenLayers = preserveHiddenLayers
}

/** Alias of `photoshopFileOptions.preserveImageMaps`. */
Preferences.prototype.setPhotoshopPreserveImageMaps = function(preserveImageMaps) {
    this.photoshopFileOptions.preserveImageMaps = preserveImageMaps
}

/** Alias of `photoshopFileOptions.preserveLayers`. */
Preferences.prototype.setPhotoshopPreserveLayers = function(preserveLayers) {
    this.photoshopFileOptions.preserveLayers = preserveLayers
}

/** Alias of `photoshopFileOptions.preserveSlices`. */
Preferences.prototype.setPhotoshopPreserveSlices = function(preserveSlices) {
    this.photoshopFileOptions.preserveSlices = preserveSlices
}

/** Alias of `getBooleanPreference`. */
Preferences.prototype.getBoolean = function(dialog, key) {
    return this.getBooleanPreference(_getPreferenceKey(dialog, key))
}

/** Alias of `getRealPreference`. */
Preferences.prototype.getNumber = function(dialog, key) {
    return this.getRealPreference(_getPreferenceKey(dialog, key))
}

/** Alias of `getStringPreference`. */
Preferences.prototype.getString = function(dialog, key) {
    return this.getStringPreference(_getPreferenceKey(dialog, key))
}

/** Alias of `setBooleanPreference`. */
Preferences.prototype.setBoolean = function(dialog, key, value) {
    this.setBooleanPreference(_getPreferenceKey(dialog, key), value)
}

/** Alias of `setRealPreference`. */
Preferences.prototype.setNumber = function(dialog, key, value) {
    this.setRealPreference(_getPreferenceKey(dialog, key), value)
}

/** Alias of `setStringPreference`. */
Preferences.prototype.setString = function(dialog, key, value) {
    this.setStringPreference(_getPreferenceKey(dialog, key), value)
}

/** Alias of `removePreference`. */
Preferences.prototype.remove = function(dialog, key) {
    this.removePreference(_getPreferenceKey(dialog, key))
}

function _getPreferenceKey(dialog, key) {
    var actualKey = PREFERENCES_ROOT
    if (dialog !== undefined) {
        actualKey += dialog.title + '/'
    }
    actualKey += key
    return actualKey
}