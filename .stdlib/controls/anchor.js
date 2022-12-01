var SIZE_ANCHOR_RADIO = [15, 15]

/**
 * 3 groups with 3 radio buttons each representing anchor position.
 * @param {!Group|!Panel|!Window} parent
 */
function AnchorGroup(parent) {
  checkNotNull(parent)

  var self = parent.vgroup()
  self.topLeftRadio, self.topRadio, self.topRightRadio
  self.leftRadio, self.centerRadio, self.rightRadio
  self.bottomLeftRadio, self.bottomRadio, self.bottomRightRadio

  var isPsd = !Scripts.APP_AI
  self.hgroup(function(group) {
    if (isPsd) {
      group.spacing = 0
    }
    self.topLeftRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
      it.helpTip = R.string.top_left
      registerRadioClick(it)
    })
    self.topRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
      it.helpTip = R.string.top
      registerRadioClick(it)
    })
    self.topRightRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
      it.helpTip = R.string.top_right
      registerRadioClick(it)
    })
  })
  self.hgroup(function(group) {
    if (isPsd) {
      group.spacing = 0
    }
    self.leftRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
      it.helpTip = R.string.left
      registerRadioClick(it)
    })
    self.centerRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
      it.helpTip = R.string.center
      it.select()
      registerRadioClick(it)
    })
    self.rightRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
      it.helpTip = R.string.right
      registerRadioClick(it)
    })
  })
  self.hgroup(function(group) {
    if (isPsd) {
      group.spacing = 0
    }
    self.bottomLeftRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
      it.helpTip = R.string.bottom_left
      registerRadioClick(it)
    })
    self.bottomRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
      it.helpTip = R.string.bottom
      registerRadioClick(it)
    })
    self.bottomRightRadio = group.radioButton(SIZE_ANCHOR_RADIO).also(function(it) {
      it.helpTip = R.string.bottom_right
      registerRadioClick(it)
    })
  })

  /** @return {boolean} */
  self.isTopLeft = function() { return self.topLeftRadio.value }

  /** @return {boolean} */
  self.isTop = function() { return self.topRadio.value }

  /** @return {boolean} */
  self.isTopRight = function() { return self.topRightRadio.value }

  /** @return {boolean} */
  self.isLeft = function() { return self.leftRadio.value }

  /** @return {boolean} */
  self.isCenter = function() { return self.centerRadio.value }

  /** @return {boolean} */
  self.isRight = function() { return self.rightRadio.value }

  /** @return {boolean} */
  self.isBottomLeft = function() { return self.bottomLeftRadio.value }

  /** @return {boolean} */
  self.isBottom = function() { return self.bottomRadio.value }

  /** @return {boolean} */
  self.isBottomRight = function() { return self.bottomRightRadio.value }

  /** @return {boolean} */
  self.isHorizontalTop = function() { return self.isTopLeft() || self.isTop() || self.isTopRight() }

  /** @return {boolean} */
  self.isHorizontalCenter = function() { return self.isLeft() || self.isCenter() || self.isRight() }

  /** @return {boolean} */
  self.isHorizontalBottom = function() {
    return self.isBottomLeft() || self.isBottom() || self.isBottomRight()
  }

  /** @return {boolean} */
  self.isVerticalLeft = function() {
    return self.isTopLeft() || self.isLeft() || self.isBottomLeft()
  }

  /** @return {boolean} */
  self.isVerticalCenter = function() { return self.isTop() || self.isCenter() || self.isBottom() }

  /** @return {boolean} */
  self.isVerticalRight = function() {
    return self.isTopRight() || self.isRight() || self.isBottomRight()
  }

  /**
   * Returns anchor as Illustrator's `Transformation`.
   * @return {!Transformation}
   */
  self.getTransformation = function() {
    if (self.isTopLeft()) return Transformation.TOPLEFT
    else if (self.isTop()) return Transformation.TOP
    else if (self.isTopRight()) return Transformation.TOPRIGHT
    else if (self.isLeft()) return Transformation.LEFT
    else if (self.isCenter()) return Transformation.CENTER
    else if (self.isRight()) return Transformation.RIGHT
    else if (self.isBottomLeft()) return Transformation.BOTTOMLEFT
    else if (self.isBottom()) return Transformation.BOTTOM
    else return Transformation.BOTTOMRIGHT
  }

  /**
   * Returns anchor as Photoshop's `AnchorPosition`.
   * @return {!AnchorPosition}
   */
  self.getAnchorPosition = function() {
    if (self.isTopLeft()) return AnchorPosition.TOPLEFT
    else if (self.isTop()) return AnchorPosition.TOPCENTER
    else if (self.isTopRight()) return AnchorPosition.TOPRIGHT
    else if (self.isLeft()) return AnchorPosition.MIDDLELEFT
    else if (self.isCenter()) return AnchorPosition.MIDDLECENTER
    else if (self.isRight()) return AnchorPosition.MIDDLERIGHT
    else if (self.isBottomLeft()) return AnchorPosition.BOTTOMLEFT
    else if (self.isBottom()) return AnchorPosition.BOTTOMCENTER
    else return AnchorPosition.BOTTOMRIGHT
  }

  function registerRadioClick(radio) {
    radio.addClickListener(function() {
      if (radio !== self.topLeftRadio) self.topLeftRadio.value = false
      if (radio !== self.topRadio) self.topRadio.value = false
      if (radio !== self.topRightRadio) self.topRightRadio.value = false
      if (radio !== self.leftRadio) self.leftRadio.value = false
      if (radio !== self.centerRadio) self.centerRadio.value = false
      if (radio !== self.rightRadio) self.rightRadio.value = false
      if (radio !== self.bottomLeftRadio) self.bottomLeftRadio.value = false
      if (radio !== self.bottomRadio) self.bottomRadio.value = false
      if (radio !== self.bottomRightRadio) self.bottomRightRadio.value = false
    })
  }

  return self
}
