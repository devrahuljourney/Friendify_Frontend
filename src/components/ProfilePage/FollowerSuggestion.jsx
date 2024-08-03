import React, { useEffect, useState } from 'react'
import { followSuggestions } from '../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import UserSortProfile from '../common/UserSortProfile';

export default function FollowerSuggestion() {
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const {dark} = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const result = await followSuggestions(token);
        console.log("Result (Follower Suggestions): ", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching follower suggestions: ", error);
      }
    };
    fetchSuggestions();
  }, [token]);

  return (
    <div className={`md:flex justify-center items-center sm:hidden flex-col gap-2 p-2 w-[80%] translate-x-7 rounded-lg ${dark ? "dark-card": "light-card"}` } >
      <div className='text-[18px] font-bold  ' >Suggested for you</div>
      <div>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((value) => <UserSortProfile key={value.id} data={value} showFollow={true} />)
      ) : (
        <p>No suggestions available.</p>
      )}
      </div>
    </div>
  );
}
