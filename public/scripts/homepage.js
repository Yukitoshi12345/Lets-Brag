$(window).ready(()=>{
    const mainContainer = $("main");

       const saveReferencePageToStorage = page=>{
        // localStorage.clear();
        localStorage.setItem("page", JSON.stringify(page));
    };

    //when post-preview page's Read Full Article buttton is clicked
    const mainContainerHandler = async(event) =>{
        
        const id = $(event.target).data("id");
        //saving post id to local storage for reference to redirect to correct post route
        //after login/sign up
       saveReferencePageToStorage(id);
        
        try{
            const response = await fetch(`/api/posts/${id}`,{
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
            if (response.ok) {
                window.location.replace(`/api/posts/${id}`);
            } else {
                alert('Failed to open the article');
            }
        }catch(error){
            console.log(error);
        }
    };

    mainContainer.on("click", "button", mainContainerHandler);
});