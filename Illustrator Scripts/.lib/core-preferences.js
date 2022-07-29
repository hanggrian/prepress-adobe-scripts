var _preferencesRoot = 'Prepress Adobe Scripts/'

/** Global access to preferences. */
var preferences = app.preferences

/** Quick access to pdf page. */
Preferences.prototype.setPDFPage = function(page) { this.PDFFileOptions.pageToOpen = actualPage = page + 1 }

/** Quick access to pdf page. */
Preferences.prototype.getPDFPage = function() { return this.PDFFileOptions.pageToOpen - 1 }

/** Quick access to pdf box type. */
Preferences.prototype.setPDFCrop = function(boxType) { this.PDFFileOptions.pDFCropToBox = boxType }

/** Quick access to pdf box type. */
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

/** Get boolean value from this preferences, returning true if not present. */
Preferences.prototype.getBoolean = function(key) {
  var value = this.getBooleanPreference(_preferencesRoot + key)
  println('Preference `{0}={1}` obtained', key, value)
  return value
}

/** Get int value from this preferences, returning default if not present. */
Preferences.prototype.getInt = function(key, defaultValue) {
  var value = this.getIntegerPreference(_preferencesRoot + key)
  println('Preference `{0}={1}` obtained', key, value)
  return value === -1792921944 ? defaultValue : value
}

/** Get number value from this preferences, returning 0 if not present. */
Preferences.prototype.getNumber = function(key) {
  var value = this.getRealPreference(_preferencesRoot + key)
  println('Preference `{0}={1}` obtained', key, value)
  return value
}

/** Get string value from this preferences, returning default if not present. */
Preferences.prototype.getString = function(key, defaultValue) {
  var value = this.getStringPreference(_preferencesRoot + key)
  println('Preference `{0}={1}` obtained', key, value)
  return value === '' ? defaultValue : value
}

/** Set boolean value of this preferences. */
Preferences.prototype.setBoolean = function(key, value) {
  var actualValue = value instanceof Function ? value() : value
  this.setBooleanPreference(_preferencesRoot + key, actualValue)
  println('Preference `{0}={1}` stored', key, actualValue)
}

/** Set int value of this preferences. */
Preferences.prototype.setInt = function(key, value) {
  var actualValue = value instanceof Function ? value() : value
  this.setIntegerPreference(_preferencesRoot + key, actualValue)
  println('Preference `{0}={1}` stored', key, actualValue)
}

/** Set number value of this preferences. */
Preferences.prototype.setNumber = function(key, value) {
  var actualValue = value instanceof Function ? value() : value
  this.setRealPreference(_preferencesRoot + key, actualValue)
  println('Preference `{0}={1}` stored', key, actualValue)
}

/** Set string value of this preferences. */
Preferences.prototype.setString = function(key, value) {
  var actualValue = value instanceof Function ? value() : value
  this.setStringPreference(_preferencesRoot + key, actualValue)
  println('Preference `{0}={1}` stored', key, actualValue)
}

/** Remove preference from this preferences. */
Preferences.prototype.remove = function(key) {
  this.removePreference(_preferencesRoot + key)
  println('Preference `{0}` removed', key)
}

/** Create an instance of preference where the key is prefixed with `child`. */
Preferences.prototype.resolve = function(child) {
  return new _ChildPreferences(child)
}

function _ChildPreferences(child) {
  /** Get boolean value from this preferences, returning true if not present. */
  this.getBoolean = function(key) {
    return preferences.getBoolean(child + '/' + key)
  }

  /** Get int value from this preferences, returning default if not present. */
  this.getInt = function(key, defaultValue) {
    return preferences.getInt(child + '/' + key, defaultValue)
  }

  /** Get number value from this preferences, returning 0 if not present. */
  this.getNumber = function(key) {
    return preferences.getNumber(child + '/' + key)
  }

  /** Get string value from this preferences, returning default if not present. */
  this.getString = function(key, defaultValue) {
    return preferences.getString(child + '/' + key, defaultValue)
  }

  /** Set boolean value of this preferences. */
  this.setBoolean = function(key, value) {
    return preferences.setBoolean(child + '/' + key, value)
  }

  /** Set int value of this preferences. */
  this.setInt = function(key, value) {
    return preferences.setInt(child + '/' + key, value)
  }

  /** Set number value of this preferences. */
  this.setNumber = function(key, value) {
    return preferences.setNumber(child + '/' + key, value)
  }

  /** Set string value of this preferences. */
  this.setString = function(key, value) {
    return preferences.setString(child + '/' + key, value)
  }

  /** Remove preference from this preferences. */
  this.remove = function(key) {
    return preferences.remove(child + '/' + key)
  }
}
