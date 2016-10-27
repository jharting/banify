function test (id) {
    return function (pattern) {
        if (pattern instanceof RegExp) {
            return pattern.test(id);
        }
        if (typeof pattern === 'function') {
            return pattern(id);
        }
        if (typeof pattern === 'string') {
            return pattern === id;
        }
        throw new Error('Unknown pattern type: ' + pattern);
    }
}

module.exports = function (banned) {
    return function (browserify) {
        if (!banned || !banned.length) {
            return;
        }

        browserify.on('file', function (file, id) {
            if (banned.some(test(id))) {
                throw new Error('"' + id + '" is a banned dependency');
            }
        });
    }
}
