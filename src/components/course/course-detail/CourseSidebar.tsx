import React, { useState } from 'react';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface CourseSidebarProps {
  courseData: any;
  onCheckout: () => void;
}

export default function CourseSidebar({
  courseData,
  onCheckout,
}: CourseSidebarProps) {
  const router = useRouter();
  const [showMoreCardProduct, setShowMoreCardProduct] = useState(false);

  const renderStatItem = (label: string, value: string | number) => (
    <div className='flex items-center justify-between gap-2 border-b pb-2 border-dashed border-b-gray-200 mb-4'>
      <div className='text-secondary font-semibold'>{label}</div>
      <div className='bg-[#919EAB29] px-2 rounded'>
        <span className='text-xs text-gray-500 font-semibold'>{value}</span>
      </div>
    </div>
  );

  const handleToggleMoreCardProduct = () => {
    setShowMoreCardProduct(!showMoreCardProduct);
  };

  const handleLessonClick = () => {
    if (courseData?.modules?.[0]?.lessons?.length === 0) {
      toast.error('Hiện chưa có bài học nào!');
    } else {
      router.push(
        `/courses/${courseData?.id}/lessons/${courseData?.modules?.[0]?.lessons?.[0]?.id}`
      );
    }
  };

  return (
    <div className='lg:w-1/4 block md:absolute right-[5%] top-[20%] h-full'>
      <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-200'>
        <div className='w-full h-[250px] relative rounded-lg overflow-hidden mb-8'>
          <img
            src={courseData?.thumbnail}
            alt={courseData?.title}
            style={{ objectFit: 'cover' }}
            className='h-[250px] w-full'
          />
        </div>

        {courseData?.isEnrolled ? (
          <button
            onClick={handleLessonClick}
            className='bg-primary-main text-white w-full py-3 rounded-lg font-medium transition cursor-pointer'
          >
            Vào khóa học
          </button>
        ) : (
          <button
            onClick={onCheckout}
            className='bg-primary-main text-white w-full py-3 rounded-lg font-medium transition cursor-pointer'
          >
            Đăng ký khóa học
          </button>
        )}

        <div className='mt-6'>
          {renderStatItem('Đã đăng ký', courseData?.enrollmentCount || 0)}
          {renderStatItem('Bài giảng', courseData?.lessonCount || 0)}

          {showMoreCardProduct && (
            <>
              {renderStatItem('Bài kiểm tra', courseData?.quizLessonCount || 0)}
              {renderStatItem('Hoàn thành', courseData?.completedCount || 0)}
            </>
          )}

          {((courseData?.quizLessonCount || 0) > 0 ||
            (courseData?.completedCount || 0) > 0) && (
            <button
              onClick={handleToggleMoreCardProduct}
              className='text-primary-main flex items-center gap-2 mt-4 font-medium'
            >
              {!showMoreCardProduct ? 'Hiển thị thêm' : 'Ẩn bớt'}
              {!showMoreCardProduct ? (
                <ArrowDown2 size='20' color='#BF2F1F' />
              ) : (
                <ArrowUp2 size='20' color='#BF2F1F' />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
