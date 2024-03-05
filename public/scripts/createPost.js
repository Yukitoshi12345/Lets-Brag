$(window).ready(() => {
  const createBtn = $('#create');
  const titleInput = $('#title');
  const postTxtArea = $('#post');

  //when title input value changed
  //create button is enabled only when both title and content are not empty
  const titleChangeHandler = (event) => {
    if ($.trim(titleInput.val()) === '' || $.trim(postTxtArea.val()) === '') {
      createBtn.attr('disabled', true);
    } else {
      createBtn.removeAttr('disabled');
    }
  };

  //when post content value is changed
  const postChangeHandler = (event) => {
    if ($.trim(titleInput.val()) === '' || $.trim(postTxtArea.val()) === '') {
      createBtn.attr('disabled', true);
    } else {
      createBtn.removeAttr('disabled');
    }
    //disabling the enter key, so users can type more paragraphs
    if (event.key === 'Enter') {
      createHandler();
    }
  };

  //when create button is pressed
  const createHandler = async (event) => {
    try {
      const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({
          title: $.trim(titleInput.val()),
          content: $.trim(postTxtArea.val()),
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        window.location.replace('/dashboard');
        // window.location.reload();
      } else {
        alert('Failed to create post!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  titleInput.on('keyup', titleChangeHandler);
  postTxtArea.on('keyup', postChangeHandler);
  createBtn.on('click', createHandler);
});
