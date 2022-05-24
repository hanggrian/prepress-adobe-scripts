var _preferencesRoot = 'Prepress Adobe Scripts/'

/** Global access to preferences. */
var preferences = app.preferences

/** Quick access to pdf page. */
Preferences.prototype.setPDFPage = function (page) { this.PDFFileOptions.pageToOpen = actualPage = page + 1 }

/** Quick access to pdf page. */
Preferences.prototype.getPDFPage = function () { return this.PDFFileOptions.pageToOpen - 1 }

/** Quick access to pdf box type. */
Preferences.prototype.setPDFCrop = function (boxType) { this.PDFFileOptions.pDFCropToBox = boxType }

/** Quick access to pdf box type. */
Preferences.prototype.getPDFCrop = function () { return this.PDFFileOptions.pDFCropToBox }

Preferences.prototype.setPSDLayerComp = function (layerComp) { this.photoshopFileOptions.layerComp = layerComp }
Preferences.prototype.getPSDLayerComp = function () { return this.photoshopFileOptions.layerComp }
Preferences.prototype.setPSDPreserveHiddenLayers = function (preserveHiddenLayers) { this.photoshopFileOptions.preserveHiddenLayers = preserveHiddenLayers }
Preferences.prototype.getPSDPreserveHiddenLayers = function () { return this.photoshopFileOptions.preserveHiddenLayers }
Preferences.prototype.setPSDPreserveImageMaps = function (preserveImageMaps) { this.photoshopFileOptions.preserveImageMaps = preserveImageMaps }
Preferences.prototype.getPSDPreserveImageMaps = function () { return this.photoshopFileOptions.preserveImageMaps }
Preferences.prototype.setPSDPreserveLayers = function (preserveLayers) { this.photoshopFileOptions.preserveLayers = preserveLayers }
Preferences.prototype.getPSDPreserveLayers = function () { return this.photoshopFileOptions.preserveLayers }
Preferences.prototype.setPSDPreserveSlices = function (preserveSlices) { this.photoshopFileOptions.preserveSlices = preserveSlices }
Preferences.prototype.getPSDPreserveSlices = function () { return this.photoshopFileOptions.preserveSlices }

/** Alias of `Preferences.getBooleanPreference`. */
Preferences.prototype.getBoolean = function (key, prefix) {
  var actualKey = _getPreferenceKey(key, prefix)
  var value = this.getBooleanPreference(actualKey)
  println('Preference `{0}={1}` obtained', key, value)
  return value
}

/** Alias of `Preferences.getRealPreference`. */
Preferences.prototype.getNumber = function (key, prefix) {
  var actualKey = _getPreferenceKey(key, prefix)
  var value = this.getRealPreference(actualKey)
  println('Preference `{0}={1}` obtained', key, value)
  return value
}

/** Alias of `Preferences.getStringPreference`. */
Preferences.prototype.getString = function (key, prefix) {
  var actualKey = _getPreferenceKey(key, prefix)
  var value = this.getStringPreference(actualKey)
  println('Preference `{0}={1}` obtained', key, value)
  return value
}

/** Alias of `Preferences.setBooleanPreference`. */
Preferences.prototype.setBoolean = function (key, value, prefix) {
  var actualKey = _getPreferenceKey(key, prefix)
  var actualValue = _getPreferenceValue(value)
  this.setBooleanPreference(actualKey, actualValue)
  println('Preference `{0}={1}` stored', key, actualValue)
}

/** Alias of `Preferences.setRealPreference`. */
Preferences.prototype.setNumber = function (key, value, prefix) {
  var actualKey = _getPreferenceKey(key, prefix)
  var actualValue = _getPreferenceValue(value)
  this.setRealPreference(actualKey, actualValue)
  println('Preference `{0}={1}` stored', key, actualValue)
}

/** Alias of `Preferences.setStringPreference`. */
Preferences.prototype.setString = function (key, value, prefix) {
  var actualKey = _getPreferenceKey(key, prefix)
  var actualValue = _getPreferenceValue(value)
  this.setStringPreference(actualKey, actualValue)
  println('Preference `{0}={1}` stored', key, actualValue)
}

/** Alias of `Preferences.removePreference`. */
Preferences.prototype.remove = function (key, prefix) {
  var actualKey = _getPreferenceKey(key, prefix)
  this.removePreference(actualKey)
  println('Preference `{0}` removed', key)
}

function _getPreferenceKey(key, prefix) {
  var s = _preferencesRoot
  if (prefix !== undefined) {
    if (typeof prefix === 'string' || prefix instanceof String) {
      s += prefix + '/'
    } else if (prefix instanceof Dialog) {
      s += prefix.title + '/'
    } else {
      error('Unknown prefix type')
    }
  }
  s += key
  return s
}

function _getPreferenceValue(value) {
  return value instanceof Function ? value() : value
}