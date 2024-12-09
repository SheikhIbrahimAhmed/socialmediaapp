const User = require("../models/userModel");
const Post = require("../models/post.model");

const createUserServ = async (obj) => {
    try {
        return await User.create(obj);
    } catch (err) {
        console.log("err", err);
    }
}
const createPostServ = async (obj) => {
    try {
        return await Post.create(obj);
    } catch (err) {
        console.log("err", err);
    }
}
const findSingleUserServ = async (obj) => {
    try {
        return await User.findOne(obj);
    } catch (err) {
        console.log("err", err);
    }
}

module.exports = {
    createUserServ,
    findSingleUserServ,
    createPostServ
}