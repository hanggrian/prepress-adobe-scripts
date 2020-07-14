#target Illustrator

function checkActiveDocument() {
    if (app.documents.length <= 0) {
        throw 'No active document'
    }
}

function checkEvenArtboards(document) {
    if (document.artboards.length % 2 != 0) {
        throw 'Odd number of pages'
    }
}

function checkSingleSelection(selection) {
    if (selection == null || selection.length == 0) {
        throw 'No selection'
    }
    if (selection.length > 1) {
        throw 'Multiple selection is not supported'
    } 
}

function checkTypename(item, typename) {
    if (item.typename != typename) {
        throw 'Selected item is not a ' + typename
    }
}