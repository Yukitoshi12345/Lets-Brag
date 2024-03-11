// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  const createFormSubmitBtn = $('.createForm .submit');
  const createFormTextAreaEl = $('.createForm .content');
  const createFormCancelBtn = $('.createForm .cancel');
   const commentMenuEl = $('.commentMenu');
  // const editBtn = $('.edit');
  // const deleteBtn = $('.delete');
  

 
  /*
    const url = window.location.toString();
    const postId= url.charAt(url.length-1);
    */

  //data validation is not done here
  // if user has access to post button
  //that means the comment value is already valid

  // **Post comment handler**
  const createFormPostHandler = async (event) => {
    // Remove leading/trailing whitespace from the comment text
    const comment = $.trim(createFormTextAreaEl.val());
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
  const createFormTextChangeHandler = (event) => {
    // Enable the post button if the comment text is not empty
    if ($.trim(createFormTextAreaEl.val()) !== '') {
      createFormSubmitBtn.removeAttr('disabled');
      // If the Enter key is pressed, trigger the postHandler function
      if (event.key === 'Enter') {
        postHandler();
      }
    } else {
      // Disable the post button if the comment text is empty
      createFormSubmitBtn.attr('disabled', true);
    }
  };

  // **Cancel button handler**
  const createFormCancelHandler = () => {
    // Clear the comment text area and set focus
    createFormTextAreaEl.val('');
    createFormTextAreaEl.focus();
    // Disable the post button
    createFormSubmitBtn.attr('disabled', true);
  };

  // **Post comment handler**
  const editFormPostHandler = async (event) => {
    const theTextareaEl= $(event.target).closest('form').children('textarea');
    // Remove leading/trailing whitespace from the comment text
    const comment = $.trim(theTextareaEl.val());
    // Extract the post ID from the button's data attribute (assuming it exists)
    const postId = $(event.target).data('id');
    try {
      // Send a POST request to the '/api/comments/' endpoint
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ content: comment}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // If the request is successful, reload the page to display the new comment
        window.location.reload();
      } else {
        // If the request fails, display an error message
        alert('Failed to update the comment!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //when comment is not empty, enable post button
  //when enter key is pressed, create comment



  // **Cancel button handler of comment edit**
  const editFormCancelHandler = (event) => {
    const theFormEl= $(event.target).closest('form');
    const theTextareaEl= $(event.target).closest('textarea');
    const theContentEl = $(event.target).closest('.commentContent');
    const postBtn = $(event.target).prev();

    // Clear the comment text area and set focus
    theTextareaEl.val('');
    theFormEl.addClass('hidden');
    theContentEl.removeClass('hidden');
    postBtn.addClass('disabled');

  };

  // **text change handler of comment edit**
  const editFormTextChangeHandler = (event) => {
    const theFormEl= $(event.target).closest('form');
    const theTextareaEl= $(event.target); 
    const postBtn = $(theFormEl).children('.submit');

    if($.trim(theTextareaEl.val())===''){
      postBtn.attr('disabled', true);
    }else{
      postBtn.removeAttr('disabled');
    }
  };


  const commentMenuHandler = async(event)=>{
    try {
      const id = $(event.target).data('id');
      if ($(event.target).hasClass('delete')) {
        const response = await fetch(`/api/comments/${id}`, {
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
      }else if($(event.target).hasClass('edit')) {
        // Check if the clicked button has the class "update"
        // This verifies the user specifically clicked an update button
        
        const theContentEl =$(event.target).closest('h2').next();
        
        const theFormEl = $(event.target).closest('h2').siblings(':last');
        const textAreaEl = $(theFormEl).children('textarea');
        const submitBtn = $(theFormEl).children('.submit');
        const cancelBtn = $(theFormEl).children('.cancel');

        submitBtn.removeAttr('disabled');
        theFormEl.removeClass('hidden');
        theContentEl.addClass('hidden');

        textAreaEl.on('keyup', editFormTextChangeHandler);
        cancelBtn.on('click', editFormCancelHandler);
        submitBtn.on('click', editFormPostHandler);
      }
    } catch (error) {
      console.log(error); // Log errors for debugging
    }
  };
  // Attach event listeners
  createFormSubmitBtn.on('click', createFormPostHandler);
  createFormCancelBtn.on('click', createFormCancelHandler);
  createFormTextAreaEl.on('keyup', createFormTextChangeHandler);
  commentMenuEl.on('click', 'button', commentMenuHandler);
});
