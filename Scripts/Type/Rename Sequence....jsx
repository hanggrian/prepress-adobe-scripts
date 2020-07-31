#target Illustrator
#include '../.lib/preconditions.js'

const ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

const BOUNDS_TEXT = [0, 0, 65, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkHasSelection()

var dialog = new Window('dialog', 'Rename sequence')
dialog.alignChildren = 'fill'

dialog.main = dialog.add('panel', undefined, 'Sequence')
dialog.reverse = dialog.add('group')
dialog.buttons = dialog.add('group')

dialog.main.alignChildren = 'fill'
dialog.main.add('group')
dialog.main.stops = dialog.main.add('group')
dialog.main.stops.add('statictext', BOUNDS_TEXT, 'Stops at:').justify = 'right'
var list = dialog.main.stops.add('dropdownlist', undefined, ALPHABETS)
list.selection = 1
dialog.main.space = dialog.main.add('group')
dialog.main.space.add('statictext', BOUNDS_TEXT, 'Add space:').justify = 'right'
var spaceCheck = dialog.main.space.add('checkbox', undefined)

dialog.reverse.alignment = 'right'
var reverseCheck = dialog.reverse.add('checkbox', undefined, 'Reverse order')

var prefix = 1
var count = 0
var stopsAt

dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()
    
    for (var i = 0; i < ALPHABETS.length; i++) {
        if (ALPHABETS[i] == list.selection.text) {
            stopsAt = i + 1
        }
    }

    if (!reverseCheck.value) {
        for (var i = 0; i < selection.length; i++) {
            rename(selection[i])
        }
    } else {
        for (var i = selection.length - 1; i >= 0; i--) {
            rename(selection[i])
        }
    }
}

dialog.show()

function rename(item) {
    if (item.typename == 'TextFrame') {
        var s = prefix.toString()
        if (spaceCheck.value) {
            s += ' '
        }
        s += ALPHABETS[count]

        var words = item.words
        words.removeAll()
        words.add(s)

        count++
        if (count == stopsAt) {
            prefix++
            count = 0
        }
    }
}