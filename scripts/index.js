import * as models from './models.js';
let usersData = JSON.parse(localStorage.getItem('usersDB'));
let userIndex = localStorage.getItem('userIndex');
let { avatar, emailId, password, name } = usersData[userIndex];
let user = new models.User(avatar, emailId, password, name);

function addPost() {
	let text = document.getElementById('addPost').value;
	let post = new models.Post(text, emailId);
	user.addPost(post);
	usersData[userIndex] = user;
	localStorage.setItem('usersDB', JSON.stringify(usersData));
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
