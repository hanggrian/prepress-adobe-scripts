/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var BOUNDS_ANCHOR_RADIO = [15, 15]

function AnchorGroup(parent, isPsd) {
  var self = this
  this.topLeftRadio, this.topRadio, this.topRightRadio
  this.leftRadio, this.centerRadio, this.rightRadio
  this.bottomLeftRadio, this.bottomRadio, this.bottomRightRadio

  isPsd = isPsd === undefined ? false : true
  this.main = parent.vgroup(function(topGroup) {
    topGroup.hgroup(function(group) {
      if (isPsd) {
        group.spacing = 0
      }
      self.topLeftRadio = group.radioButton(BOUNDS_ANCHOR_RADIO).also(function(it) {
        it.tip("Top left")
        registerRadioClick(it)
      })
      self.topRadio = group.radioButton(BOUNDS_ANCHOR_RADIO).also(function(it) {
        it.tip("Top")
        registerRadioClick(it)
      })
      self.topRightRadio = group.radioButton(BOUNDS_ANCHOR_RADIO).also(function(it) {
        it.tip("Top right")
        registerRadioClick(it)
      })
    })
    topGroup.hgroup(function(group) {
      if (isPsd) {
        group.spacing = 0
      }
      self.leftRadio = group.radioButton(BOUNDS_ANCHOR_RADIO).also(function(it) {
        it.tip("Left")
        registerRadioClick(it)
      })
      self.centerRadio = group.radioButton(BOUNDS_ANCHOR_RADIO).also(function(it) {
        it.tip("Center")
        it.select()
        registerRadioClick(it)
      })
      self.rightRadio = group.radioButton(BOUNDS_ANCHOR_RADIO).also(function(it) {
        it.tip("Right")
        registerRadioClick(it)
      })
    })
    topGroup.hgroup(function(group) {
      if (isPsd) {
        group.spacing = 0
      }
      self.bottomLeftRadio = group.radioButton(BOUNDS_ANCHOR_RADIO).also(function(it) {
        it.tip("Bottom left")
        registerRadioClick(it)
      })
      self.bottomRadio = group.radioButton(BOUNDS_ANCHOR_RADIO).also(function(it) {
        it.tip("Bottom")
        registerRadioClick(it)
      })
      self.bottomRightRadio = group.radioButton(BOUNDS_ANCHOR_RADIO).also(function(it) {
        it.tip("Bottom right")
        registerRadioClick(it)
      })
    })
  })

  // Manual checks
  this.isTopLeft = function() { return self.topLeftRadio.value }
  this.isTop = function() { return self.topRadio.value }
  this.isTopRight = function() { return self.topRightRadio.value }
  this.isLeft = function() { return self.leftRadio.value }
  this.isCenter = function() { return self.centerRadio.value }
  this.isRight = function() { return self.rightRadio.value }
  this.isBottomLeft = function() { return self.bottomLeftRadio.value }
  this.isBottom = function() { return self.bottomRadio.value }
  this.isBottomRight = function() { return self.bottomRightRadio.value }

  // Useful for building x & y
  this.isHorizontalTop = function() { return self.isTopLeft() || self.isTop() || self.isTopRight() }
  this.isHorizontalCenter = function() { return self.isLeft() || self.isCenter() || self.isRight() }
  this.isHorizontalBottom = function() { return self.isBottomLeft() || self.isBottom() || self.isBottomRight() }
  this.isVerticalLeft = function() { return self.isTopLeft() || self.isLeft() || self.isBottomLeft() }
  this.isVerticalCenter = function() { return self.isTop() || self.isCenter() || self.isBottom() }
  this.isVerticalRight = function() { return self.isTopRight() || self.isRight() || self.isBottomRight() }

  // Ai
  this.getTransformation = function() {
    if (self.isTopLeft()) {
      return Transformation.TOPLEFT
    } else if (self.isTop()) {
      return Transformation.TOP
    } else if (self.isTopRight()) {
      return Transformation.TOPRIGHT
    } else if (self.isLeft()) {
      return Transformation.LEFT
    } else if (self.isCenter()) {
      return Transformation.CENTER
    } else if (self.isRight()) {
      return Transformation.RIGHT
    } else if (self.isBottomLeft()) {
      return Transformation.BOTTOMLEFT
    } else if (self.isBottom()) {
      return Transformation.BOTTOM
    } else {
      return Transformation.BOTTOMRIGHT
    }
  }

  // Psd
  this.getAnchorPosition = function() {
    if (self.isTopLeft()) {
      return AnchorPosition.TOPLEFT
    } else if (self.isTop()) {
      return AnchorPosition.TOPCENTER
    } else if (self.isTopRight()) {
      return AnchorPosition.TOPRIGHT
    } else if (self.isLeft()) {
      return AnchorPosition.MIDDLELEFT
    } else if (self.isCenter()) {
      return AnchorPosition.MIDDLECENTER
    } else if (self.isRight()) {
      return AnchorPosition.MIDDLERIGHT
    } else if (self.isBottomLeft()) {
      return AnchorPosition.BOTTOMLEFT
    } else if (self.isBottom()) {
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
