/** Global access to native preferences. */
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

var PREFERENCES_ROOT = "Prepress Adobe Scripts"

/** Global access to preferences wrapper. */
var preferences2 = new PreferencesWrapper(PREFERENCES_ROOT)

/**
 * Wrapper of `Preferences` with simplified API.
 * @param {String} path hierarcy of preferences.
 */
function PreferencesWrapper(path) {
  var prefix = path + "/"

  /**
   * Create another instance of preferences using current path suffixed with `relative` path.
   * @param {String} relative relative file path.
   * @returns {Boolean}
   */
  this.resolve = function(relative) {
    return new PreferencesWrapper(prefix + relative)
  }

  /**
   * Get boolean value from this preferences, returning true if not present.
   * @param {String} key preference's key.
   * @returns {Boolean}
   */
  this.getBoolean = function(key) {
    var value = preferences.getBooleanPreference(prefix + key)
    println("Get preference `{0}`: `{1}`.", key, value)
    return value
  }

  /**
   * Get int value from this preferences, returning default if not present.
   * @param {String} key preference's key.
   * @returns {Number}
   */
  this.getInt = function(key) {
    var value = preferences.getIntegerPreference(prefix + key)
    println("Get preference `{0}`: `{1}`.", key, value)
    return value
  }

  /**
   * Get number value from this preferences, returning 0 if not present.
   * @param {String} key preference's key.
   * @returns {Number}
   */
  this.getNumber = function(key) {
    var value = preferences.getRealPreference(prefix + key)
    println("Get preference `{0}`: `{1}`.", key, value)
    return value
  }

  /**
   * Get string value from this preferences, returning default if not present.
   * @param {String} key preference's key.
   * @param {String} defaultValue value to use when preference is not found.
   * @returns {String}
   */
  this.getString = function(key, defaultValue) {
    print("Get preference `{0}`: ", key)
    var value = preferences.getStringPreference(prefix + key)
    if (value === "") {
      println("not found, use default `{0}`.", defaultValue)
      return defaultValue
    }
    println("`{0}`.", value)
    return value
  }

  /**
   * Set boolean value of this preferences.
   * @param {String} key preference's key.
   * @param {Boolean} value preference's value to store.
   */
  this.setBoolean = function(key, value) {
    var actualValue = value instanceof Function ? value() : value
    preferences.setBooleanPreference(prefix + key, actualValue)
    println("Set preference `{0}`: `{1}`.", key, actualValue)
  }

  /**
   * Set int value of this preferences.
   * @param {String} key preference's key.
   * @param {Number} value preference's value to store.
   */
  this.setInt = function(key, value) {
    var actualValue = value instanceof Function ? value() : value
    preferences.setIntegerPreference(prefix + key, actualValue)
    println("Set preference `{0}`: `{1}`.", key, actualValue)
  }

  /**
   * Set number value of this preferences.
   * @param {String} key preference's key.
   * @param {Number} value preference's value to store.
   */
  this.setNumber = function(key, value) {
    var actualValue = value instanceof Function ? value() : value
    preferences.setRealPreference(prefix + key, actualValue)
    println("Set preference `{0}`: `{1}`.", key, actualValue)
  }

  /**
   * Set string value of this preferences.
   * @param {String} key preference's key.
   * @param {String} value preference's value to store.
   */
  this.setString = function(key, value) {
    var actualValue = value instanceof Function ? value() : value
    preferences.setStringPreference(prefix + key, actualValue)
    println("Set preference `{0}`: `{1}`.", key, actualValue)
  }

  /**
   * Remove preference from this preferences.
   * @param {String} key preference's key.
   */
  this.remove = function(key) {
    preferences.removePreference(prefix + key)
    println("Remove preference `{0}`.", key)
  }
}
