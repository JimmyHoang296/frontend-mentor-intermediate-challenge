
var currentUser
fetch("./data.json")
.then(response => {
    return response.json()
})
.then(jsondata => {
    currentUser = jsondata.currentUser
    renderUI(jsondata)

    refreshUI(currentUser)

    console.log(jsondata)
})

function refreshUI (currentUser) {
    addReplyBtnFunction(currentUser) 

    addDeleteBtnFunction()

    addEditBtnFunction()

    addSubmitSendFunction(currentUser)
}
function editableSetFocus(){
    let editableEles = document.querySelectorAll('[contentEditable="true"]')
    editableEles = [...editableEles]
    editableEles.forEach(ele => {
        ele.addEventListener('focus', () =>{
            setEndOfContenteditable(ele)
            console.log(ele)
        })
    })
}


function renderUI (data) {
    let wrapper = document.querySelector('.wrapper')
    let comments = data.comments
    let currentUser = data.currentUser


    comments.forEach(comment => {
        addComment(wrapper,comment,currentUser)
        let replies = comment.replies
        
        if (replies.length) {
            let replyNode = document.createElement('div')
            replyNode.className = 'reply-card'
            replies.forEach(reply => {
                addComment(replyNode,reply,currentUser)
            })
            wrapper.appendChild(replyNode)
        }
    });
    addInputComment (wrapper, currentUser)
}

function addReplyBtnFunction (currentUser){
    
    var repliesBtn = document.querySelectorAll('.reply')
    repliesBtn = [...repliesBtn]
    
    repliesBtn.forEach(reply => {
        reply.addEventListener('click', () =>{
            var wrapper = findAncestor(reply,'card')
            if(!wrapper.nextElementSibling.classList.contains('card-comment_reply')){
                addReplyInput (wrapper, currentUser)
            }
            
        })
    });
}

function addDeleteBtnFunction(){
    var deleteBtns = document.querySelectorAll('.delete')
    deleteBtns = [...deleteBtns]
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', () =>{
            findAncestor(deleteBtn,'card').remove()
        })
    })
}

function addEditBtnFunction(){
    var editBtns = document.querySelectorAll('.edit')
    editBtns = [...editBtns]
    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', () =>{
            const card = findAncestor(editBtn,'card')
            card.classList.remove('card-display')
            card.classList.add('card-comment')
            card.classList.add('card-comment_update')
            const commentInput = card.querySelector('.comment')
            commentInput.contentEditable = true
            commentInput.focus()
            setEndOfContenteditable(commentInput)


        })
    })
}

function addSubmitSendFunction(currentUser){
    var submitSendBtns = document.querySelectorAll('.submit-send')
    submitSendBtns = [...submitSendBtns]
    console.log (submitSendBtns)
    submitSendBtns.forEach(submitSendBtn => {
        submitSendBtn.addEventListener('click', ()=>{
            console.log ('send this message')
            const card = findAncestor(submitSendBtn, 'card')
            const comment = card.querySelector('.comment')
            console.log (comment.innerText.length)
            if (!comment.innerText.length == 0){
                card.className = "card card-display"
                comment.contentEditable = false
                let wrapper = document.querySelector('.wrapper')
                addInputComment (wrapper, currentUser)
                refreshUI()
            }
        })
    })
}

function addComment (wrapper, comment, currentUser){
    let isCurrentUserHide = `style="display:${currentUser.username==comment.user.username?"none":""}"`
    let isCurrentUserShow = `style="display:${currentUser.username==comment.user.username?"":"none"}"`
    
    wrapper.innerHTML = wrapper.innerHTML + 
    `
    <div class="card card-display">
    <div class="user">
      <div class="user-avatar">
        <img src=${comment.user.image.png} alt="">
      </div>
      <h3 class="user-name">${comment.user.username}</h3>
      <span class="user-current" ${isCurrentUserShow} >you</span>
      <h3 class="comment-time">${comment.createdAt}</h3>
    </div>
    <p class="comment" contenteditable="false">
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
    <div class="submit-button">
      <button class="submit-send">SEND</button>
      <button class="submit-reply">REPLY</button>
      <button class="submit-update">UPDATE</button>
    </div>
  </div>
    `
}

function addInputComment (wrapper, currentUser){


      
    wrapper.innerHTML = wrapper.innerHTML + 
    `
    <div class="card card-comment card-comment_send">
    <div class="user">
      <div class="user-avatar">
        <img src=${currentUser.image.png} alt="">
      </div>
      <h3 class="user-name">${currentUser.username}</h3>
      <span class="user-current" style="display:none" >you</span>
      <h3 class="comment-time">just now</h3>
    </div>
    <p class="comment" contentEditable="true" data-placeholder="Enter text here"></p>
        
    
    <div class="vote">
      <input type="radio" name="vote" id="plus">
      <label for="plus"><img src="./images/icon-plus.svg" alt="plus"></label>
      <h3 class="vote-number">0</h3>
      <input type="radio" name="vote" id="minus">
      <label for="minus"><img src="./images/icon-minus.svg" alt="minus"></label>
    </div>
    <div class="action-button">
      
      <button class="delete" >
        <img src="./images/icon-delete.svg" alt="delete">
        <h3>Delete</h3>
      </button>
      <button class="edit" >
        <img src="./images/icon-edit.svg" alt="edit">
        <h3>Edit</h3>
      </button>
      <button class="reply" style="display:none">
        <img src="./images/icon-reply.svg" alt="reply">
        <h3>Reply</h3>
      </button>
    </div>
    <div class="submit-button">
      <button class="submit-send">SEND</button>
      <button class="submit-reply">REPLY</button>
      <button class="submit-update">UPDATE</button>
    </div>
  </div>
    `
}

function addReplyInput (wrapper, currentUser){
    // create reply card
    const reply = document.createElement('div')
    const replyTo = wrapper.querySelector('.user-name').innerText
    reply.className = 'card card-comment card-comment_reply'
    reply.innerHTML = 
    `
    <div class="user">
      <div class="user-avatar">
        <img src=${currentUser.image.png} alt="">
      </div>
      <h3 class="user-name">${currentUser.username}</h3>
      <span class="user-current" style="display:none" >you</span>
      <h3 class="comment-time">just now</h3>
    </div>
    <p class="comment" contentEditable="true" data-placeholder="Enter text here">
    <span class="replyTo" style="display:unset">@${replyTo }, </span> \u200B
    </p>
        
    
    <div class="vote">
      <input type="radio" name="vote" id="plus">
      <label for="plus"><img src="./images/icon-plus.svg" alt="plus"></label>
      <h3 class="vote-number">0</h3>
      <input type="radio" name="vote" id="minus">
      <label for="minus"><img src="./images/icon-minus.svg" alt="minus"></label>
    </div>
    <div class="action-button">
      
      <button class="delete" >
        <img src="./images/icon-delete.svg" alt="delete">
        <h3>Delete</h3>
      </button>
      <button class="edit" >
        <img src="./images/icon-edit.svg" alt="edit">
        <h3>Edit</h3>
      </button>
      <button class="reply" style="display:none">
        <img src="./images/icon-reply.svg" alt="reply">
        <h3>Reply</h3>
      </button>
    </div>
    <div class="submit-button">
      <button class="submit-send">SEND</button>
      <button class="submit-reply">REPLY</button>
      <button class="submit-update">UPDATE</button>
    </div>
    `
    wrapper.parentNode.insertBefore(reply,wrapper.nextSibling)
    const commentInput = reply.querySelector('.comment')
    commentInput.focus()
    setEndOfContenteditable(commentInput)
    editableSetFocus()

}
function findAncestor (element, classname){
    while (!element.parentNode.classList.contains(classname)){
        element = element.parentNode
    }
    return element.parentNode
}

function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}