/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Add horizontal parent to tabbed panel.
 * @param {?string|?Object=} text
 * @param {?function(!Group)=} configuration
 * @return {!Tab}
 */
Panel.prototype.htab =
    function(text, configuration) {
      return Internals.addTab(this, 'row', text, configuration);
    };

/**
 * Add vertical parent to tabbed panel.
 * @param {?string|?Object=} text
 * @param {?function(!Group)=} configuration
 * @return {!Tab}
 */
Panel.prototype.vtab =
    function(text, configuration) {
      return Internals.addTab(this, 'column', text, configuration);
    };

/**
 * Add stack parent to tabbed panel.
 * @param {?string|?Object=} text
 * @param {?function(!Group)=} configuration
 * @return {!Tab}
 */
Panel.prototype.stab =
    function(text, configuration) {
      return Internals.addTab(this, 'stack', text, configuration);
    };

Internals.addTab =
    function(root, orientation, text, configuration) {
      check(root.type === 'tabbedpanel');
      var tab = root.add('tab', undefined, text);
      return Internals.addGroup(tab, orientation, configuration);
    };
