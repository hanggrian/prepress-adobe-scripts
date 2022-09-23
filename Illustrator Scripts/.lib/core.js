#include "../../.stdlib/stdlib.js"

#include "core-resources.js"

#include "controls/checks.js"
#include "controls/nup-options.js"
#include "controls/open-options.js"
#include "controls/ordering.js"
#include "controls/range.js"
#include "controls/select-options.js"
#include "controls/slider.js"
#include "pager/eight-up.js"
#include "pager/four-up.js"
#include "pager/one-up.js"
#include "pager/saddle-stitch.js"
#include "pager/two-up.js"
#include "core-collections.js"
#include "core-colors.js"
#include "core-files.js"
#include "core-items.js"
#include "core-preconditions.js"
#include "core-preferences.js"
#include "core-units.js"

Scripts.PATH_LIB = new File($.fileName).path

Language.set(Language.valueOfCode(configs.getString("language_code", Language.EN.code)))

var Pager = new Enum({
  ONE_UP: {
    name: getString(R.string.D_up, 1),
    get: function(document, start) { return new OneUpPager(document, start) }
  },
  TWO_UP: {
    name: getString(R.string.D_up, 2),
    get: function(document, start, isDuplex, isStack) {
      if (!isDuplex) {
        return !isStack ? new TwoUpSimplexPager(document, start) : new TwoUpSimplexStackPager(document, start)
      } else {
        return !isStack ? new TwoUpDuplexPager(document, start) : new TwoUpDuplexStackPager(document, start)
      }
    }
  },
  FOUR_UP: {
    name: getString(R.string.D_up, 4),
    get: function(document, start, isFolding, isDuplex, isStack) {
      if (isFolding) {
        return new FourUpFoldingPager(document, start)
      }
      if (!isDuplex) {
        return !isStack ? new FourUpSimplexPager(document, start) : new FourUpSimplexStackPager(document, start)
      } else {
        return !isStack ? new FourUpDuplexPager(document, start) : new FourUpDuplexStackPager(document, start)
      }
    }
  },
  EIGHT_UP: {
    name: getString(R.string.D_up, 8),
    get: function(document, start, isFolding, isDuplex, isStack) {
      if (isFolding) {
        return new EightUpFoldingPager(document, start)
      }
      if (!isDuplex) {
        return !isStack ? new EightUpSimplexPager(document, start) : new EightUpSimplexStackPager(document, start)
      } else {
        return !isStack ? new EightUpDuplexPager(document, start) : new EightUpDuplexStackPager(document, start)
      }
    }
  },
  SADDLE_STITCH: {
    name: R.string.saddle_stitch,
    get: function(document, start, end, isRtl) { return new SaddleStitchPager(document, start, end, isRtl) }
  }
})
