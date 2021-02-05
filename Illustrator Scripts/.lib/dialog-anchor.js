function DialogAnchor() {
    var self = this

    this.topLeft, this.top, this.topRight
    this.left, this.center, this.right
    this.bottomLeft, this.bottom, this.bottomRight

    this.getGroup = function(parent) {
        var anchor = parent.addHGroup()
        var radioBounds = [0, 0, 15, 15]
    
        anchor.alignChildren = 'top'
        anchor.addText([0, 0, 50, 21], 'Anchor:', 'right')
        anchor.row = anchor.addVGroup()
        anchor.row1 = anchor.row.addHGroup()
        anchor.row2 = anchor.row.addHGroup()
        anchor.row3 = anchor.row.addHGroup()
        
        self.topLeft = anchor.row1.addRadioButton(radioBounds)
        self.top = anchor.row1.addRadioButton(radioBounds)
        self.topRight = anchor.row1.addRadioButton(radioBounds)
        self.left = anchor.row2.addRadioButton(radioBounds)
        self.center = anchor.row2.addRadioButton(radioBounds)
        self.center.value = true
        self.right = anchor.row2.addRadioButton(radioBounds)
        self.bottomLeft = anchor.row3.addRadioButton(radioBounds)
        self.bottomCenter = anchor.row3.addRadioButton(radioBounds)
        self.bottomRight = anchor.row3.addRadioButton(radioBounds)
    
        return anchor
    }

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