/************************************************************************
* Smart Mirror JavaScript
* February 2023
* KSU ECE
* 2023 Senior Design Project
* 
* 
************************************************************************/

// Speech Recognition variables
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

//First setup variables
var currentApp = 0;                                                                  // Default App is time -- Maybe do a homescreen?
var currentVid = 0;                                                                  // Current tutorial is off
let timezone;                                                                         // Timezone for time as offset variable (minutes)
let timezoneWord;                                                                     // Timezone as a word
const firstdate = new Date();                                                          // Initial time 
const firsttimezone = firstdate.getTimezoneOffset();                                  // Initial timezone
timezone = firstdate.getTimezoneOffset() + 60;                                        // Adds 60 to counter daylight savings
timezoneWord = getTimezone(timezone);                                                 // Timezone for time app
document.getElementById("bString").innerHTML ="Timezone: " + timezoneWord;            // Puts first timezone down -- Check if actually needed?

// Runs the whole program every x milliseconds - current = 1/10th of a second
setInterval(getApp, 100); 

// Gets the current app - mainly used for updating time and weather
// Also helps display proper youtube video
function getApp(){
  if(currentApp == 0)  // Time app
    {
      document.getElementById('rTop').style.display = 'block';
      document.getElementById('rMiddle').style.display = 'block';
      document.getElementById('rBottom').style.display = 'block';
      getDateAndTime();
    }
  else if(currentApp == 1) // Weather app
    {
      document.getElementById('rTop').style.display = 'block';
      document.getElementById('rMiddle').style.display = 'block';
      document.getElementById('rBottom').style.display = 'block';
      getWeather();
    }
  if(currentApp != 3)
    {
      document.getElementById('cammeraStuff').style.display = 'none';
    }
  else
    {
      document.getElementById('cammeraStuff').style.display = 'block';
      document.getElementById('rTop').style.display = 'none';
      document.getElementById('rMiddle').style.display = 'none';
      document.getElementById('rBottom').style.display = 'none';
    }
  if(currentApp != 5) // If not youtube app
    {
      document.getElementById('winsorKnot').style.display = 'none';
      //Insert more vids here
      document.getElementById('vidButtons').style.display = 'none';
      document.getElementById('backButton').style.display = 'none';
      currentVid = 0;
    }
  else if(currentVid == 0) // Default view to select youtube app
    {
      document.getElementById('winsorKnot').style.display = 'none';
      //Insert more vids here
      document.getElementById('vidButtons').style.display = 'block';
      document.getElementById('backButton').style.display = 'none';
      document.getElementById('rTop').style.display = 'none';
      document.getElementById('rMiddle').style.display = 'none';
      document.getElementById('rBottom').style.display = 'none';
    }
  else if(currentVid == 1) // Winsor knot youtube app
    {
      document.getElementById('winsorKnot').style.display = 'block';
      //Insert more vids here
      document.getElementById('vidButtons').style.display = 'none';
      document.getElementById('backButton').style.display = 'block';
      document.getElementById('rTop').style.display = 'none';
      document.getElementById('rMiddle').style.display = 'none';
      document.getElementById('rBottom').style.display = 'none';
    }
}

// Gets the current weather -- NEEDS IMPLEMENTED
function getWeather(){
  document.getElementById("tString").innerHTML = "Day";
  document.getElementById("mString").innerHTML = "32 F";
  document.getElementById("bString").innerHTML = "Location?";
  document.getElementById('bButton1').style.visibility = 'hidden';
  document.getElementById('bButton2').style.visibility = 'hidden';
  document.getElementById('bButton3').style.visibility = 'hidden';
  document.getElementById('bButton4').style.visibility = 'hidden';
  document.getElementById('bButton5').style.visibility = 'hidden';
  document.getElementById('bButton6').style.visibility = 'hidden';
}

// The current time factors and displays 
// Day, year, month, date, hour, minute, second, timezone
function getDateAndTime(){
  const date = new Date(); 
  var year = date.getFullYear();
  var month = date.getMonth()+1; 
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var dayOfWeekNum = date.getDay();
  
  // checks for changed timezone
  if(timezone != firsttimezone)
    {
      hour = hour + (firsttimezone - timezone) / 60;
    }
  
  // Checks for late hour, used to make sure if time would reset to midnight and day would change, it actually works
  // Same for extreme month cases (even leap year) and new year year change
  if(hour >= 23)
    {
      hour = hour - 23;
      day = day + 1;
      dayOfWeekNum = dayOfWeekNum + 1;
      if(((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31)  // 31 days
         || ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30)  // 30 days
         || (month == 2 && day > 28 && year % 4 != 0)  // february not leap year
         || (month == 2 && day > 29 && year % 4 == 0)) // february leap year
        {
          day = 1;
          month = month + 1;
          if(month > 12)
            {
              month = 1;
              year = year + 1;
            }
        }
    }
  hour = getHour(hour);
  var dayOfWeek = getDayOfWeek(dayOfWeekNum);
  var monthWord = getMonth(month);
  
  // Displays the time as a 00:00:00 format
  if(minute < 10 && second < 10)
  {
      document.getElementById("mString").innerHTML = hour + ":0" + minute + ":0" + second;
  }
  else if(minute < 10)
  {
    document.getElementById("mString").innerHTML = hour + ":0" + minute + ":" + second;  
  }
  else if(second < 10)
  {
      document.getElementById("mString").innerHTML = hour + ":" + minute + ":0" + second;
  }
  else
  {
    document.getElementById("mString").innerHTML = hour + ":" + minute + ":" + second;
  }
  document.getElementById("tString").innerHTML = dayOfWeek + ", " + monthWord + " " + day + " " + year;
  timezoneWord = getTimezone(timezone);
  document.getElementById("bString").innerHTML ="Timezone: " + timezoneWord;
  document.getElementById('bButton1').style.visibility = 'visible';
  document.getElementById('bButton2').style.visibility = 'visible';
  document.getElementById('bButton3').style.visibility = 'visible';
  document.getElementById('bButton4').style.visibility = 'visible';
  document.getElementById('bButton5').style.visibility = 'visible';
  document.getElementById('bButton6').style.visibility = 'visible';
}

// Gets the day of the week as a word
function getDayOfWeek(dayOfWeekNum)
{
  var dayOfWeek;
  if(dayOfWeekNum == 0)
      dayOfWeek = "Sunday";
  else if(dayOfWeekNum == 1)
      dayOfWeek = "Monday";
  else if(dayOfWeekNum == 2)
      dayOfWeek = "Tuesday";
  else if(dayOfWeekNum == 3)
      dayOfWeek = "Wednesday";
  else if(dayOfWeekNum == 4)
      dayOfWeek = "Thursday";
  else if(dayOfWeekNum == 5)
      dayOfWeek = "Friday";
  else if(dayOfWeekNum == 6)
      dayOfWeek = "Saturday";
  return dayOfWeek;
}

// Gets the current hour, uses a 12 hour clock
function getHour(hour)
{
  var num = hour + 1;
  if(hour > 12)
    num -= 12;
  else if(hour == 0)
  {
    num = 12;
  }
  return num;
}

// Gets the month as a word 
function getMonth(month)
{
  var monthWord;
  if(month == 1)
    monthWord = "January";
  else if(month == 2)
    monthWord = "February";
  else if(month == 3)
    monthWord = "March";
  else if(month == 4)
    monthWord = "April";
  else if(month == 5)
    monthWord = "May";
  else if(month == 6)
    monthWord = "June";
  else if(month == 7)
    monthWord = "July";
  else if(month == 8)
    monthWord = "August";
  else if(month == 9)
    monthWord = "September";
  else if(month == 10)
    monthWord = "October";
  else if(month == 11)
    monthWord = "November";
  else if(month == 12)
    monthWord = "December";
  return monthWord;
}

// Gets the time zone
function getTimezone(timezone)
{
  var tz = (0 - timezone)/60;
  let timezoneWord;
  if(tz == -10)
      timezoneWord = "Hawaii-Aleutian Standard Time";
  else if(tz == -9)
      timezoneWord = "Alaska Standard Time";
  else if(tz == -8)
      timezoneWord = "Pacific Standard Time";
  else if(tz == -7)
      timezoneWord = "Mountain Standard Time";
  else if(tz == -6)
      timezoneWord = "Central Standard Time";
  else if(tz == -5)
      timezoneWord = "Eastern Standard Time";
  return timezoneWord;
}

// Click selecting Hawaii time
function hTime()
{
  if(timezone != 600)
  {
    timezone = 600;
  }
  timezoneWord = getTimezone(timezone);
  document.getElementById("bString").innerHTML ="Timezone: " + timezoneWord;
}

// Click Selecting Alaskan time
function aTime()
{
  if(timezone != 540)
  {
    timezone = 540;
  }
  timezoneWord = getTimezone(timezone);
  document.getElementById("bString").innerHTML ="Timezone: " + timezoneWord;
}

// Click selecting pacific time
function pTime()
{
  if(timezone != 480)
  {
    timezone = 480;
  }
  timezoneWord = getTimezone(timezone);
  document.getElementById("bString").innerHTML ="Timezone: " + timezoneWord;
}

// Click selecting mountain time
function mTime()
{
  if(timezone != 420)
  {
    timezone = 420;
  }
  timezoneWord = getTimezone(timezone);
  document.getElementById("bString").innerHTML ="Timezone: " + timezoneWord;
}

// Click selecting central time
function cTime()
{
  if(timezone != 360)
  {
    timezone = 360;
  }
  timezoneWord = getTimezone(timezone);
  document.getElementById("bString").innerHTML ="Timezone: " + timezoneWord;
}

// Click Selecting eastern time
function eTime()
{
  if(timezone != 300)
  {
    timezone = 300;
  }
  timezoneWord = getTimezone(timezone);
  document.getElementById("bString").innerHTML ="Timezone: " + timezoneWord;
}

// Clicking the voice app
function voiceClick()
{
  currentApp = 4;
  document.getElementById("tString").innerHTML = "";
  document.getElementById("bString").innerHTML = "";
  document.getElementById('bButton1').style.visibility = 'hidden';
  document.getElementById('bButton2').style.visibility = 'hidden';
  document.getElementById('bButton3').style.visibility = 'hidden';
  document.getElementById('bButton4').style.visibility = 'hidden';
  document.getElementById('bButton5').style.visibility = 'hidden';
  document.getElementById('bButton6').style.visibility = 'hidden';
  document.getElementById("mString").innerHTML = "Choose App!";
  recognition.start();
}

// Gets the voice activation result
recognition.onresult = function(event) {
  var result = event.results[0][0].transcript;
  document.getElementById("mString").innerHTML = 'Result received: ' + result + '.';
  if(result == "time")
    {setTimeout(function(){ 

        timeClick();;
    }, 1000);
   }
  else if(result == "weather")
    {setTimeout(function(){ 

        weatherClick();;
    }, 1000);
   }
  else if(result == "daily quote" || result == "quote of the day")
    {setTimeout(function(){ 

        QOTDClick();;
    }, 1000);
   }
}

// Clicking the time app button
function timeClick()
{
  currentApp = 0;
}

// Clicking the weather button
function weatherClick()
{
  currentApp = 1;
}

// Clicking the daily quote button
function QOTDClick()
{
  currentApp = 2;
  const dqDate = new Date();
  var dQ = dqDate.getDay();
  document.getElementById("tString").innerHTML = "";
  if(dQ == 0)
    {
      document.getElementById("mString").innerHTML = "Quote 1";
    }
  else if(dQ == 1)
    {
      document.getElementById("mString").innerHTML = "“I’d rather regret the things I’ve done than regret the things I haven’t done.”";
      document.getElementById("bString").innerHTML = "— Lucille Ball";
    }
  else if(dQ == 2)
    {
      document.getElementById("mString").innerHTML = "“Opportunities don't happen, you create them.”";
      document.getElementById("bString").innerHTML = "— Chris Grosserv";
    }
  else if(dQ == 3)
    {
      document.getElementById("mString").innerHTML = "“Either you run the day or the day runs you.”";
      document.getElementById("bString").innerHTML = "— Jim Rohn";
    }
  else if(dQ == 4)
    {
      document.getElementById("mString").innerHTML = "Quote 5";
      document.getElementById("bString").innerHTML = "— Jim Rohn";
    }
  else if(dQ == 5)
    {
      document.getElementById("mString").innerHTML = "“Friday sees more smiles than any other day of the workweek!”";
      document.getElementById("bString").innerHTML = "— Kate Summers";
    }
  else if(dQ == 6)
    {
      document.getElementById("mString").innerHTML = "Quote 7";
      document.getElementById("bString").innerHTML = "—Jim Rohn";
    }
  document.getElementById('bButton1').style.visibility = 'hidden';
  document.getElementById('bButton2').style.visibility = 'hidden';
  document.getElementById('bButton3').style.visibility = 'hidden';
  document.getElementById('bButton4').style.visibility = 'hidden';
  document.getElementById('bButton5').style.visibility = 'hidden';
  document.getElementById('bButton6').style.visibility = 'hidden';
}

function cameraClick()
{
  currentApp = 3;
  document.getElementById('bButton1').style.visibility = 'hidden';
  document.getElementById('bButton2').style.visibility = 'hidden';
  document.getElementById('bButton3').style.visibility = 'hidden';
  document.getElementById('bButton4').style.visibility = 'hidden';
  document.getElementById('bButton5').style.visibility = 'hidden';
  document.getElementById('bButton6').style.visibility = 'hidden';
}

// Click the youtube button
function tubeClick()
{
  currentApp = 5;
  document.getElementById('bButton1').style.visibility = 'hidden';
  document.getElementById('bButton2').style.visibility = 'hidden';
  document.getElementById('bButton3').style.visibility = 'hidden';
  document.getElementById('bButton4').style.visibility = 'hidden';
  document.getElementById('bButton5').style.visibility = 'hidden';
  document.getElementById('bButton6').style.visibility = 'hidden';
}

// Click the winsor youtube button
function winsorClick(){
  currentVid = 1;
}

// Click the back video button
function backClick(){
  currentVid = 0;
}
