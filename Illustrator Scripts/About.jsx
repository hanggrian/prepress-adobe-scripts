//@target illustrator;
//@include '.lib/core.js';

var dialog = new Dialog(R.string.about_scripts);
var aboutPanel;

var clientDate = parseDate(Scripts.getResource('VERSION').readText());

dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.image(undefined, 'logo');
    group.staticText(
        undefined,
        getString(R.string.message_aboutscripts, "Illustrator", clientDate.toISOString()),
        STYLE_MULTILINE,
    );
  });
  aboutPanel =
      new AboutPanel(main, clientDate).apply(function(panel) {
        panel.preferencesThemeList.addChangeListener(function() {
          preferences2.setBoolean('theme_dark', panel.preferencesThemeList.selection.index === 0);
        });
        panel.preferencesLanguageList.addChangeListener(function() {
          var language = Language.find(panel.preferencesLanguageList.selection);
          preferences2.setString('language_code', language.code);
          Language.set(language);
        });
        panel.preferencesActivateControl.addClickListener(function() {
          preferences2.setBoolean(
              'activate_control_on_start',
              panel.preferencesActivateControl.value,
          );
        });

        panel.preferencesClearButton.addClickListener(function() {
          preferences2.remove('theme_dark');
          preferences2.remove('language_code');
          preferences2.remove('activate_control_on_start');
          preferences2
              .resolve('artboards/reorder')
              .run(function(it) {
                it.remove('order');
              });
          preferences2.resolve('dielines').run(function(subconfigs) {
            subconfigs
                .resolve('add_flap')
                .run(function(it) {
                  it.remove('length');
                  it.remove('weight');
                  it.remove('color');
                  it.remove('direction');
                });
            subconfigs
                .resolve('add_paperbag')
                .run(function(it) {
                  it.remove('width');
                  it.remove('height');
                  it.remove('depth');
                  it.remove('upper');
                  it.remove('lower');
                  it.remove('glue_length');
                  it.remove('glue_shear');
                  it.remove('stroke_weight');
                  it.remove('stroke_color');
                });
          });
          preferences2
              .resolve('links')
              .run(function(subconfigs) {
                subconfigs
                    .resolve('change_page')
                    .run(function(it) {
                      it.remove('order');
                      it.remove('recursive');
                      it.remove('keep_size');
                    });
                subconfigs
                    .resolve('change_multipage')
                    .run(function(it) {
                      it.remove('order');
                      it.remove('recursive');
                      it.remove('keep_size');
                    });
                subconfigs
                    .resolve('relink_same')
                    .run(function(it) {
                      it.remove('keep_size');
                    });
              });
          preferences2
              .resolve('objects')
              .run(function(subconfigs) {
                subconfigs
                    .resolve('add_trim_marks')
                    .run(function(it) {
                      it.remove('offset');
                      it.remove('length');
                      it.remove('weight');
                      it.remove('color');
                    });
                subconfigs
                    .resolve('copy_to_artboards')
                    .run(function(it) {
                      it.remove('anchor');
                    });
                subconfigs
                    .resolve('expand_reflected')
                    .run(function(it) {
                      it.remove('padding');
                      it.remove('use_guides');
                      it.remove('recursive');
                    });
                subconfigs
                    .resolve('step_and_repeat')
                    .run(function(it) {
                      it.remove('horizontal');
                      it.remove('vertical');
                    });
                subconfigs
                    .resolve('rearrange')
                    .run(function(it) {
                      it.remove('order');
                    });
                subconfigs
                    .resolve('rasterize_each')
                    .run(function(it) {
                      it.remove('background');
                      it.remove('anti_aliasing');
                      it.remove('option1');
                      it.remove('option2');
                      it.remove('option3');
                      it.remove('option4');
                      it.remove('option5');
                      it.remove('recursive');
                      it.remove('keep_size');
                    });
                subconfigs
                    .resolve('resize_each')
                    .run(function(it) {
                      it.remove('option1');
                      it.remove('option2');
                      it.remove('option3');
                      it.remove('option4');
                      it.remove('recursive');
                    });
              });
          preferences2
              .resolve('select')
              .run(function(subconfigs) {
                subconfigs
                    .resolve('all')
                    .run(function(it) {
                      it.remove('compound_path');
                      it.remove('graph');
                      it.remove('group');
                      it.remove('group2');
                      it.remove('legacy_text');
                      it.remove('mesh');
                      it.remove('nonnative');
                      it.remove('path');
                      it.remove('placed');
                      it.remove('plugin');
                      it.remove('raster');
                      it.remove('symbol');
                      it.remove('text_frame');
                      it.remove('recursive');
                    });
                subconfigs
                    .resolve('images')
                    .run(function(it) {
                      it.remove('recursive');
                    });
                subconfigs
                    .resolve('links')
                    .run(function(it) {
                      it.remove('recursive');
                    });
                subconfigs
                    .resolve('paths')
                    .run(function(it) {
                      it.remove('recursive');
                    });
                subconfigs
                    .resolve('types')
                    .run(function(it) {
                      it.remove('recursive');
                    });
              });
          preferences2
              .resolve('types/numerize')
              .run(function(it) {
                it.remove('start');
                it.remove('digit');
                it.remove('stop_enabled');
                it.remove('stop_alphabet');
                it.remove('prefix');
                it.remove('suffix');
                it.remove('order');
                it.remove('recursive');
              });
          Windows.alert(R.string.done, R.string.about_scripts);
        });
      });
});
dialog.setCancelButton(R.string.close); // because there is no default button
dialog.setHelpButton(
    R.string.visit_github,
    function() {
      Scripts.openUrl(Scripts.URL_GITHUB);
      return true;
    },
);
dialog.show();
