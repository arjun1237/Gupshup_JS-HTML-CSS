import * as models from './models.js';

const users = [
	new models.User(
		// Date.now(),
		'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
		'masai@school.com',
		'password',
		'Masai'
	),
	new models.User(
		// Date.now(),
		'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
		'school@masai.com',
		'password',
		'School'
	),
	new models.User(
		// Date.now(),
		'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
		'aayu@aayu.com',
		'password',
		'Aayushi'
	),
	new models.User(
		// Date.now(),
		'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
		'arjun@arjun.com',
		'password',
		'Arjun'
	),
	new models.User(
		// Date.now(),
		'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
		'mani@mani.com',
		'password',
		'Manideep'
	)
];

let userIndex = users.findIndex((x) => x.getEmailId() === 'aayu@aayu.com');

users[userIndex].addPost(
	"India hasn't gained much from a drop in Chinese exports to the U.S., a Rabobank study shows."
);
users[userIndex].addPost('vnksdhrgksdnfv');
users[userIndex].addPost('laejrg;ajergojaer');

let posts = users[userIndex].getPosts()
posts[0].addComments("that is true", 'mani@mani.com')
posts[0].addComments("to the point", 'mani@mani.com')
posts[0].addComments("good obeservation", 'mani@mani.com')
posts[0].addComments("i second that", 'arjun@arjun.com')

console.log(posts)

users[userIndex].updatePostByIndex(posts[0], 0)

users[userIndex].addFollowers('arjun@arjun.com');
users[userIndex].addFollowing('mani@mani.com');

let usersDB = localStorage.getItem('users');
console.log('creating DB');
if (!usersDB) {
	localStorage.setItem('usersDB', JSON.stringify(users));
}
