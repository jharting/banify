# banify

Browserify plugin that bans certain packages from being imported.

Normally you should do this at the package manager level (e.g. using [dependency-ban](https://www.npmjs.com/package/dependency-ban)).
However, this plugin is useful in scenarios when you want to use a dependency but want to ensure that only parts of it are ever included in the browserify build.

This plugin is inspired by [Apache Maven Enforcer Plugin](http://maven.apache.org/enforcer/enforcer-rules/bannedDependencies.html).

## Example

Let's say you are using [lodash](https://lodash.com/) and only cherry-picking certain functions to keep the resulting bundle small.

```js
var find = require('lodash/collection/find');
```
You want to enforce that no one accidentally requires all of lodash (e.g. by `require('lodash')`) because that would invalidate the effort. You can use banify to do that:

```js
var banify = require('banify');
var BLACKLIST = [
    'lodash',
];

gulp.src(['./index.js'])
    .pipe(bro({
        plugin: [banify(BLACKLIST)]
    }))
```

The plugin fails the build if `require('lodash')` or is found anywhere in the codebase. Other imports (e.g. `require('lodash/collection/find')`) will succeed.

Besides exact matches a blacklist can also contain regular expressions:

```js
var BLACKLIST = [
    /lodash\/fp\/.*/,
];
```
