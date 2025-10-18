import React, { useState } from 'react';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import IconTickGreen from '../../../../public/icon-svg/IconTickGreen';
import he from 'he';

interface CourseOverviewProps {
  courseData: any;
}

const LEARNING_OBJECTIVES = [
  'Hiểu rõ sự khác biệt giữa UI và UX.',
  'Nắm vững các nguyên tắc thiết kế giao diện và trải nghiệm người dùng.',
  'Thiết kế các wireframe, prototype và mockup chuyên nghiệp.',
  'Sử dụng thành thạo các công cụ thiết kế phổ biến như Figma, Adobe XD, Sketch.',
  'Hiểu quy trình nghiên cứu người dùng và thử nghiệm sản phẩm.',
  'Thực hành xây dựng sản phẩm thực tế từ ý tưởng đến sản phẩm hoàn thiện.',
  'Biết cách trình bày và giao tiếp ý tưởng thiết kế với đội ngũ phát triển và khách hàng.',
];

export default function CourseOverview({ courseData }: CourseOverviewProps) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  console.log(courseData?.learning_outcomes.split(','));

  const renderLearningObjective = (objective: string) => (
    <div className='flex items-start gap-2' key={objective}>
      <div className='flex-shrink-0'>
        <IconTickGreen />
      </div>
      <p className='text-[#637381]'>{objective}</p>
    </div>
  );

  const handleToggleFullDesc = () => {
    setShowFullDesc(!showFullDesc);
  };

  return (
    <>
      {/* Learning Objectives */}
      <div className='bg-white p-6 rounded-lg shadow border border-gray-100 mb-8'>
        <h3 className='text-xl text-[#212B36] font-bold mb-6'>
          Những gì bạn sẽ học được
        </h3>
        {courseData?.learning_outcomes && (
          <div className='grid md:grid-cols-2 gap-4'>
            {courseData?.learning_outcomes.split(',') &&
              courseData?.learning_outcomes?.split(',')?.length > 0 &&
              courseData?.learning_outcomes
                .split(',')
                .map(renderLearningObjective)}
          </div>
        )}
      </div>

      {/* Requirements */}
      <div className='bg-white p-6 rounded-lg border shadow border-gray-100 mb-8'>
        <h3 className='text-xl font-bold mb-6 text-[#212B36]'>Yêu cầu</h3>
        <div className='space-y-2'>
          {courseData?.requirements && (
            <div
              className='text-[#637381]'
              dangerouslySetInnerHTML={{
                __html: he.decode(courseData?.requirements),
              }}
            />
          )}
        </div>
      </div>

      {/* Description */}
      <div className='bg-white p-6 rounded-lg border shadow border-gray-100 mb-8'>
        <h3 className='text-xl font-bold mb-6 text-[#212B36]'>Mô tả</h3>
        <div className={`space-y-4 ${!showFullDesc ? 'line-clamp-3' : ''}`}>
          {courseData?.description && (
            <div
              className='text-[#637381]'
              dangerouslySetInnerHTML={{
                __html: he.decode(courseData?.description),
              }}
            />
          )}
        </div>
        {courseData?.description && courseData.description.length > 200 && (
          <button
            onClick={handleToggleFullDesc}
            className='text-primary-main flex items-center gap-2 mt-4 font-medium'
          >
            {!showFullDesc ? 'Hiển thị thêm' : 'Ẩn bớt'}
            {!showFullDesc ? (
              <ArrowDown2 size='20' color='#BF2F1F' />
            ) : (
              <ArrowUp2 size='20' color='#BF2F1F' />
            )}
          </button>
        )}
      </div>
    </>
  );
}
