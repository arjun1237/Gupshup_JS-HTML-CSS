import * as models from './models.js';

let postPagePostID = localStorage.getItem('postId');
let users = JSON.parse(localStorage.getItem('usersDB'));
let postObj = document.getElementById('post-handle');
let commentsObj = document.getElementById('comments');
let currentUser = localStorage.getItem('userIndex');
let postCommentBtn = document.getElementById('addComment');
let commentInput = document.getElementById('commentInput');

window.onload = () => {
	updateUserAvatar();
	postCommentBtn.addEventListener('click', addComment);
	commentInput.focus();
	displayPost();
};

function updateUserAvatar() {
	let userAvatar = document.getElementsByClassName('userAvatar');
	for (let i = 0; i < userAvatar.length; i++) {
		userAvatar[i].setAttribute('src', users[currentUser].avatar);
	}
	let userName = document.getElementsByClassName('userName');
	for (let i = 0; i < userName.length; i++) {
		userName[i].textContent = users[currentUser].name;
	}
}

function getPost() {
	let email = postPagePostID.split('.com')[0] + '.com';
	let userInd = users.findIndex((x) => x.emailId === email);
	let posts = users[userInd].posts;
	let post = posts.find((x) => x.postId === postPagePostID);
	return { post, userInd };
}

function displayPost() {
	if (!postPagePostID) {
		location.href = 'index.html';
		return;
	}
	let { post, userInd } = getPost();
	// console.log(post)
	appendPost(post, users[userInd]);
}

function appendPost(post, user) {
	let likes = post.likes;
	let color;
	if (likes.includes(users[currentUser].emailId)) {
		color = 'fa-heart text-danger';
	} else {
		color = 'fa-heart-o';
	}
	likes = likes.length;

	let str = `<div class="card my-2 border-0" data-info='${post.postId}'>
            <div class="card-body click-handler">
                <div class="row ml-0 d-flex flex-row" >
                    <div>
                        <img class="circular-pic mx-2" width="60" height="60" src='${user.avatar}' alt="" >
                    </div>
                    <div >
                        <h6 class="m-0" >${user.name}</h6>
                        <div ><small>${moment(post.timestamp).fromNow()}</small></div>
                    </div>
                </div>
                <div class="m-2" >
                    <p >${post.text}</p>
                    <hr>
                    <div class="d-flex justify-content-between" >
                        <div><i class="fa ${color}" data-like='${post.postId}'></i> <span> ${likes} </span> </div>
                        <div><i class="fa fa-trash clr-violet" data-delete='${post.postId}'></i></div>
                    </div>
                </div>
            </div>
        </div>`;
	postObj.innerHTML = str;

	displayComments(post);
}

function displayComments(post) {
	let comments = post.comments;

	let str = '';
	for (let i = comments.length - 1; i >= 0; i--) {
		let comment = comments[i];
		let user = users.find((x) => x.emailId === comment.userID);
		console.log();
		str += `<div class="card my-2 border-0" data-info='${comment.userID}-${comment.timestamp}'>
            <div class="card-body click-handler d-flex justify-content-start">
                <div> <i class="fa fa-level-up mr-4 return" aria-hidden="true"></i> </div>
                <div>
                    <div class="row ml-0 d-flex flex-row" >
                        <div>
                            <img class="circular-pic mx-2" width="60" height="60" src='${user.avatar}' alt="" >
                        </div>
                        <div >
                            <h6 class="m-0" >${user.name}</h6>
                            <div ><small>${moment(comment.timestamp).fromNow()}</small></div>
                        </div>
                    </div>
                    <div class="m-2" >
                        <p >${comment.text}</p>
                    </div>
                </div>
            </div>
        </div>`;
	}
	commentsObj.innerHTML = str;
}

function addComment() {
	event.preventDefault();
	let val = commentInput.value.trim();
	if (!(val.length === 0)) {
		let current = users[currentUser];
		let { post, userInd } = getPost();
		console.log(getPost());
		let comments = post.comments;
		let comment = new models.Comment(val, current.emailId);
		comments.push(comment);
		post.comments = comments;
		let posts = users[userInd].posts;
		let postInd = posts.findIndex((x) => x.postId === postPagePostID);
		posts[postInd] = post;
		users[userInd].posts = posts;
		localStorage.setItem('usersDB', JSON.stringify(users));
		renderComment(comment);
	}
	commentInput.value = '';
	commentInput.focus();
}

function renderComment(comment) {
	let user = users[currentUser];
	let sibling = commentsObj.firstElementChild;
	let div = document.createElement('div');
	div.setAttribute('data.info', comment.userID + '-' + comment.timestamp);
	div.classList.add('card', 'my-2', 'border-0');
	let str = `
            <div class="card-body click-handler d-flex justify-content-start">
                <div> <i class="fa fa-level-up mr-4 return" aria-hidden="true"></i> </div>
                <div>
                    <div class="row ml-0 d-flex flex-row" >
                        <div>
                            <img class="circular-pic mx-2" width="60" height="60" src='${user.avatar}' alt="" >
                        </div>
                        <div >
                            <h6 class="m-0" >${user.name}</h6>
                            <div ><small>${moment(comment.timestamp).fromNow()}</small></div>
                        </div>
                    </div>
                    <div class="m-2" >
                        <p >${comment.text}</p>
                    </div>
                </div>
            </div>`;
	div.innerHTML = str;
	if (sibling) commentsObj.insertBefore(div, sibling);
	else commentsObj.append(div);
}
