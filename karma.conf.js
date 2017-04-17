'use strict';

module.exports = function (config) {

	config.set({
		autoWatch: false,

		frameworks: ['jasmine'],

		browsers: ['PhantomJS'],

		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-junit-reporter',
			'karma-coverage'
		],

		reporters: ['progress', 'junit', 'coverage'],
		preprocessors: {
			'**/src/app/**/!(*.spec|*.mock|coDesktopCalendar|styleguide).js': ['coverage']
		},

		coverageReporter: {
			reporters: [
				{ type: 'html' },
				{ type: 'text-summary' }
			]
		},

		junitReporter: {
			outputDir: 'testresults',
			suite: 'Unit Tests'
		}
	});
};
