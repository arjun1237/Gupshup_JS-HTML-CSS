export class Post {
	constructor(text, emailId) {
		this.text = text;
		// this.userId = userId;
		this.postId = emailId + Date.now();
		this.likes = 0;
		this.comments = [];
		this.timestamp = Date.now()
	}

	edit(text) {
		text = text.trim();
		if (text.length != 0) {
			this.text = text;
		}
	}

	// delete() {}

	share() {}

	getTimestamp(){
		return this.timestamp
	}

	getLikes() {
		return this.likes;
	}

	getComments() {
		return this.comments;
	}

	getPostId() {
		return this.postId;
	}

	getText() {}

	updateLikes(inc = true) {
		if (inc) {
			this.likes++;
		} else if (this.likes != 0) {
			this.likes--;
		}
	}

	addComments(text) {
		text = text.trim();
		if (text.length != 0) {
			this.comments.push(new Comment(text));
		}
	}
}

export class Comment {
	constructor(text) {
		this.text = text;
		this.timestamp = Date.now();
	}

	edit() {}

	delete() {}

	getId() {}

	getText() {}

	getTimestamp() {}
}

export class User {
	constructor(avatar, emailId, password, name) {
		// this.userId = userId;
		this.avatar = avatar;
		this.emailId = emailId;
		this.password = password;
		this.name = name;
		this.followers = [];
		this.following = [];
		this.trends = [];
		this.posts = [];
	}

	// getUserId() {
	// 	return this.userId;
	// }

	getAvatar() {
		return this.avatar;
	}
	getEmailId() {
		return this.emailId;
	}
	getPassword() {
		return this.password;
	}
	getName() {
		return this.name;
	}
	getFollowers() {
		return this.followers;
	}
	getFollowing() {
		return this.following;
	}
	getTrends() {
		return this.trends;
	}
	getPosts() {
		return this.posts;
	}

	addPost(text) {
		text = text.trim();
		if (text.length != 0) {
			this.posts.push(new Post(text, this.emailId));
		}
	}

	addFollowers(emailId) {
		this.followers.push(emailId);
	}

	addFollowing(emailId) {
		this.following.push(emailId);
	}
}
