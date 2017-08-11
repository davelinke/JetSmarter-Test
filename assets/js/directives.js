/* Directives */
(function(){
"use strict";
	angular.module('gui.directives', ['ngSanitize','gui.filters']).
	directive('labelInput',function(){
		return {
			scope:{
				model:'=ngModel',
				placeholder:'@placeholder',
				label:'@label',
				emptyLabel:'@emptyLabel'
			},
			template:'<span class="label-input" ng-class="{true:\'hid\',false:\'vis\'}[inputState]" ng-click="turnInput()"><span ng-if="model">{{label}}</span><span ng-if="!model">{{::emptyLabel}}</span></span><span ng-class="{true:\'vis\',false:\'hid\'}[inputState]"><input type="text" ng-model="model" ng-blur="inputState=false" ng-keyup="catchEnter($event)" /></span>',
			link:function(scope,t,attrs){
				scope.inputState = false;
				scope.turnInput = function(){
					scope.inputState = true;
					var input = t.find('input');
					input.focus();
				};
				scope.catchEnter = function(ev){
					if (ev.keyCode==13) scope.inputState = false;
				};
			}
		};
	}).
	directive('dateInput',function(){
		return {
			scope:{
				model:'=ngModel',
				placeholder:'@placeholder',
				label:'@label',
				emptyLabel:'@emptyLabel'
			},
			template:'<span class="label-input" ng-class="{true:\'hid\',false:\'vis\'}[inputState]" ng-click="turnInput()"><span ng-if="model">{{label}}</span><span ng-if="!model">{{::emptyLabel}}</span></span><span ng-class="{true:\'vis\',false:\'hid\'}[inputState]"><input type="date" ng-model="model" ng-blur="inputState=false" ng-keyup="catchEnter($event)" /></span>',
			link:function(scope,t,attrs){
				scope.inputState = false;
				scope.turnInput = function(){
					scope.inputState = true;
					var input = t.find('input');
					input.focus();
				};
				scope.catchEnter = function(ev){
					if (ev.keyCode==13) scope.inputState = false;
				};
			}
		};
	});
}());
