import * as models from './models.js';
let usersData = JSON.parse(localStorage.getItem('usersDB'));
let userIndex = localStorage.getItem('userIndex');
let { avatar, emailId, password, name, followers, following, trends, posts } = usersData[userIndex];
let user = new models.User(avatar, emailId, password, name, followers, following, trends, posts);

function createPost(posts, i, userPost, text, color, likes, delPost) {
	let str = `
	<div class="card-body click-handler" data-info='${posts[i].postId}'>
		<div class="row ml-0 d-flex flex-row" data-info='${posts[i].postId}'>
			<div>
				<img class="circular-pic mx-2" width="60" height="60" src='${userPost.avatar}' alt="" data-info='${posts[i]
		.postId}'>
			</div>
			<div data-info='${posts[i].postId}'>
				<h6 class="m-0" data-info='${posts[i].postId}'>${userPost.name}</h6>
				<div data-info='${posts[i].postId}'><small>${moment(posts[i].timestamp).fromNow()}</small></div>
			</div>
		</div>
		<div class="m-2" data-info='${posts[i].postId}'>
			<p data-info='${posts[i].postId}'>${text}</p>
			<hr>
			<div class="d-flex justify-content-between" data-info='${posts[i].postId}'>
				<div><i class="fa ${color}" data-like='${posts[i].postId}'></i> <span> ${likes} </span> </div>
				<div><i class="fa fa-comment clr-violet" data-info='${posts[i].postId}'></i>${posts[i].comments.length}</div>
				${delPost}
			</div>
		</div>
	</div>
`;

	let div = document.createElement('div');
	let div11 = document.createElement('div');
	let div12 = document.createElement('div');
	let div111 = document.createElement('div');
	let div112 = document.createElement('div');

	div.classList.add('card-body', 'click-handler');
	div.setAttribute('data-info', posts[i].postId);
	div11.classList.add('row', 'ml-0', 'd-flex', 'flex-row');
	div12.classList.add('m-2');
	div12.setAttribute('data-info', posts[i].postId);
	div112.setAttribute('data-info', posts[i].postId);

	div111.innerHTML = `<img class="circular-pic mx-2" width="60" height="60" src='${userPost.avatar}' alt="" data-info='${posts[
		i
	].postId}'>`;

	div112.innerHTML = `<h6 class="m-0" data-info='${posts[i].postId}'>${userPost.name}</h6>
	<div data-info='${posts[i].postId}'><small>${moment(posts[i].timestamp).fromNow()}</small></div>`;

	div12.innerHTML = `
	<p data-info='${posts[i].postId}'>${text}</p>
	<hr>
	<div class="d-flex justify-content-between" data-info='${posts[i].postId}'>
		<div><i class="fa ${color}" data-like='${posts[i].postId}'></i> <span> ${likes} </span> </div>
		<div><i class="fa fa-comment clr-violet" data-info='${posts[i].postId}'></i>${posts[i].comments.length}</div>
		${delPost}
	</div>

	`;

	div11.append(div111, div112);

	div.append(div11, div12);
	return div;
}

function displayPosts() {
	let postsDiv = document.getElementById('postsDiv');
	for (let i = posts.length - 1; i >= 0; i--) {
		let text = posts[i]['text'];
		let postUserIndex = usersData.findIndex((x) => x.emailId === posts[i].emailId);
		let userPost = usersData[postUserIndex];
		let div = document.createElement('div');
		div.classList.add('card', 'my-2', 'border-0');

		let isUsersPost = posts[i].postId.includes(emailId);
		let delPost = '';
		if (isUsersPost) delPost = `<div><i class="fa fa-trash clr-violet" data-delete='${posts[i].postId}'></i></div>`;
		else
			delPost = `<div><i class="fa fa-trash clr-violet visible-handle" data-delete='${posts[i]
				.postId}'></i></div>`;

		let likes = posts[i].likes;
		let color;
		if (likes.includes(emailId)) {
			color = 'fa-heart text-danger';
		} else {
			color = 'fa-heart-o';
		}
		likes = likes.length;

		let divBody = createPost(posts, i, userPost, text, color, likes, delPost);
		div.addEventListener('click', handlePostClick);
		div.append(divBody);
		postsDiv.append(div);
	}
}

function addPost() {
	let text = document.getElementById('addPost').value;
	text = text.trim();
	if (text.length != 0) {
		let post = new models.Post(text, emailId);
		user.addPost(post);

		// add same post in followers posts
		for (let i = 0; i < followers.length; i++) {
			let postFollowerIndex = usersData.findIndex((x) => x.emailId === followers[i]);
			usersData[postFollowerIndex]['posts'].push(post);
		}

		usersData[userIndex] = user;
		localStorage.setItem('usersDB', JSON.stringify(usersData));
	}
}

function refreshDisplay() {
	location.href = 'index.html';
}

function incrementLikes(postLike) {
	let flag = true;
	let postEmailId = postLike.split('.com');
	postEmailId = postEmailId[0] + '.com';

	let postUserIndex = usersData.findIndex((x) => x.emailId === postEmailId);

	let posts = usersData[postUserIndex]['posts'];

	let postIdIndex = posts.findIndex((x) => x.postId == postLike);
	let likes = new Set(usersData[postUserIndex]['posts'][postIdIndex]['likes']);

	if (likes.has(emailId)) {
		likes.delete(emailId);
		flag = false;
	} else {
		likes.add(emailId);
	}
	likes = [ ...likes ];
	usersData[postUserIndex]['posts'][postIdIndex]['likes'] = likes;
	localStorage.setItem('usersDB', JSON.stringify(usersData));
	return flag;
}
function handlePostClick() {
	let postId = event.target.getAttribute('data-info');
	let postLike = event.target.getAttribute('data-like');
	let postDelete = event.target.getAttribute('data-delete');
	if (postId) {
		localStorage.setItem('postId', postId);
		location.href = 'post.html';
	} else if (postLike) {
		if (incrementLikes(postLike)) {
			event.target.classList.remove('fa-heart-o');
			event.target.classList.add('fa-heart', 'text-danger');
			event.target.nextElementSibling.textContent = Number(event.target.nextElementSibling.textContent) + 1;
		} else {
			event.target.classList.remove('fa-heart', 'text-danger');
			event.target.classList.add('fa-heart-o');
			event.target.nextElementSibling.textContent = Number(event.target.nextElementSibling.textContent) - 1;
		}
	} else if (postDelete) {
		deletePost(postDelete);
		event.target.parentElement.parentElement.parentElement.parentElement.remove();
	}
}

function deletePost(data) {
	let postEmailId = data.split('.com');
	postEmailId = postEmailId[0] + '.com';

	let postUserIndex = usersData.findIndex((x) => x.emailId === postEmailId);

	let posts = usersData[postUserIndex]['posts'];

	let updatedPosts = [];
	posts.forEach((x) => {
		if (!(x.postId === data)) {
			updatedPosts.push(x);
		}
	});
	usersData[postUserIndex]['posts'] = updatedPosts;
	localStorage.setItem('usersDB', JSON.stringify(usersData));
}

function updateUserAvatar() {
	let userAvatar = document.getElementsByClassName('userAvatar');
	for (let i = 0; i < userAvatar.length; i++) {
		userAvatar[i].setAttribute('src', avatar);
	}
	let userName = document.getElementsByClassName('userName');
	for (let i = 0; i < userName.length; i++) {
		userName[i].textContent = name;
	}
}

window.onload = () => {
	displayPosts();
	updateUserAvatar();
	let addPostBtn = document.getElementById('addPostBtn');
	addPostBtn.addEventListener('click', () => {
		event.preventDefault();
		addPost();
		refreshDisplay();
	});
};
