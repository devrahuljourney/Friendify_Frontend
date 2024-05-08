import React from 'react';

export default function UserSortProfile({ data }) {
  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
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
