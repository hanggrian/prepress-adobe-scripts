var PREFERENCES_ROOT = 'Prepress Adobe Scripts/'

/** Global access to preferences. */
var preferences = app.preferences

Preferences.prototype.setPDFPage = function(page) { this.PDFFileOptions.pageToOpen = page + 1 }
Preferences.prototype.getPDFPage = function() { return this.PDFFileOptions.pageToOpen - 1 }
Preferences.prototype.setPDFCrop = function(boxType) { this.PDFFileOptions.pDFCropToBox = boxType  }
Preferences.prototype.getPDFCrop = function() { return this.PDFFileOptions.pDFCropToBox }

Preferences.prototype.setPSDLayerComp = function(layerComp) { this.photoshopFileOptions.layerComp = layerComp }
Preferences.prototype.getPSDLayerComp = function() { return this.photoshopFileOptions.layerComp }
Preferences.prototype.setPSDPreserveHiddenLayers = function(preserveHiddenLayers) { this.photoshopFileOptions.preserveHiddenLayers = preserveHiddenLayers }
Preferences.prototype.getPSDPreserveHiddenLayers = function() { return this.photoshopFileOptions.preserveHiddenLayers }
Preferences.prototype.setPSDPreserveImageMaps = function(preserveImageMaps) { this.photoshopFileOptions.preserveImageMaps = preserveImageMaps }
Preferences.prototype.getPSDPreserveImageMaps = function() { return this.photoshopFileOptions.preserveImageMaps }
Preferences.prototype.setPSDPreserveLayers = function(preserveLayers) { this.photoshopFileOptions.preserveLayers = preserveLayers }
Preferences.prototype.getPSDPreserveLayers = function() { return this.photoshopFileOptions.preserveLayers }
Preferences.prototype.setPSDPreserveSlices = function(preserveSlices) { this.photoshopFileOptions.preserveSlices = preserveSlices }
Preferences.prototype.getPSDPreserveSlices = function() { return this.photoshopFileOptions.preserveSlices }

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