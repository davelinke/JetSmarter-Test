(function(){
    'use strict';
	angular.module('gui.controllers', []).
		controller(
			'operator-portal',
			[
				'$scope',
				'$routeParams',
                'fn.helpers',
				'lang',
				'airports',
				'flight-data',
				'aircrafts',
				'crew',
				'guests',
				function ($scope, routeParams, fnHelpers, lang, airports, flightData, aircrafts, crew, guests){
					// define default params if none is passed
					var params = $.extend({flightId:1},routeParams);
					$scope.guiLang = 'eng';
					$scope.lang = function(string){
						return lang.getString($scope.guiLang,string);
					};
					// retrieve flight data
					$scope.flightData = flightData.getFlight(params.flightId);
					$scope.depAirport = airports.getAirport($scope.flightData.departure.airport);
					$scope.arrAirport = airports.getAirport($scope.flightData.arrival.airport);
					$scope.aircraft = aircrafts.getAircraft($scope.flightData.aircraft);
					$scope.crew = {
						caps:crew.populate($scope.flightData.crew.capitains),
						officers:crew.populate($scope.flightData.crew.officers),
						attendants:crew.populate($scope.flightData.crew.attendants)
					};
					$scope.guests = guests.populate($scope.flightData.guests);

                    $scope.newGuest = {};

                    $scope.flightMethods = {
                        resetGuestTemplate:function(){
                            $scope.newGuest = {
                                name:null,
                                lastName:null,
                                birthday:'',
                                weight:null,
                                smarterpass:null,
                                pic:null
                            };
                        },
                        addGuest:function(){
                            var newGuest = $.extend({
                                id:new Date()
                            },$scope.newGuest);
                            $scope.guests.push(newGuest);
                            $scope.flightMethods.resetGuestTemplate();
                        },
                        removeGuest:function(guestId){
                            var confirm = window.confirm($scope.lang('removePassengerConfirm'));
                            if (confirm) {
                                var i;
                                for (i=0; i<$scope.guests.length;i++){
                                    if ($scope.guests[i].id==guestId){
                                        $scope.guests.splice(i,1);
                                        break;
                                    }
                                }
                                for (i=0; i<$scope.flightData.guests.length;i++){
                                    if ($scope.flightData.guests[i]==guestId){
                                        $scope.flightData.guests.splice(i,1);
                                        break;
                                    }
                                }
                            }
                        },
                        cancelFlight:function(){
                            var confirm = window.confirm($scope.lang('cancelFlightConfirm'));
                            if (confirm){
                                // do something
                            }
                        },
                        flightCheck:function(){
                            // validate data is allright
                            if(!$scope.flightData.departure.date) return{val:false,message:$scope.lang('dapartureDateMissing')};
                            if(!$scope.flightData.departure.time) return{val:false,message:$scope.lang('dapartureTimeMissing')};
                            if(!$scope.flightData.departure.airport) return{val:false,message:$scope.lang('dapartureAirportMissing')};
                            if(!$scope.flightData.arrival.date) return{val:false,message:$scope.lang('arrivalDateMissing')};
                            if(!$scope.flightData.arrival.time) return{val:false,message:$scope.lang('arrivalTimeMissing')};
                            if(!$scope.flightData.arrival.airport) return{val:false,message:$scope.lang('arrivalAirportMissing')};
                            if(!$scope.flightData.durationMinutes) return{val:false,message:$scope.lang('flightDurationMissing')};
                            if(!$scope.flightData.aircraft) return{val:false,message:$scope.lang('aircraftMissing')};
                            if($scope.flightData.crew.capitains.length!=$scope.aircraft.crew.caps) return{val:false,message:$scope.lang('captainMissing')};
                            if($scope.flightData.crew.officers.length!=$scope.aircraft.crew.officers) return{val:false,message:$scope.lang('officersMissing')};
                            if($scope.flightData.crew.attendants.length!=$scope.aircraft.crew.attendants) return{val:false,message:$scope.lang('attendantsMissing')};
                            if(!$scope.guests.length) return{val:false,message:$scope.lang('flightHasNoPassengers')};
                            for (var i = 0; i < $scope.guests.length;i++){
                                if(!$scope.guests[i].name) return{val:false,message:$scope.lang('guestNameMissing')};
                                if(!$scope.guests[i].lastName) return{val:false,message:$scope.lang('guestLastNameMissing')};
                                if(!$scope.guests[i].birthday) return{val:false,message:$scope.lang('guestBirthdayMissing')};
                                if(!$scope.guests[i].weight) return{val:false,message:$scope.lang('guestWeightMissing')};
                            }

                            return {val:true,message:$scope.lang('flightConfirmed')};
                        },
                        confirmFlight:function(){
                            var confirmation = $scope.flightMethods.flightCheck();
                            if(!confirmation.val){
                                alert(confirmation.message);
                            } else {
                                alert(confirmation.message);
                            }
                        }
                    };
                    $scope.flightMethods.resetGuestTemplate();

                    // determine if the screen is touchable
                    $scope.touchable = (fnHelpers.isTouchDevice()?'touchable':'');
				}
			]
		);
})();
