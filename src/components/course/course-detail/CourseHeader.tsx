import React from 'react';
import { formatMonthYear } from '@/hooks/formatTime';
import IconPrize from '../../../../public/icon-svg/IconPrize';
import IconUser from '../../../../public/icon-svg/IconUser';
import IconClock from '../../../../public/icon-svg/IconClock';

interface CourseHeaderProps {
  courseData: any;
}

export default function CourseHeader({ courseData }: CourseHeaderProps) {
  const renderStarRating = (rating: number) => (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`text-xl md:text-2xl ${
            star <= rating ? 'text-[#FFB145]' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className='bg-[linear-gradient(92.2deg,rgba(47, 87, 239, 1),rgba(255, 177, 69, 1))] w-full py-12 md:py-20 md:mt-20 h-max'>
      <div className='container mx-auto px-4 py-8 h-full flex flex-col justify-end w-full'>
        <div className='text-primary-main mb-2 md:w-[50%] w-full'>
          Khoá học lịch sử
        </div>
        <div className='text-4xl font-bold text-[#212B36] mb-4 md:w-[50%] w-full'>
          {courseData?.title}
        </div>
        <p className='text-gray-600 mb-2 md:w-[60%] w-full'>
          {courseData?.short_description}
        </p>

        <div className='my-4 flex flex-wrap items-center gap-4'>
          <div className='mt-2 w-max flex items-center capitalize gap-2 md:mt-0 font-light text-primary-main border bg-[#D14EA81F] border-white px-4 py-2 rounded-full'>
            <IconPrize /> {courseData?.label}
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <div className='flex items-center gap-1'>
              <span className='text-xl md:text-2xl font-medium text-[#FFB145]'>
                {courseData?.averageRating}
              </span>
              {renderStarRating(courseData?.averageRating || 0)}
            </div>
            <span className='text-gray-500 bg-[#F4F6F8] text-sm md:text-base px-3 py-1 rounded-md whitespace-nowrap'>
              {courseData?.reviewCount} Đánh giá
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <IconUser />
            <span className='text-sm text-gray-500'>
              {courseData?.enrollmentCount} Người học
            </span>
          </div>
        </div>

        <div className='text-gray-600 text-sm mb-2'>
          Bài giảng: {courseData?.lessonCount}
        </div>
        <div className='flex items-center gap-2'>
          <IconClock />
          <div className='text-gray-600 text-sm'>
            Cập nhật lần cuối{' '}
            {courseData?.updated_at
              ? formatMonthYear(courseData.updated_at)
              : 'Không có dữ liệu '}
          </div>
        </div>
      </div>
    </div>
  );
}
