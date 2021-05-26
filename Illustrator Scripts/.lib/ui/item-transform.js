var BOUNDS_ANCHOR_RADIO = [15, 15]

function ItemChangePanel(parent) {
    var self = this
    this.changePositionsCheck
    this.changeFillPatternsCheck
    this.changeFillGradientsCheck
    this.changeStrokePatternsCheck

    this.main = parent.vpanel('Change', function(panel) {
        panel.alignChildren = 'fill'
        self.changePositionsCheck = panel.checkBox(undefined, 'Positions', function(check) {
            check.helpTip = 'Are art object positions and orientations effected?'
            check.value = true
        })
        self.changeFillPatternsCheck = panel.checkBox(undefined, 'Fill Patterns', function(check) {
            check.helpTip = 'Are the fill patterns assigned to paths to be transformed?'
            check.value = true
        })
        self.changeFillGradientsCheck = panel.checkBox(undefined, 'Fill Gradients', function(check) {
            check.helpTip = 'Are the fill gradients assigned to paths to be transformed?'
            check.value = true
        })
        self.changeStrokePatternsCheck = panel.checkBox(undefined, 'Stroke Patterns', function(check) {
            check.helpTip = 'Are the stroke patterns assigned to paths to be transformed?'
            check.value = true
        })
    })

    this.isPositions = function() { return self.changePositionsCheck.value }
    this.isFillPatterns = function() { return self.changeFillPatternsCheck.value }
    this.isFillGradients = function() { return self.changeFillGradientsCheck.value }
    this.isStrokePatterns = function() { return self.changeStrokePatternsCheck.value }
}

function ItemAnchorPanel(parent) {
    var self = this
    this.documentOrigin
    this.row1, this.row2, this.row3
    this.topLeftRadio, this.topRadio, this.topRightRadio
    this.leftRadio, this.centerRadio, this.rightRadio
    this.bottomLeftRadio, this.bottomRadio, this.bottomRightRadio

    this.main = parent.vpanel('Anchor', function(panel) {
        panel.alignChildren = 'fill'

        self.documentOrigin = panel.checkBox(undefined, 'Default', function(it) {
            it.helpTip = 'Use current reference point preference.'
            it.onClick = function() {
                self.row1.enabled = !self.documentOrigin.value
                self.row2.enabled = !self.documentOrigin.value
                self.row3.enabled = !self.documentOrigin.value
            }
        })

        self.row1 = panel.hgroup(function(group) {
            group.setHelpTips('Reference point.')
            self.topLeftRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(radio) { registerRadioClick(radio) })
            self.topRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(radio) { registerRadioClick(radio) })
            self.topRightRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(radio) { registerRadioClick(radio) })
        })
        self.row2 = panel.hgroup(function(group) {
            group.setHelpTips('Reference point.')
            self.leftRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(radio) { registerRadioClick(radio) })
            self.centerRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(radio) {
                radio.value = true
                registerRadioClick(radio)
            })
            self.rightRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(radio) { registerRadioClick(radio) })
        })
        self.row3 = panel.hgroup(function(group) {
            group.setHelpTips('Reference point.')
            self.bottomLeftRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(radio) { registerRadioClick(radio) })
            self.bottomRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(radio) { registerRadioClick(radio) })
            self.bottomRightRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(radio) { registerRadioClick(radio) })
        })
    })

    this.getTransformation = function() {
        if (self.documentOrigin.value) {
            return Transformation.DOCUMENTORIGIN
        } else if (self.topLeftRadio.value) {
            return Transformation.TOPLEFT
        } else if (self.topRadio.value) {
            return Transformation.TOP
        } else if (self.topRightRadio.value) {
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