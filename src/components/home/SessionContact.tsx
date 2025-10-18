'use client';

import React from 'react';
import Image from 'next/image';
import { BannerNew } from '@/constants/images';
import { Input } from '@/components/ui/input';
import { SmsNotification } from 'iconsax-react';

const SessionContact = () => {
  return (
    <div className='h-max pt-[60px] md:pt-[140px] px-4 md:px-0'>
      <div className='w-full bg-[#5D38DE29] rounded-4xl mx-auto px-4 md:px-8 max-w-[1200px]'>
        <div className='flex justify-between flex-col items-center gap-20 md:flex-row'>
          <div className='max-w-[600px] mt-10 md:mt-0'>
            <div className='text-primary-main mb-4 w-max flex items-center font-semibold bg-[#5D38DE14] border border-primary-main rounded-full h-12 px-4'>
              Bản tin
            </div>
            <div className='md:text-5xl text-3xl font-medium'>
              Đăng ký nhận bản tin
            </div>
            <div className='text-secondary mt-4'>
              Nhận ưu đãi độc quyền và thông tin mới nhất mỗi tuần
            </div>
            <div className='flex gap-6 mt-4'>
              <div className='relative'>
                <Input
                  placeholder='Email'
                  className='text-secondary border border-primary pl-10 rounded-4xl'
                />
                <div className='absolute top-3 left-2'>
                  <SmsNotification size='24' color='#292D32' />
                </div>
              </div>
              <div className='text-white bg-primary-main flex items-center justify-center px-4 rounded-4xl font-semibold'>
                Đăng ký
              </div>
            </div>
          </div>
          <Image
            src={BannerNew}
            alt='logo app'
            width={494}
            className='max-w-[494px] max-h-max'
          />
        </div>
      </div>
    </div>
  );
};

export default SessionContact;
