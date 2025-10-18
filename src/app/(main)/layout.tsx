import Footer from '@/components/common/Footer';
import Header from '@/components/common/header/Header';
import React, { PropsWithChildren } from 'react';

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
