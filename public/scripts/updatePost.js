$(window).ready(() => {
  const titleEl = $('#title');
  const postTxtArea = $('#post');
  const updateBtn = $('#update');
  const cancelBtn = $('#cancel');

  //when enter key is pressed in title
  const enterKeyHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  //when text in title is changed
  const titleChangeHandler = () => {
    if ($.trim(titleEl.text()) === '') {
      updateBtn.attr('disabled', true);
    } else {
      updateBtn.removeAttr('disabled');
    }
  };

  // when update button is pressed
  const updateHandler = async (event) => {
    const id = $(event.target).data('id');
    try {
      const response = await fetch(`/api/brags/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: $.trim(titleEl.text()),
          content: $.trim(postTxtArea.val()),
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        window.location.replace('/dashboard');
      } else {
        alert('Failed to update post!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // when value in textbox for post content is changed
  const postChangeHandler = (event) => {
    if ($.trim(postTxtArea.val()) === '') {
      updateBtn.attr('disabled', true);
    } else {
      updateBtn.removeAttr('disabled');
    }
    //disabling the enter key, so users can type more paragraphs
    if (event.key === 'Enter') {
      updateHandler();
    }
  };

  //when cancel button is pressed
  const cancelHandler = () => {
    window.location.replace('/dashboard');
  };

  titleEl.on('keydown', enterKeyHandler);
  postTxtArea.on('keyup', postChangeHandler);
  titleEl.on('keyup', titleChangeHandler);
  updateBtn.on('click', updateHandler);
  cancelBtn.on('click', cancelHandler);
});
