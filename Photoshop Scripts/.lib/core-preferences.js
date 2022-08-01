/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/** Global access to preferences. */
var preferences = app.preferences

var PREFERENCES_ROOT = 'Prepress Adobe Scripts'

/** Global access to preferences wrapper. */
var preferences2 = new PreferencesWrapper(PREFERENCES_ROOT)

function PreferencesWrapper(path) {
  var descriptor
  try {
    descriptor = app.getCustomOptions(path)
  } catch (e) {
    descriptor = new ActionDescriptor()
  }

  this.resolve = function(relative) {
    return new PreferencesWrapper(path + '/' + relative)
  }

  /** Get boolean value from this preferences, returning default if not present. */
  this.getBoolean = function(key, defaultValue) {
    var actualKey = app.stringIDToTypeID(key)
    print('Get preference `{0}`: ', actualKey)
    if (!descriptor.hasKey(actualKey)) {
      println('not found, use default `{1}`', defaultValue)
      return defaultValue
    }
    var value = descriptor.getBoolean(actualKey)
    println('`{1}`', value)
    return value
  }

  /** Get string value from this preferences, returning default if not present. */
  this.getString = function(key, defaultValue) {
    var actualKey = app.stringIDToTypeID(key)
    print('Get preference `{0}`: ', actualKey)
    if (!descriptor.hasKey(actualKey)) {
      println('not found, use default `{1}`', defaultValue)
      return defaultValue
    }
    var value = descriptor.getString(actualKey)
    println('`{1}`', value)
    return value
  }

  this.editor = new PreferencesEditor(path, descriptor)

  this.edit = function(action) {
    var editor = new PreferencesEditor(path, descriptor)
    action(editor)
    editor.save()
  }
}

function PreferencesEditor(path, descriptor) {
  /** Set boolean value of this preferences. */
  this.setBoolean = function(key, value) {
    var actualValue = value instanceof Function ? value() : value
    descriptor.putBoolean(app.stringIDToTypeID(key), actualValue)
    println('Set preference `{0}`: `{1}`', key, actualValue)
  }

  /** Set string value of this preferences. */
  this.setString = function(key, value) {
    var actualValue = value instanceof Function ? value() : value
    descriptor.putString(app.stringIDToTypeID(key), actualValue)
    println('Set preference `{0}`: `{1}`', key, actualValue)
  }

  /** Remove preference from this preferences. */
  this.remove = function(key) {
    descriptor.erase(app.stringIDToTypeID(key))
    println('Remove preference `{0}`', key)
  }

  this.save = function() {
    app.putCustomOptions(path, descriptor, true)
    println('Save preferences')
  }
}
