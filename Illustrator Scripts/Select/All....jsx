// Select all items with multiple allowed types.
// When there are active selection, will only select items within those selection.

//@target illustrator;
//@include '../.lib/commons.js'

check(
    Collections.isNotEmpty(document.pageItems),
    getString(R.string.error_notypes_document, getString(R.string.anything).toLowerCase()),
);
var isFilterMode = Collections.isNotEmpty(selection);

var dialog = new Dialog(R.string.select_all, 'selecting-items/#select-all');
var groupCheck;
var clippingMaskCheck;
var pathCheck;
var compoundPathCheck;
var textFrameCheck;
var legacyTextCheck;
var placedCheck;
var nonNativeCheck;
var rasterCheck;
var pluginCheck;
var symbolCheck;
var meshCheck;
var graphCheck;
var recursiveCheck;
var prefs = preferences2.resolve('select/all');

dialog.vgroup(function(main) {
  main.hgroup(function(rootPane) {
    rootPane.alignChildren = 'top';
    rootPane.vgroup(function(leftPane) {
      leftPane.alignChildren = 'fill';
      leftPane.hpanel(
          R.string.groups,
          function(panel) {
            panel.vgroup(function(checkGroup) {
              checkGroup.alignChildren = 'left';
              groupCheck =
                  checkGroup
                      .checkBox(undefined, R.string.groups)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('group');
                      });
              clippingMaskCheck =
                  checkGroup
                      .checkBox(undefined, R.string.clipping_masks)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('group2');
                      });
            });
            panel.vgroup(function(imageGroup) {
              imageGroup.alignment = ['fill', 'top'];
              tiedImage(imageGroup, 'ic_item_group', groupCheck);
              tiedImage(imageGroup, 'ic_item_clippingMask', clippingMaskCheck);
            });
          });
      leftPane.hpanel(
          R.string.paths,
          function(panel) {
            panel.vgroup(function(checkGroup) {
              checkGroup.alignChildren = 'left'
              pathCheck =
                  checkGroup
                      .checkBox(undefined, R.string.paths)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('path');
                      });
              compoundPathCheck =
                  checkGroup
                      .checkBox(undefined, R.string.compound_paths)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('compound_path');
                      });
            });
            panel.vgroup(function(imageGroup) {
              imageGroup.alignment = ['fill', 'top'];
              tiedImage(imageGroup, 'ic_item_path', pathCheck);
              tiedImage(imageGroup, 'ic_item_compoundpath', compoundPathCheck);
            });
          },
      );
      leftPane.hpanel(
          R.string.types,
          function(panel) {
            panel.vgroup(function(checkGroup) {
              checkGroup.alignChildren = 'left';
              textFrameCheck =
                  checkGroup
                      .checkBox(undefined, R.string.types)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('text');
                      });
              legacyTextCheck =
                  checkGroup
                      .checkBox(undefined, R.string.obsolete_types)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('legacy_text');
                      });
            });
            panel.vgroup(function(imageGroup) {
              imageGroup.alignment = ['fill', 'top'];
              tiedImage(imageGroup, 'ic_item_text', textFrameCheck);
              tiedImage(imageGroup, 'ic_item_legacytext', legacyTextCheck);
            });
          },
      );
    });
    rootPane.vgroup(function(rightPane) {
      rightPane.alignChildren = 'fill';
      rightPane.hpanel(
          R.string.imports,
          function(panel) {
            panel.vgroup(function(checkGroup) {
              checkGroup.alignChildren = 'left'
              placedCheck =
                  checkGroup
                      .checkBox(undefined, R.string.links)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('placed');
                      });
              nonNativeCheck =
                  checkGroup
                      .checkBox(undefined, R.string.non_natives)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('nonnative');
                      });
              rasterCheck =
                  checkGroup
                      .checkBox(undefined, R.string.images)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('raster');
                      });
              pluginCheck =
                  checkGroup
                      .checkBox(undefined, R.string.plugins)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('plugin');
                      });
            });
            panel.vgroup(function(imageGroup) {
              imageGroup.alignment = ['fill', 'top'];
              tiedImage(imageGroup, 'ic_item_placed', placedCheck);
              tiedImage(imageGroup, 'ic_item_nonnative', nonNativeCheck);
              tiedImage(imageGroup, 'ic_item_raster', rasterCheck);
              tiedImage(imageGroup, 'ic_item_plugin', pluginCheck);
            });
          },
      );
      rightPane.hpanel(
          R.string.others,
          function(panel) {
            panel.vgroup(function(checkGroup) {
              checkGroup.alignChildren = 'left';
              symbolCheck =
                  checkGroup
                      .checkBox(undefined, R.string.symbols)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('symbol');
                      });
              meshCheck =
                  checkGroup
                      .checkBox(undefined, R.string.meshes)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('mesh');
                      });
              graphCheck =
                  checkGroup
                      .checkBox(undefined, R.string.graphs)
                      .apply(function(it) {
                        it.value = prefs.getBoolean('graph');
                      });
            });
            panel.vgroup(function(imageGroup) {
              imageGroup.alignment = ['fill', 'top'];
              tiedImage(imageGroup, 'ic_item_symbol', symbolCheck);
              tiedImage(imageGroup, 'ic_item_mesh', meshCheck);
              tiedImage(imageGroup, 'ic_item_graph', graphCheck);
            });
          },
      );
    });
  });
  if (isFilterMode) {
    recursiveCheck =
        new RecursiveCheck(main).apply(function(it) {
          it.alignment = 'right';
          it.value = prefs.getBoolean('recursive');
        });
  }
});
dialog.setCancelButton();
dialog.setDefaultButton(
    undefined,
    function() {
      var types = [];
      if (compoundPathCheck.value) types.push('CompoundPathItem');
      if (graphCheck.value) types.push('GraphItem');
      if (groupCheck.value || clippingMaskCheck.value) types.push('GroupItem');
      if (legacyTextCheck.value) types.push('LegacyTextItem');
      if (meshCheck.value) types.push('MeshItem');
      if (nonNativeCheck.value) types.push('NonNativeItem');
      if (pathCheck.value) types.push('PathItem');
      if (placedCheck.value) types.push('PlacedItem');
      if (pluginCheck.value) types.push('PluginItem');
      if (rasterCheck.value) types.push('RasterItem');
      if (symbolCheck.value) types.push('SymbolItem');
      if (textFrameCheck.value) types.push('TextFrame');
      selectAll(
          types,
          function(item) {
            if (Items.isGroup(item)) {
              if (groupCheck.value && !item.clipped) {
                return true;
              }
              if (clippingMaskCheck.value && item.clipped) {
                return true;
              }
              return false;
            }
            return true;
          },
          isFilterMode && recursiveCheck.value,
      );

      prefs.setBoolean('compound_path', compoundPathCheck.value);
      prefs.setBoolean('graph', graphCheck.value);
      prefs.setBoolean('group', groupCheck.value);
      prefs.setBoolean('group2', clippingMaskCheck.value);
      prefs.setBoolean('legacy_text', legacyTextCheck.value);
      prefs.setBoolean('mesh', meshCheck.value);
      prefs.setBoolean('nonnative', nonNativeCheck.value);
      prefs.setBoolean('path', pathCheck.value);
      prefs.setBoolean('placed', placedCheck.value);
      prefs.setBoolean('plugin', pluginCheck.value);
      prefs.setBoolean('raster', rasterCheck.value);
      prefs.setBoolean('symbol', symbolCheck.value);
      prefs.setBoolean('text', textFrameCheck.value);
      if (isFilterMode) {
        prefs.setBoolean('recursive', recursiveCheck.value);
      }
      return false;
    },
);
dialog.show();

function tiedImage(parent, src, check) {
  var image = parent.image(undefined, src);
  image.alignment = 'right';
  image.addEventListener(
      'click',
      function() {
        check.value = !check.value;
      },
  );
}
