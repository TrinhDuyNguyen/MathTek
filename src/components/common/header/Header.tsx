'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { SearchNormal } from 'iconsax-react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/useAuthStore';
import { ERouteTable } from '@/constants/route';
import { AvatarKid, logoApp } from '@/constants/images';
import DropdownTabs from './DropdownTabs';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { MenuMobile } from './MenuMobile';
import { useUserCourse } from '@/modules/auth/hooks/useUser';

function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const [, setOpenSearch] = useState(false);
  const router = useRouter();
  const { getUserMe } = useUserCourse();

  const handleNavigateToHome = () => {
    router.push(ERouteTable.HOME);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-50 w-full bg-white transition-all duration-300 ease-in-out',
        pathname === ERouteTable.HOME
          ? 'bg-transparent backdrop-blur-md'
          : 'bg-white',
        scrolled ? 'bg-white shadow-md' : ''
      )}
    >
      <div className='w-full py-2 lg:px-10 px-4'>
        <div className='flex justify-between items-center'>
          {/* Nav Routes */}
          <div className='flex items-center space-x-4 md:space-x-8'>
            <div className='block md:hidden'>
              <MenuMobile />
            </div>
            <Image
              src={logoApp}
              alt='Logo'
              width={150}
              height={40}
              onClick={handleNavigateToHome}
              className='cursor-pointer'
            />
            <div className='hidden md:block space-x-6'>
              <DropdownTabs type='custom' />
              {/*<DropdownTabs />*/}
            </div>
          </div>

          {/* List Actions Button */}
          <div className='flex space-x-6 items-center'>
            <div className='flex items-center gap-4'>
              {/*<Image*/}
              {/*  src="/vietnam.svg"*/}
              {/*  alt="Logo"*/}
              {/*  className="m-2 md:block hidden"*/}
              {/*  width={28}*/}
              {/*  height={20}*/}
              {/*/>*/}
              <Button
                style={{ padding: 8 }}
                size='lg'
                type='button'
                variant='ghost'
                onClick={() => {
                  setOpenSearch(true);
                }}
              >
                <SearchNormal size={24} color='#71717B' />
              </Button>

              {isAuthenticated ? (
                <Image
                  onClick={() => router.push(ERouteTable.DASHBOARD)}
                  src={getUserMe?.data?.avatar ?? AvatarKid}
                  alt='Avatar'
                  width={40}
                  height={40}
                  className='cursor-pointer rounded-full h-10 w-10'
                />
              ) : (
                // <UserButton />
                <div className='md:flex gap-2 items-center hidden'>
                  <Button variant='ghost' className='h-10 rounded-full'>
                    <Link
                      href={ERouteTable.LOGIN}
                      className='text-[#212B36] font-bold'
                    >
                      Đăng nhập
                    </Link>
                  </Button>
                  <Button
                    variant='default'
                    className='bg-primary-main h-10  shadow-md hover:shadow-xl hover:shadow-primary-main/20 transition-shadow duration-300 text-white px-4 py-1.5 rounded-full'
                  >
                    <Link href={ERouteTable.LOGIN}>Bắt đầu miễn phí</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
