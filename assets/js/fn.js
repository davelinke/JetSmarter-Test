(function(){
	angular.module('gui.fn', [])
	.factory('fn.helpers',[function(){
		return {
			isTouchDevice:function() {
				return 'ontouchstart' in window || navigator.maxTouchPoints;
			},
		};
	}]);

})();
