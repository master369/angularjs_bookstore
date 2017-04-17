(function () {
	'use strict';
	angular.module('app.common')
		.filter('weight', weight);

	function weight() {
		return function (value) {
			var value = parseFloat(value, 10),
				output,
				kGr,
				gr,
				kGrLine,
				grLine;

			if (!value || isNaN(value)) {
				return '0 гр';
			}

			kGr = Math.floor(value / 1000);
			gr = value % 1000;

			kGrLine = kGr === 0 ? '' : kGr + ' кг ';
			grLine = gr === 0 ? '' : gr + ' гр';

			output = kGrLine + grLine;
			output = output.trim();

			return output;
		}
	}
}());

