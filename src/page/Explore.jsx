import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { searchByKeyword } from '../services/operations/searchApi';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostPage/PostCard';
import UserSortProfile from '../components/common/UserSortProfile';
import { Link } from 'react-router-dom';

export default function Explore() {
  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState("user");
  const [result, setResult] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const response = await searchByKeyword(keyword, token);
    setResult(response);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            type='text' 
            name='keyword' 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} 
          />
          <button type='submit'><IoSearch/></button>
        </label>
      </form>

      {result && (
        <div>
          <div>
            <button onClick={() => setTab("user")}>User</button>
            <button onClick={() => setTab("post")}>Post</button>
          </div>
          
          {tab === "user" && (
            <div>
              {result.users.map((user) => (
                <Link to={`/profile/${user._id}`} >
                <UserSortProfile key={user._id} data={user} />
                </Link>
                
              ))}
            </div>
          )}

          {tab === "post" && (
            <div>
              {result.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
