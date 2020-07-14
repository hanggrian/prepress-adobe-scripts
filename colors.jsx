/**
 * See https://illustrator-scripting-guide.readthedocs.io/jsobjref/Color/
 */

#target Illustrator

function registrationColor(document) {
    return document.swatches['[registration]'].color
}