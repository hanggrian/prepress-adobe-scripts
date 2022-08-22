/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/** Global access to preferences. */
var preferences = app.preferences

var PREFERENCES_ROOT = "Prepress Adobe Scripts"

/** Global access to preferences wrapper. */
var preferences2 = new PreferencesWrapper(PREFERENCES_ROOT)

/**
 * Wrapper of `Preferences` with simplified API.
 * @param {String} path hierarcy of preferences.
 */
function PreferencesWrapper(path) {
  var descriptor
  try {
    descriptor = app.getCustomOptions(path)
  } catch (e) {
    descriptor = new ActionDescriptor()
  }

  /**
   * Create another instance of preferences using current path suffixed with `relative` path.
   * @param {String} relative relative file path.
   * @returns {Boolean}
   */
  this.resolve = function(relative) {
    return new PreferencesWrapper(path + "/" + relative)
  }

  /**
   * Get boolean value from this preferences, returning default if not present.
   * @param {String} key preference's key.
   * @param {Boolean} defaultValue value to use when preference is not found.
   * @returns {Boolean}
   */
  this.getBoolean = function(key, defaultValue) {
    var actualKey = app.stringIDToTypeID(key)
    print("Get preference `%s`: ", actualKey)
    if (!descriptor.hasKey(actualKey)) {
      println("not found, use default `%s`.", defaultValue)
      return defaultValue
    }
    var value = descriptor.getBoolean(actualKey)
    println("`%s`.", value)
    return value
  }

  /**
   * Get string value from this preferences, returning default if not present.
   * @param {String} key preference's key.
   * @param {String} defaultValue value to use when preference is not found.
   * @returns {String}
   */
  this.getString = function(key, defaultValue) {
    var actualKey = app.stringIDToTypeID(key)
    print("Get preference `%s`: ", actualKey)
    if (!descriptor.hasKey(actualKey)) {
      println("not found, use default `%s`.", defaultValue)
      return defaultValue
    }
    var value = descriptor.getString(actualKey)
    println("`%s`.", value)
    return value
  }

  this.editor = new PreferencesEditor(path, descriptor)

  /**
   * Open DSL to configure preferences.
   * @param {Function} action runnable with editor as parameter.
   */
  this.edit = function(action) {
    var editor = new PreferencesEditor(path, descriptor)
    action(editor)
    editor.save()
  }
}

/**
 * A class to edit values of preferences.
 * Any configuration is queued until `save` is called.
 * @param {String} path hierarcy of preferences.
 * @param {ActionDescriptor} descriptor inherited from `PreferencesWrapper`.
 */
function PreferencesEditor(path, descriptor) {
  /**
   * Set boolean value of this preferences.
   * @param {String} key preference's key.
   * @param {Boolean} value preference's value to store.
   */
  this.setBoolean = function(key, value) {
    var actualValue = value instanceof Function ? value() : value
    descriptor.putBoolean(app.stringIDToTypeID(key), actualValue)
    println("Set preference `%s`: `%s`.", key, actualValue)
  }

  /**
   * Set string value of this preferences.
   * @param {String} key preference's key.
   * @param {String} value preference's value to store.
   */
  this.setString = function(key, value) {
    var actualValue = value instanceof Function ? value() : value
    descriptor.putString(app.stringIDToTypeID(key), actualValue)
    println("Set preference `%s`: `%s`.", key, actualValue)
  }

  /**
   * Remove preference from this preferences.
   * @param {String} key preference's key.
   */
  this.remove = function(key) {
    descriptor.erase(app.stringIDToTypeID(key))
    println("Remove preference `%s`.", key)
  }

  /** Confirm all the changes to this editor. */
  this.save = function() {
    app.putCustomOptions(path, descriptor, true)
    println("Save preferences.")
  }
}
