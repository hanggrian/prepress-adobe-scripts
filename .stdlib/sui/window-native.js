var Windows = {
  /**
   * Show native alerts with values from resources.
   * @param {String|Object} message alert message.
   * @param {String|Object} title alert title, may be null.
   * @param {Boolean} isError whether or not this is an error alert.
   */
  alert: function(message, title, isError) {
    message = Internals.stringOrResources(message)
    if (message !== undefined && !message.endsWith(".") && !message.endsWith("?")) message += "."
    alert(message, Internals.stringOrResources(title), isError)
  },

  /**
   * Show native confirmation alerts with values from resources.
   * @param {String|Object} message alert message.
   * @param {String|Object} title alert title, may be null.
   * @param {Boolean} noAsDefault when true, the No button is the default choice,.
   * @returns {Boolean}
   */
  confirm: function(message, title, noAsDefault) {
    message = Internals.stringOrResources(message)
    if (message !== undefined && !message.endsWith(".") && !message.endsWith("?")) message += "?"
    return confirm(message, noAsDefault, Internals.stringOrResources(title))
  }
}
