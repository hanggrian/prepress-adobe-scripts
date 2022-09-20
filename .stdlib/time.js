/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * E.g.: 2022-07-20T07:09:04Z
 * @param {String} date date to convert.
 * @return {Date}
 */
function parseDate(date) {
  date = date.trim().substring(0, 10).split("-")
  var year = parseInt(date[0])
  var month = parseInt(date[1]) - 1
  var day = parseInt(date[2])
  return new Date(year, month, day)
}

/**
 * Format this date to a string.
 * E.g.: 2011-10-05
 * @return {String}
 */
Date.prototype.toISOString = function() {
  var year = this.getFullYear()
  var month = this.getMonth() + 1
  if (month < 10) {
    month = "0" + month
  }
  var day = this.getDate()
  if (day < 10) {
    day = "0" + day
  }
  return year + "-" + month + "-" + day
}
