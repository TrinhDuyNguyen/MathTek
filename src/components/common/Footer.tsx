import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ERouteTable } from '@/constants/route';
import { logoApp } from '@/constants/images';

function Footer() {
  return (
    <footer className='bg-white border-t border-[#919EAB3D]'>
      <div className='container mx-auto md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl pt-16 pb-8 px-6 text-primary'>
        <div className='grid lg:grid-cols-6 gap-2 grid-cols-1 md:grid-cols-3 gap-y-6'>
          <div className='col-span-1 md:col-span-3 lg:max-w-2/3'>
            <Image src={logoApp} alt='Logo' width={80} height={40} />
            <div className='mt-8 text-base text-[#212B36]'>
              <span className='font-semibold'>MathTek</span> là nền tảng học tập
              trực tuyến hiện đại, mang đến trải nghiệm giáo dục linh hoạt và
              hiệu quả cho học sinh ở mọi lứa tuổi.
            </div>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <div className='text-xl font-semibold text-[#212B36]'>
              Tài khoản
            </div>
            <Link
              href={ERouteTable.HOME}
              className='md:mt-6 cursor-pointer hover:text-primary-main hover:underline text-[#637381]'
            >
              Khám phá
            </Link>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <div className='text-xl font-semibold text-[#212B36]'>MathTek</div>
            <Link
              href={ERouteTable.CONTACT}
              className='md:mt-6 cursor-pointer hover:text-primary-main hover:underline text-[#637381]'
            >
              Liên hệ
            </Link>

            <Link
              href={ERouteTable.FAQ_PAGE}
              className='cursor-pointer hover:text-primary-main hover:underline text-[#637381]'
            >
              FAQs
            </Link>
            <Link
              href={ERouteTable.ABOUT}
              className='cursor-pointer hover:text-primary-main hover:underline text-[#637381]'
            >
              Về chúng tôi
            </Link>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <div className='text-xl font-semibold text-[#212B36]'>
              Liên hệ với chúng tôi
            </div>
            <div className='md:mt-6'>
              <div className='text-xs text-[#637381]'>Gọi cho chúng tôi</div>
              <Link
                href='tel:+84 123 456 789'
                className='text-lg font-semibold text-[#212B36]'
              >
                +84 123 456 789
              </Link>
            </div>
            <div className='flex gap-2 items-center'>
              <svg
                width='18'
                height='19'
                viewBox='0 0 18 19'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12.75 3.29199H5.25C3 3.29199 1.5 4.41699 1.5 7.04199V12.292C1.5 14.917 3 16.042 5.25 16.042H12.75C15 16.042 16.5 14.917 16.5 12.292V7.04199C16.5 4.41699 15 3.29199 12.75 3.29199ZM13.1025 7.85949L10.755 9.73449C10.26 10.132 9.63 10.327 9 10.327C8.37 10.327 7.7325 10.132 7.245 9.73449L4.8975 7.85949C4.6575 7.66449 4.62 7.30449 4.8075 7.06449C5.0025 6.82449 5.355 6.77949 5.595 6.97449L7.9425 8.84949C8.5125 9.30699 9.48 9.30699 10.05 8.84949L12.3975 6.97449C12.6375 6.77949 12.9975 6.81699 13.185 7.06449C13.38 7.30449 13.3425 7.66449 13.1025 7.85949Z'
                  fill='#2F57EF'
                />
              </svg>
              <div className='text-[#212B36]'>demo@gmail.cc</div>
            </div>
            <div className='flex gap-2 items-center'>
              <svg
                width='18'
                height='19'
                viewBox='0 0 18 19'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15.465 7.00449C14.6775 3.53949 11.6549 1.97949 8.99995 1.97949C8.99995 1.97949 8.99995 1.97949 8.99245 1.97949C6.34495 1.97949 3.31495 3.53199 2.52745 6.99699C1.64995 10.867 4.01995 14.1445 6.16495 16.207C6.95995 16.972 7.97995 17.3545 8.99995 17.3545C10.0199 17.3545 11.0399 16.972 11.8274 16.207C13.9724 14.1445 16.3425 10.8745 15.465 7.00449ZM8.99995 10.762C7.69495 10.762 6.63745 9.70449 6.63745 8.39949C6.63745 7.09449 7.69495 6.03699 8.99995 6.03699C10.3049 6.03699 11.3624 7.09449 11.3624 8.39949C11.3624 9.70449 10.3049 10.762 8.99995 10.762Z'
                  fill='#2F57EF'
                />
              </svg>
              <div className='text-[#212B36]'>Yên Hòa, Cầu Giấy, Hà Nội</div>
            </div>
          </div>
        </div>
        <div className='my-8 w-full h-[1px] bg-[#919EAB3D]'></div>
        <div className='lg:flex items-center justify-between'>
          <div className='text-sm text-[#637381]'>
            Copyright © 2025{' '}
            <span className='font-semibold text-[#212B36]'>LSKT</span>. All
            Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
