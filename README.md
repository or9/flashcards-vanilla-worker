# Flashcards
I've included a map generated from UglifyJS, so the minified code should be fine for all scenarios.


## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/or9/flashcards/master/dist/flashcards.min.js
[max]: https://raw.github.com/or9/flashcards/master/dist/flashcards.js

In your web page:

```html
<body>
	<!-- html will be generated here for the containers -->
	<script src="main.js"></script>
</body>
```

## Documentation
### Build Process
In order to build the project, go to the project's root directory and run `grunt`
This will delete the output directory, concat the main source files,
* main.init.js
* main.abstract.workerHandler.js
* main.main.workerHandler.js
* main.card.workerHandler.js
* main.game.workerHandler.js
* main.workerHandler.helper.js
* main.utility.js

The resulting file, main.js, along with the workers, are copied to the dist directory where UglifyJS minifies them and generates a map; the CSS is minified to remove white-space; and Jasmine unit tests are run against the resulting files.

### Development Process
From the project's root directory, run `grunt watch:jasmine:dev:build`
This will not alter the output directory, but will concatenate the main.*.js files into a single main.js, which Jasmine then runs unit tests against.

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
