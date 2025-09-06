//@target illustrator;
//@include '../.lib/commons.js';

var allOkay = true;
Collections.forEach(
    app.documents,
    function(document) {
      var errorCount = 0;
      var result = getString(R.string.message_preflight_issue, document.name);

      document
          .documentColorSpace
          .run(function(it) {
            if (it !== DocumentColorSpace.CMYK) {
              errorCount++;
              result +=
                  getString(
                      R.string.message_preflight_issue_colorspace,
                      it.toString().substringAfter('.'),
                  );
            }
          });
      document
          .rasterEffectSettings
          .run(function(it) {
            if (it.colorModel !== RasterizationColorModel.DEFAULTCOLORMODEL) {
              errorCount++;
              result +=
                  getString(R.string.message_preflight_issue_colormodel, it.colorModel.toString()
                      .substringAfter('.'));
            }
            if (it.resolution < 300) {
              errorCount++;
              result += getString(R.string.message_preflight_issue_resolution, it.resolution);
            }
          });
      document.rulerUnits.run(function(it) {
        if (it !== RulerUnits.Inches &&
            it !== RulerUnits.Centimeters &&
            it !== RulerUnits.Millimeters
        ) {
          errorCount++;
          result +=
              getString(
                  R.string.message_preflight_issue_rulerunits,
                  it.toString().substringAfter('.'),
              );
        }
      });

      if (errorCount > 0) {
        allOkay = false;
        document.activate();
        // don't use Windows.alert since not suffixed with period
        alert(result.trim(), getString(R.string.pre_flight), true);
      }
    },
);
if (allOkay) {
  Windows.alert(R.string.message_preflight_allokay, R.string.pre_flight);
}
