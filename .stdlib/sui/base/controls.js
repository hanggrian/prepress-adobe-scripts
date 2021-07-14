/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var ACTIVATE = function(editText) { editText.activate() }
var VALIDATE_DIGITS = function(editText) { editText.validateDigits() }
var VALIDATE_UNITS = function(editText) { editText.validateUnits() }

var JUSTIFY_LEFT = function(staticText) { staticText.justify = 'left' }
var JUSTIFY_CENTER = function(staticText) { staticText.justify = 'center' }
var JUSTIFY_RIGHT = function(staticText) { staticText.justify = 'right' }

var SELECTED = function(toggle) { toggle.select() }

var CONTROL_UNAVAILABLE = function(control) {
    control.enabled = false
    _setTooltip(control, 'This feature is not yet available')
}

/** Focus on this edit text. */
EditText.prototype.activate = function() { if (!this.active) this.active = true }

/** Select this check box. */
Checkbox.prototype.select = function() { if (!this.value) this.value = true }

/** Select this radio button. */
RadioButton.prototype.select = function() { if (!this.value) this.value = true }

/** Returns true if this list has a selection. */
DropDownList.prototype.hasSelection = function() { return this.selection !== null }

/** Change selection to ListItem with `text`. */
DropDownList.prototype.selectText = function(text) { this.selection = this.items.map(function(it) { return it.text }).indexOf(text) }

function _expandBounds(bounds) {
    return bounds !== undefined && bounds.length === 2
        ? [0, 0, bounds[0], bounds[1]]
        : bounds
}