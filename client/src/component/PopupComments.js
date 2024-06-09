import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaRegComment } from "react-icons/fa";
import PerformRequest from "../utilities/PerformRequest.js";
import { Input } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BsFillSendFill } from "react-icons/bs";
export default function AlertDialog({ url }) {
    const [open, setOpen] = useState(false);
    const [comment, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { OriginalRequest } = PerformRequest();
    const { songId } = useParams();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const [parentCommentId, setParentCommentId] = useState(null);
    const [commentHistory, setCommentHistory] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);
        fetchComments(null);
    };

    const handleClose = () => {
        setOpen(false);
        setParentCommentId(null);
    };
    const fetchComments = async (parentId = null) => {
        try {
            const data = await OriginalRequest(url, "GET");
            if (data && data.data) {
                let filteredComments;
                if (parentId) {
                    const parentComment = data.data.find(comment => comment._id === parentId);
                    const childComments = data.data.filter(comment => comment.parent_comment === parentId);
                    filteredComments = [parentComment, ...childComments];
                } else {
                    filteredComments = data.data.filter(comment => comment.is_root === true && comment.parent_comment === null);
                }
                setComments(filteredComments);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            await postComment();
        }
    };

    const postComment = async (event) => {
        if (newComment.trim()) {
            try {
                const payload = {
                    user: userInfo._id,
                    songId: songId,
                    parent_comment: parentCommentId,
                    content: newComment,
                    is_root: parentCommentId ? false : true
                };
                const response = await OriginalRequest("comments/add", "POST", payload);
                if (response && response.data) {
                    setComments([...comment, response.data]);
                    setNewComment('');
                    fetchComments(parentCommentId);
                }
            } catch (error) {
                console.error("Error posting comment:", error);
            }
        }
    };
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleReplyClick = (id) => {
        setCommentHistory([...commentHistory, parentCommentId]);
        setParentCommentId(id);
        fetchComments(id);
    };

    const handleBackClick = () => {
        const previousParentId = commentHistory.pop();
        setParentCommentId(previousParentId);
        fetchComments(previousParentId);
    };

    return (
        <React.Fragment>
            <div className="text-lightTextSecondary dark:text-darkTextSecondary w-12 h-12 absolute right-0 mr-40" onClick={handleClickOpen} >
                <FaRegComment className='text-3xl' />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialog-paper': {
                        width: '80%',
                        maxWidth: '600px',
                    },
                }}
                PaperProps={{
                    className: "bg-light60 dark:bg-dark60 text-lightText dark:text-darkTextSecondary dark:border-2 border-dark30 "
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {parentCommentId ? "Replies" : "Comments"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="ml-2  dark:text-darkTextSecondary">
                        {comment.map((comment, index) => (
                            <div
                                key={index}
                                className={`flex flex-auto mb-2 border-b-2 border-neutral-500/20 ${!comment.is_root ? 'ml-12' : ''
                                    }`}
                            >
                                <div>
                                    <img
                                        src={comment.user.profile_picture}
                                        alt={comment.user.name}
                                        className="w-14 h-14 rounded-full mr-3 object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold">
                                        {comment.user.first_name} {comment.user.last_name}
                                    </p>
                                    <p>{comment.content}</p>
                                    {comment.is_root ? (
                                        <p
                                            className="ml-96 cursor-pointer"
                                            onClick={() => handleReplyClick(comment._id)}
                                        >
                                            reply
                                        </p>
                                    ) : (
                                        <span>&nbsp;</span>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-auto">
                            <div>
                                <img
                                    src={userInfo.profile_picture}
                                    alt={userInfo.first_name}
                                    className="w-14 h-14 rounded-full mr-3 object-cover"
                                />
                            </div>
                            <div className="w-full ml-2">
                                <p className="font-semibold">{userInfo.first_name} {userInfo.last_name}</p>
                                <div className="relative w-full flex items-center">
                                    <Input
                                        className="w-full pr-10 dark:text-light60"
                                        value={newComment}
                                        onChange={handleCommentChange}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your comment..."
                                    />
                                    <BsFillSendFill
                                        className="absolute right-2 cursor-pointer dark:text-darkTextSecondary text-lightTextSecondary"
                                        onClick={postComment}
                                    />
                                </div>
                            </div>

                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {parentCommentId && (
                        <Button onClick={handleBackClick}>Back</Button>
                    )}
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}