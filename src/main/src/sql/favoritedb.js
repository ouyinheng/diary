const fs = require("fs");
const low = require("lowdb");
const path = require('path');
const FileSync = require("lowdb/adapters/FileSync");

// Set some defaults
const isDevelopment = process.env.NODE_ENV !== "production";
if (process.env.NODE_ENV === "production") {
    global.__lib = path.join(__dirname, "./static");
}

const libJSON =
    process.env.NODE_ENV === "development"
        ? "static/lib/favoriteLib.json"
        : `${global.__lib}/lib/favoriteLib.json`;

const adapter = new FileSync(libJSON);
const db = low(adapter);
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
