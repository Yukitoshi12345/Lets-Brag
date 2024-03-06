$(window).ready(() => {
  const createBtn = $('#create');
  const titleInput = $('#title');
  const postTxtArea = $('#post');
  const cancelBtn = $('#cancel');

  //when title input value changed
  //create button is enabled only when both title and content are not empty
  const titleChangeHandler = () => {
    if ($.trim(titleInput.val()) === '' || $.trim(postTxtArea.val()) === '') {
      createBtn.attr('disabled', true);
    } else {
      createBtn.removeAttr('disabled');
    }
  };

  //when create button is pressed
  const createHandler = async () => {
    try {
      const response = await fetch('/api/brags/', {
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

  //when post content value is changed
  const postChangeHandler = () => {
    if ($.trim(titleInput.val()) === '' || $.trim(postTxtArea.val()) === '') {
      createBtn.attr('disabled', true);
    } else {
      createBtn.removeAttr('disabled');
    }
  };

  //when cancel button is pressed
  const cancelHandler = () => {
    window.location.replace('/dashboard');
  };

  titleInput.on('keyup', titleChangeHandler);
  postTxtArea.on('keyup', postChangeHandler);
  createBtn.on('click', createHandler);
  cancelBtn.on('click', cancelHandler);
});
