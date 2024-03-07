$(window).ready(() => {
  const ratingStarEls = $('input[type="radio"][name="rating-3"]');
  const ratingEl=$('.ratingData');
 

  const ratingChangeHandler = async (event) => {
    try {
      const response = await fetch('/api/ratings/', {
        method: 'POST',
        body: JSON.stringify({
          rating:  $(event.target).prop('value'),
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

  const ratingLoadingHandler = () =>{
    const rating = ratingEl.text();
    // alert(rating);
    ratingStarEls.each((i, ratingStar)=>{
      if(ratingStar.value === rating){
        $(ratingStar).prop('checked', true);
      }
    });
  };

  $(window).on('load', ratingLoadingHandler);
  ratingStarEls.on('change', ratingChangeHandler);
});
