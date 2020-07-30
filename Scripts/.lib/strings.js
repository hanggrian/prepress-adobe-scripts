function startsWith(str, word) {
    return str.lastIndexOf(word, 0) === 0;
}

function endsWith(str, word) {
    return str.indexOf(word, str.length - word.length) !== -1;
}