function registrationColor() {
    return document.swatches['[registration]'].color
}

function parseColor(color) {
    switch (color) {
        case 'Registration':
            return registrationColor()
        case 'White':
            return new CMYKColor(0, 0, 0, 0)
        default:
            return new NoColor()
    }
}