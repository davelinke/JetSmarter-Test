(function(){
    'use strict';
	angular.module('gui.services', []).
		factory('lang',[function () {
			var langs = {
				eng:{
					flightDetails:'Flight Details',
					departs:'Departs',
					fbo:'FBO',
					arrives:'Arrives',
					distance:'Distance',
					miles:'miles',
					timeEstimate:'Time Estimate',
					aircraftDetails:'Aircraft Details',
					tailNo:'Tail #',
					brand:'Brand',
					model:'Model',
					sn:'S/N',
					ttaf:'TTAF',
					hours:'hours',
					reg:'REG',
					location:'Location',
					frame:'Frame',
					tsln:'TSLN',
					engTtsn:'Eng. TTSN',
					engTcsn:'Eng. TCSN',
					cycles:'cycles',
					landings:'landings',
					crew:'Crew',
					captain:'Captains',
					officer:'Officers',
					attendant:'Attendants',
					addCaptain:'Add Captain',
					addOfficer:'Add Officer',
					addAttendant:'Add Attendant',
					change:'Change',
					guests:'Guests',
                    lbs:'lbs',
                    smarterpassId:'Smarterpass id',
                    guestWeight:'Guest Weight (lbs)',
                    guestName:'Guest Name',
                    guestLastName:'Guest Lastname',
                    guestBirthday:'Guest Birthday',
                    guestSmarterpass:'Guest SMARTERPASS',
                    guestNameNotAvailable:'Guest Name Not Available',
                    guestLastNameNotAvailable:'Guest Lastname Not Available',
                    smarterpassNotAvailable:'SMARTERPASS not entered',
                    guestWeightNotAvailable:'Guest weight not entered',
                    guestBirthdayNotAvailable:'Guest birthday not entered',
                    remove:'Remove',
                    addGuest:'Add Guest',
                    operatorPortalHome:'Operator Portal Home',
                    signOut:'Sign Out',
                    removePassengerConfirm:'Are you sure you want to remove passenger?',
                    noneSelected:'None Selected',
                    gitRepo:'Git repo for this exercise',
                    confirmFlight:'Confirm Flight',
                    cancelFlight:'Cancel Flight',
                    cancelFlightConfirm:'Are you sure you want to cancel the flight?',
                    dapartureDateMissing:'Departure date is missing',
                    dapartureTimeMissing:'Departure time is missing',
                    dapartureAirportMissing:'Departure airport is missing',
                    arrivalDateMissing:'Arrival date is missing',
                    arrivalTimeMissing:'Arrival time is missing',
                    arrivalAirportMissing:'Arrival airport is missing',
                    aircraftMissing:'Aircraft is missing',
                    captainMissing:'Flight captain is missing',
                    officersMissing:'Flight officer is missing',
                    attendantsMissing:'Flight Attendant is missing',
                    flightHasNoPassengers:'Flight has no guests',
                    guestNameMissing:'Guest name is missing',
                    guestLastNameMissing:'Guest lastname is missing',
                    guestBirthdayMissing:'Guest birthday is missing',
                    guestWeightMissing:'Guest weight is missing',
                    flightConfirmed:'Flight Confirmed'
				}
			};
			return {
				getString:function(lang,string){
					return langs[lang][string];
				}
			};
		}]).
		factory('flight-data',[function () {
			var flights = [
				{
					id:1,
					departure:{
						date:'2016-03-13',
                        time:'23:32',
						airport:'KATL',
                        enterMode:'suggested'
					},
					arrival:{
						date:'2016-03-14',
                        time:'01:38',
						airport:'KHOU',
                        enterMode:'entered'
					},
					distanceMiles:649,
					durationMinutes:126,
					scope:'INT',
					aircraft:'n92th',
					crew:{
						capitains:[1],
						officers:[2],
						attendants:[]
					},
					guests:[1,2,3]
				}
			];
			return {
				getFlight:function(flightId){
					for (var flight in flights) {
						if (flights[flight].id == flightId) {
							return flights[flight];
						}
					}
					return false;
				}
			};
		}]).
		factory('airports', [function () {
			var airports = [
				{
					id:'KATL',
					name:'Jackson Atlanta International Airport',
					city:'Atlanta',
					state:'GA',
					country:'USA',
					address:'1200 Toffie Terrace',
					zip:'30354',
					phone:'4047611960',
					fbo:'Signature Flight Support'
				},
				{
					id:'KHOU',
					name:'William P Hobby Airport',
					city:'Houston',
					state:'TX',
					country:'USA',
					address:'8402 Nelms Street',
					zip:'77061',
					phone:'7133535300',
					fbo:'Signature Flight Support'
				}
			];
			return {
				getAirport:function(id){
					for (var i in airports) {
						if (airports[i].id == id) {
							return airports[i];
						}
					}
					return false;
				}
			};
		}]).
		factory('aircrafts', [function () {
			var aircrafts = [
				{
					tail:'n92th',
					brand:'cessna',
					model:'citation x',
					sn:'239',
					ttaf:3832,
					reg:'n910dp',
					locationCountry:'usa',
					locationState:'ga',
					frameHours:3832,
					frameLandings:2664,
					engTTSN:3832,
					engTCSN:2664,
					crew:{
						caps:1,
						officers:1,
						attendants:0
					},
					passengerCapacity:5
				}
			];
			return {
				getAircraft:function(tail){
					for (var i in aircrafts) {
						if (aircrafts[i].tail == tail) {
							return aircrafts[i];
						}
					}
					return false;
				}
			};
		}]).
		factory('crew', [function () {
			var crew = [
				{
					id:1,
					name:'Kevin Gene',
					lastName:'Bruner',
					type:'pilot',
					typeNum:1
				},
				{
					id:2,
					name:'Hunter Thomas',
					lastName:'Maher',
					type:'officer',
					typeNum:2
				},
				{
					id:3,
					name:'Elaine',
					lastName:'Dickinson',
					type:'attendant',
					typeNum:3
				},
			];
			var crewObject = {};
			crewObject.getMember = function(id){
				for (var i in crew) {
					if (crew[i].id == id) {
						return crew[i];
					}
				}
				return false;
			};
			crewObject.populate = function(officers){
				var officersArray = [];
				for (var i in officers) {
					officersArray.push(crewObject.getMember(officers[i]));
				}
				return officersArray;
			};
			return crewObject;
		}]).
		factory('guests', [function () {
			var guests = [
				{
					id:1,
					name:'Gianluca',
					lastName:'Vacchi',
					birthday:'1967-08-05',
					weight:162,
					smarterpass:'wef1458',
					status:'5',
                    pic:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAIAAAABlV4SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY4RUJGQUUyQUVBRjExRTZBOEYyQkRFRTU0RkI1NjM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY4RUJGQUUzQUVBRjExRTZBOEYyQkRFRTU0RkI1NjM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjhFQkZBRTBBRUFGMTFFNkE4RjJCREVFNTRGQjU2MzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjhFQkZBRTFBRUFGMTFFNkE4RjJCREVFNTRGQjU2MzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Y0ZMLAAAir0lEQVR42kR7WYxk13ne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'
				},
				{
					id:2,
					name:'Giorgia',
					lastName:'Gabriele',
					birthday:'1985-12-27',
					weight:153,
					smarterpass:'wef9527',
					status:'4',
                    pic:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAIAAAABlV4SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwRjM0Qzk2QUYzNTExRTZCOUM1Qjg0N0IwM0Q1OEM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwRjM0Qzk3QUYzNTExRTZCOUM1Qjg0N0IwM0Q1OEM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjBGMzRDOTRBRjM1MTFFNkI5QzVCODQ3QjAzRDU4QzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjBGMzRDOTVBRjM1MTFFNkI5QzVCODQ3QjAzRDU4QzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6HzdrWAAAgDklEQVR42qR6149kWZ7W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'
				},
				{
					id:3,
					name:'Marco',
					lastName:'Boriello',
					birthday:'',
					weight:null,
					smarterpass:null,
					status:null,
                    pic:null
				},
			];
			var guestsObject = {};
			guestsObject.getMember = function(id){
				for (var i in guests) {
					if (guests[i].id == id) {
                        var dateObj = new Date(guests[i].birthday);
                        guests[i].birthday = (dateObj!='Invalid Date'?dateObj:null);
						return guests[i];
					}
				}
				return false;
			};
			guestsObject.populate = function(guestArray){
				var output = [];
				for (var i in guestArray) {
					output.push(guestsObject.getMember(guestArray[i]));
				}
				return output;
			};
			return guestsObject;
		}]);
})();
