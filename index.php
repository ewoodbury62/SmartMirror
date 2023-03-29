<!DOCTYPE html>
<html>
<body>
  <link rel="stylesheet" type="text/css" href="wrap.css" />
  <div class="float-container">
    <div class="float-child">
  <div class = "homePage" id = "homePage" style="float:left;">
    <h1 id="SmartMirror" class="SmartMirror" style="display: flex;justify-content: space-around;">
      Smart Mirror
    </h1>
    <p>
      <button onclick="timeClick()">Time</button>
      <button onclick="weatherClick()">Weather</button>
      <button onclick="QOTDClick()">Daily Quote</button>
      <button>Camera</button>
    </p>
    <p>
      <button onclick="voiceClick()">Voice Activation</button>
      <button>LED Control</button>
      <button onclick="tubeClick()">YouTube Tutorials</button>
    </p>
  </div>
    </div>
    <div class = "float-child">
      <div class = "app" id = "app" style="margin:10px;">
        <div class = "winsorKnot" id = "winsorKnot" style="display:none;">
          <iframe src="https://www.youtube.com/embed/xAg7z6u4NE8"
       width="560" height="315" frameborder="0"></iframe>
          </div>
        <div class = "backButton" id= "backButton">
          <button onClick="backClick()">Back</button>
        </div>
        <div class = "vidButtons" id="vidButtons">
          <p>
            <button onClick="winsorClick()">Winsor Knot</button>
            <button>Something</button>
          </p>
          <p>
            <button>Something</button>
            <button>Something</button>
          </p>
        </div>
        <div class = "rTop" id="rTop">
          <h1 id="tString"></h1>
        </div>

        <div class="rMiddle" id="rMiddle">
          <h1 id="mString"></h1>
        </div>
        <div class = "rBottom" id = "rBottom">
          <h1 id="bString"></h1>
        </div>
        <div class = "bButtons" style="display:flex;align-items:center;justify-content:space-around;">
          <p>
          <button id="bButton1" onclick="hTime()">Hawaii-Aleutian Standard Time</button>
          <button id="bButton2" onclick="aTime()">Alaska Standard Time</button>
          <button id="bButton3" onclick="pTime()">Pacific Standard Time</button>
          <button id="bButton4" onclick="mTime()">Mountain Standard Time</button>
          <button id="bButton5" onclick="cTime()">Central Standard Time</button>
          <button id="bButton6" onclick="eTime()">Eastern Standard Time</button>
          </p>
        </div>
          </div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
