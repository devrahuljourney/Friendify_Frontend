import React, { useState } from 'react';
import formatDate from '../../utils/DateFormatter';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { IoMdShare } from "react-icons/io";
import { useSelector } from 'react-redux';
import CommentCard from './CommentCard';
import { createComment } from '../../services/operations/commentAPI';

export default function PostCard({ post }) {
    const createdAt = post.createdAt;
    const formatedDate = formatDate(createdAt);

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const [commentData, setCommentData] = useState("");
    const [commentShow, setCommentShow] = useState(false); 
    const [comments, setComments] = useState(post.comments || []);

    const handleChange = (event) => {
        setCommentData(event.target.value);
    };

    const handleReply = async (e) => {
        e.preventDefault();
        try {
            if (commentData.trim() !== "") {
                const newComment = await createComment(post._id, commentData, token);
                console.log("Comment created successfully");
                setCommentData("");
                setComments([...comments, newComment]); 
                console.log("comment ", comments)
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };
    
    const handleShare = () => {
        const postLink = `${window.location.origin}/post/${post._id}`;
        navigator.clipboard.writeText(postLink)
            .then(() => {
                console.log("loggedIn user data ", user);
                alert('Link copied to clipboard');
            })
            .catch(error => console.error('Error copying link:', error));
    };

    return (
        <div>
            <Link to={`/profile/${post?.userId?._id}`} >
                <div className='w-[40px] h-[40px]'>
                    {post?.userId?.additionalDetails?.image ? (
                        <img src={post?.userId?.additionalDetails?.image} alt='profileimage' />
                    ) : (
                        <div>No Image</div>
                    )}
                </div>
                <div>
                    <p>{post?.userId?.firstname} {post?.userId?.lastname}</p>
                    <p>{formatedDate}</p>
                </div>
            </Link>

            <div>
                <p>{post?.caption}</p>
                {post?.file && (
                    <div>
                        <img src={post?.file} alt='postimage' />
                    </div>
                )}
            </div>
            <div>
                <button onClick={() => console.log("Like button clicked")}>
                    {post?.likes?.some(like => like.userId === user?._id) ? <FcLike /> : <FaRegHeart />} {post?.likes?.length}
                </button>
                <button onClick={() => setCommentShow(!commentShow)} ><FaRegCommentAlt /> {comments?.length}</button> {/* Use comments state for length */}
                <button onClick={handleShare} ><IoMdShare /></button>
            </div>
            <div>
                {commentShow && (
                    <div>
                        <form>
                            <input type='text' name='commentData' value={commentData} onChange={handleChange} placeholder='Enter Your Comment' />
                            <button onClick={handleReply}>Reply</button>
                        </form>
                        
                        <CommentCard  comments={comments} />
                    </div>
                )}
            </div>
        </div>
    );
}
