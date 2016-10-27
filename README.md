# banify

Browserify plugin that enforces that certain packages are not imported. Inspired by [Apache Maven Enforcer Plugin](http://maven.apache.org/enforcer/enforcer-rules/bannedDependencies.html).

## Usage

```js
var banify = require('banify');
var BLACKLIST = [
    'foo',
    /^bar$/
];

gulp.src(['./index.js'])
    .pipe(bro({
        plugin: [banify([BLACKLIST])]
    }))
```

The plugin fails the build if `require('foo')` or `require('bar')` is used anywhere in the codebase.
