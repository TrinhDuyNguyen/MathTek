import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HeaderSection } from '@/components/common/HeaderSection';

const FAQS_LIST = [
  {
    question: 'MathTek là gì?',
    answer:
      'MathTek là nền tảng giáo dục trực tuyến cung cấp các khóa học kỹ năng và học thuật dành riêng cho trẻ em, với phương pháp học tập hiện đại, tương tác và phù hợp với từng độ tuổi.',
  },
  {
    question: 'Các khóa học phù hợp với độ tuổi nào?',
    answer: 'Chưa có nội dung',
  },
  {
    question: 'Học theo hình thức nào?',
    answer: 'Chưa có nội dung',
  },
  {
    question: 'Mua khóa học một lần có học mãi mãi được không?',
    answer: 'Chưa có nội dung',
  },
  {
    question: 'Có cần cha mẹ kèm học cùng không?',
    answer: 'Chưa có nội dung',
  },
  {
    question: 'Có thể học thử trước khi mua không?',
    answer: 'Chưa có nội dung',
  },
  {
    question: 'Có cấp chứng chỉ sau khi hoàn thành không?',
    answer: 'Chưa có nội dung',
  },
  {
    question: 'Mỗi khóa học kéo dài bao lâu?',
    answer: 'Chưa có nội dung',
  },
  {
    question: 'Nếu có thắc mắc khi học thì làm sao?',
    answer: 'Chưa có nội dung',
  },
  {
    question: 'Các khóa học bao gồm những lĩnh vực nào?',
    answer: 'Chưa có nội dung',
  },
];

function FaqPage() {
  return (
    <div className='bg-white'>
      <HeaderSection title='FAQS' label='Trang chủ' subLabel='FAQS' />
      <div className='py-12 lg:py-32 px-6 md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full flex flex-col items-center justify-center h-full'>
        <div className='font-bold text-2xl leading-9 lg:text-3xl lg:leading-12 text-[#212B36]'>
          Những câu hỏi thường gặp
        </div>
        <Accordion
          type='single'
          collapsible
          className='lg:w-[60%] mt-6 lg:mt-10'
        >
          {FAQS_LIST.map(item => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className='text-[#212B36] bg-[#F4F6F8]'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-[#212B36]'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FaqPage;
