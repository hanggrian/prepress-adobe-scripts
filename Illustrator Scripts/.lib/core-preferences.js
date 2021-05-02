const PREFERENCES_ROOT = 'Prepress Adobe Scripts/'

/** Alias of `getBooleanPreference`. */
Object.prototype.getBoolean = function(dialog, key) {
    checkTypename(this, 'Preferences')
    return this.getBooleanPreference(_getPreferenceKey(dialog, key))
}

/** Alias of `getRealPreference`. */
Object.prototype.getNumber = function(dialog, key) {
    checkTypename(this, 'Preferences')
    return this.getRealPreference(_getPreferenceKey(dialog, key))
}

/** Alias of `getStringPreference`. */
Object.prototype.getString = function(dialog, key) {
    checkTypename(this, 'Preferences')
    return this.getStringPreference(_getPreferenceKey(dialog, key))
}

/** Alias of `setBooleanPreference`. */
Object.prototype.setBoolean = function(dialog, key, value) {
    checkTypename(this, 'Preferences')
    this.setBooleanPreference(_getPreferenceKey(dialog, key), value)
}

/** Alias of `setRealPreference`. */
Object.prototype.setNumber = function(dialog, key, value) {
    checkTypename(this, 'Preferences')
    this.setRealPreference(_getPreferenceKey(dialog, key), value)
}

/** Alias of `setStringPreference`. */
Object.prototype.setString = function(dialog, key, value) {
    checkTypename(this, 'Preferences')
    this.setStringPreference(_getPreferenceKey(dialog, key), value)
}

/** Alias of `removePreference`. */
Object.prototype.remove = function(dialog, key) {
    checkTypename(this, 'Preferences')
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