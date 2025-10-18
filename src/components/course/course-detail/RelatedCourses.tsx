import React from 'react';
import { useRouter } from 'next/navigation';
import CourseCard from '../course-card';
import { ERouteTable } from '@/constants/route';

interface RelatedCoursesProps {
  relatedCourses: any[];
  currentCourseId: string;
}

export default function RelatedCourses({
  relatedCourses,
  currentCourseId,
}: RelatedCoursesProps) {
  const router = useRouter();

  return (
    <div className='bg-[background: linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 232, 210, 0.15) 49.52%, rgba(205, 223, 255, 0.15) 100%);] w-full px-4 md:px-20 md:py-20 py-14'>
      <div className='flex flex-col gap-4'>
        <div className='text-3xl font-bold text-[#212B36]'>
          Các khóa học liên quan
        </div>
        <div className='md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 flex flex-col mt-4'>
          {relatedCourses
            ?.filter(course => course.id !== currentCourseId)
            ?.slice(0, 5)
            .map(course => (
              <CourseCard
                key={course.id}
                data={course}
                onClick={() =>
                  router.push(`${ERouteTable.COURSE}/${course.id}`)
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}
