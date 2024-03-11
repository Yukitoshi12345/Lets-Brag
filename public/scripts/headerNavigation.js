// Wait for the DOM to be fully loaded before executing the script
$(window).ready(() => {
  // Select DOM elements using jQuery
  const dashboardBtn = $('#dashboard'); // Button for accessing the dashboard
  const logoutBtn = $('#logout'); // Button for logging out
  const loginBtn = $('#login'); // Button for logging in
  const loggedInUserEl = $('#loggedInUser');
  const loggedInUserPhotoEl = $('#loggedInUserPhoto');

  // **Function to save a page reference to local storage**
  const saveReferencePageToStorage = (page) => {
    // localStorage.clear(); => This line would clear any existing data in local storage
    localStorage.setItem('page', JSON.stringify(page)); // Store the page name as a JSON string in local storage
  };

  // When user presses logout button
  // **Logout button click handler**
  const logoutHandler = async (event) => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Set Content-Type header for potential data in request body
      });

      if (response.ok) {
        //   window.location.href("/login"); => This would set the location to "/login" (not recommended)
        window.location.replace('/'); // Redirect the user to the root path after successful logout
      } else {
        alert('Failed to log out.');
      }
    } catch (error) {
      console.log(error); // Log errors for debugging
    }
  };

  // When user presses login button
  // **Login button click handler**
  const loginHandler = (event) => {
    localStorage.setItem('page', JSON.stringify('home')); // Store the page reference ("home") in local storage
    window.location.assign('/login'); // Assign the location to "/login" for login page
  };

  // When Dashboard link is clicked from page's navbar
  // **Dashboard link click handler**
  const dashboardLinkHandler = async (event) => {
    //saving page reference to local storage for reference to redirect to correct dashboard route
    //after login/sign up

    // Save the reference page ("dashboard") to local storage for potential redirection after login/signup
    saveReferencePageToStorage('dashboard');
    try {
      const response = await fetch(`/dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, // Set Content-Type header (optional for GET requests)
      });
      if (response.ok) {
        window.location.replace(`/dashboard`); // Redirect the user to the dashboard page
      } else {
        alert('Failed to open the dashboard');
      }
    } catch (error) {
      console.log(error); // Log errors for debugging
    }
  };

  const pageLoadHandler = async()=>{
    /*
    try {
      const response = await fetch('/api/users/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, // Set Content-Type header (optional for GET requests)
      });
      if (response.ok) {
        const userData = await response.json(); // Parse JSON response
        const username = userData.username;
        const photo = userData.profile_photo;
        loggedInUserEl.text(`G'day, ${username}!` );
        loggedInUserPhotoEl.attr('src', `/images/${photo}`);
       
        // window.location.replace(`/dashboard`); // Redirect the user to the dashboard page
      } else {
        //alert('Failed to open the dashboard');
        //do nothing
        //user is not logged in
        //there is no session userId
      }
    } catch (error) {
      console.log(error); // Log errors for debugging
    }
    */
  };

  // Attach event listeners to buttons
  logoutBtn.on('click', logoutHandler);
  loginBtn.on('click', loginHandler);
  dashboardBtn.on('click', dashboardLinkHandler);
  $(window).on('load', pageLoadHandler);
});
