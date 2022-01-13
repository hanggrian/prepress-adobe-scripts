/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add children to group.
 * @returns {Object}
 */
Group.prototype.radiosCheckBox = function(text, radios) { return _radiosCheckBox(this, text, radios) }

/**
 * Add children to panel.
 * @returns {Object}
 */
Panel.prototype.radiosCheckBox = function(text, radios) { return _radiosCheckBox(this, text, radios) }

function _radiosCheckBox(parent, text, radioTexts) {
    var result = _group(parent, 'row')
    result.check = _checkBox(result, undefined, text)
    result.radios = []
    for (var i = 0; i < radioTexts.length; i++) {
        var radio = _radioButton(result, undefined, radioTexts[i])
        radio.enabled = false
        if (i === 0) {
            radio.select()
        }
        result.radios.push(radio)
    }
    result.check.onClick = function() {
        if (result.checkOnClick !== undefined) {
            result.checkOnClick()
        }
        for (var i = 0; i < radioTexts.length; i++) {
            result.radios[i].enabled = result.check.value
        }
    }

    result.isSelected = function() {
        return result.check.value
    }
    result.getSelectedRadio = function() {
        for (var i = 0; i < radioTexts.length; i++) {
            if (result.radios[i].value) {
                return result.radios[i].text
            }
        }
    }

    return result
}