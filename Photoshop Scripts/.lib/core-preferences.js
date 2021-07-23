/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var _preferencesRoot = 'Prepress Adobe Scripts/'

/** Global access to preferences. */
var preferences = new Preferences()

/** Alias of `ActionDescriptor.getBoolean`. */
Preferences.prototype.getBoolean = function(key) {
    var value
    try {
        var descriptor = app.getCustomOptions(_preferencesRoot)
        var actualKey = _getPreferenceKey(key)
        value = descriptor.hasKey(actualKey) ? descriptor.getBoolean(actualKey) : false
    } catch (e) {
        value = false
    }
    $.writeln('Preference `' + key + '=' + value + '` obtained')
    return value
}

/** Alias of `ActionDescriptor.getBoolean`. */
Preferences.prototype.getString = function(key) {
    var value
    try {
        var descriptor = app.getCustomOptions(_preferencesRoot)
        var actualKey = _getPreferenceKey(key)
        value = descriptor.hasKey(actualKey) ? descriptor.getString(actualKey) : ''
    } catch (e) {
        value = ''
    }
    $.writeln('Preference `' + key + '=' + value + '` obtained')
    return value
}

/** Alias of `ActionDescriptor.putBoolean`. */
Preferences.prototype.setBoolean = function(key, value) {
    var descriptor = new ActionDescriptor()
    var actualKey = _getPreferenceKey(key)
    var actualValue = _getPreferenceValue(value)
    descriptor.putBoolean(actualKey, actualValue)
    app.putCustomOptions(_preferencesRoot, descriptor, true)
    $.writeln('Preference `' + key + '=' + actualValue + '` stored')
}

/** Alias of `ActionDescriptor.putString`. */
Preferences.prototype.setString = function(key, value) {
    var descriptor = new ActionDescriptor()
    var actualKey = _getPreferenceKey(key)
    var actualValue = _getPreferenceValue(value)
    descriptor.putString(actualKey, actualValue)
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