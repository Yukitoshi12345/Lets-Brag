// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  const formEl = $('form');
  const submitBtn = $('input[type="submit"]');

  const submitHandler = async(event) =>{
    event.preventDefault();
    const id = $(event.target).data('id');
    try {
        const response = await fetch('/upload', {
        // Send PUT request to update the brag post with ID
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Set content type header
      });
      if (response.ok) {
        // If update is successful
        alert('upload successful');
        window.location.reload();
      } else {
        alert('Failed to update post!'); // Display error message
      }
    } catch (error) {
      console.log(error);
    }

  };
  submitBtn.on('click', submitHandler);
 
});
