  // Initial array of gifs
  const topics = [];

  // displaygifInfo function re-renders the HTML to display the appropriate content
  function displaygifInfo() {

    const topicName = $(this).attr("data-name");
    const queryURL =
      `http://api.giphy.com/v1/gifs/search?q=${topicName}&limit=10&api_key=wi2YX0JUhKqOOuIG5uYUovHcz02Z2nTA`;
    console.log(queryURL);
    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      const results = response.data;
      // Creating a div to hold the gif
     

      for (let i = 0; i < results.length; i++) {
      const gifDiv = $("<div class='gif'>");
      //Storing the title, rating, data
      const title = results[i].title;
      const rating = results[i].rating;

      // Creating an element to have the title, rating displayed
      const titleEl = $("<p>").text(title.toUpperCase().replace("GIF",""))
      const ratingEl = $("<p>").text("Rating: " + rating);

      // Retrieving the URL for the still image
      const stillImgURL = results[i].images.fixed_height_still.url;

      // Retrieving the URL for the animated image 
      const animatedImgURL = results[i].images.fixed_height.url;

      // Creating an element to hold the still image
      const Img = $("<img>").attr({src: stillImgURL, "data-still": stillImgURL, "data-animate": animatedImgURL, "data-isAnimated": "false"}).addClass("gifs");

      // Retrieving the image for the 
      gifDiv.append(titleEl,ratingEl,Img);

      // Putting the entire gif above the previous gifs
      $("#gifs-view").prepend(gifDiv);
      
    };
  });
  };
$(document).on("click",".gifs",function () {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      const state = $(this).attr("data-isAnimated");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-isAnimated to true
      // Else set src to the data-still value
      if (state === "false") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-isAnimated", "true");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-isAnimated", "false");
      
      }
    });
  // Function for displaying gif data
  function renderButtons() {

    // Deleting the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (let i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each gif in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      const a = $("<button>");
      // Adding a class of gif-btn to our button
      a.addClass("gif-btn");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a gif button is clicked
  $("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    const gif = $("#gif-input").val().trim();

    // Adding gif from the textbox to our array
    topics.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "gif-btn"
  $(document).on("click", ".gif-btn", displaygifInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();