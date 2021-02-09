function Anchor(parent) {
    var self = this

    var main = parent.addHGroup()
    var radioBounds = [0, 0, 15, 15]

    main.alignChildren = 'top'
    main.addText([0, 0, 50, 21], 'Anchor:', 'right')
    main.row = main.addVGroup()
    main.row1 = main.row.addHGroup()
    main.row1.addEventListener('click', function() {
        main.row2.children.forEach(function(it) { it.value = false })
        main.row3.children.forEach(function(it) { it.value = false })
    })
    main.row2 = main.row.addHGroup()
    main.row2.addEventListener('click', function() {
        main.row1.children.forEach(function(it) { it.value = false })
        main.row3.children.forEach(function(it) { it.value = false })
    })
    main.row3 = main.row.addHGroup()
    main.row3.addEventListener('click', function() {
        main.row1.children.forEach(function(it) { it.value = false })
        main.row2.children.forEach(function(it) { it.value = false })
    })
    
    this.topLeft = main.row1.addRadioButton(radioBounds)
    this.top = main.row1.addRadioButton(radioBounds)
    this.topRight = main.row1.addRadioButton(radioBounds)
    this.left = main.row2.addRadioButton(radioBounds)
    this.center = main.row2.addRadioButton(radioBounds)
    this.center.value = true
    this.right = main.row2.addRadioButton(radioBounds)
    this.bottomLeft = main.row3.addRadioButton(radioBounds)
    this.bottomCenter = main.row3.addRadioButton(radioBounds)
    this.bottomRight = main.row3.addRadioButton(radioBounds)

    this.getTransformation = function() {
        if (self.topLeft.value) {
            return Transformation.TOPLEFT
        } else if (self.top.value) {
            return Transformation.TOP
        } else if (self.topRight.value) {
            return Transformation.TOPRIGHT
        } else if (self.left.value) {
            return Transformation.LEFT
        } else if (self.center.value) {
            return Transformation.CENTER
        } else if (self.right.value) {
            return Transformation.RIGHT
        } else if (self.bottomLeft.value) {
            return Transformation.BOTTOMLEFT
        } else if (self.bottom.value) {
            return Transformation.BOTTOM
        } else {
            return Transformation.BOTTOMRIGHT
        }
    }
}