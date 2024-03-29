import React from 'react';
import formatDate from '../../utils/DateFormatter';
import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { useSelector } from 'react-redux';

export default function PostCard({ post }) {
    const createdAt = post.createdAt;
    const formatedDate = formatDate(createdAt);

    const {user } = useSelector((state) => state.profile)
    const handleShare = () => {
      
      const postLink = `${window.location.origin}/post/${post._id}`;
      navigator.clipboard.writeText(postLink)
          .then(() => {
            console.log("loggedIn user data ", user)
            alert('Link copied to clipboard')
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
                <button><FcLike /> {post?.likes.length}</button>
                <button><FaRegCommentAlt /> {post?.comments?.length}</button>
                <button onClick={handleShare} ><IoMdShare /></button>
            </div>
        </div>
    );
}
