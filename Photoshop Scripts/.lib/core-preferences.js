/** Global access to preferences. */
var preferences = app.preferences

/** Global access to preferences wrapper. */
var preferences2 = new Preferences2('Prepress Adobe Scripts')

/**
 * Wrapper of `Preferences` with simplified API.
 * @param {string} path
 */
function Preferences2(path) {
  checkNotNull(path)
  var descriptor
  try {
    descriptor = app.getCustomOptions(path)
  } catch (e) {
    descriptor = new ActionDescriptor()
  }

  /**
   * Create another instance of preferences using current path suffixed with `relative` path.
   * @param {string} relative
   * @return {!Preferences2}
   */
  this.resolve = function(relative) { return new Preferences2(path + '/' + relative) }

  /**
   * Get boolean value from this preferences, returning default if not present.
   * @param {string} key
   * @param {boolean} defaultValue
   * @return {boolean}
   */
  this.getBoolean = function(key, defaultValue) {
    var actualKey = app.stringIDToTypeID(key)
    print('Get bool preference \'%s\': ', key)
    if (!descriptor.hasKey(actualKey)) {
      println('not found, use default \'%s\'.', defaultValue)
      return defaultValue
    }
    var value = descriptor.getBoolean(actualKey)
    println('`%s`.', value)
    return value
  }

  /**
   * Get integer value from this preferences, returning default if not present.
   * @param {string} key
   * @param {number} defaultValue
   * @return {number}
   */
  this.getInt = function(key, defaultValue) {
    var actualKey = app.stringIDToTypeID(key)
    print('Get int preference \'%s\': ', key)
    if (!descriptor.hasKey(actualKey)) {
      println('not found, use default \'%s\'.', defaultValue)
      return defaultValue
    }
    var value = descriptor.getInteger(actualKey)
    println('\'%s\'.', value)
    return value
  }

  /**
   * Get double value from this preferences, returning default if not present.
   * @param {string} key
   * @param {number} defaultValue
   * @return {number}
   */
  this.getDouble = function(key, defaultValue) {
    var actualKey = app.stringIDToTypeID(key)
    print('Get dbl preference \'%s\': ', key)
    if (!descriptor.hasKey(actualKey)) {
      println('not found, use default \'%s\'.', defaultValue)
      return defaultValue
    }
    var value = descriptor.getDouble(actualKey)
    println('\'%s\'.', value)
    return value
  }

  /**
   * Get string value from this preferences, returning default if not present.
   * @param {string} key
   * @param {string} defaultValue
   * @return {string}
   */
  this.getString = function(key, defaultValue) {
    var actualKey = app.stringIDToTypeID(key)
    print('Get str preference \'%s\': ', key)
    if (!descriptor.hasKey(actualKey)) {
      println('not found, use default \'%s\'.', defaultValue)
      return defaultValue
    }
    var value = descriptor.getString(actualKey)
    println('\'%s\'.', value)
    return value
  }

  this.editor = new Editor(path, descriptor)

  /**
   * Open DSL to configure preferences.
   * @param {function(!Editor): undefined} action
   */
  this.edit = function(action) {
    var editor = new Editor(path, descriptor)
    action(editor)
    editor.save()
  }

  /**
   * A class to edit values of preferences. Any configuration is queued until `save` is called.
   * @param {string} path
   * @param {!ActionDescriptor} descriptor
   */
  function Editor(path, descriptor) {
    checkNotNull(descriptor)
    /**
     * Set boolean value of this preferences.
     * @param {string} key
     * @param {boolean} value
     */
    this.setBoolean = function(key, value) {
      var actualValue = value instanceof Function ? value() : value
      descriptor.putBoolean(app.stringIDToTypeID(key), actualValue)
      println('Set bool preference \'%s\': \'%s\'.', key, actualValue)
    }

    /**
     * Set integer value of this preferences.
     * @param {string} key
     * @param {boolean} value
     */
    this.setInt = function(key, value) {
      var actualValue = value instanceof Function ? value() : value
      descriptor.putInteger(app.stringIDToTypeID(key), actualValue)
      println('Set int preference \'%s\': \'%s\'.', key, actualValue)
    }

    /**
     * Set double value of this preferences.
     * @param {string} key
     * @param {boolean} value preference's value to store.
     */
    this.setDouble = function(key, value) {
      var actualValue = value instanceof Function ? value() : value
      descriptor.putDouble(app.stringIDToTypeID(key), actualValue)
      println('Set dbl preference \'%s\': \'%s\'.', key, actualValue)
    }

    /**
     * Set string value of this preferences.
     * @param {string} key
     * @param {string} value
     */
    this.setString = function(key, value) {
      var actualValue = value instanceof Function ? value() : value
      descriptor.putString(app.stringIDToTypeID(key), actualValue)
      println('Set str preference \'%s\': \'%s\'.', key, actualValue)
    }

    /**
     * Remove preference from this preferences.
     * @param {string} key
     */
    this.remove = function(key) {
      descriptor.erase(app.stringIDToTypeID(key))
      println('Remove preference \'%s\'.', key)
    }

    /** Confirm all the changes to this editor. */
    this.save = function() {
      app.putCustomOptions(path, descriptor, true)
      println('Save preferences.')
    }
  }
}
