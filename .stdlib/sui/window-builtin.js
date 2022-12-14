/*<javascriptresource><menu>hide</menu></javascriptresource>*/

var Windows = {
  /**
   * Show alert with values from resources. The message are always suffixed with period, just like
   * when throwing `Error`. This function also returns `isError`, intended for directly invalidating
   * dialog button action.
   * @param {string|!Object} message
   * @param {?string|?Object=} title
   * @param {boolean=} isError default is false.
   * @return {boolean}
   */
  alert: function(message, title, isError) {
    isError = isError || false
    alert(Internals.textOrResource(message) + '.', Internals.textOrResource(title), isError)
    return isError
  },

  /**
   * Show native confirmation alerts with values from resources.
   * @param {string|!Object} message
   * @param {?string|?Object=} title
   * @param {boolean=} noAsDefault default is false.
   * @return {boolean}
   */
  confirm: function(message, title, noAsDefault) {
    noAsDefault = noAsDefault || false
    return confirm(Internals.textOrResource(message), noAsDefault, Internals.textOrResource(title))
  }
}
