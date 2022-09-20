/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var Windows = {
  /**
   * Show alert with values from resources.
   * The message are always suffixed with period, just like when throwing `Error`.
   * @param {String|Object} message alert message.
   * @param {String|Object} title alert title, may be null.
   * @param {Boolean} isError should the error logo be displayed?
   */
  alert: function(message, title, isError) {
    alert(Internals.textOrResource(message) + ".", Internals.textOrResource(title), isError)
  },

  /**
   * Show native confirmation alerts with values from resources.
   * @param {String|Object} message alert message.
   * @param {String|Object} title alert title, may be null.
   * @param {Boolean} noAsDefault when true, the No button is the default choice.
   * @return {Boolean}
   */
  confirm: function(message, title, noAsDefault) {
    return confirm(Internals.textOrResource(message), noAsDefault, Internals.textOrResource(title))
  }
}
