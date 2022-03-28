
function renderUI (data) {
    let wrapper = document.querySelector('.wrapper')
    let comments = data.comments
    console.log(comments)
    comments.forEach(comment => {
        addComment(wrapper,comment)
        let replies = comment.replies
        
        console.log (comment.id)
        if (replies.length) {
            let replyNode = document.createElement('div')
            replyNode.className = 'reply-card'
            replies.forEach(reply => {
                addComment(replyNode,reply)
            })
            console.log(replyNode)
            wrapper.appendChild(replyNode)
        }
   
    });
}

function addComment (wrapper,comment){
    wrapper.innerHTML = wrapper.innerHTML + 
    `
    <div class="comment-card">
        <div class="user">
            <div class="user-avatar">
            <img src=${comment.user.image.png} alt="">
            </div>
            <h3 class="user-name">${comment.user.username}</h3>
            <h3 class="comment-time">${comment.createdAt}</h3>
        </div>
        <p class="comment">
            ${comment.content}      
        </p>
        <div class="vote">
            <input type="radio" name="vote" id="plus">
            <label for="plus"><img src="./images/icon-plus.svg" alt="plus"></label>
            <h3 class="vote-number">${comment.score}</h3>
            <input type="radio" name="vote" id="minus">
            <label for="minus"><img src="./images/icon-minus.svg" alt="minus"></label>
        </div>
        <button class="reply">
            <img src="./images/icon-reply.svg" alt="reply">
            <h3>Reply</h3>
        </button>
    </div>
    `
}

fetch("./data.json")
.then(response => {
    return response.json()
})
.then(jsondata => renderUI(jsondata))