// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  // Select DOM elements using jQuery
  const postContainerEl = $('#post-container'); // Container element for brag posts
  const createBtn = $('.create'); // Button for creating a new brag

  // Post update link  and delete handler
  // **Handle edit (delete or update) button clicks within the post container**
  const editHandler = async (event) => {
    const id = $(event.target).data('id'); // Get the ID from the button's data attribute
    try {
      //----------------------------------delete handler
      // **Handle delete button click**
      if ($(event.target).hasClass('delete')) {
        // Check if the clicked button has the class "delete"
        // This verifies the user specifically clicked a delete button

        // Attempt to delete the brag post
        const response = await fetch(`/api/brags/${id}`, {
          method: 'DELETE', // Specify HTTP method for deletion
        });

        if (response.ok) {
          // If the deletion is successful
          window.location.reload(); // Reload the page to reflect the deletion
          alert('Your post has been deleted!'); // Inform the user of success
        } else {
          // If the deletion fails
          alert('Failed to delete post'); // Inform the user of failure
        }
        //---------------------------------update link handler
        //doesn't handle update data here
        // just fetches the existing brag post
        // displays in next page to be edited

        // **Handle update button click (doesn't handle update data here)**
      } else if ($(event.target).hasClass('update')) {
        // Check if the clicked button has the class "update"
        // This verifies the user specifically clicked an update button

        // Attempt to fetch the update form data from the server
        const response = await fetch(`/dashboard/${id}`, {
          method: 'GET', // Specify the HTTP method as GET for retrieving data
          headers: { 'Content-Type': 'application/json' }, // Set the Content-Type header for JSON data
        });

        if (response.ok) {
          // If fetching the update form data is successful
          window.location.replace(`/dashboard/${id}`); // Redirect the user to the update form page, including the ID
        } else {
          // If fetching the update form data fails
          alert('Failed to get post update form!'); // Inform the user of the failure
        }
      } //end of update/delete
    } catch (error) {
      console.log(error); // Log errors for debugging
      // Handle server errors (500 status code)
      res.status(500).json(error);
    }
  };

  //post create link handler
  // **Handle create button click**
  const createHandler = async (event) => {
    const id = $(event.target).data('id'); // Get the ID from the button's data attribute (assuming it exists)
    try {
      // Attempt to fetch data from the server
      const response = await fetch(`/api/users/${id}`, {
        method: 'GET', // Specify the HTTP method as GET for retrieving data
        headers: { 'Content-Type': 'application/json' }, // Set the Content-Type header for JSON data
      });

      if (response.ok) {
        // If the response is successful (status code in the 200 range)
        window.location.replace(`/api/users/${id}`); // Redirect to create form page
      } else {
        // If the response is not successful
        alert('Failed to get post create form!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Attach event listeners
  createBtn.on('click', createHandler);
  postContainerEl.on('click', 'button', editHandler);
});

// **Explanation of event listeners:**
// - createButton.on('click', createHandler): Listens for clicks on the create button and calls the createHandler function.
// - postContainerEl.on('click', 'button', editHandler): Listens for clicks on any button element within the postContainerEl and calls the editHandler function,
//   passing the event object as an argument. This allows handling both delete and update buttons within the post container.
