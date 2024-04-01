import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedFromAllUsers, getFeedFromFollower } from "../../services/operations/postAPI";
import PostCard from './PostCard';

export default function AllPost() {
    const [tab, setTab] = useState("1");
    const { dark } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [feedData, setFeedData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFeedData = async () => {
            try {
                if (tab === "1") {
                    const data = await getFeedFromAllUsers(token);
                    setFeedData(data);
                } else if (tab === "2") {
                    const data = await getFeedFromFollower(token);
                    setFeedData(data);
                }
            } catch (error) {
                console.log("Error fetching feed:", error);
            }
        };

        fetchFeedData();
    }, [tab, token]);

    return (
        <div className='p-7' >
            <div className={` mt-4 mb-2 font-bold  w-full flex justify-evenly items-center p-4 rounded-xl   ${dark ? 'dark-card' : 'light-card'}`}>
                <button onClick={() => setTab("1")} className={`${tab === "1" ? `${dark ? "border-b-4 border-[#FFFD00]" : "border-b-4 border-[#c5F3EE"}` : ""}`}>For You</button>
                <button onClick={() => setTab("2")} className={`${tab === "2" ? `${dark ? "border-b-4 border-[#FFFD00]" : "border-b-4 border-[#c5F3EE"}` : ""}`}>Following</button>
            </div>
            {
                feedData.length > 0 ? (
                    <div className='' >
                        {feedData.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div>
                        {tab === "1" ? "There is No Post to show" : "You Haven't followed anyone or There is no post to show"}
                    </div>
                )
            }
        </div>
    );
}
