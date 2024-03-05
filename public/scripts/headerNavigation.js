$(window).ready(() => {
  const dashboardBtn = $('#dashboard');
  const logoutBtn = $('#logout');
  const loginBtn = $('#login');

  const saveReferencePageToStorage = (page) => {
    // localStorage.clear();
    localStorage.setItem('page', JSON.stringify(page));
  };

  //when user presses logout button
  const logoutHandler = async (event) => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        //   window.location.href("/login");
        window.location.replace('/');
      } else {
        alert('Failed to log out.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //when user presses login button
  const loginHandler = (event) => {
    localStorage.setItem('page', JSON.stringify('home'));
    window.location.assign('/login');
  };

  //when Dashboard link is clicked from page's navbar
  const dashboardLinkHandler = async (event) => {
    //saving page reference to local storage for reference to redirect to correct dashboard route
    //after login/sign up

    saveReferencePageToStorage('dashboard');
    try {
      const response = await fetch(`/dashboard/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        window.location.replace(`/dashboard/`);
      } else {
        alert('Failed to open the dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  logoutBtn.on('click', logoutHandler);
  loginBtn.on('click', loginHandler);
  dashboardBtn.on('click', dashboardLinkHandler);
});
