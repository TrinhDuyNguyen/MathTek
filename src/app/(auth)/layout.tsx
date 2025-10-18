import { bannerAuth } from '@/constants/images';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex h-screen flex-row w-full'>
      <div className='flex-2 hidden md:block'>
        <Image
          src={bannerAuth}
          alt='banner'
          className='h-screen w-full object-cover'
        />
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  );
}

export default AuthLayout;
