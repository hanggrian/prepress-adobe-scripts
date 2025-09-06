/** Global access to native preferences. */
var preferences = app.preferences;

/** Quick access to pdf page. */
Preferences.prototype.setPDFPage =
    function(page) {
      this.PDFFileOptions.pageToOpen = actualPage = page + 1;
    };

/** Quick access to pdf page. */
Preferences.prototype.getPDFPage =
    function() {
      return this.PDFFileOptions.pageToOpen - 1;
    };

/** Quick access to pdf box type. */
Preferences.prototype.setPDFCrop =
    function(boxType) {
      this.PDFFileOptions.pDFCropToBox = boxType;
    };

/** Quick access to pdf box type. */
Preferences.prototype.getPDFCrop =
    function() {
      return this.PDFFileOptions.pDFCropToBox;
    };

Preferences.prototype.setPSDLayerComp =
    function(layerComp) {
      this.photoshopFileOptions.layerComp = layerComp;
    };
Preferences.prototype.getPSDLayerComp =
    function() {
      return this.photoshopFileOptions.layerComp;
    };
Preferences.prototype.setPSDPreserveHiddenLayers =
    function(preserveHiddenLayers) {
      this.photoshopFileOptions.preserveHiddenLayers = preserveHiddenLayers;
    };

Preferences.prototype.getPSDPreserveHiddenLayers =
    function() {
      return this.photoshopFileOptions.preserveHiddenLayers;
    };
Preferences.prototype.setPSDPreserveImageMaps =
    function(preserveImageMaps) {
      this.photoshopFileOptions.preserveImageMaps = preserveImageMaps;
    };
Preferences.prototype.getPSDPreserveImageMaps =
    function() {
      return this.photoshopFileOptions.preserveImageMaps;
    };
Preferences.prototype.setPSDPreserveLayers =
    function(preserveLayers) {
      this.photoshopFileOptions.preserveLayers = preserveLayers;
    };
Preferences.prototype.getPSDPreserveLayers =
    function() {
      return this.photoshopFileOptions.preserveLayers;
    };
Preferences.prototype.setPSDPreserveSlices =
    function(preserveSlices) {
      this.photoshopFileOptions.preserveSlices = preserveSlices;
    };
Preferences.prototype.getPSDPreserveSlices =
    function() {
      return this.photoshopFileOptions.preserveSlices;
    };

/** Global access to preferences wrapper. */
var preferences2 = new Preferences2('Prepress Adobe Scripts');

/**
 * Wrapper of `Preferences` with simplified API.
 * @param {string} path
 */
function Preferences2(path) {
  checkNotNull(path);
  var prefix = path + '/';

  /**
   * Create another instance of preferences using current path suffixed with `relative` path.
   * @param {string} relative
   * @return {!Preferences2}
   */
  this.resolve =
      function(relative) {
        return new Preferences2(prefix + relative);
      };

  /**
   * Get boolean value from this preferences, returning true if not present.
   * @param {string} key
   * @return {boolean}
   */
  this.getBoolean =
      function(key) {
        var value = preferences.getBooleanPreference(prefix + key);
        println("Get bool preference '%s': '%s'.", key, value);
        return value;
      };

  /**
   * Get int value from this preferences, returning default if not present.
   * @param {string} key
   * @return {number}
   */
  this.getInt =
      function(key) {
        var value = preferences.getIntegerPreference(prefix + key);
        println("Get int preference '%s': '%d'.", key, value);
        return value;
      };

  /**
   * Get number value from this preferences, returning 0 if not present.
   * @param {string} key
   * @return {number}
   */
  this.getNumber =
      function(key) {
        var value = preferences.getRealPreference(prefix + key);
        println("Get num preference '%s': '%d'.", key, value);
        return value;
      };

  /**
   * Get string value from this preferences, returning default if not present.
   * @param {string} key
   * @param {string} defaultValue
   * @return {string}
   */
  this.getString =
      function(key, defaultValue) {
        print("Get str preference '%s': ", key);
        var value = preferences.getStringPreference(prefix + key);
        if (value === '') {
          println("not found, use default '%s'.", defaultValue);
          return defaultValue;
        }
        println("'%s'.", value);
        return value;
      };

  /**
   * Set boolean value of this preferences.
   * @param {string} key
   * @param {boolean} value
   */
  this.setBoolean =
      function(key, value) {
        var actualValue = value instanceof Function ? value() : value;
        preferences.setBooleanPreference(prefix + key, actualValue);
        println("Set bool preference '%s': '%d'.", key, actualValue);
      };

  /**
   * Set int value of this preferences.
   * @param {string} key
   * @param {number} value
   */
  this.setInt =
      function(key, value) {
        var actualValue = value instanceof Function ? value() : value;
        preferences.setIntegerPreference(prefix + key, actualValue);
        println("Set int preference '%s': '%d'.", key, actualValue);
      };

  /**
   * Set number value of this preferences.
   * @param {string} key
   * @param {number} value
   */
  this.setNumber =
      function(key, value) {
        var actualValue = value instanceof Function ? value() : value;
        preferences.setRealPreference(prefix + key, actualValue);
        println("Set num preference '%s': '%d'.", key, actualValue);
      };

  /**
   * Set string value of this preferences.
   * @param {string} key
   * @param {string} value
   */
  this.setString =
      function(key, value) {
        var actualValue = value instanceof Function ? value() : value;
        preferences.setStringPreference(prefix + key, actualValue);
        println("Set str preference '%s': '%s'.", key, actualValue);
      };

  /**
   * Remove preference from this preferences.
   * @param {string} key
   */
  this.remove =
      function(key) {
        preferences.removePreference(prefix + key);
        println("Remove preference '%s'.", key);
      };
}
