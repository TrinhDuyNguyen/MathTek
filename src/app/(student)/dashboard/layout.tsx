'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Book, Home, LogOut, Settings, Star, User } from 'lucide-react';
import IconBookWhite from '../../../../public/icon-svg/IconBookWhite';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserCourse } from '@/modules/auth/hooks/useUser';
import { Chart1 } from 'iconsax-react';
import './index.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuthStore();
  const { getUserMe, getListLessonRegister } = useUserCourse();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className='mb-20'>
      {/* Colorful Banner/Header */}
      <div className='banner-course w-full h-[400px] relative'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-[160px] relative z-10'>
        {/* Profile Info Section */}
        <div className='relative'>
          {}
          <img
            src='/images/dashboard/banner-profile.png'
            alt='profile banner'
            className='h-full w-max'
          />
          <div className='absolute bottom-10 left-10 text-center'>
            <div className='flex items-center gap-4'>
              {}
              <img
                src={getUserMe?.data?.avatar || '/images/contact.png'}
                alt='Chris Hemsworth'
                width={120}
                height={120}
                className='rounded-full border-4 border-white h-[120px] w-[120px]'
              />
              <div>
                <h1 className='text-2xl font-bold mt-4 text-white'>
                  {getUserMe?.data?.fullName}
                </h1>
                <div className='flex items-center mt-2 gap-2 text-white'>
                  <IconBookWhite />
                  <span className='text-sm text-white'>
                    {getListLessonRegister?.data?.total || 0} Khóa học đã đăng
                    ký
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-6'>
          {/* Sidebar Navigation */}
          <div className='bg-white rounded-lg border border-gray-200 p-6'>
            <div className='text-sm font-medium uppercase text-gray-500 mb-4'>
              CHÀO MỪNG, {getUserMe?.data?.fullName}
            </div>

            <nav className='space-y-1'>
              <Link
                href='/dashboard'
                className={`flex items-center px-3 py-3 ${
                  isActive('/dashboard')
                    ? 'text-primary-main bg-[#2F57EF14]'
                    : 'text-gray-700 hover:bg-gray-50'
                } rounded-lg`}
              >
                <Home
                  className='w-5 h-5 mr-3'
                  color={isActive('/dashboard') ? '#2F57EF' : '#364153'}
                />
                <span
                  className={
                    isActive('/dashboard')
                      ? 'font-medium text-primary-main'
                      : ''
                  }
                >
                  Tổng quan
                </span>
              </Link>

              <Link
                href='/dashboard/profile'
                className={`flex items-center px-3 py-3 ${
                  isActive('/dashboard/profile')
                    ? 'text-primary-main bg-[#2F57EF14]'
                    : 'text-gray-700 hover:bg-gray-50'
                } rounded-lg`}
              >
                <User
                  className='w-5 h-5 mr-3'
                  color={isActive('/dashboard/profile') ? '#2F57EF' : '#364153'}
                />
                <span
                  className={
                    isActive('/dashboard/profile')
                      ? 'font-medium text-primary-main'
                      : ''
                  }
                >
                  Hồ sơ
                </span>
              </Link>

              <Link
                href='/dashboard/courses'
                className={`flex items-center px-3 py-3 ${
                  isActive('/dashboard/courses')
                    ? 'text-primary-main bg-[#2F57EF14]'
                    : 'text-gray-700 hover:bg-gray-50'
                } rounded-lg`}
              >
                <Book
                  className='w-5 h-5 mr-3'
                  color={isActive('/dashboard/courses') ? '#2F57EF' : '#364153'}
                />
                <span
                  className={
                    isActive('/dashboard/courses')
                      ? 'font-medium text-primary-main'
                      : ''
                  }
                >
                  Khóa học đã đăng ký
                </span>
              </Link>

              <Link
                href='/dashboard/reviews'
                className={`flex items-center px-3 py-3 ${
                  isActive('/dashboard/reviews')
                    ? 'text-primary-main bg-[#2F57EF14]'
                    : 'text-gray-700 hover:bg-gray-50'
                } rounded-lg`}
              >
                <Star
                  className='w-5 h-5 mr-3'
                  color={isActive('/dashboard/reviews') ? '#2F57EF' : '#364153'}
                />
                <span
                  className={
                    isActive('/dashboard/reviews')
                      ? 'font-medium text-primary-main'
                      : ''
                  }
                >
                  Đánh giá
                </span>
              </Link>

              <Link
                href='/dashboard/personal-achievement'
                className={`flex items-center px-3 py-3 ${
                  isActive('/dashboard/personal-achievement')
                    ? 'text-primary-main bg-[#2F57EF14]'
                    : 'text-gray-700 hover:bg-gray-50'
                } rounded-lg`}
              >
                <Chart1
                  className='w-5 h-5 mr-3'
                  color={
                    isActive('/dashboard/personal-achievement')
                      ? '#2F57EF'
                      : '#364153'
                  }
                />
                <span
                  className={
                    isActive('/dashboard/personal-achievement')
                      ? 'font-medium text-primary-main'
                      : ''
                  }
                >
                  Thành tích cá nhân
                </span>
              </Link>
            </nav>

            <div className='mt-6 pt-6 border-t border-gray-200'>
              <div className='text-sm font-medium uppercase text-gray-500 mb-4'>
                CÁ NHÂN
              </div>

              <nav className='space-y-1'>
                <Link
                  href='/dashboard/settings'
                  className={`flex items-center px-3 py-3 ${
                    isActive('/dashboard/settings')
                      ? 'text-primary-main bg-[#2F57EF14]'
                      : 'text-gray-700 hover:bg-gray-50'
                  } rounded-lg`}
                >
                  <Settings
                    className='w-5 h-5 mr-3'
                    color={
                      isActive('/dashboard/settings') ? '#2F57EF' : '#364153'
                    }
                  />
                  <span
                    className={
                      isActive('/dashboard/settings')
                        ? 'font-medium text-primary-main'
                        : ''
                    }
                  >
                    Cài đặt
                  </span>
                </Link>

                <div
                  role='presentation'
                  onClick={() => {
                    signOut();
                    router.push('/');
                  }}
                  className='flex cursor-pointer items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg'
                >
                  <LogOut className='w-5 h-5 mr-3' />
                  <span>Đăng xuất</span>
                </div>
              </nav>
            </div>
          </div>

          {/* Page Content */}
          <div className='md:col-span-3'>{children}</div>
        </div>
      </div>
    </div>
  );
}
