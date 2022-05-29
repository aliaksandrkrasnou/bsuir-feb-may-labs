'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date    *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
   return Date.parse(value)
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
   return Date.parse(value)
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(check_date) {
   const date_date = new Date(check_date)
   const year = check_date.getFullYear()
   if (year % 4 == 0){
      if (year % 100 == 0 && year % 400 != 0){
         return false
      }
      else {
         return true
      }
   }
   else
      return false
}


/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
   const result_hours = endDate.getHours() - startDate.getHours()
   const result_minutes = endDate.getMinutes() - startDate.getMinutes()
   const result_seconds = endDate.getSeconds() - startDate.getSeconds()
   const result_mseconds = endDate.getMilliseconds() - startDate.getMilliseconds()
   let result_time = ''

   if (result_hours < 10){
      result_time = '0' + result_hours
   }
   else{
      result_time = '' + result_hours
   }
   if (result_minutes < 10){
      result_time += ':0' + result_minutes
   }
   else{
      result_time += ':' + result_minutes
   }
   if (result_seconds < 10){
      result_time += ':0' + result_seconds
   }
   else{
      result_time += ':' + result_seconds
   }
   if (result_mseconds < 10){
      result_time += '.00' + result_mseconds
   }
   else if (result_mseconds < 100){
      result_time += '.0' + result_mseconds
   }
   else{
      result_time += '.' + result_mseconds
   }
   return result_time
}


/**
 * Returns the angle (in radians) between the hands of an analog clock for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 * 
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */



function angleBetweenClockHands(date) {
   let minutes_degree = (date.getUTCMinutes() * 6) % 180
   let hours_degree = (date.getUTCHours() *30) % 180 + (date.getUTCMinutes() / 2)
   if (date.getUTCHours() == 18 || date.getUTCHours() == 6){
      hours_degree = 180
   }
   let angle = Math.abs(hours_degree - minutes_degree)
   return angle / 180 * Math.PI
}


module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};
