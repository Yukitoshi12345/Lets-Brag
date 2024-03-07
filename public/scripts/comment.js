// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  const postBtn = $('#post');
  const commentTxtArea = $('#comment');
  const cancelBtn = $('.cancel');

  /*
    const url = window.location.toString();
    const postId= url.charAt(url.length-1);
    */

  //data validation is not done here
  // if user has access to post button
  //that means the comment value is already valid

  // **Post comment handler**
  const postHandler = async (event) => {
    // Remove leading/trailing whitespace from the comment text
    const comment = $.trim(commentTxtArea.val());
    // Extract the post ID from the button's data attribute (assuming it exists)
    const postId = $(event.target).data('id');
    try {
      // Send a POST request to the '/api/comments/' endpoint
      const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ content: comment, post_id: postId }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // If the request is successful, reload the page to display the new comment
        window.location.reload();
      } else {
        // If the request fails, display an error message
        alert('Failed to create the comment!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //when comment is not empty, enable post button
  //when enter key is pressed, create comment

  // **Comment text change handler**
  const textChangeHandler = (event) => {
    // Enable the post button if the comment text is not empty
    if ($.trim(commentTxtArea.val()) !== '') {
      postBtn.removeAttr('disabled');
      // If the Enter key is pressed, trigger the postHandler function
      if (event.key === 'Enter') {
        postHandler();
      }
    } else {
      // Disable the post button if the comment text is empty
      postBtn.attr('disabled', true);
    }
  };

  // **Cancel button handler**
  const cancelHandler = () => {
    // Clear the comment text area and set focus
    commentTxtArea.val('');
    commentTxtArea.focus();
    // Disable the post button
    postBtn.attr('disabled', true);
  };

  // Attach event listeners
  postBtn.on('click', postHandler);
  cancelBtn.on('click', cancelHandler);
  commentTxtArea.on('keyup', textChangeHandler);
});
