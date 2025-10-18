'use client';

import React from 'react';
import Image from 'next/image';
import { BannerLeft } from '@/constants/images';
import { useRouter } from 'next/navigation';
import { ERouteTable } from '@/constants/route';
import {
  Book,
  EmptyWallet,
  MoneySend,
  People,
  Routing2,
  Star1,
} from 'iconsax-react';
import { CourseTab } from '@/components/course/course-tab';

const SessionDescription = () => {
  const router = useRouter();

  return (
    <div className='h-max pb-10 pt-[60px] md:pt-[140px] bg-[linear-gradient(270deg,_rgba(255,255,255,0.12)_0%,_rgba(191,176,242,0.16)_50%,_rgba(255,255,255,0.12)_100%)]'>
      <div className='flex flex-col gap-4 justify-center items-center max-w-[1200px] mx-auto'>
        <div className='text-primary-main mb-4 w-max flex items-center font-semibold bg-[#5D38DE14] border border-primary-main rounded-full h-12 px-4'>
          Tại sao chọn chúng tôi?
        </div>
        <div className='md:text-5xl text-3xl text-center font-medium'>
          Sự Khác Biệt Làm Nên Đột Phá.
        </div>
        <div className='text-secondary text-center mt-1'>
          Lộ trình cá nhân hóa, kiến thức chuyên sâu, thực hành thực tế.
        </div>
        <div className='flex flex-col px-4 md:px-0 md:flex-row gap-10 my-10'>
          <div className='flex flex-col items-center justify-center'>
            <div className='h-20 w-20 bg-secondary-lighter flex items-center justify-center rounded-2xl border border-primary'>
              <People size='48' color='#212B36' />
            </div>
            <div className='mt-4 text-2xl'>Giảng Viên Chuyên Nghiệp</div>
            <div className='mt-4 text-secondary text-center'>
              Đội ngũ giảng viên giàu kinh nghiệm, là những chuyên gia trong
              lĩnh vực Toán và Công nghệ.
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='h-20 w-20 bg-warning-lighter flex items-center justify-center rounded-2xl border border-primary'>
              <Routing2 size='48' color='#212B36' />
            </div>
            <div className='mt-4 text-2xl'>Giảng Viên Chuyên Nghiệp</div>
            <div className='mt-4 text-secondary text-center'>
              Đội ngũ giảng viên giàu kinh nghiệm, là những chuyên gia trong
              lĩnh vực Toán và Công nghệ.
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='h-20 w-20 bg-info-lighter flex items-center justify-center rounded-2xl border border-primary'>
              <Book size='48' color='#212B36' />
            </div>
            <div className='mt-4 text-2xl text-center'>
              Giảng Viên Chuyên Nghiệp
            </div>
            <div className='mt-4 text-secondary text-center'>
              Đội ngũ giảng viên giàu kinh nghiệm, là những chuyên gia trong
              lĩnh vực Toán và Công nghệ.
            </div>
          </div>
        </div>

        <div
          role='presentation'
          onClick={() => router.push(ERouteTable.ABOUT)}
          className='text-primary cursor-pointer mb-4 w-max flex items-center font-semibold bg-[#919EAB14] rounded-full h-12 px-4'
        >
          Tìm Hiểu Thêm Về Chúng Tôi
        </div>
      </div>
    </div>
  );
};

export default SessionDescription;
