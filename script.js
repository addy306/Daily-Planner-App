//Display the current day at the top of the calendar 
//when a user opens the planner.

//Present timeblocks for standard business hours when the user scrolls down.

//Color-code each timeblock based on past, present, and future when the timeblock is viewed.

//Allow a user to enter an event when they click a timeblock.

//Save the event in local storage when the save button is clicked in that timeblock.

//Persist events between refreshes of a page.
$(document).ready(function () {
    // Display current day at the top of the page
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  
    // Function to save input to local storage
    function saveToLocalStorage(hour, text) {
      localStorage.setItem(hour, text);
    }
  
    // Function to load saved input from local storage
    function loadFromLocalStorage(hour) {
      return localStorage.getItem(hour);
    }
  
    // Generate time blocks dynamically
    function generateTimeBlocks() {
      var container = $(".container");
      var currentTime = dayjs().hour();
  
      // Loop through hours from 9 AM to 5 PM
      for (var hour = 9; hour <= 17; hour++) {
        var timeBlock = $("<div>").addClass("row time-block");
  
        // Add hour label
        var hourLabel = $("<div>")
          .addClass("col-1 hour")
          .text(dayjs().hour(hour).format("hA"));
        timeBlock.append(hourLabel);
  
        // Add textarea for user input
        var textArea = $("<textarea>")
          .addClass("col-9 description")
          .attr("data-hour", hour)
          .val(loadFromLocalStorage(hour));
        timeBlock.append(textArea);
  
        // Add save button
        var saveButton = $("<button>")
          .addClass("col-2 saveBtn")
          .html('<i class="fas fa-save"></i>');
        timeBlock.append(saveButton);
  
        // Apply past, present, or future class based on the current time
        if (hour < currentTime) {
          timeBlock.addClass("past");
        } else if (hour === currentTime) {
          timeBlock.addClass("present");
        } else {
          timeBlock.addClass("future");
        }
  
        container.append(timeBlock);
      }
    }
  
    // Call the function to generate time blocks
    generateTimeBlocks();
  
    // Save button click event
    $(".saveBtn").on("click", function () {
      var hour = $(this).siblings(".description").data("hour");
      var text = $(this).siblings(".description").val();
  
      saveToLocalStorage(hour, text);
    });
  });
  