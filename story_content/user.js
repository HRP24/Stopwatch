window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  var player = GetPlayer();

// Stop the timer
player.SetVar("TimerRunning", false);

}

window.Script2 = function()
{
  // Access Storyline's player
var player = GetPlayer();

// Fetch existing variables from Storyline
var hours = player.GetVar("Hours");
var minutes = player.GetVar("Minutes");
var seconds = player.GetVar("Seconds");
var milliseconds = player.GetVar("Milliseconds");

// Add zero padding for display
function pad(num, size) {
    return ('000' + num).slice(-size);
}

// Initialize the interval variable outside
if (!window.stopwatchInterval) {
    window.stopwatchInterval = null;
}

// Check if the timer is already running
if (!player.GetVar("TimerRunning")) {
    player.SetVar("TimerRunning", true);

    // Start the interval timer
    window.stopwatchInterval = setInterval(function () {
        // If the timer is running, update the stopwatch
        if (player.GetVar("TimerRunning")) {
            milliseconds += 10; // Increment milliseconds

            // Handle rollover
            if (milliseconds >= 1000) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }

            // Update Storyline variables with zero-padded values
            player.SetVar("Milliseconds", pad(milliseconds, 3));
            player.SetVar("Seconds", pad(seconds, 2));
            player.SetVar("Minutes", pad(minutes, 2));
            player.SetVar("Hours", pad(hours, 2));
        } else {
            clearInterval(window.stopwatchInterval); // Stop the interval if TimerRunning is false
        }
    }, 10); // Run every 10ms for millisecond accuracy
}

}

window.Script3 = function()
{
  var player = GetPlayer();

// Stop the timer
player.SetVar("TimerRunning", false);

// Reset variables
player.SetVar("Hours", 0);
player.SetVar("Minutes", 0);
player.SetVar("Seconds", 0);
player.SetVar("Milliseconds", 0);

// Clear the interval
if (window.stopwatchInterval) {
    clearInterval(window.stopwatchInterval);
    window.stopwatchInterval = null;
}

}

};
