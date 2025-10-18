'use client';

import React, { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import CourseContent from '@/components/course/course-content';
import CourseHeader from '@/components/course/course-detail/CourseHeader';
import CourseSidebar from '@/components/course/course-detail/CourseSidebar';
import CourseTabs from '@/components/course/course-detail/CourseTabs';
import CourseOverview from '@/components/course/course-detail/CourseOverview';
import CourseReviews from '@/components/course/course-detail/CourseReviews';
import RelatedCourses from '@/components/course/course-detail/RelatedCourses';
import {
  useCourseDetail,
  useListCourse,
} from '@/modules/courses/hooks/useCourse';
import { useUserCourse } from '@/modules/auth/hooks/useUser';
import { useSubmitReview } from '@/modules/courses/hooks/useReview';
import { useAuthStore } from '@/stores/useAuthStore';

// Types
type TabType = 'overview' | 'content' | 'details' | 'instructor' | 'reviews';

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.id;

  // Hooks
  const { registerLessonMutation } = useUserCourse();
  const { submitReviewMutation } = useSubmitReview();
  const { isAuthenticated } = useAuthStore();
  const { getCourseDetail } = useCourseDetail(slug as string);
  const { getListCourse } = useListCourse({
    category_id: '',
    search: '',
    page: 1,
    perPage: 10,
  });

  // State
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  // Refs
  const overviewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const instructorRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Data
  const courseData = getCourseDetail?.data;
  const courseId = courseData?.id;
  const { mutate: registerLesson } = registerLessonMutation;

  // Handlers
  const scrollToSection = (section: TabType) => {
    setActiveTab(section);

    const refMap = {
      overview: overviewRef,
      content: contentRef,
      details: detailsRef,
      instructor: instructorRef,
      reviews: reviewsRef,
    };

    const ref = refMap[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCheckoutCourse = () => {
    if (courseId) {
      registerLesson(courseId);
    }
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (slug && courseId) {
      submitReviewMutation.mutate(
        {
          productId: courseId,
          data: { rating, comment },
        },
        {
          onSuccess: () => {
            getCourseDetail.refetch();
            setOpenReview(false);
          },
          onError: error => console.error('Error submitting review:', error),
        }
      );
    }
  };

  const handleToggleFullDesc = () => {
    setShowFullDesc(!showFullDesc);
  };

  return (
    <div className='bg-white'>
      {/* Header */}
      <CourseHeader courseData={courseData} />

      {/* Sidebar */}
      <CourseSidebar
        courseData={courseData}
        onCheckout={handleCheckoutCourse}
      />

      {/* Course Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Main Content */}
          <div className='lg:w-2/3'>
            {/* Tabs */}
            <CourseTabs activeTab={activeTab} onTabChange={scrollToSection} />

            {/* Tab Content - Hiển thị tất cả sections */}
            <div ref={overviewRef}>
              <CourseOverview courseData={courseData} />
            </div>

            <div
              ref={contentRef}
              className='bg-white p-6 rounded-lg shadow border border-gray-100 mb-8'
            >
              <h3 className='text-xl font-bold mb-6 text-[#212B36]'>
                Nội dung khóa học
              </h3>
              <CourseContent
                modules={courseData?.modules || []}
                courseId={courseId || ''}
              />
            </div>

            <div ref={reviewsRef}>
              <CourseReviews
                courseData={courseData}
                openReview={openReview}
                onOpenReviewChange={setOpenReview}
                onReviewSubmit={handleReviewSubmit}
                isLoading={submitReviewMutation.isPending}
                error={submitReviewMutation.error?.message}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      <RelatedCourses
        relatedCourses={getListCourse?.data?.data || []}
        currentCourseId={slug as string}
      />
    </div>
  );
}
