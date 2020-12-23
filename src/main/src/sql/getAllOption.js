const fs = require("fs");
const low = require("lowdb");
const path = require('path');
const FileSync = require("lowdb/adapters/FileSync");
let db = null;
// Set some defaults
export default {
	init(filename) {
        console.log('filename', filename)
        const adapter = new FileSync(`./src/renderer/lib/${filename}`);
        db = low(adapter);
        db.defaults({ posts: []}).write();
    },
    getData(func) {
        func(db);
    }
};
