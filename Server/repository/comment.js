import Comment from "../model/Comment.js";
const getAllComents = async (songId) => {
    try {
        const result = await Comment.find({ songId: songId }).populate('user', '_id first_name last_name profile_picture');
        console.log(result);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const createComment = async ({
    user,
    songId,
    parent_comment,
    content,
    is_root
}) => {
    try {
        const result = await Comment.create({
            user,
            songId,
            parent_comment,
            content,
            is_root
        });
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    getAllComents,
    createComment
}