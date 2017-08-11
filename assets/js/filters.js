/* Filters */
(function() {
    'use strict';
    // this function is strict...
    angular.module('gui.filters', []).
        filter('niceDate', function() {
            return function(item) {
                var weekDayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                var theDate = new Date(item);
                return weekDayNames[theDate.getDay()]+', '+monthNames[theDate.getMonth()]+' '+theDate.getDate()+', '+theDate.getFullYear();
            };
        }).
        filter('niceDateOnly', function() {
            return function(item) {
                var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                var theDate = new Date(item);
                return monthNames[theDate.getMonth()]+' '+theDate.getDate()+', '+theDate.getFullYear();
            };
        }).
        filter('minutesToHours',function(){
            return function(minutes){
                var hours = Math.floor(minutes/60);
                var remanent = (minutes % 60);
                return hours + 'h '+ (remanent<10?'0'+remanent:remanent) + 'm';
            };
        });
}());
