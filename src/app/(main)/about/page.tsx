'use client';

import React from 'react';
import './index.css';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Book1, Heart, Profile2User } from 'iconsax-react';
import SessionContact from '@/components/home/SessionContact';

const LIST_FOUNDATION = [
  {
    title: 'Lớp học linh hoạt',
    description:
      'Các khóa học được thiết kế phù hợp với nhiều đối tượng và lịch trình, cho phép học viên tự do lựa chọn thời gian và tiến độ học tập phù hợp với bản thân.',
    icon: (
      <div className='h-12 w-12 rounded-full bg-infor/16 flex items-center justify-center'>
        <Heart size={24} color='#0288D1' />
      </div>
    ),
  },
  {
    title: 'Học ở bất cứ đâu',
    description:
      'Chỉ cần có thiết bị kết nối internet, học viên có thể truy cập kho bài giảng phong phú của MathTek mọi lúc, mọi nơi, đảm bảo quá trình học tập không bị gián đoạn.',
    icon: (
      <div className='h-12 w-12 rounded-full bg-secondary-main/16 flex items-center justify-center'>
        <Book1 size={24} color='#FFB145' />
      </div>
    ),
  },
  {
    title: 'Đội ngũ giảng viên giàu kinh nghiệm',
    description:
      'MathTek quy tụ những giảng viên xuất sắc, có nhiều năm kinh nghiệm trong giảng dạy và nghiên cứu, cam kết mang đến những bài giảng chất lượng cao, dễ hiểu và truyền cảm hứng.',
    icon: (
      <div className='h-12 w-12 rounded-full bg-success/16 flex items-center justify-center'>
        <Profile2User size={24} color='#388E3C' />
      </div>
    ),
  },
];

function AboutPage() {
  return (
    <div className='flex flex-col gap-16 lg:gap-[120px]'>
      <div className='relative w-full'>
        <img
          src='/images/about/banner.png'
          alt='Hero Image'
          className='w-full lg:h-auto h-[400px] object-cover'
        />
        <div className='absolute md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full inset-0 flex flex-col items-center justify-center'>
          <div className='w-full lg:w-3/4 flex flex-col items-center justify-center text-center px-4 text-white'>
            <div className='text-[#27CDA6] text-center font-bold text-base lg:text-xl'>
              Tầm nhìn của chúng tôi
            </div>
            <div className='text-white text-lg lg:text-3xl font-bold text-center pt-4'>
              Chúng tôi hình dung một thế giới mà bất kỳ ai, ở bất kỳ đâu cũng
              có khả năng thay đổi cuộc sống của mình thông qua việc học.
            </div>
            <Button
              variant='default'
              className='mt-8 text-center  bg-primary-main h-10 shadow-md hover:shadow-xl hover:shadow-primary-main/20 transition-shadow duration-300 text-white px-4 py-1.5 rounded-[10px]'
            >
              <span className='mr-2 text-white'>Xem thêm về chúng tôi</span>
              <ArrowRight size='24' color='white' />
            </Button>
          </div>
        </div>
      </div>

      <div className='md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full flex flex-col gap-[120px]'>
        <div id='section-2' className='flex gap-16'>
          <div className='flex-col justify-center relative w-1/2 hidden lg:flex'>
            <Image
              src='/images/about/img.png'
              className='absolute top-0 z-0'
              width={250}
              height={490}
              alt='Đọc sách'
            />
            <Image
              src='/images/about/img_1.png'
              className='self-end'
              width={300}
              height={250}
              alt='Đọc sách'
            />
            <Image
              src='/images/about/img_2.png'
              className='self-center pt-16 relative z-10'
              width={400}
              height={490}
              alt='Đọc sách'
            />
          </div>
          <div className='w-full lg:w-1/2 flex flex-col justify-center'>
            <div className='text-primary-main w-fit text-lg font-semibold'>
              Hiểu về chúng tôi
            </div>
            <div className='text-2xl leading-9 lg:text-3xl lg:leading-12 font-bold pb-2'>
              Tìm hiểu về nền tảng học tập MathTek
            </div>
            <div className='text-secondary'>
              MathTek là nền tảng học tập trực tuyến hiện đại, mang đến trải
              nghiệm giáo dục linh hoạt và hiệu quả cho học sinh ở mọi lứa tuổi.
              Với triết lý &#34;học mọi lúc, mọi nơi&#34;, MathTek nổi bật với
              những tính năng sau:
            </div>
            <div className='grid grid-cols-1 w-5/6 pt-8 gap-8'>
              {LIST_FOUNDATION.map(item => (
                <div className='flex gap-4' key={item.title}>
                  {item.icon}
                  <div className='text-lg flex-1'>
                    <div className='font-bold'>{item.title}</div>
                    <div className='pt-2 text-secondary text-justify'>
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant='default'
                className='text-center w-fit bg-primary-main h-12 shadow-md hover:shadow-xl hover:shadow-primary-main/20 transition-shadow duration-300 text-white px-4 py-1.5 rounded-[10px]'
              >
                <span className='mr-2 text-white font-bold'>
                  Học ngay hôm nay
                </span>
                <ArrowRight size='24' color='white' />
              </Button>
            </div>
          </div>
        </div>

        <div
          id='selection-3'
          className='flex gap-8 lg:gap-16 lg:flex-row flex-col'
        >
          <div className='lg:w-1/2 flex flex-col justify-center'>
            <div className='w-fit text-lg font-semibold'>
              Chúng tôi làm việc thế nào
            </div>
            <div className='text-2xl leading-9 lg:text-3xl lg:leading-12 font-bold pb-2 text-primary-main'>
              Xây dựng sự nghiệp và nâng cao cuộc sống của bạn
            </div>
            <div className='text-secondary'>
              Tại MathTek, chúng tôi kết hợp công nghệ hiện đại, phương pháp
              giảng dạy tiên tiến và sự tận tâm của đội ngũ giảng viên để mang
              đến trải nghiệm học tập linh hoạt, cá nhân hóa và hiệu quả cho
              từng học viên.
            </div>
            <Button
              variant='default'
              className='text-center w-fit mt-8 bg-primary-main h-12 shadow-md hover:shadow-xl hover:shadow-primary-main/20 transition-shadow duration-300 text-white px-4 py-1.5 rounded-[10px]'
            >
              <span className='mr-2 text-white font-bold'>
                Học ngay hôm nay
              </span>
              <ArrowRight size='24' color='white' />
            </Button>
          </div>
          <div className='w-full lg:w-1/2 rounded-2xl overflow-hidden'>
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/FJcBThfsJc0?si=UgKLMp0DIGjYOQ-d'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            ></iframe>
          </div>
        </div>

        <div
          id='selection-4'
          className='flex flex-col lg:flex-row gap-5 lg:gap-10'
        >
          <div className='w-full lg:w-1/4 flex flex-col justify-center'>
            <div className='w-fit text-lg font-semibold'>
              Nhận xét và đánh giá
            </div>
            <div className='text-2xl leading-9 lg:text-3xl lg:leading-12 font-bold pb-2 bg-gradient-to-r from-[#BF2F1F] to-[#DCB484] bg-clip-text text-transparent'>
              Học viên nói gì về khóa học của chúng tôi
            </div>
            <div className='text-secondary'>
              Nhận xét của học viên về khóa học họ đã học cùng chúng tôi. Từ
              dùng thử đến đăng ký
            </div>
          </div>
          <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {[1, 2, 3, 4].map(item => (
              <div
                key={item}
                className='p-8 boxShadow rounded-2xl bg-white relative'
              >
                <div className='absolute right-8 top-8'>
                  <svg
                    width='52'
                    height='40'
                    viewBox='0 0 52 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M30.17 39.34L38.43 20.3L31.22 19.6V0H51.94V17.29L37.87 39.34H30.17ZM0 39.34L8.12 20.3L0.98 19.6V0H21.63V17.29L7.56 39.34H0Z'
                      fill='#D14EA8'
                      fillOpacity='0.16'
                    />
                  </svg>
                </div>
                <div className='flex gap-4 items-center'>
                  <div className='h-16 w-16 rounded-full bg-gradient-to-r from-primary-main to-secondary-main p-0.25'>
                    <Image
                      src='/images/about/avatar_1.jpg'
                      alt='Avatar'
                      height={60}
                      width={60}
                      className='rounded-full w-full height-full p-0.25'
                    />
                  </div>
                  <div className='text-lg'>
                    <div className='font-bold'>Adrienne Nolan</div>
                    <div className='text-secondary'>Student</div>
                  </div>
                </div>
                <div className='mt-3 text-base text-secondary'>
                  Like this histudy, vulputate at sapien sit amet,auctor iaculis
                  lorem. In vel hend rerit.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SessionContact />
    </div>
  );
}

export default AboutPage;
