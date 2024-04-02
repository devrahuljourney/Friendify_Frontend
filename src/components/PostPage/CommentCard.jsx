import React from 'react';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/DateFormatter';
import { MdOutlineDeleteSweep } from "react-icons/md";
export default function CommentCard({ comments }) {
  const { user } = useSelector((state) => state.profile);

  const {dark} = useSelector((state) => state.profile)
  return (
    <div className="  shadow-md rounded-lg p-4 w-full  ">
      {comments.map(comment => (
        <div key={comment._id} className="flex items-start mb-4  ">
          {/* User profile image */}
          <div className="w-12 h-12 mr-4 overflow-hidden rounded-full">
            <img src={comment.userId.additionalDetails?.image} alt='profileimage' className="w-full h-full object-cover" />
          </div>
          {/* User info */}
          <div className={` flex-1 ${dark ? "dark" : "  bg-white text-black "} p-5 rounded-2xl `}>
            <div className={` flex justify-between ${dark ? "dark" : " "} `} >
              {/* User name */}
            <p className= {` font-bold ${dark ? " text-white  " : " text-black "} `} >{comment.userId.firstname} {comment.userId.lastname}</p>
            {/* User bio */}
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(comment.createdAt)}</p>
            </div>
          <div>
              {/* Comment text */}
              <p className= {`  ${dark ? " text-white  " : " text-black "} `}>{comment.comment}</p>
            {/* Comment creation date */}
          
          </div>
          </div>
          {/* Delete button for the comment creator */}
          {user?._id === comment.userId?._id && (
            <button className="ml-4 px-2 py-1 text-red-500 hover:text-white text-xl rounded-md hover:bg-red-600 focus:outline-none"> <MdOutlineDeleteSweep/> </button>
          )}
        </div>
      ))}
    </div>
  );
}
