(function() {
    'use strict';

    describe('controllers', function(){
        var vm;

        beforeEach(module('socialOrderWeb'));
        beforeEach(inject(function(_$controller_,$log) {
            vm = _$controller_('LoginController');
            $log.log('testing', vm)
        }));

    });
})();