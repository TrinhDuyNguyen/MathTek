'use client';

import * as React from 'react';

interface LeaderboardCardProps {
  data: any;
}

export const LeaderboardCard = ({ data = [] }: LeaderboardCardProps) => {
  // Get top 3 users for podium display
  const topThree = data
    .filter((entry: any) => entry.rank <= 3)
    .sort((a: any, b: any) => a.rank - b.rank);
  const remainingUsers = data.filter((entry: any) => entry.rank > 3);

  // Default avatar for users without one
  const defaultAvatar = '/images/common/avatar-kid.png';

  // Get podium styling based on rank
  const getPodiumStyling = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          borderColor: 'border-[#4CAF50]',
          textColor: 'text-[#4CAF50]',
          bgColor: 'bg-[#C8E6C9]',
          height: 'h-36',
        };
      case 2:
        return {
          borderColor: 'border-[#FF9800]',
          textColor: 'text-[#FF9800]',
          bgColor: 'bg-[#FFE0B2]',
          height: 'h-24',
        };
      case 3:
        return {
          borderColor: 'border-[#F44336]',
          textColor: 'text-[#F44336]',
          bgColor: 'bg-[#FECDD2]',
          height: 'h-16',
        };
      default:
        return {
          borderColor: 'border-[#919EAB]',
          textColor: 'text-[#919EAB]',
          bgColor: 'bg-[#919EAB14]',
          height: 'h-16',
        };
    }
  };

  // Render podium user
  const renderPodiumUser = (entry: any) => {
    const styling = getPodiumStyling(entry.rank);

    return (
      <div key={entry.id} className='flex-col items-center flex w-24'>
        <img
          src={entry?.avatar || defaultAvatar}
          alt={entry.fullName}
          className={`h-14 w-14 rounded-full border ${styling.borderColor}`}
          onError={e => {
            (e.target as HTMLImageElement).src = defaultAvatar;
          }}
        />
        <div className='mt-2 w-max font-semibold text-center text-sm truncate max-w-20'>
          {entry.fullName}
        </div>
        <div
          className={`w-20 mt-3 py-1 border rounded-md flex items-center justify-center ${styling.borderColor} ${styling.textColor} text-sm`}
        >
          {entry.total_score}
        </div>
        <div
          className={`${styling.bgColor} font-semibold w-28 flex items-center justify-center ${styling.height} rounded-tl-3xl rounded-tr-3xl mt-6`}
        >
          #{entry.rank}
        </div>
      </div>
    );
  };

  // Arrange top 3 users in podium order (2nd, 1st, 3rd)
  const podiumOrder = [
    topThree.find((entry: any) => entry.rank === 2),
    topThree.find((entry: any) => entry.rank === 1),
    topThree.find((entry: any) => entry.rank === 3),
  ].filter(Boolean) as any;

  return (
    <div>
      <div className='bg-[#BF2F1F14] px-6 pt-6 rounded-tr-xl rounded-tl-xl'>
        <div className='font-semibold h-14'>Bảng xếp hạng</div>
        <div className='flex justify-between items-end'>
          {podiumOrder.map((entry: any) => renderPodiumUser(entry))}
        </div>
      </div>
      <div className='bg-white p-6 rounded-bl-xl rounded-br-xl'>
        {remainingUsers.map((entry: any, index: any) => (
          <div
            key={entry.id}
            className={`bg-[#919EAB14] p-3 flex gap-4 items-center rounded-xl ${index > 0 ? 'mt-2' : ''}`}
          >
            <div className='font-semibold'>#{entry.rank}</div>
            <img
              src={entry?.avatar || defaultAvatar}
              alt={entry.fullName}
              className='h-14 w-14 rounded-full border border-[#919EAB]'
              onError={e => {
                (e.target as HTMLImageElement).src = defaultAvatar;
              }}
            />
            <div className='flex-1'>
              <div className='font-semibold'>{entry.fullName}</div>
              <div className='text-[#919EAB]'>{entry.total_score}</div>
            </div>
          </div>
        ))}
        {remainingUsers.length === 0 && (
          <div className='text-center text-gray-500 py-4'>
            Không có dữ liệu xếp hạng thêm
          </div>
        )}
      </div>
    </div>
  );
};
