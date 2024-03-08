// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  // Select DOM elements using jQuery
  const continueBtn = $('.continue');
  const cancelBtn = $('.cancel');
  const signInBtn = $('.signIn');
  const signUpBtn = $('.signUp');
  const form = $('.bragBlogForm');

  const emailEl = $('#email');
  const passwordEl = $('#password');
  const usernameEl = $('#username');

  const passwordContainer = $('.pw'); // Container for password input field
  const usernameContainer = $('.user'); // Container for username input field
  const titleEl = $('title'); // Page title element

  // Set the page title
  titleEl.text("Let's Brag | Login/SignUp|");

  // Validation
  const validateEmail = (input) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(input);
  };
  const validatePassword = (input) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    return regex.test(input);
  };
  const validateUsername = (input) => {
    const regex = /^[a-zA-Z0-9]{1,35}$/;
    return regex.test(input);
  };

  // **Event handlers**

  // Handles "cancel" button click
  const cancelHandler = async () => {
    // event.preventDefault(); => Prevent default form submission behavior (not needed here)
    window.location.replace('/'); // Redirect to home page
  };

  // Handles "continue" click event
  // Data validation is not done here
  // If user has access to this button,
  // means email data is already valid

  // Handles "continue" button click (email validation assumed to be done elsewhere)
  const continueHandler = async () => {
    const email = $.trim(emailEl.val()); // Get trimmed email value
    try {
      const response = await fetch('/api/users/login/', {
        method: 'POST',
        body: JSON.stringify({ email }), // Send email data in request body
        headers: { 'Content-Type': 'application/json' },
      });

      // When valid email is recieved, set it as readonly
      // Then show other form elements

      // Email is valid
      emailEl.attr('Readonly', true); // Make email field read-only
      passwordEl.focus(); // Set focus to password field

      // If the email exists
      // Show sign in options

      if (response.ok) {
        // Assuming successful response indicates existing email
        passwordContainer.removeClass('hidden'); // Show password container
        signInBtn.removeClass('!hidden'); // Show sign in button
        signInBtn.attr('disabled', true); // Disable sign in button initially
        continueBtn.addClass('!hidden'); // Hide continue button

        //If the email is new to the system,
        //show sign up options
      } else {
        // Email is new to the system
        form.text("Sign Up to Let's Brag!"); // Change form text
        passwordContainer.removeClass('hidden'); // Show password container
        usernameContainer.removeClass('hidden'); // Show username container
        signUpBtn.removeClass('!hidden'); // Show sign up button
        signUpBtn.attr('disabled', true); // Disable sign up button initially
        continueBtn.addClass('!hidden'); // Hide continue button
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  // Handles sign in click event
  // Handles "sign in" button click
  const signInHandler = async () => {
    const page = JSON.parse(localStorage.getItem('page')); // Get stored reference page
    const email = $.trim(emailEl.val()); // Get trimmed email value
    const password = $.trim(passwordEl.val()); // Get trimmed password value

    // **signInHandler function**
    try {
      // Make a POST request to /api/users/login with email and password data
      const response = await fetch('/api/users/login', {
        method: 'POST', // Set request method to POST
        body: JSON.stringify({ email, password }), // Send email and password data in request body
        headers: { 'Content-Type': 'application/json' }, // Set content type header
      });

      // If login is successful
      if (response.ok) {
        // Check if to load dashboard page
        // Login successful

        // Check which page to redirect to based on 'page' variable
        if (page === 'dashboard') {
          window.location.replace('/dashboard'); // Redirect to dashboard
        } else if (page === 'home') {
          // When user pressed login from home page
          // simply redirect the user back to home page
          window.location.replace('/'); // Redirect to home page
        } else {
          // Check if to load post detail page
          window.location.replace(`/api/brags/${page}`); // Redirect to post detail page
        }
        localStorage.clear(); // Clear localStorage
      } else {
        alert('Failed to log in.'); // Display error message
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handles sign up click event
  // **signUpHandler function**
  const signUpHandler = async () => {
    const page = JSON.parse(localStorage.getItem('page')); // Get stored reference page to determine redirection after successful signup
    // Get trimmed values from input fields
    const email = $.trim(emailEl.val());
    const password = $.trim(passwordEl.val());
    const username = $.trim(usernameEl.val());

    try {
      // Send a POST request to /api/users to create a new user
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, password, username }), // Send email, password and username data in request body
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // If signup is successful
        if (page === 'dashboard') {
          window.location.replace('/dashboard/'); // Redirect to dashboard
        } else if (page === 'home') {
          // When user pressed login from home page
          // simply redirect the user back to home page
          // When user pressed login from home page, simply redirect back to home
          window.location.replace('/');
        } else {
          // Check if a specific post detail page needs to be loaded
          window.location.replace(`/api/brags/${page}`);
        }
        localStorage.clear(); // Clear localStorage
      } else {
        alert('Username already taken. Please use another one.');
        usernameEl.val(''); // Clear username field
        usernameEl.focus(); // Set focus back to username field
      }
    } catch (error) {
      console.log(error); // Log any errors during signup
    }
  };
  // Continue button is enabled when email value is valid
  // unless it is disabled
  // Continue button is enabled when email value is valid (unless disabled)
  const emailChangeHandler = (event) => {
    if (validateEmail(emailEl.val())) {
      continueBtn.removeAttr('disabled'); // Enable continue button
      if (event.key === 'Enter') {
        continueHandler(); // Simulate continue button click on Enter key press
      }
    } else {
      continueBtn.attr('disabled', true); // Disable continue button if email is invalid
    }
  };

  // When email and password are valid
  // enable sign in button
  // Enable sign in button when email and password are valid
  const passwordChangeHandler = async (event) => {
    if (signUpBtn.hasClass('!hidden')) {
      // If sign up form is visible
      if (validatePassword(passwordEl.val())) {
        signInBtn.removeAttr('disabled');
        // Enable sign in button
        if (event.key === 'Enter') {
          signInHandler(); // Simulate sign in button click on Enter key press
        }
      } else {
        signInBtn.attr('disabled', true); // Disable sign in button if password is invalid
      }
    } else {
      if (
        // If sign in form is visible (not the sign up form)
        validateUsername(usernameEl.val()) &&
        validatePassword(passwordEl.val())
      ) {
        signUpBtn.removeAttr('disabled'); // Enable sign up button
      } else {
        signUpBtn.attr('disabled', true); // Disable sign up button if username or password is invalid
      }
    }
  };

  //when email, password and username is valid
  //enable sign up button
  // Enable sign up button when email, password and username are valid
  const usernameChangeHandler = (event) => {
    if (signInBtn.hasClass('!hidden')) {
      // If sign in form is visible
      if (
        validateUsername(usernameEl.val()) &&
        validatePassword(passwordEl.val())
      ) {
        signUpBtn.removeAttr('disabled'); // Enable sign up button
        if (event.key === 'Enter') {
          signUpHandler(); // Simulate sign up button click on Enter key press
        }
      } else {
        signUpBtn.attr('disabled', true); // Disable sign up button if username or password is invalid
      }
    }
  };

  // Attach event listeners
  continueBtn.on('click', continueHandler); // Add click event listener to continue button
  cancelBtn.on('click', cancelHandler); // Add click event listener to cancel button
  signInBtn.on('click', signInHandler); // Add click event listener to sign in button
  signUpBtn.on('click', signUpHandler); // Add click event listener to sign up button

  emailEl.on('keyup', emailChangeHandler); // Add keyup event listener to email field (fires on every key press)
  passwordEl.on('keyup', passwordChangeHandler); // Add keyup event listener to password field (fires on every key press)
  usernameEl.on('keyup', usernameChangeHandler); // Add keyup event listener to username field (fires on every key press)
});
