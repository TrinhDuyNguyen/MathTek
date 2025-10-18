'use client';

import React from 'react';
import '../index.css';
import Image from 'next/image';
import { BannerRight } from '@/constants/images';
import { useRouter } from 'next/navigation';
import { ERouteTable } from '@/constants/route';

const HeroBanner = () => {
  const router = useRouter();

  return (
    <div className='bg-white h-max pt-[60px] md:pt-[140px] pb-10 session-hero'>
      <div className='w-full mx-auto px-4 md:px-8 max-w-[1200px]'>
        <div className='flex md:justify-between justify-center flex-col items-center md:flex-row'>
          <div className='max-w-[600px]'>
            <div className='font-bold text-[36px] lg:text-[60px]'>
              Khai phá tiềm năng Làm chủ Toán học và Công nghệ.
            </div>
            <div className='text-xl text-[#212B36]'>
              Nền tảng vững chắc cho mọi thành công trong kỷ nguyên số.
            </div>
            <div
              onClick={() => router.push(ERouteTable.COURSE)}
              role='presentation'
              className='text-white cursor-pointer mt-10 w-max flex items-center font-semibold bg-primary-main rounded-full h-12 px-4'
            >
              Khám phá khóa học
            </div>
          </div>
          <Image
            src={BannerRight}
            alt='logo app'
            width={580}
            className='max-w-[580x] max-h-max'
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
