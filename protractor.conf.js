'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

// An example configuration file.
exports.config = {
	// The address of a running selenium server.
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	//seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

	//seleniumArgs: ['-Dwebdriver.ie.driver=IEDriverServer_64.exe'],
	seleniumArgs: ['-Dwebdriver.ie.driver=IEDriverServer.exe'],

	chromeOnly: false,
	//maxSessions: 1,
	//maxInstances: 1,

	// Capabilities to be passed to the webdriver instance.
	multiCapabilities: [
		{
			'browserName': 'chrome'
		}
	//,
	//{
	//	'browserName': 'firefox'
	//},
	//{
	//	'browserName': 'internet explorer',
	//	'platform': 'ANY',
	//	'version': '11',
	//	//'ie.forceCreateProcessApi': true,
	//	//'ie.browserCommandLineSwitches': '-private',
	//	'ie.ensureCleanSession': true
	//}
	],

	framework: 'jasmine2',
	onPrepare: function () {
		var jasmineReporters = require('jasmine-reporters');
		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
			consolidateAll: true,
			filePrefix: 'protractor_xmloutput',
			savePath: 'testresults'
		}));
		jasmine.getEnv().addReporter(
				new HtmlScreenshotReporter({
					dest: 'testresults/screenshots',
					filename: 'report.html',
					captureOnlyFailedSpecs: true
				})
			);
	},

	// Spec patterns are relative to the current working directly when
	// protractor is called.
	specs: [paths.e2e + '/tests/**/*.js'],
	//specs: [paths.e2e + '/tests/CoordinatorHomePage.spec.js'],
	//specs: [paths.e2e + '/tests/ExpertDetails.spec.js'],
	//specs: [paths.e2e + '/tests/LoginPage.spec.js'],
	//specs: [paths.e2e + '/tests/NewProjectPage.spec.js'],
	//specs: [paths.e2e + '/tests/ProjectDetailsPage.spec.js'],
	//specs: [paths.e2e + '/tests/ProjectDetailsConsultationsTab.spec.js'],
	//specs: [paths.e2e + '/tests/ProjectDetailsExpertsTab.spec.js'],
	//specs: [paths.e2e + '/tests/NotFoundPage.spec.js'],
	//specs: [paths.e2e + '/tests/ConsultationsPage.spec.js'],

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};
