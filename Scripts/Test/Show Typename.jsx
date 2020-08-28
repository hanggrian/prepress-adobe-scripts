#target Illustrator
#include '../.lib/core.js'

var typenames = ''
for (var i = 0; i < selection.length; i++) {
    typenames += selection[i].typename + '\n'
}
if (typenames == '') {
    typenames = 'No selection.'
}

alert(typenames)