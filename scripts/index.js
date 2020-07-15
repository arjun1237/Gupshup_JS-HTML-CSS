import * as models from './models.js';
let usersData = JSON.parse(localStorage.getItem('usersDB'));
let userIndex = localStorage.getItem('userIndex');
console.log(usersData[userIndex]);
let { avatar, emailId, password, name, followers, following, trends, posts } = usersData[userIndex];
let user = new models.User(avatar, emailId, password, name, followers, following, trends, posts);

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
	let addPostBtn = document.getElementById('addPostBtn');
	addPostBtn.addEventListener('click', () => {
		event.preventDefault();
		console.log('adding post');
		addPost();
		// refreshDisplay();
	});
};
