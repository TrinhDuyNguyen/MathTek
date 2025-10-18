'use client';

import * as React from 'react';
import { StatsCard } from '@/components/admin/StatsCard';
import { DataTable } from '@/components/admin/DataTable';
import { LeaderboardCard } from '@/components/admin/LeaderboardCard';
import { PopularCoursesCard } from '@/components/admin/PopularCoursesCard';
import { Profile2User, Star1, User, Book1 } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { useGetProductList } from '@/modules/admin/hooks/useProductAdmin';
import { useGetChallengeList } from '@/modules/admin/hooks/useChallengeAdmin';
import { useGetReviewList } from '@/modules/admin/hooks/useReviewAdmin';
import { useGetLeaderboard } from '@/modules/admin/hooks/useLeaderboardAdmin';
import { useDashboardStats } from '@/modules/admin/hooks/useDashboardAdmin';

export default function AdminDashboard() {
  const router = useRouter();
  // API hooks
  const { data: productsResponse } = useGetProductList();
  const { data: dashboardStatsResponse } = useDashboardStats();
  const productsData = productsResponse?.data || [];

  // API hooks
  const { data: challengesResponse } = useGetChallengeList({
    search: '',
    status: '',
    type: '',
    page: 1,
    perPage: 100,
  });

  const { data: reviewsResponse } = useGetReviewList({
    page: 1,
    limit: 10,
    search: '',
    rating: undefined,
    status: undefined,
    sort_by: 'created_at',
    sort_order: 'desc',
  });

  const challengesData = challengesResponse?.data || [];
  const reviewsData = reviewsResponse?.data?.data || [];

  // API hook for leaderboard
  const { data: leaderboardResponse } = useGetLeaderboard({ limit: 5 });
  const leaderboardData = leaderboardResponse?.data || [];

  // Stats data from API
  const overview = dashboardStatsResponse?.data?.overview;
  const statsData = [
    {
      title: overview?.totalCourses?.label || 'Tổng khóa học',
      value: overview?.totalCourses?.value?.toString() || '0',
      description: 'Toàn hệ thống',
      icon: Book1,
      iconColor: '#BF2F1F',
    },
    {
      title: overview?.totalUsers?.label || 'Tổng khách hàng',
      value: overview?.totalUsers?.value?.toString() || '0',
      description: 'Toàn hệ thống',
      icon: Profile2User,
      iconColor: '#388E3C',
    },
    {
      title: overview?.newEnrollmentsToday?.label || 'Đăng ký mới hôm nay',
      value: overview?.newEnrollmentsToday?.value?.toString() || '0',
      description: 'Hôm nay',
      icon: User,
      iconColor: '#FF9800',
    },
    {
      title: overview?.totalReviews?.label || 'Đánh giá',
      value: overview?.totalReviews?.avgRating?.toString() || '0',
      description: 'Trung bình',
      icon: Star1,
      iconColor: '#03A9F4',
    },
  ];

  // Sample data for courses table
  const coursesColumns = [
    {
      key: 'thumbnail',
      label: 'Khóa học',
      render: (value: any, row: any) => (
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center'>
            {value ? (
              <img
                src={value}
                alt={value}
                className='w-full h-full object-cover rounded-md'
              />
            ) : (
              <div className='w-full h-full bg-gradient-to-br from-orange-400 to-red-500'></div>
            )}
          </div>
          <div>
            <p className='text-sm font-medium text-gray-900'>{row.title}</p>
            <p className='text-sm text-gray-500 truncate max-w-[120px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[280px] xl:max-w-[320px]'>
              {row.short_description}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Ngày tạo',
      render: (value: any) => (
        <div>
          <p className='text-sm text-gray-900'>{value}</p>
          <p className='text-xs text-gray-500'>06:00 am</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (value: any) => (
        <span
          className={
            value === 'published' ? 'text-green-600' : 'text-yellow-600'
          }
        >
          {value === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
        </span>
      ),
    },
  ];

  // Sample data for reviews table
  const reviewsColumns = [
    {
      key: 'user',
      label: 'Khách hàng',
      render: (value: any) => {
        console.log(value);
        return (
          <div className='flex items-center space-x-3'>
            <img
              src={value.avatar ?? 'https://i.pravatar.cc/150?img=32'}
              alt={value.title}
              className='w-10 h-10 rounded-full object-cover'
            />
            <span className='text-sm text-gray-900'>{value?.fullName}</span>
          </div>
        );
      },
    },
    {
      key: 'comment',
      label: 'Nội dung',
      render: (value: any) => (
        <span className='text-sm text-gray-900 max-w-40'>{value}</span>
      ),
    },
    {
      key: 'rating',
      label: 'Đánh giá',
      render: (value: any) => (
        <div className='flex items-center space-x-1'>
          {[...Array(5)].map((_, i) => (
            <Star1
              key={i}
              variant={i < value ? 'Bold' : 'Outline'}
              className={`w-4 h-4 ${
                i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column - Courses Table */}
        <div className='lg:col-span-2 space-y-6'>
          <DataTable
            title='Khóa học'
            columns={coursesColumns}
            data={productsData?.slice(0, 5)}
            handleSeeAll={() => router.push('/admin/courses')}
            isEditing={false}
          />

          {/* Popular Courses */}
          <PopularCoursesCard
            title='Thử thách phổ biến'
            courses={challengesData.slice(0, 5)}
          />
        </div>

        {/* Right Column - Leaderboard and Reviews */}
        <div className='space-y-6'>
          <LeaderboardCard data={leaderboardData} />

          <DataTable
            title='Đánh giá mới nhất'
            columns={reviewsColumns}
            data={reviewsData?.slice(0, 4)}
            handleSeeAll={() => router.push('/admin/reviews')}
            isEditing={false}
          />
        </div>
      </div>
    </div>
  );
}
