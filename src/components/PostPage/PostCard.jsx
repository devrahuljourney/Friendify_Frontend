import React, { useState } from 'react';
import formatDate from '../../utils/DateFormatter';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { IoMdShare } from "react-icons/io";
import { useSelector } from 'react-redux';
import CommentCard from './CommentCard';
import { createComment } from '../../services/operations/commentAPI';
import { createLike, deleteLike } from '../../services/operations/likeAPI';

export default function PostCard({ post , fetchFeedData }) {
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

    const handleLike = async () => {
        try {
            console.log("Token:", token);

            const alreadyLiked = post?.likes?.some(like => like.userId === user?._id);
            if (alreadyLiked) {
                const userLike = post.likes.find(like => like.userId === user?._id);
                const likeId = userLike._id;
                await deleteLike(likeId, token);
                
            } else {
                
                await createLike(post._id, token);
                
            }
            fetchFeedData()
            //window.location.reload();
        } catch (error) {
            console.error("Error toggling like:", error);
        }
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

    const {dark} = useSelector((state) => state.profile)
    return (
        <div className= {`post   ${dark ? "dark-card" : " light-card  "}   rounded-lg mb-4 p-4 `}>
            <Link to={`/profile/${post?.userId?._id}`} className="flex items-center mb-2">
                <div className='w-12 h-12 overflow-hidden rounded-full mr-2'>
                    {post?.userId?.additionalDetails?.image ? (
                        <img src={post?.userId?.additionalDetails?.image} alt='profileimage' className="object-cover w-full h-full" />
                    ) : (
                        <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-500 text-lg">No Image</div>
                    )}
                </div>
                <div>
                    <p className="text-xl font-semibold ">{post?.userId?.firstname} {post?.userId?.lastname}</p>
                    <p className = { `text-sm ${dark ? " text-[#FFFD00] " : " text-gary-700 "} ` }>{formatedDate}</p>
                </div>
            </Link>

            <div className="mb-4">
                <p className= {` text-lg p-2 text-semibold ${dark ? "text-white" : "text-black"} `}>{post?.caption}</p>
                {post?.file && (
                    <div>
                        <img src={post?.file} alt='postimage' className="mt-2 rounded-lg shadow" />
                    </div>
                )}
            </div>
            <div className="flex items-center px-6 justify-between mb-4">
                <button onClick={handleLike} className="flex items-center text-gray-600 ">
                    {post?.likes?.some(like => like.userId === user?._id) ? <FcLike style={{width:"23px" , height:"23px"}} className="mr-1" /> : <FaRegHeart style={{width:"23px" , height:"23px"}} className="mr-1" />} {post?.likes?.length}
                </button>
                <button onClick={() => setCommentShow(!commentShow)} className="flex items-center text-gray-600 ">
                    <FaRegCommentAlt style={{width:"23px" , height:"23px"}} className="mr-1" /> {comments?.length}
                </button>
                <button onClick={handleShare} className="flex items-center text-gray-600 ">
                    <IoMdShare style={{width:"23px" , height:"23px"}} className="mr-1" />
                </button>
            </div>
            <form className="mb-4 md:p-2 flex gap-4 ">
              <div className='w-12 h-12   '>
              {user?.additionalDetails?.image ? (
              <img src={user?.additionalDetails?.image} alt='profileimage' className=" md:inline-block hidden rounded-full  w-full " />
               ) : (
               <div className="bg-gray-300 w-full h-full flex items-center justify-center rounded-full text-gray-500 text-lg">No Image</div>
               )}
              </div>

                <input type='text' name='commentData' value={commentData} onChange={handleChange} placeholder='Add a comment...' className= {` ${dark ? " bg-[#5c5470] " : " bg-[#dbd8e3] "}  placeholder:text-[19px] border border-gray-400  dark:border-gray-600 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-400 dark:text-gray-200 `} />
                <button onClick={handleReply} className = {`${dark ? "dark-highlight" : "light-highlight"}   text-white font-semibold py-2 px-4 rounded-lg ml-2 focus:outline-none`}>Reply</button>
            </form>
            <div>
                {commentShow && (
                    <div className='border-t-2 border-gray-400 ' >
                        
                        
                        <div className={`${dark ? " " : "light"}  rounded-lg  `} >
                        <CommentCard  comments={comments} />
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    );
}
