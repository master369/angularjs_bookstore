(function () {
    'use strict';

    angular
        .module('app.common')
        .controller('personalCtrl', personalCtrl);

    personalCtrl.$inject = ['states', '$state'];
    function personalCtrl(states, $state) {
        var vm = this;
        vm.stateGo = _stateGo;
        function _stateGo(state, params) {
            $state.go(states[state].data.stateName, params);
        }

    }

} ());
