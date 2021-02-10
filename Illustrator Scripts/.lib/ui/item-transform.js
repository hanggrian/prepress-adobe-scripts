function ItemChange(parent) {
    var self = this
    var main = parent.addHGroup('top')

    main.addText(textBounds, 'Change:', 'right')
    this.checks = main.addVGroup('fill')
    this.changePositionsCheck = this.checks.addCheckBox(undefined, 'Positions')
    this.changePositionsCheck.helpTip = 'Are art object positions and orientations effected?'
    this.changeFillPatternsCheck = this.checks.addCheckBox(undefined, 'Fill Patterns')
    this.changeFillPatternsCheck.helpTip = 'Are the fill patterns assigned to paths to be transformed?'
    this.changeFillGradientsCheck = this.checks.addCheckBox(undefined, 'Fill Gradients')
    this.changeFillGradientsCheck.helpTip = 'Are the fill gradients assigned to paths to be transformed?'
    this.changeStrokePatternCheck = this.checks.addCheckBox(undefined, 'Stroke Pattern')
    this.changeStrokePatternCheck.helpTip = 'Are the stroke patterns assigned to paths to be transformed?'
    this.checks.children.forEach(function(it) { it.value = true }) // default is all true

    this.isPositions = function() { return self.changePositionsCheck.value }
    this.isFillPatterns = function() { return self.changeFillPatternsCheck.value }
    this.isFillGradients = function() { return self.changeFillGradientsCheck.value }
    this.isStrokePattern = function() { return self.changeStrokePatternCheck.value }
}

function ItemAnchor(parent) {
    var self = this
    var main = parent.addVPanel('Anchor')
    main.alignChildren = 'fill'

    this.documentOrigin = main.addCheckBox(undefined, 'Default')
    this.documentOrigin.helpTip = 'Use current reference point preference.'
    this.documentOrigin.onClick = function() {
        self.row1.enabled = !self.documentOrigin.value
        self.row2.enabled = !self.documentOrigin.value
        self.row3.enabled = !self.documentOrigin.value
    }

    this.row1 = main.addHGroup()
    this.row2 = main.addHGroup()
    this.row3 = main.addHGroup()
    
    var radioBounds = [0, 0, 15, 15]

    this.topLeftRadio = this.row1.addRadioButton(radioBounds)
    this.topRadio = this.row1.addRadioButton(radioBounds)
    this.topRightRadio = this.row1.addRadioButton(radioBounds)
    this.leftRadio = this.row2.addRadioButton(radioBounds)
    this.centerRadio = this.row2.addRadioButton(radioBounds)
    this.centerRadio.value = true
    this.rightRadio = this.row2.addRadioButton(radioBounds)
    this.bottomLeftRadio = this.row3.addRadioButton(radioBounds)
    this.bottomRadio = this.row3.addRadioButton(radioBounds)
    this.bottomRightRadio = this.row3.addRadioButton(radioBounds)

    this.row1.setTooltip('Reference point.')
    this.row2.setTooltip('Reference point.')
    this.row3.setTooltip('Reference point.')

    registerRadioClick(this.topLeftRadio)
    registerRadioClick(this.topRadio)
    registerRadioClick(this.topRightRadio)
    registerRadioClick(this.leftRadio)
    registerRadioClick(this.centerRadio)
    registerRadioClick(this.rightRadio)
    registerRadioClick(this.bottomLeftRadio)
    registerRadioClick(this.bottomRadio)
    registerRadioClick(this.bottomRightRadio)

    this.getTransformation = function() {
        if (self.documentOrigin.value) {
            return Transformation.DOCUMENTORIGIN
        } else if (self.topLeftRadio.value) {
            return Transformation.TOPLEFT
        } else if (self.topRightRadio.value) {
            return Transformation.TOP
        } else if (self.topRadio.value) {
            return Transformation.TOPRIGHT
        } else if (self.leftRadio.value) {
            return Transformation.LEFT
        } else if (self.centerRadio.value) {
            return Transformation.CENTER
        } else if (self.rightRadio.value) {
            return Transformation.RIGHT
        } else if (self.bottomLeftRadio.value) {
            return Transformation.BOTTOMLEFT
        } else if (self.bottomRadio.value) {
            return Transformation.BOTTOM
        } else {
            return Transformation.BOTTOMRIGHT
        }
    }

    function registerRadioClick(radio) {
        radio.onClick = function() {
            if (radio != self.topLeftRadio) self.topLeftRadio.value = false
            if (radio != self.topRadio) self.topRadio.value = false
            if (radio != self.topRightRadio) self.topRightRadio.value = false
            if (radio != self.leftRadio) self.leftRadio.value = false
            if (radio != self.centerRadio) self.centerRadio.value = false
            if (radio != self.rightRadio) self.rightRadio.value = false
            if (radio != self.bottomLeftRadio) self.bottomLeftRadio.value = false
            if (radio != self.bottomRadio) self.bottomRadio.value = false
            if (radio != self.bottomRightRadio) self.bottomRightRadio.value = false
        }
    }
}