import React from 'react';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/DateFormatter';

export default function CommentCard({ comments }) {
  const { user } = useSelector((state) => state.profile);

  return (
    <div>
      {comments.map(comment => (
        <div key={comment._id}>
          {/* Render user profile image */}
          <div>
            <div>
              <img src={comment.userId.additionalDetails?.image} alt='profileimage' />
            </div>
            <div>
              {/* Render user name */}
              <p>{comment.userId.firstname} {comment.userId.lastname} </p>
              {/* Render user bio */}
              <p>{comment.userId.additionalDetails?.bio}</p>
            </div>
          </div>
          <div>
            {/* Render comment text */}
            <p>{comment.comment}</p>
            {/* Render comment creation date */}
            <p>{formatDate(comment.createdAt)}</p>
          </div>
          {/* Render delete button for the comment creator */}
          {user?._id === comment.userId?._id && <button>Delete</button>}
        </div>
      ))}
    </div>
  );
}
