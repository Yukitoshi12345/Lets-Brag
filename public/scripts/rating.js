// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  // Select DOM elements using jQuery
  const ratingStarEls = $('input[type="radio"][name="rating-3"]'); // Select all radio buttons with name "rating-3"
  const ratingEl = $('.ratingData'); // Select element with class "ratingData"

  // Function to handle rating changes
  const ratingChangeHandler = async (event) => {
    try {
      const response = await fetch('/api/ratings/', {
        // Send POST request to /api/ratings/
        method: 'POST',
        body: JSON.stringify({
          // Send rating and brag_id data in request body
          rating: $(event.target).prop('value'), // Get the selected rating value
          brag_id: $(event.target).data('id'), // Get the brag ID associated with the radio button
        }),
        headers: { 'Content-Type': 'application/json' }, // Set content type header
      });
      if (response.ok) {
        // If rating update is successful
        // Optionally uncomment to redirect to specific brag page after rating
        // window.location.replace(`/api/brags/${id}`);
        window.location.reload(); // Otherwise, simply reload the page
      } else {
        alert('Failed to rate the brag post'); // Display error message
      }
    } catch (error) {
      console.log(error); // Log any errors during rating
    }
  };

  // Function to handle initial rating display
  const ratingLoadingHandler = () => {
    const rating = ratingEl.text(); // Get the current rating text value
    // alert(rating);

    // Loop through all radio buttons and check the one matching the rating
    ratingStarEls.each((i, ratingStar) => {
      if (ratingStar.value === rating) {
        $(ratingStar).prop('checked', true);
      }
    });
  };

  // Attach event listeners
  $(window).on('load', ratingLoadingHandler); // Load rating data on page load
  ratingStarEls.on('change', ratingChangeHandler); // Handle rating changes on radio button selection
});
