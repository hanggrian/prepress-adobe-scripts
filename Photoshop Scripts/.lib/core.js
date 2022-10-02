/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

#include "../../.stdlib/stdlib.js"

#include "core-resources.js"

#include "core-preferences.js"
#include "core-units.js"

// Core libraries are base of all scripts,
// providing tools for creating new document or modifying current document.

Scripts.PATH_LIB = new File($.fileName).path

Language.set(Language.valueOfCode(configs.getString("language_code", Language.EN.code)))
