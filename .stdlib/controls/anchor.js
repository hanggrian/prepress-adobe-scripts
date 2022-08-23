/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var SIZE_ANCHOR_RADIO = [15, 15]

/**
 * 3 groups with 3 radio buttons each representing anchor position.
 * @param {Group|Panel|Window} parent holder of this control.
 * @param {Boolean} isPsd attempt to normalize appearance between suite.
 */
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
      self.topLeftRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
        it.tooltip("Top left")
        registerRadioClick(it)
      })
      self.topRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
        it.tooltip("Top")
        registerRadioClick(it)
      })
      self.topRightRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
        it.tooltip("Top right")
        registerRadioClick(it)
      })
    })
    topGroup.hgroup(function(group) {
      if (isPsd) {
        group.spacing = 0
      }
      self.leftRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
        it.tooltip("Left")
        registerRadioClick(it)
      })
      self.centerRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
        it.tooltip("Center")
        it.select()
        registerRadioClick(it)
      })
      self.rightRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
        it.tooltip("Right")
        registerRadioClick(it)
      })
    })
    topGroup.hgroup(function(group) {
      if (isPsd) {
        group.spacing = 0
      }
      self.bottomLeftRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
        it.tooltip("Bottom left")
        registerRadioClick(it)
      })
      self.bottomRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
        it.tooltip("Bottom")
        registerRadioClick(it)
      })
      self.bottomRightRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
        it.tooltip("Bottom right")
        registerRadioClick(it)
      })
    })
  })

  /**
   * Returns true if anchor is left horizontally and top vertically.
   * @returns {Boolean}
   */
  this.isTopLeft = function() { return self.topLeftRadio.value }

  /**
   * Returns true if anchor is center horizontally and top vertically.
   * @returns {Boolean}
   */
  this.isTop = function() { return self.topRadio.value }

  /**
   * Returns true if anchor is right horizontally and top vertically.
   * @returns {Boolean}
   */
  this.isTopRight = function() { return self.topRightRadio.value }

  /**
   * Returns true if anchor is left horizontally and center vertically.
   * @returns {Boolean}
   */
  this.isLeft = function() { return self.leftRadio.value }

  /**
   * Returns true if anchor is center horizontally and center vertically.
   * @returns {Boolean}
   */
  this.isCenter = function() { return self.centerRadio.value }

  /**
   * Returns true if anchor is right horizontally and center vertically.
   * @returns {Boolean}
   */
  this.isRight = function() { return self.rightRadio.value }

  /**
   * Returns true if anchor is left horizontally and bottom vertically.
   * @returns {Boolean}
   */
  this.isBottomLeft = function() { return self.bottomLeftRadio.value }

  /**
   * Returns true if anchor is center horizontally and bottom vertically.
   * @returns {Boolean}
   */
  this.isBottom = function() { return self.bottomRadio.value }

  /**
   * Returns true if anchor is right horizontally and bottom vertically.
   * @returns {Boolean}
   */
  this.isBottomRight = function() { return self.bottomRightRadio.value }

  /**
   * Returns true if anchor is any horizontal position and top vertically.
   * @returns {Boolean}
   */
  this.isHorizontalTop = function() { return self.isTopLeft() || self.isTop() || self.isTopRight() }

  /**
   * Returns true if anchor is any horizontal position and center vertically.
   * @returns {Boolean}
   */
  this.isHorizontalCenter = function() { return self.isLeft() || self.isCenter() || self.isRight() }

  /**
   * Returns true if anchor is any horizontal position and bottom vertically.
   * @returns {Boolean}
   */
  this.isHorizontalBottom = function() { return self.isBottomLeft() || self.isBottom() || self.isBottomRight() }

  /**
   * Returns true if anchor is left horizontally and any vertical position.
   * @returns {Boolean}
   */
  this.isVerticalLeft = function() { return self.isTopLeft() || self.isLeft() || self.isBottomLeft() }

  /**
   * Returns true if anchor is center horizontally and any vertical position.
   * @returns {Boolean}
   */
  this.isVerticalCenter = function() { return self.isTop() || self.isCenter() || self.isBottom() }

  /**
   * Returns true if anchor is right horizontally and any vertical position.
   * @returns {Boolean}
   */
  this.isVerticalRight = function() { return self.isTopRight() || self.isRight() || self.isBottomRight() }

  /**
   * Returns anchor as Illustrator's `Transformation`.
   * @returns {Transformation}
   */
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

  /**
   * Returns anchor as Photoshop's `AnchorPosition`.
   * @returns {AnchorPosition}
   */
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
