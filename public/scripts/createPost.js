// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  // Select DOM elements using jQuery
  const createBtn = $('#create'); // Button for creating a brag
  const titleInput = $('#title'); // Input field for the brag title
  const postTxtArea = $('#post'); // Text area for the brag content
  const cancelBtn = $('#cancel'); // Button for canceling brag creation

  //when title input value changed
  //create button is enabled only when both title and content are not empty
  const titleChangeHandler = () => {
    // Check if both title and content are empty (trimmed to remove whitespace)
    if ($.trim(titleInput.val()) === '' || $.trim(postTxtArea.val()) === '') {
      // Disable the create button if either is empty
      createBtn.attr('disabled', true);
    } else {
      // Enable the create button if both have content
      createBtn.removeAttr('disabled');
    }
  };

  // When create button is pressed
  // **Handle the "Create Brag" button click**
  const createHandler = async () => {
    try {
      // Send a POST request to the '/api/brags/' endpoint
      const response = await fetch('/api/brags/', {
        method: 'POST',
        body: JSON.stringify({
          title: $.trim(titleInput.val()), // Send trimmed title value
          content: $.trim(postTxtArea.val()), // Send trimmed content value
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect to the dashboard
        window.location.replace('/dashboard');
        // window.location.reload();
      } else {
        alert('Failed to create post!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //when post content value is changed
  // **Handle changes to the post content text area**
  const postChangeHandler = () => {
    // Same logic as titleChangeHandler, ensures both fields have content
    if ($.trim(titleInput.val()) === '' || $.trim(postTxtArea.val()) === '') {
      createBtn.attr('disabled', true);
    } else {
      createBtn.removeAttr('disabled');
    }
  };

  //when cancel button is pressed
  // **Handle the "Cancel" button click**
  const cancelHandler = () => {
    // Redirect back to the dashboard on cancel
    window.location.replace('/dashboard');
  };

  // Attach event listeners to DOM elements
  titleInput.on('keyup', titleChangeHandler); // Keyup event on title input
  postTxtArea.on('keyup', postChangeHandler); // Keyup event on post text area
  createBtn.on('click', createHandler); // Click event on create button
  cancelBtn.on('click', cancelHandler); // Click event on cancel button
});
