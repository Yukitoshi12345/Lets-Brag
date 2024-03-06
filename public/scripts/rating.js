$(window).ready(() => {
  const ratingOptionEl = $('input[type=radio][name=rating-3]');

  const ratingChangeHandler = async (event) => {
    try {
      const response = await fetch('/api/rating', {
        method: 'POST',
        body: JSON.stringify({
          rating: $(event.target).val(),
          brag_id: $(event.target).data('id'),
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // window.location.replace(`/api/brags/${id}`);
        window.location.reload();
      } else {
        alert('Failed to rate the brag post');
      }
    } catch (error) {
      console.log(error);
    }
  };

  ratingOptionEl.on('change', ratingChangeHandler);
});
