import * as models from './models.js';
let usersData = JSON.parse(localStorage.getItem('usersDB'));
let userIndex = localStorage.getItem('userIndex');
// console.log(usersData[userIndex]);
let { avatar, emailId, password, name, followers, following, trends, posts } = usersData[userIndex];
let user = new models.User(avatar, emailId, password, name, followers, following, trends, posts);

function displayPosts() {
	// console.log(posts);
	let postsDiv = document.getElementById('postsDiv');

	// postsDiv.innerHTML = '';
	let str = '';
	for (let i = posts.length - 1; i >= 0; i--) {
		// console.log(posts[i])
		let text = posts[i]['text'];
		let postUserIndex = usersData.findIndex((x) => x.emailId === posts[i].emailId);
		let userPost = usersData[postUserIndex]
		str += `
		<div class="card my-2 border-0" data-info='${posts[i].postId}'>
			<div class="card-body click-handler">
				<div class="row ml-0 d-flex flex-row">
					<div>
						<img class="circular-pic mx-2" src='${userPost.avatar}' alt="">
					</div>
					<div>
						<h6 class="m-0">${userPost.name}</h6>
						<div><small>${posts[i].timestamp}</small></div>
					</div>
				</div>
				<div class="m-2">
				<p>${text}</p>
				<hr>
				<div class="d-flex justify-content-between">
					<div><i class="fa fa-heart-o" aria-hidden="true"></i>${posts[i].likes}</div>
					<div><i class="fa fa-comment-o" aria-hidden="true"></i>${posts[i].comments.length}</div>
					<div><i class="fa fa-trash-o" aria-hidden="true"></i></div>
				</div>
				</div>
			</div>
		</div>

		`;
	}
	postsDiv.innerHTML = str;
}
function addPost() {
	let text = document.getElementById('addPost').value;
	text = text.trim();
	if (text.length != 0) {
		let post = new models.Post(text, emailId);
		user.addPost(post);
		usersData[userIndex] = user;
		localStorage.setItem('usersDB', JSON.stringify(usersData));
	}
}

function refreshDisplay() {
	location.href = 'index.html';
}

window.onload = () => {
	displayPosts();
	let addPostBtn = document.getElementById('addPostBtn');
	addPostBtn.addEventListener('click', () => {
		event.preventDefault();
		console.log('adding post');
		addPost();
		refreshDisplay();
	});

	
};