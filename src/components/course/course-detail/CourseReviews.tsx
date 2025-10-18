import React, { useState } from 'react';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { ReviewDialog } from '../ReviewDialog';
import { useAuthStore } from '@/stores/useAuthStore';
import { toast } from 'sonner';

interface CourseReviewsProps {
  courseData: any;
  openReview: boolean;
  onOpenReviewChange: (open: boolean) => void;
  onReviewSubmit: (rating: number, comment: string) => void;
  isLoading: boolean;
  error?: string;
}

export default function CourseReviews({
  courseData,
  openReview,
  onOpenReviewChange,
  onReviewSubmit,
  isLoading,
  error,
}: CourseReviewsProps) {
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const { user } = useAuthStore();

  console.log(user);

  const renderRatingBar = (stars: number, percentage: number) => (
    <div className='flex items-center gap-2'>
      <div className='flex text-[#FFB145]'>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < stars ? 'text-[#FFB145]' : 'text-gray-300'}
          >
            ★
          </span>
        ))}
      </div>
      <div className='flex-1 h-2 bg-gray-200 rounded-full'>
        <div
          className='h-2 bg-[#FFB145] rounded-full'
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className='w-10 text-sm text-gray-600 text-right'>{percentage}%</div>
    </div>
  );

  const renderReview = (review: any, index: number) => (
    <div
      key={review.id}
      className={`border-b border-dashed pb-3 ${!showMoreReviews && index === 0 ? 'border-b-0 pb-0' : ''}`}
    >
      <div className='flex items-start gap-3 mb-3'>
        <div className='w-24 h-24 rounded-lg overflow-hidden relative flex-shrink-0'>
          <img
            src={review.user?.avatar || '/images/common/avatar-kid.png'}
            alt={review.user?.fullName || 'User'}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <h4 className='font-semibold text-[#212B36]'>
            {review.user?.fullName || 'Anonymous'}
          </h4>
          <div className='flex text-[#FFB145] mt-1'>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < review.rating ? 'text-[#FFB145]' : 'text-gray-300'
                }
              >
                ★
              </span>
            ))}
          </div>
          <p className='text-gray-600'>{review.comment}</p>
        </div>
      </div>
    </div>
  );

  const handleToggleMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews);
  };

  return (
    <>
      {/* Reviews Section */}
      <div className='bg-white p-6 rounded-lg border shadow border-gray-100 mb-8'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl font-bold mb-6 text-[#212B36]'>Đánh giá</h3>
          <Button
            onClick={() => {
              if (
                courseData?.reviews?.filter(
                  (it: any) => it?.user_id === user?.id
                )?.length > 0
              ) {
                toast.error('Bạn đã đánh giá khoá học này rồi');
              } else {
                onOpenReviewChange(true);
              }
            }}
            className='flex py-2.5 px-4 border-none shadow bg-[#919EAB14]/8 rounded-[10px]'
            size='lg'
            variant='outline'
          >
            <Edit size='20' color='#27272A' />
            <div className='text-sm font-semibold text-[#212B36]'>
              Viết đánh giá
            </div>
          </Button>
          <ReviewDialog
            open={openReview}
            onOpenChange={onOpenReviewChange}
            isLoading={isLoading}
            error={error}
            onSubmit={onReviewSubmit}
          />
        </div>

        <div className='flex flex-col md:flex-row gap-8'>
          <div className='bg-[#FFF8EE] p-6 rounded-lg text-center min-w-[200px]'>
            <div className='text-6xl font-bold text-[#212B36] mb-2'>
              {courseData?.averageRating}
            </div>
            <div className='text-sm text-gray-500'>
              {courseData?.reviewCount}
              <br />
              Lượt đánh giá
            </div>
          </div>

          <div className='flex-1 space-y-3'>
            {renderRatingBar(5, courseData?.ratingBreakdown?.[5] || 0)}
            {renderRatingBar(4, courseData?.ratingBreakdown?.[4] || 0)}
            {renderRatingBar(3, courseData?.ratingBreakdown?.[3] || 0)}
            {renderRatingBar(2, courseData?.ratingBreakdown?.[2] || 0)}
            {renderRatingBar(1, courseData?.ratingBreakdown?.[1] || 0)}
          </div>
        </div>
      </div>

      {/* Featured Reviews */}
      <div className='bg-white p-6 rounded-lg border shadow border-gray-100 mb-8'>
        <h3 className='text-xl font-bold mb-6 text-[#212B36]'>Đánh giá</h3>
        {courseData?.reviews && courseData.reviews.length > 0 ? (
          <div className='space-y-3'>
            {courseData?.reviews
              ?.slice(0, showMoreReviews ? undefined : 1)
              .map(renderReview)}
          </div>
        ) : (
          <div className='text-center text-gray-500'>
            Hiện chưa có đánh giá nào!
          </div>
        )}

        {courseData?.reviews && courseData.reviews.length > 1 && (
          <button
            onClick={handleToggleMoreReviews}
            className='text-primary-main flex items-center gap-2 mt-6 font-medium'
          >
            {!showMoreReviews ? 'Hiển thị thêm' : 'Ẩn bớt'}
            {!showMoreReviews ? (
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
