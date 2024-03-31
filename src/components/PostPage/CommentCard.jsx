import React from 'react';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/DateFormatter';

export default function CommentCard({ comments }) {
  const { user } = useSelector((state) => state.profile);

  const {dark} = useSelector((state) => state.profile)
  return (
    <div className="  shadow-md rounded-lg p-4  ">
      {comments.map(comment => (
        <div key={comment._id} className="flex items-start mb-4">
          {/* User profile image */}
          <div className="w-12 h-12 mr-4 overflow-hidden rounded-full">
            <img src={comment.userId.additionalDetails?.image} alt='profileimage' className="w-full h-full object-cover" />
          </div>
          {/* User info */}
          <div className={` flex-1 ${dark ? "dark" : "  bg-white text-black "} p-5 rounded-2xl `}>
            <div className={` flex flex-col ${dark ? "dark" : " "} `} >
              {/* User name */}
            <p className= {` font-bold ${dark ? " text-white  " : " text-black "} `} >{comment.userId.firstname} {comment.userId.lastname}</p>
            {/* User bio */}
            <p className= {` text-[12px] font-semibold ${dark ? " text-gray-400  " : " text-gray-500 "} `}>{comment.userId.additionalDetails?.bio}</p>
            </div>
          <div>
              {/* Comment text */}
              <p className="text-gray-800 dark:text-gray-200 mb-1">{comment.comment}</p>
            {/* Comment creation date */}
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(comment.createdAt)}</p>
          </div>
          </div>
          {/* Delete button for the comment creator */}
          {user?._id === comment.userId?._id && (
            <button className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}
