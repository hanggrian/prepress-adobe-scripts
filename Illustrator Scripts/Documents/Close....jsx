//@target illustrator;
//@include '../.lib/commons.js';

var unsavedLength =
    Collections
        .filter(
            app.documents,
            function(it) {
              return !it.saved;
            },
        ).length;

var dialog =
    new AlertDialog(
        R.string.close_documents,
        getString(
            R.string.confirm_closedocuments,
            app.documents.length,
            unsavedLength > 0 ? unsavedLength : 'none',
        ),
    );
dialog.setCancelButton();
dialog.setDefaultButton(
    R.string.all,
    function() {
      for (var i = 0; i < app.documents.length; i++) {
        app.documents[i].close(SaveOptions.DONOTSAVECHANGES);
        i--;
      }
      return false;
    },
);
dialog.setYesButton(
    R.string.others,
    function() {
      // in Illustrator, active document index is always 0
      for (var i = 1; i < app.documents.length; i++) {
        app.documents[i].close(SaveOptions.DONOTSAVECHANGES);
        i--;
      }
      return false;
    },
);
dialog.yesButton.enabled = app.documents.length > 1;
dialog.setHelpButton(
    R.string.keep_unsaved,
    function() {
      for (var i = 0; i < app.documents.length; i++) {
        if (!app.documents[i].saved) {
          continue;
        }
        app.documents[i].close(SaveOptions.DONOTSAVECHANGES);
        i--;
      }
      return false;
    },
);
dialog.helpButton.enabled = app.documents.length > 1 && unsavedLength > 0;
dialog.show();
