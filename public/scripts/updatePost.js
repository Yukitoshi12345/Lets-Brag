// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  // Select DOM elements using jQuery
  const titleEl = $('#title'); // Select element with ID "title" (presumably an input field for the post title)
  const postTxtArea = $('#post'); // Select element with ID "post" (presumably a text area for the post content)
  const updateBtn = $('#update'); // Select element with ID "update" (presumably a button for updating the post)
  const cancelBtn = $('#cancel'); // Select element with ID "cancel" (presumably a button for canceling the update)

  // Function to handle "Enter" key press in the title field (prevent form submission)
  const enterKeyHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission behavior (not needed for update here)
    }
  };

  // When text in title is changed
  // Function to handle changes in the title field
  const titleChangeHandler = () => {
    if ($.trim(titleEl.text()) === '') {
      // Get the trimmed title text and check if title is empty
      updateBtn.attr('disabled', true); // Disable update button if title is empty
    } else {
      updateBtn.removeAttr('disabled'); // Enable update button if title has content
    }
  };

  // When update button is pressed
  // Function to handle the "update" button click
  const updateHandler = async (event) => {
    const id = $(event.target).data('id'); // Get the brag post ID from the button's data attribute
    try {
      const response = await fetch(`/api/brags/${id}`, {
        // Send PUT request to update the brag post with ID
        method: 'PUT',
        body: JSON.stringify({
          // Send data in request body
          title: $.trim(titleEl.text()), // Send trimmed title text
          content: $.trim(postTxtArea.val()), // Send trimmed post content
        }),
        headers: { 'Content-Type': 'application/json' }, // Set content type header
      });

      if (response.ok) {
        // If update is successful
        window.location.replace('/dashboard'); // Redirect to dashboard
      } else {
        alert('Failed to update post!'); // Display error message
      }
    } catch (error) {
      console.log(error); // Log any errors during update
    }
  };

  // When value in textbox for post content is changed
  // Function to handle changes in the post content text area
  const postChangeHandler = (event) => {
    if ($.trim(postTxtArea.val()) === '') {
      // Get the trimmed post content and check if the content is empty
      updateBtn.attr('disabled', true); // Disable update button if content is empty
    } else {
      updateBtn.removeAttr('disabled'); // Enable update button if content has text
    }
    // Disabling the enter key, so users can type more paragraphs
    // Disable "Enter" key press in the text area to allow multiline editing
    if (event.key === 'Enter') {
      updateHandler(); // Simulate update button click on Enter key press (optional)
    }
  };

  // When cancel button is pressed
  // Function to handle the "cancel" button click
  const cancelHandler = () => {
    window.location.replace('/dashboard'); // Redirect back to dashboard on cancel
  };

  // Attach event listeners
  titleEl.on('keydown', enterKeyHandler); // Listen for keydown event (including Enter) on title field
  postTxtArea.on('keyup', postChangeHandler); // Listen for keyup event (on each key release) on post content text area
  titleEl.on('keyup', titleChangeHandler); // Listen for keyup event on title field
  updateBtn.on('click', updateHandler); // Listen for click event on update button
  cancelBtn.on('click', cancelHandler); // Listen for click event on cancel button
});
