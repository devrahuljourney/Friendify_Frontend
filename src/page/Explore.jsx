import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { searchByKeyword } from '../services/operations/searchApi';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostPage/PostCard';
import UserSortProfile from '../components/common/UserSortProfile';
import { Link } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

export default function Explore() {
  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState("user");
  const [result, setResult] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    const response = await searchByKeyword(keyword, token);
    setLoading(false);
    setResult(response);
  }

  const { dark } = useSelector((state) => state.profile);

  return (
    <div className='md:p-12 p-2 md:ml-6 rounded-full md:mt-5  w-[100%] gap-2 flex flex-col justify-center items-center'>
      <form className={`md:p-8 p-3 flex flex-row w-full ${dark ? "dark-card" : "light-card"}`} onSubmit={handleSubmit}>
        <label className={`flex md:mt-0 mt-7 justify-between ${dark ? "dark border-[#FFFD00] focus:ring-[#FFFD00]" : "light focus:ring-[#c9ddf7] border-[#c9ddf7]"} outline-none focus:ring-2 border-b-2 px-4 py-2 w-full  rounded-full`}>
          <input 
            placeholder='Find what you are looking for...'
            className='focus:border-transparent focus:outline-none bg-transparent md:px-4 py-2 w-[90%] rounded-full'
            type='text' 
            name='keyword' 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} 
          />
          <button className='w-[10%]' type='submit'><IoSearch style={{width:"25", height:"25"}} /></button>
        </label>
      </form>

      <div className={` font-bold px-11 text-[18px] ${dark ? "dark-card" : "light-card"}  w-full flex justify-between p-4`}>
            <button className={`  ${tab === "user" ? `border-b-2 ${dark ? " text-[#FFFD00] border-[#FFFD00] " : "text-[#c9ddf7] border-[#c9ddf7] "} `: ""} `} onClick={() => setTab("user")}>User</button>
            <button className={`  ${tab === "post" ? `border-b-2 ${dark ? " text-[#FFFD00] border-[#FFFD00] " : "text-[#c9ddf7] border-[#c9ddf7] "} `: ""} `} onClick={() => setTab("post")}>Post</button>
          </div>
      {result && (
        <div className='w-full flex flex-col justify-center  items-center' >
          
          
          <div className='w-full mt-2' >
            {loading ? (
                <div className='flex justify-center items-center w-full h-full' >
                <Spinner/>
                </div>
            ) : (
              <div>
                {tab === "user" && (
                  <div className={`w-full ${dark ? "dark-card" :"light-card"} p-3 `} >
                    {result.users.map((user) => (
                      <Link to={`/profile/${user._id}`} key={user._id}>
                        <UserSortProfile data={user} />
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
        </div>
      )}
    </div>
  );
}
