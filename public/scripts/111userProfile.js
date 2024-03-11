// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  const formEl = $('form');
  const submitBtn = $('input[type="submit"]');
/*
 note: for multer to work the form need to be submitted
 
  const submitHandler = async(event) =>{
    // event.preventDefault();
    try {
        const response = await fetch('/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
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
  */
});
