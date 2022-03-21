const db = require("../models");

const getInstagramPostList = async () => {
    try {
        return db.InstagramPost.findAll();
    } catch (error) {
        return { code: 400, message: error.message };
    }
};

/**
 * @param {{url:string}} instagramPostUrl 
 */
const saveInstagramPost = async (instagramPostUrl) => {
    try {
        return db.InstagramPost.create(instagramPostUrl);
    } catch (error) {
        return { code: 400, message: error.message };
    }
}

/**
 * @param {string} id
 */
const removeInstagramPost = async (id) => {
    try {
        return db.InstagramPost.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        return { code: 400, message: error.message };
    }
}

module.exports = { getInstagramPostList, saveInstagramPost, removeInstagramPost };
