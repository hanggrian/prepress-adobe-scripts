/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Construct a new progress dialog.
 * @param {Number} stop final value of progress bar.
 * @param {String} status starting message, may be null.
 */
function ProgressPalette(stop, status) {
    var self = this
    this.statusText, this.countText, this.progressBar

    var window = new Window('palette', 'Please Wait')
    window.orientation = 'column'

    this.texts = window.add('group').also(function(group) {
        group.orientation = 'row'
        self.statusText = group.staticText([325, 21], (status || 'Please wait') + '...').also(JUSTIFY_LEFT)
        self.countText = group.staticText([75, 21], '0/' + stop).also(JUSTIFY_RIGHT)
    })
    this.progressBar = window.add('slider', [0, 0, 400, 21], 0, 0, stop) // progressbar won't update in palette, use slider instead

    /** Add progression to dialog with optional status. */
    this.increment = function() {
        if (arguments.isNotEmpty()) {
            self.statusText.text = arguments.first().formatArr(Array.prototype.slice.call(arguments, 1)) + '...'
        }
        self.progressBar.value++
        self.countText.text = self.progressBar.value + '/' + stop
        if (self.progressBar.value < stop) {
            window.update()
        } else {
            window.close()
        }
    }

    /** Show the dialog. */
    this.show = function() {
		window.show()
        if (dialog !== undefined) {
            window.location = [
                dialog.getLocation().getLeft() + (dialog.getBounds().getWidth() - self.getBounds().getWidth()) / 2,
                dialog.getLocation().getTop() - 130
            ]
        }
    }

    /** Manually close the dialog. */
    this.close = function() {
        window.close()
    }

    /** Returns bounds as Array, as opposed to native Bounds. */
    this.getBounds = function() {
        return [window.bounds[0], window.bounds[1], window.bounds[2], window.bounds[3]]
    }

    /** Returns location as Array, as opposed to native Bounds. */
    this.getLocation = function() {
        return [window.location[0], window.location[1]]
    }

    this.show() // show dialog on creation
}