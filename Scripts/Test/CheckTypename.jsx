#target Illustrator

var selection = app.activeDocument.selection
var typenames = ''
for (var i = 0; i < selection.length; i++) {
    typenames += selection[i].typename + '\n'
}
if (typenames == '') {
    typenames = 'No selection.'
}

Window.alert(typenames)