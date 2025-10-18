import Header from '@/components/common/header/Header';
import React, { PropsWithChildren } from 'react';

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main className='h-[calc(100vh-58px)] overflow-hidden mt-[58px]'>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
