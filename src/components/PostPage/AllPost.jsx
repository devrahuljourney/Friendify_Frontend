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
        // Fetch and set feed data based on the selected tab
        if (tab === "1") {
            getFeedFromAllUsers(token)
                .then(data => setFeedData(data))
                .catch(error => console.log("Error fetching feed from all users:", error));
        } else if (tab === "2") {
            getFeedFromFollower(token)
                .then(data => setFeedData(data))
                .catch(error => console.log("Error fetching feed from followers:", error));
        }
    }, [tab, token]);

    return (
        <div>
            <div className={`w-full flex justify-evenly items-center p-3 border-b-2 border-gray-400 ${dark ? 'dark' : ''}`}>
                <button onClick={() => setTab("1")} className={tab === "1" ? "border-b-4 border-[#38598b]" : ""}>For You</button>
                <button onClick={() => setTab("2")} className={tab === "2" ? "border-b-4 border-[#38598b]" : ""}>Following</button>
            </div>
            <div>
                {feedData.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
