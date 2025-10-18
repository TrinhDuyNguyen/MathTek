'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'iconsax-react';

const FEEDBACK = [
  {
    id: 1,
    name: 'Nam Anh',
    age: 13,
    image: '/images/feedbak/img_23.png',
    color: '#FFE0B2',
    feedback:
      'Từ khi học, mình biết cách tiết kiệm để mua chiếc xe đạp mới. Giờ thì mình đã có đủ tiền rồi! Cảm ơn các thầy cô rất nhiều!',
  },
  {
    id: 2,
    name: 'Minh Thư',
    age: 13,
    image: '/images/feedbak/img_24.png',
    color: '#CDDFFF',
    feedback:
      "Em cứ nghĩ tiền bạc thật phức tạp, nhưng các bài học ở đây giống như những trò chơi vậy. Em đã học được cách phân biệt 'cần' và 'muốn' khi đi siêu thị với mẹ!",
  },
  {
    id: 3,
    name: 'Thảo Chi',
    age: 13,
    image: '/images/feedbak/img_25.png',
    color: '#C8E6C9',
    feedback:
      'Bố mẹ em rất bất ngờ khi em biết cách chi tiêu thông minh. Em còn chia sẻ những điều đã học cho các bạn ở lớp nữa. Ai cũng thấy thích!',
  },
  {
    id: 4,
    name: 'Hoàng Long',
    age: 13,
    image: '/images/feedbak/img_26.png',
    color: '#FFE0B2',
    feedback:
      'Em dùng tiền tiêu vặt một cách bừa bãi trước đây, nhưng giờ em đã biết cách lập kế hoạch. Em còn tự làm ra tiền bằng cách giúp bố mẹ dọn dẹp nhà cửa và bỏ vào ống heo.',
  },
  {
    id: 5,
    name: 'Ngọc Trâm',
    age: 13,
    image: '/images/feedbak/img_27.png',
    color: '#CDDFFF',
    feedback:
      'Trước đây, em hay đòi bố mẹ mua đồ chơi. Bây giờ, em đã hiểu phải dùng tiền của mình để mua những gì thật sự cần. Tiền mừng tuổi năm nay của em đã tăng lên rất nhiều rồi đấy!',
  },
  {
    id: 6,
    name: 'Khánh Chi',
    age: 13,
    image: '/images/feedbak/img_28.png',
    color: '#C8E6C9',
    feedback:
      'Em từng nghĩ đầu tư là việc của người lớn, nhưng khóa học này đã giúp em hiểu các khái niệm cơ bản về đầu tư một cách dễ hiểu nhất. Em cảm thấy tự tin hơn rất nhiều về tương lai của mình.',
  },
];

const SessionFeedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? FEEDBACK.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === FEEDBACK.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentFeedback = FEEDBACK[currentIndex];

  return (
    <div className='bg-white h-max pt-[60px] md:pt-[140px]'>
      <div className='w-full mx-auto px-4 md:px-8 max-w-[1200px]'>
        <div className='flex justify-between flex-col items-center gap-20 lg:flex-row'>
          <div className='max-w-[600px]'>
            <div className='text-primary-main mb-4 w-max flex items-center font-semibold bg-[#5D38DE14] border border-primary-main rounded-full h-12 px-4'>
              Chứng thực
            </div>
            <div className='font-medium text-[32px] lg:text-[48px]'>
              <span className='font-bold'>Cộng Đồng </span>
              Của Chúng Tôi.
            </div>
            <div className='text-lg text-[#212B36]'>
              Cùng lắng nghe những chia sẻ chân thật từ học viên của chúng tôi.
            </div>
            <div className='flex gap-4 mt-4'>
              <div
                onClick={handleBack}
                role='presentation'
                className='rounded-full border-secondary border h-12 w-12 flex items-center justify-center'
              >
                <ArrowLeft size='24' color='#212B36' />
              </div>
              <div
                onClick={handleNext}
                role='presentation'
                className='rounded-full border-secondary border h-12 w-12 flex items-center justify-center'
              >
                <ArrowRight size='24' color='#212B36' />
              </div>
            </div>
          </div>

          {/*Item feedback*/}
          <div className='max-w-[452px] w-[375px] md:w-[452px] max-h-max'>
            <svg
              width='42'
              height='32'
              viewBox='0 0 42 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0 32.0005V18.6081L11.5662 0.000488281H17.5108L10.2092 16.2902L16.0246 16.7409V32.0005H0ZM24.4892 32.0005V18.6081L36.0554 0.000488281H42L34.6338 16.2902L40.5785 16.7409V32.0005H24.4892Z'
                fill='#27CDA6'
              />
            </svg>
            <div className='my-6 text-4xl'>{currentFeedback.feedback}</div>
            <div className='flex items-center gap-4'>
              <img
                className='h-12 w-12 rounded-full border-2 border-white'
                src={currentFeedback.image}
                alt={currentFeedback.name}
              />
              <div className='text-left'>
                <div className='font-semibold'>{currentFeedback.name}</div>
                <div>Học viên</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionFeedback;
