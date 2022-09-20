/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Construct a new palette.
 * @param {Number} stop final value of progress bar.
 * @param {String} status starting message, may be null.
 */
function ProgressPalette(stop, status) {
  var self = new Window("palette", R.string.please_wait)
  self.orientation = "column"
  self.statusText, self.countText, self.progressBar

  self.add("group").also(function(group) {
    group.orientation = "row"
    self.statusText = group.staticText([325, 21], (status || getString(R.string.please_wait)) + "...")
      .also(function(it) { it.justify = "left" })
    self.countText = group.staticText([75, 21], "0/" + stop).also(function(it) { it.justify = "right" })
  })
  self.progressBar = self.add("slider", [0, 0, 400, 21], 0, 0, stop) // progressbar won't update in palette, use slider instead

  /** Add progression to dialog with optional status. */
  self.increment = function() {
    if (Collections.isNotEmpty(arguments)) {
      self.statusText.text = Array.prototype.shift.call(arguments)
      self.statusText.text = Internals.formatString(self.statusText.text, arguments) + "..."
    }
    self.progressBar.value++
    self.countText.text = self.progressBar.value + "/" + stop
    if (self.progressBar.value < stop) {
      self.update()
    } else {
      self.close()
    }
  }

  // show dialog on creation
  self.show()
  if (dialog !== undefined) {
    self.location = [
      dialog.location.x + (dialog.bounds.width - self.bounds.width) / 2,
      dialog.location.y - 130
    ]
  }

  return self
}
