import React, { useState, useEffect } from 'react';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import IconLessonVideo from '../../../../public/icon-svg/lessson/IconLessonVideo';
import IconLessonDoc from '../../../../public/icon-svg/lessson/IconLessonDoc';
import IconLessonQuiz from '../../../../public/icon-svg/lessson/IconLessonQuiz';
import { Lesson, Module } from '@/modules/courses/domain/types';

interface CourseContentProps {
  modules: Module[];
  courseId: string;
}

const CourseContent: React.FC<CourseContentProps> = ({ modules, courseId }) => {
  const router = useRouter();
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    if (modules.length > 0) {
      setExpandedModules(new Set([modules[0].id]));
    }
  }, [modules]);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <IconLessonVideo />;
      case 'content':
        return <IconLessonDoc />;
      case 'quiz':
        return <IconLessonQuiz />;
      default:
        return <IconLessonQuiz />;
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '00:00';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0
      ? `${hours}:${mins.toString().padStart(2, '0')}`
      : `${mins}:00`;
  };

  const handleLessonClick = (lessonId: string) => {
    router.push(`/courses/${courseId}/lessons/${lessonId}`);
  };

  // Helper function to check if lesson is completed (fallback to false if not available)
  const isLessonCompleted = (lesson: Lesson) => {
    return (lesson as any).isCompleted || false;
  };

  // Helper function to check if lesson is previewable (fallback to true if not available)
  const isLessonPreviewable = (lesson: Lesson) => {
    return (lesson as any).isPreviewable !== false;
  };

  if (modules.length === 0) {
    return (
      <div className='text-center text-gray-400'>Hiện chưa có bài học nào!</div>
    );
  }

  return (
    <div className='space-y-2'>
      {modules?.map(module => {
        const isExpanded = expandedModules.has(module.id);
        const totalDuration =
          module.lessons?.reduce(
            (sum, lesson) => sum + (lesson.duration || 0),
            0
          ) || 0;

        return (
          <div
            key={module.id}
            className='border border-gray-200 rounded-lg overflow-hidden'
          >
            {/* Module Header */}
            <div
              className='p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors'
              onClick={() => toggleModule(module.id)}
            >
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <h4 className='font-semibold text-[#212B36]'>
                    {module.title}
                  </h4>
                  <div className='bg-[#919EAB29] px-2 py-1 rounded'>
                    <span className='text-sm text-gray-500 font-semibold'>
                      {formatDuration(totalDuration)}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  {isExpanded ? (
                    <ArrowUp2 size='20' color='#212B36' />
                  ) : (
                    <ArrowDown2 size='20' color='#212B36' />
                  )}
                </div>
              </div>
              {module.short_description && (
                <p className='text-gray-600 text-sm mt-2'>
                  {module.short_description}
                </p>
              )}
            </div>

            {/* Module Lessons */}
            {isExpanded && (
              <div className='bg-white'>
                {module.lessons && module.lessons.length > 0 ? (
                  module.lessons.map(lesson => (
                    <div
                      key={lesson.id}
                      className={`px-4 py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                        isLessonCompleted(lesson) ? 'bg-green-50' : ''
                      }`}
                      onClick={() => handleLessonClick(lesson.id)}
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className='flex-shrink-0'>
                            {isLessonPreviewable(lesson) ? (
                              getLessonIcon(lesson.type)
                            ) : (
                              <Lock size={16} className='text-gray-400' />
                            )}
                          </div>
                          <div className='flex-1'>
                            <h5 className='text-sm font-medium text-[#212B36]'>
                              {lesson.title}
                            </h5>
                            {isLessonCompleted(lesson) && (
                              <span className='text-xs text-green-600 font-medium'>
                                ✓ Hoàn thành
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='text-xs text-gray-500'>
                            {formatDuration(lesson.duration)}
                          </span>
                          {!isLessonPreviewable(lesson) && (
                            <Lock size={14} className='text-gray-400' />
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='px-4 py-3 text-gray-500 text-sm'>
                    Chưa có bài học nào trong module này
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContent;
