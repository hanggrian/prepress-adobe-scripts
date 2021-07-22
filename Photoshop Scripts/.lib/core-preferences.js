var _preferencesRoot = 'Prepress Adobe Scripts/'

/** Global access to preferences. */
var preferences = new Preferences()

/** Alias of `getBooleanPreference`. */
Preferences.prototype.getBoolean = function(key) {
    var actualKey = _getPreferenceKey(key)
    var value = app.getCustomOptions(_preferencesRoot).getBoolean(actualKey)
    $.writeln('Preference `' + key + '=' + value + '` obtained')
    return value
}

/** Alias of `setBooleanPreference`. */
Preferences.prototype.setBoolean = function(key, value) {
    var actualKey = _getPreferenceKey(key)
    var actualValue = _getPreferenceValue(value)
    var descriptor = new ActionDescriptor()
    descriptor.putBoolean(actualKey, actualValue)
    app.putCustomOptions(_preferencesRoot, descriptor, true)
    $.writeln('Preference `' + key + '=' + actualValue + '` stored')
}

function _getPreferenceKey(key) {
    return app.stringIDToTypeID(key)
}

function _getPreferenceValue(value) {
    return value instanceof Function ? value() : value
}

function Preferences() { }