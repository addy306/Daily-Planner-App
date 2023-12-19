$(document).ready(function () {
    //Display the current day at the top of the calendar 
    //when a user opens the planner.
    var timeDisplayEl = $('#time-display');
  // handle displaying the time
function displayTime() {
    var rightNow = dayjs().format('DD MMM YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }
    // Function to save input to local storage
    function saveToLocalStorage(hour, text) {
      localStorage.setItem(hour, text);
    }
  
    // Function to load saved input from local storage
    function loadFromLocalStorage(hour) {
      return localStorage.getItem(hour);
    }
  //Present timeblocks for standard business hours when the user scrolls down.
    // Generate time blocks dynamically
    function generateTimeBlocks() {
      var container = $(".container");
      var currentTime = dayjs().hour();
  
      // Loop through hours from 9 AM to 5 PM
      for (var hour = 9; hour <= 17; hour++) {
        var timeBlock = $("<div>").addClass("row time-block");
  
        // Add hour label
        var hourLabel = $("<div>")
          .addClass("col-2 hour")
          .text(dayjs().hour(hour).format("hA"));
        timeBlock.append(hourLabel);

        //Allow a user to enter an event when they click a timeblock.
        // Add textarea for user input
        var textArea = $("<textarea>")
          .addClass("col-9 description")
          .attr("data-hour", hour)
          .val(loadFromLocalStorage(hour));
        timeBlock.append(textArea);
  
        // Add save button
        var saveButton = $("<button>")
          .addClass("col-1 saveBtn")
          .html('<i class="fas fa-save"></i>');
        timeBlock.append(saveButton);

        //Color-code each timeblock based on past, present, and future when the timeblock is viewed.
        // Apply past, present, or future class based on the current time
        if (hour < currentTime) {
            hourLabel .addClass("past");
            //saveButton .addClass("past");
        } else if (hour === currentTime) {
            hourLabel.addClass("present");
            //saveButton .addClass("present");
        } else {
            hourLabel.addClass("future");
            //saveButton.addClass("future");
        }
  
        container.append(timeBlock);
      }
    }
  
    // Call the function to generate time blocks
    generateTimeBlocks();

  //Save the event in local storage when the save button is clicked in that timeblock.
    // Save button click event
    $(".saveBtn").on("click", function () {
      var hour = $(this).siblings(".description").data("hour");
      var text = $(this).siblings(".description").val();
  
      saveToLocalStorage(hour, text); // save to local storage
    });
    displayTime()
  });
  