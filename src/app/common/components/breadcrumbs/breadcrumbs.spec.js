(function () {
    'use strict';

    describe('component: breadcrumbs', function () {
        var $componentController;

        beforeEach(module('app'));
        beforeEach(module('app.common'));
        beforeEach(module('ngMockE2E'));


        beforeEach(inject(function (_$componentController_) {
            $componentController = _$componentController_;
        }));

        it('should properly initialize', function () {
            var bindings = {
                breadcrumbs: [{
                    name: 'Главная',
                    route: 'main',
                },
                {
                    name: 'Корзина',
                }]
            },
                ctrl = $componentController('breadcrumbs', null, bindings);
            expect(ctrl.breadcrumbs).toBeDefined();
            expect(ctrl.breadcrumbs).toBe([{
                name: 'Главная',
                route: 'main',
            },
            {
                name: 'Корзина',
            }]);
        });


    });

} ());
