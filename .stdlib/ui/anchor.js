/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var BOUNDS_ANCHOR_RADIO = [15, 15]

function AnchorGroup(parent, radioSpacing) {
    var self = this
    this.topLeftRadio, this.topRadio, this.topRightRadio
    this.leftRadio, this.centerRadio, this.rightRadio
    this.bottomLeftRadio, this.bottomRadio, this.bottomRightRadio

    this.main = parent.vgroup(function(mainGroup) {
        if (radioSpacing !== undefined) {
            mainGroup.spacing = radioSpacing
        }
        mainGroup.hgroup(function(group) {
            if (radioSpacing !== undefined) {
                group.spacing = 0
            }
            self.topLeftRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(it) {
                it.setTooltip('Top left')
                registerRadioClick(it)
            })
            self.topRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(it) {
                it.setTooltip('Top')
                registerRadioClick(it)
            })
            self.topRightRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(it) {
                it.setTooltip('Top right')
                registerRadioClick(it)
            })
        })
        mainGroup.hgroup(function(group) {
            if (radioSpacing !== undefined) {
                group.spacing = 0
            }
            self.leftRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(it) {
                it.setTooltip('Left')
                registerRadioClick(it)
            })
            self.centerRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(it) {
                it.setTooltip('Center')
                it.select()
                registerRadioClick(it)
            })
            self.rightRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(it) {
                it.setTooltip('Right')
                registerRadioClick(it)
            })
        })
        mainGroup.hgroup(function(group) {
            if (radioSpacing !== undefined) {
                group.spacing = 0
            }
            self.bottomLeftRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(it) {
                it.setTooltip('Bottom left')
                registerRadioClick(it)
            })
            self.bottomRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(it) {
                it.setTooltip('Bottom')
                registerRadioClick(it)
            })
            self.bottomRightRadio = group.radioButton(BOUNDS_ANCHOR_RADIO, undefined, function(it) {
                it.setTooltip('Bottom right')
                registerRadioClick(it)
            })
        })
    })

    // Ai
    this.getTransformation = function() {
        if (self.topLeftRadio.value) {
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

    // Psd
    this.getAnchorPosition = function() {
        if (self.topLeftRadio.value) {
            return AnchorPosition.TOPLEFT
        } else if (self.topRadio.value) {
            return AnchorPosition.TOPCENTER
        } else if (self.topRightRadio.value) {
            return AnchorPosition.TOPRIGHT
        } else if (self.leftRadio.value) {
            return AnchorPosition.MIDDLELEFT
        } else if (self.centerRadio.value) {
            return AnchorPosition.MIDDLECENTER
        } else if (self.rightRadio.value) {
            return AnchorPosition.MIDDLERIGHT
        } else if (self.bottomLeftRadio.value) {
            return AnchorPosition.BOTTOMLEFT
        } else if (self.bottomRadio.value) {
            return AnchorPosition.BOTTOMCENTER
        } else {
            return AnchorPosition.BOTTOMRIGHT
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