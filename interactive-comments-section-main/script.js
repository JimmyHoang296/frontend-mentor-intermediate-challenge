
function renderUI (data) {
    let wrapper = document.querySelector('.wrapper')
    let comments = data.comments
    let currentUser = data.currentUser

    console.log ('username is' + currentUser.username)
    console.log(comments)
    comments.forEach(comment => {
        addComment(wrapper,comment,currentUser)
        let replies = comment.replies
        
        console.log (comment.id)
        if (replies.length) {
            let replyNode = document.createElement('div')
            replyNode.className = 'reply-card'
            replies.forEach(reply => {
                addComment(replyNode,reply,currentUser)
            })
            console.log(replyNode)
            wrapper.appendChild(replyNode)
        }
   
    });
}

function addComment (wrapper,comment,currentUser){
    let isCurrentUserHide = `style="display:${currentUser.username==comment.user.username?"none":""}"`
    let isCurrentUserShow = `style="display:${currentUser.username==comment.user.username?"":"none"}"`
    
    wrapper.innerHTML = wrapper.innerHTML + 
    `
    <div class="comment-card">
        <div class="user">
            <div class="user-avatar">
            <img src=${comment.user.image.png} alt="">
            </div>
            <h3 class="user-name">${comment.user.username}</h3>
            <span class="user-current" ${isCurrentUserShow} >you</span>
            <h3 class="comment-time">${comment.createdAt}</h3>
        </div>
        <p class="comment">
            <span class="replyTo" style="display:${comment.replyingTo?'unset':'none'}">@${comment.replyingTo}</span>
            ${comment.content}      
        </p>
        <div class="vote">
            <input type="radio" name="vote" id="plus">
            <label for="plus"><img src="./images/icon-plus.svg" alt="plus"></label>
            <h3 class="vote-number">${comment.score}</h3>
            <input type="radio" name="vote" id="minus">
            <label for="minus"><img src="./images/icon-minus.svg" alt="minus"></label>
        </div>

        <div class="action-button">
          
          <button class="delete" ${isCurrentUserShow}>
            <img src="./images/icon-delete.svg" alt="delete">
            <h3>Delete</h3>
          </button>
          <button class="edit" ${isCurrentUserShow}>
            <img src="./images/icon-edit.svg" alt="edit">
            <h3>Edit</h3>
          </button>
          <button class="reply" ${isCurrentUserHide}>
            <img src="./images/icon-reply.svg" alt="reply">
            <h3>Reply</h3>
          </button>
        </div>
    </div>
    `
}

fetch("./data.json")
.then(response => {
    return response.json()
})
.then(jsondata => {
    renderUI(jsondata)
    console.log(jsondata)
})