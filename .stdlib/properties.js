/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

// See see https://community.adobe.com/t5/illustrator/script-to-sort-artboard-list-alphabetically/m-p/9558395.

function copyProperties(source) {
  var props = {}, key
  for (key in source) {
    try {
      props[key] = source[key]
    } catch (e) {
    }
  }
  return props
}

function pasteProperties(source, destination) {
  var key
  for (key in source) {
    destination[key] = source[key]
  }
}