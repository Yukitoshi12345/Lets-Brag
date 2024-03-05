$(window).ready(()=>{

    const postBtn = $("#post");
    const commentTxtArea = $("#comment");

    /*    
    const url = window.location.toString();
    const postId= url.charAt(url.length-1);
    */
    
    //data validation is not done here
    // if user has access to post button
    //that means the comment value is already valid
    const postHandler = async(event) =>{
        const comment = $.trim(commentTxtArea.val());
        const postId = $(event.target).data("id");
        try{
            const response = await fetch(`/api/comments/`,{
                method: "POST",
                body: JSON.stringify({content:comment, post_id:postId}),
                headers: {"Content-Type": "application/json"}
            });
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to create the comment!');
            }
        }catch(error){
            console.log(error);
        }
    };


    //when comment is not empty, enable post button
    //when enter key is pressed, create comment 

    const textChangeHandler = event =>{
        if($.trim(commentTxtArea.val())!==""){
            postBtn.removeAttr("disabled");
            if(event.key === "Enter"){
                postHandler();
            }
        }else{
            postBtn.attr("disabled", true);
        }
    };


    postBtn.on("click", postHandler);
    commentTxtArea.on("keyup", textChangeHandler);
});