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
   * @param {Boolean} isError shows the alert as an error, default is false.
   */
  alert: function(message, title, isError) {
    isError = getOrDefault(isError, false)
    alert(Internals.textOrResource(message) + ".", Internals.textOrResource(title), isError)
  },

  /**
   * Show native confirmation alerts with values from resources.
   * @param {String|Object} message alert message.
   * @param {String|Object} title alert title, may be null.
   * @param {Boolean} noAsDefault sets negative button as the default choice, default is false.
   * @return {Boolean}
   */
  confirm: function(message, title, noAsDefault) {
    noAsDefault = getOrDefault(noAsDefault, false)
    return confirm(Internals.textOrResource(message), noAsDefault, Internals.textOrResource(title))
  }
}
