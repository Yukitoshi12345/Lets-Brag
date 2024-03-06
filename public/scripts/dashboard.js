$(window).ready(() => {
  const postContainerEl = $('#post-container');
  const createBtn = $('.create');

  //post update link  and delete handler
  const editHandler = async (event) => {
    const id = $(event.target).data('id');
    try {
      //----------------------------------delete handler
      if ($(event.target).hasClass('delete')) {
        const response = await fetch(`/api/brags/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          window.location.reload();
          alert('Your post has been deleted!');
        } else {
          alert('Failed to delete post');
        }
        //---------------------------------update link handler
        //doesn't handle update data here
        // just fetches the existing brag post
        // displays in next page to be edited
      } else if ($(event.target).hasClass('update')) {
        const response = await fetch(`/dashboard/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          window.location.replace(`/dashboard/${id}`);
        } else {
          alert('Failed to get post update form!');
        }
      } //end of update/delete
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  //post create link handler
  const createHandler = async (event) => {
    const id = $(event.target).data('id');
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        window.location.replace(`/api/users/${id}`);
      } else {
        alert('Failed to get post create form!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  createBtn.on('click', createHandler);
  postContainerEl.on('click', 'button', editHandler);
});
