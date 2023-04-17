var homescreen = 0; //0 on home, else for apps
var currentApp = 0; // 0 for none, 
var currentVid = 0 // 0 for none
var check = 0;


setInterval(getApp, 100); 

document.addEventListener("click", function(event) {
  if(homescreen != 0 && currentApp == 8)
    {
      if(check == 1)
        {
          check = 0;
          homescreen = 0;
        }
    }
  return;
});

function getApp()
{
  if(homescreen == 0)
    {
      currentVid = 0;
      document.getElementById('rTop').style.display = 'block';
      document.getElementById('rMiddle').style.display = 'block';
      document.getElementById('rBottom').style.display = 'block';
      
      document.getElementById('winsorKnot').style.display = 'none';
      
      document.getElementById('appSelect').style.display = 'block';
      document.getElementById('backHomePage').style.display = 'none';
      
      document.getElementById('timeZoneButtons').style.display = 'none';
      document.getElementById('voiceActButton').style.display = 'none';
      document.getElementById('tutorialButtons').style.display = 'none';
      document.getElementById('cameraButton').style.display = 'none';
      document.getElementById('ledButtons').style.display = 'none';
      
      document.getElementById('tString').innerHTML = "";
      document.getElementById('mString').innerHTML = "Smart Mirror";
      document.getElementById('bString').innerHTML = "";
    }
  else
    {
      document.getElementById('appSelect').style.display = 'none';
      document.getElementById('backHomePage').style.display = 'block';
      if(currentApp == 1)
        {
          document.getElementById('rTop').style.display = 'block';
          document.getElementById('rMiddle').style.display = 'block';
          document.getElementById('rBottom').style.display = 'block';
          document.getElementById('timeZoneButtons').style.display = 'block';
          getDateAndTime();
        }
      else if(currentApp == 2) // Weather app
        {
          document.getElementById('rTop').style.display = 'block';
          document.getElementById('rMiddle').style.display = 'block';
          document.getElementById('rBottom').style.display = 'block';
          getWeather();
        }
      else if(currentApp == 3)
        {
          getQOTD();
        }
      else if(currentApp == 4)
        {
          document.getElementById('voiceActButton').style.display = 'block';
          document.getElementById('mString').innerHTML = "Press Button and Choose APP";
        }
      else if(currentApp == 5)
        {
          document.getElementById('tutorialButtons').style.display = 'block';
          document.getElementById('mString').innerHTML = "Choose Video";
        }
      else if(currentApp == 6)
        {
          document.getElementById('cameraButton').style.display = 'block';
          document.getElementById('mString').innerHTML = "Say Cheese!";
        }
      else if(currentApp == 7)
        {
          document.getElementById('ledButtons').style.display = 'block';
          document.getElementById('mString').innerHTML = "LED SECTION";
        }
      else if(currentApp == 8)
	{
	  check = 1;
          document.getElementById('backHomePage').style.display = 'none';
          document.getElementById('rTop').style.display = 'none';
          document.getElementById('rMiddle').style.display = 'none';
          document.getElementById('rBottom').style.display = 'none';
	}

      if(currentVid == 1)
        {
          document.getElementById('rTop').style.display = 'none';
          document.getElementById('rMiddle').style.display = 'none';
          document.getElementById('rBottom').style.display = 'none';
          document.getElementById('winsorKnot').style.display = 'block';
        }
      if(currentVid == 2)
        {
          document.getElementById('rTop').style.display = 'none';
          document.getElementById('rMiddle').style.display = 'none';
          document.getElementById('rBottom').style.display = 'none';
          document.getElementById('winsorKnot').style.display = 'none';
        }
      if(currentVid == 3)
        {
          document.getElementById('rTop').style.display = 'none';
          document.getElementById('rMiddle').style.display = 'none';
          document.getElementById('rBottom').style.display = 'none';
          document.getElementById('winsorKnot').style.display = 'none';
        }
      if(currentVid == 4)
        {
          document.getElementById('rTop').style.display = 'none';
          document.getElementById('rMiddle').style.display = 'none';
          document.getElementById('rBottom').style.display = 'none';
          document.getElementById('winsorKnot').style.display = 'none';
        }
    }
}

function timeClick()
{
  homescreen = 1;
  currentApp = 1;
}
function weatherClick()
{
  homescreen = 1;
  currentApp = 2;
}

function QOTDClick()
{
  homescreen = 1;
  currentApp = 3;
}

function voiceClick()
{
  homescreen = 1;
  currentApp = 4;
}

function tutClick()
{
  homescreen = 1;
  currentApp = 5;
}

function camClick()
{
  homescreen = 1;
  currentApp = 6;
}

function ledClick()
{
  homescreen = 1;
  currentApp = 7;
}

function backHomeClick()
{
  homescreen = 0;
  currentApp = 0;
}

function offClick()
{
	homescreen = 1;
	currentApp = 8;
}

let timezone;                                                                         // Timezone for time as offset variable (minutes)
let timezoneWord;                                                                     // Timezone as a word
const firstdate = new Date();                                                          // Initial time 
const firsttimezone = firstdate.getTimezoneOffset();                                  // Initial timezone
timezone = firstdate.getTimezoneOffset() + 60;                                        // Adds 60 to counter daylight savings
timezoneWord = getTimezone(timezone);                                                 // Timezone for time app

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

// Gets the current weather -- NEEDS IMPLEMENTED
function getWeather(){
  document.getElementById("tString").innerHTML = "Day";
  document.getElementById("mString").innerHTML = "32 F";
  document.getElementById("bString").innerHTML = "Location?";
}

function getQOTD(){
  const dqDate = new Date();
          var dQ = dqDate.getDay();
          document.getElementById("tString").innerHTML = "";
          if(dQ == 0)
            {
	      document.getElementById("bString").innerHTML = "- Zig Ziglar";
              document.getElementById("mString").innerHTML = "There is no elevator to success. You have to take the stairs.";
            }
          else if(dQ == 1)
            {
	      document.getElementById("bString").innerHTML = "- Maya Angelou";
              document.getElementById("mString").innerHTML = "You can'tuse up creativity. The more you use, the more you have.";
            }
          else if(dQ == 2)
            {
              document.getElementById("mString").innerHTML = "A little progress each day adds up to big results.";
	      document.getElementById("bString").innerHTML = "- Staya Nani";
            }
          else if(dQ == 3)
            {
              document.getElementById("mString").innerHTML = "Lose an hour in the morning and you will spend the day looking for it.";
	      document.getElementById("bString").innerHTML = "- Richard Whately";
            }
          else if(dQ == 4)
            {
              document.getElementById("mString").innerHTML = "When you have a dream, you've got to grab it and never let it go.";
	      document.getElemebtById("bString").innerHTML = "- Carol Burnett";
            }
          else if(dQ == 5)
            {
              document.getElementById("mString").innerHTML = "It does not mater how slowly you go as long as you do not stop.";
	      document.getElementById("bString").innerHTML = "- Confucious";
            }
          else if(dQ == 6)
            {
              document.getElementById("mString").innerHTML = "Make each day your masterpiece.";
	      document.getElementById("bString").innerHTML = "- John Wooden";
            }
}

function windsorClick()
{
  currentVid = 1;
}

