/*
<javascriptresource>
<name>Pre-Flight Documents</name>
<category>1</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

//@target photoshop;
//@include '../.lib/commons.js';

var allOkay = true;
Collections.forEach(
    app.documents,
    function(document) {
      var errorCount = 0;
      var result = getString(R.string.message_preflight_issue, document.name);

      document
          .mode
          .run(function(it) {
            if (it !== DocumentMode.CMYK) {
              errorCount++;
              result +=
                  getString(
                      R.string.message_preflight_issue_mode,
                      it.toString().substringAfter('.'),
                  );
            }
          });
      document
          .resolution
          .run(function(it) {
            if (it < 300) {
              errorCount++;
              result += getString(R.string.message_preflight_issue_resolution, it);
            }
          });
      document
          .bitsPerChannel
          .run(function(it) {
            if (it !== BitsPerChannelType.EIGHT) {
              errorCount++;
              result +=
                  getString(
                      R.string.message_preflight_issue_bits,
                      it.toString().substringAfter('.'),
                  );
            }
          });

      if (errorCount > 0) {
        allOkay = false;
        app.activeDocument = document;
        // don't use Windows.alert since not suffixed with period
        alert(result.trim(), R.string.pre_flight, true);
      }
    },
);
if (allOkay) {
  Windows.alert(R.string.message_preflight_allokay, R.string.pre_flight);
}
