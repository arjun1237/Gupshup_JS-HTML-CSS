import * as models from './models.js';

let user = localStorage.getItem('user');

function addPost() {
	let text = document.getElementById('addPost');
	data[user].addPost(text);
}

function refreshDisplay() {
	location.href = 'index.html';
}

window.onload = () => {
	let addPostBtn = document.getElementById('addPostBtn');
	addPostBtn.addEventListener('click', () => {
		addPost();
		refreshDisplay();
	});
};
