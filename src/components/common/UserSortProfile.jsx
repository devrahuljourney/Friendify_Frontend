import React from 'react';
import { useSelector } from 'react-redux';

export default function UserSortProfile({ data }) {
  const { dark } = useSelector((state) => state.profile);

  return (
    <div className={`p-2 w-full border-b ${!dark ? "border-[#c9ddf7]" : "border-[#FFFD00]"} pb-4 mb-4 transition duration-300 hover:bg-slate-400 `}>
      <div className="flex items-center">
        <div className="mr-4">
          <img src={data?.additionalDetails?.image} className="w-12 h-12 rounded-full" alt="Profile" />
        </div>
        <div>
          <p className="text-lg font-semibold">{data?.firstname} {data?.lastname}</p>
          <p className="text-sm text-gray-600">{data?.additionalDetails?.bio}</p>
        </div>
      </div>
    </div>
  );
}
