// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  // Select the main content container element using jQuery
  const mainContainer = $('main');

  // **Function to save a reference page/ID to local storage**
  const saveReferencePageToStorage = (page) => {
    // localStorage.clear(); => This line would clear any existing data in local storage
    localStorage.setItem('page', JSON.stringify(page)); // Store the page reference (or ID) as a JSON string in local storage
  };

  // When post-preview page's Read Full Article buttton is clicked
  // **Event handler for clicks within the main content container**
  const mainContainerHandler = async (event) => {
    // Check if the clicked element is a button and has a "data-id" attribute
    const id = $(event.target).data('id'); // Get the ID from the button's data-id attribute
    // Saving post id to local storage for reference to redirect to correct post route
    // after login/sign up

    // Save the post ID to local storage for potential redirection after login/signup
    saveReferencePageToStorage(id);

    try {
      const response = await fetch(`/api/brags/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, // Set Content-Type header (optional for GET requests)
      });
      if (response.ok) {
        window.location.replace(`/api/brags/${id}`); // Redirect the user to the specific brag post page
      } else {
        alert('Failed to open the brag post');
      }
    } catch (error) {
      console.log(error); // Log errors for debugging
    }
  };

  // Attach event listener to the main container element
  mainContainer.on('click', 'button', mainContainerHandler);
});
