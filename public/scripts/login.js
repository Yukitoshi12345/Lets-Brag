$(window).ready(() => {
  const continueBtn = $('.continue');
  const cancelBtn = $('.cancel');
  const signInBtn = $('.signIn');
  const signUpBtn = $('.signUp');
  const form = $('.techBlogForm');

  const emailEl = $('#email');
  const passwordEl = $('#password');
  const usernameEl = $('#username');

  const passwordContainer = $('.pw');
  const usernameContainer = $('.user');

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

  const cancelHandler = async () => {
    // event.preventDefault();
    window.location.replace('/');
  };

  //handles "continue" click event
  //data validation is not done here
  //if user has access to this button,
  //means email data is already valid
  const continueHandler = async () => {
    const email = $.trim(emailEl.val());
    try {
      const response = await fetch('/api/users/login/', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      //when valid email is recieved, set it as readonly
      //then show other form elements
      emailEl.attr('Readonly', true);
      passwordEl.focus();

      //if the email exists
      //show sign in options
      if (response.ok) {
        passwordContainer.removeClass('hidden');
        signInBtn.removeClass('hidden');
        continueBtn.addClass('hidden');
        //if the email is new to the system,
        //show sign up options
      } else {
        form.text('Sign Up to Tech Blog!');
        passwordContainer.removeClass('hidden');
        usernameContainer.removeClass('hidden');
        signUpBtn.removeClass('hidden');
        continueBtn.addClass('hidden');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handles sign in click event
  const signInHandler = async () => {
    const page = JSON.parse(localStorage.getItem('page'));
    const email = $.trim(emailEl.val());
    const password = $.trim(passwordEl.val());

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        //check if to load dashboard page

        if (page === 'dashboard') {
          window.location.replace('/dashboard');
        } else if (page === 'home') {
          //when user pressed login from home page
          //simply redirect the user back to home page
          window.location.replace('/');
        } else {
          //check if to load post detail page
          window.location.replace(`/api/posts/${page}`);
        }
        localStorage.clear();
      } else {
        alert('Failed to log in.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handles sign up click event
  const signUpHandler = async () => {
    const page = JSON.parse(localStorage.getItem('page'));
    const email = $.trim(emailEl.val());
    const password = $.trim(passwordEl.val());
    const username = $.trim(usernameEl.val());

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, password, username }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        if (page === 'dashboard') {
          window.location.replace('/dashboard/');
        } else if (page === 'home') {
          //when user pressed login from home page
          //simply redirect the user back to home page
          window.location.replace('/');
        } else {
          //check if to load post detail page
          window.location.replace(`/api/posts/${page}`);
        }
        localStorage.clear();
      } else {
        alert('Username already taken. Please use another one.');
        usernameEl.val('');
        usernameEl.focus();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //continue button is enabled when email value is valid
  //unless it is disabled
  const emailChangeHandler = (event) => {
    if (validateEmail(emailEl.val())) {
      continueBtn.removeAttr('disabled');
      if (event.key === 'Enter') {
        continueHandler();
      }
    } else {
      continueBtn.attr('disabled', true);
    }
  };

  //when email and password are valid
  //enable sign in button
  const passwordChangeHandler = async (event) => {
    if (signUpBtn.hasClass('hidden')) {
      if (validatePassword(passwordEl.val())) {
        signInBtn.removeAttr('disabled');
        if (event.key === 'Enter') {
          signInHandler();
        }
      } else {
        signInBtn.attr('disabled', true);
      }
    }
  };

  //when email, password and username is valid
  //enable sign up button
  const usernameChangeHandler = (event) => {
    if (signInBtn.hasClass('hidden')) {
      if (
        validateUsername(usernameEl.val()) &&
        validatePassword(passwordEl.val())
      ) {
        signUpBtn.removeAttr('disabled');
        if (event.key === 'Enter') {
          signUpHandler();
        }
      } else {
        signUpBtn.attr('disabled', true);
      }
    }
  };

  continueBtn.on('click', continueHandler);
  cancelBtn.on('click', cancelHandler);
  signInBtn.on('click', signInHandler);
  signUpBtn.on('click', signUpHandler);

  emailEl.on('keyup', emailChangeHandler);
  passwordEl.on('keyup', passwordChangeHandler);
  usernameEl.on('keyup', usernameChangeHandler);
});
