import HeroBanner from '@/components/home/component-home/HeroBanner';
import React from 'react';
import SessionDescription from '@/components/home/SessionDescription';
import SessionCourse from '@/components/home/SessionCourse';
import SessionChallenge from '@/components/home/SessionChallenge';
import SessionFeedback from '@/components/home/SessionFeedback';
// import SessionAboutUs from '@/components/home/SessionAboutUs';
import SessionContact from '@/components/home/SessionContact';

function HomePage() {
  return (
    <div className='bg-white pb-32'>
      <HeroBanner />

      <SessionDescription />

      <SessionCourse />

      <SessionChallenge />

      <SessionFeedback />

      <SessionContact />

      {/*<SessionAboutUs />*/}
    </div>
  );
}

export default HomePage;
