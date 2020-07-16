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
		'https://avatars0.githubusercontent.com/u/47210224?s=460&u=f878de944246996cf5b8d85bf82e93c224ecc657&v=4',
		'aayu@aayu.com',
		'password',
		'Aayushi'
	),
	new models.User(
		// Date.now(),
		'https://avatars1.githubusercontent.com/u/18505592?s=460&u=114f93be5cd15791beb321809c6b4c07b13a6bcd&v=4',
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

let userIndex = users.findIndex((x) => x.emailId === 'aayu@aayu.com');
users[userIndex].addFollowers('arjun@arjun.com');
users[userIndex].addFollowing('mani@mani.com');

let usersDB = localStorage.getItem('usersDB');
console.log('creating DB');
if (!usersDB) {
	localStorage.setItem('usersDB', JSON.stringify(users));
}

let user = localStorage.getItem('userIndex');
if (!user) {
	localStorage.setItem('userIndex', JSON.stringify(userIndex));
}
