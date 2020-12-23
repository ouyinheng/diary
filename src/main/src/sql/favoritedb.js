const fs = require("fs");
const low = require("lowdb");
const path = require('path');
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync( "./src/renderer/lib/favoriteLib.json");
const db = low(adapter);
// Set some defaults
export default {
	init() {
		db.defaults({ posts: []}).write();
		// db.get("posts")
		// 	.push({ id: 1, title: "lowdb is awesome" })
		// 	.write();
		// db.set("user.name", "typicode").write();
    },
    getData(func) {
        func(db);
    }
};
