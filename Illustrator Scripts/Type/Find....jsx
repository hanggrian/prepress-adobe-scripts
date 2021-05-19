#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [30, 21]

var dialog = new Dialog('Find Types')
var findEdit, textRadio, layerRadio, fontRadio, matchCaseCheck, matchWordCheck

dialog.hgroup(function(group) {
    group.staticText(BOUNDS_TEXT, 'Find:', JUSTIFY_RIGHT)
    findEdit = group.editText([200, 21], undefined, ACTIVATE)
})
dialog.hgroup(function(group) {
    group.staticText(BOUNDS_TEXT, 'In:', JUSTIFY_RIGHT)
    textRadio = group.radioButton(undefined, 'Text', function(it) {
        it.value = preferences.getNumber(dialog, 'In') === 0
    })
    layerRadio = group.radioButton(undefined, 'Layer', function(it) {
        it.value = preferences.getNumber(dialog, 'In') === 1
    })
    fontRadio = group.radioButton(undefined, 'Font', function(it) {
        it.value = preferences.getNumber(dialog, 'In') === 2
    })
})
matchCaseCheck = dialog.checkBox(undefined, 'Match Case', function(it) {
    it.value = preferences.getBoolean(dialog, 'Match Case')
})
matchWordCheck = dialog.checkBox(undefined, 'Match Whole Word', function(it) {
    it.value = preferences.getBoolean(dialog, 'Match Whole Word')
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    preferences.setNumber(dialog, 'In', function() {
        if (textRadio.value) return 0 
        else if (textRadio.value) return 1
        else return 2
    })
    preferences.setBoolean(dialog, 'Match Case', matchCaseCheck.value)
    preferences.setBoolean(dialog, 'Match Whole Word', matchWordCheck.value)

    var substring = findEdit.text
    selectAll(['TextFrame'], function(it) {
        var string
        if (textRadio.value) {
            string = it.contents
        } else if (layerRadio.value) {
            string = it.name
        } else {
            it.textRange.characterAttributes.textFont.let(function(it) { string = it.family + ' ' + it.style })
        }
        if (!matchCaseCheck.value) {
            string = string.toLowerCase()
            substring = substring.toLowerCase()
        }
        return find(string, substring)
    })
})
dialog.show()

function find(string, substring) {
    if (!matchWordCheck.value) {
        return string.includes(substring)
    } else {
        // https://stackoverflow.com/questions/18740664/search-whole-word-in-string
        substring = substring.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        return string.match(new RegExp('\\b' + substring + '\\b', 'i')) !== null
    }
}