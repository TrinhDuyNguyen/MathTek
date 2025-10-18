'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { logoApp } from '@/constants/images';
import { resetPasswordSchema } from '@/modules/auth/domain/schema';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { ResetPasswordFormData } from '@/modules/auth/domain/types';
import { useAuthStore } from '@/stores/useAuthStore';
import UpdatePasswordForm from '@/components/forms/UpdatePasswordForm';
import { ERouteTable } from '@/constants/route';

function UpdatePasswordPage() {
  const { resetPasswordMutation } = useAuth();
  const { mutate: resetPassword, isPending, error } = resetPasswordMutation;
  const router = useRouter();
  const user = useAuthStore(state => state.user);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Check if we're in the correct flow
  useEffect(() => {
    const isFromForgotPassword =
      localStorage.getItem('forgotPasswordFlow') === 'true';
    const storedOtp = localStorage.getItem('resetPasswordOtp');

    if (!isFromForgotPassword || !user?.id || !storedOtp) {
      router.push(ERouteTable.LOGIN);
      return;
    }
  }, [user, router]);

  const onSubmit = (data: ResetPasswordFormData) => {
    // Trim whitespace from password
    const cleanData = {
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
    };

    // Validate the cleaned data
    const validation = resetPasswordSchema.safeParse(cleanData);
    if (!validation.success) {
      // Set form errors if validation fails
      validation.error.errors.forEach(error => {
        form.setError(error.path[0] as keyof ResetPasswordFormData, {
          type: 'manual',
          message: error.message,
        });
      });
      return;
    }
    resetPassword(cleanData);
  };

  // Show loading if not in correct flow
  if (
    !user?.id ||
    localStorage.getItem('forgotPasswordFlow') !== 'true' ||
    !localStorage.getItem('resetPasswordOtp')
  ) {
    return <div>Đang chuyển hướng...</div>;
  }

  return (
    <div className='h-full bg-white flex justify-center items-center mx-auto px-6 py-4'>
      <div className='w-full'>
        <Image src={logoApp} alt='logo app' className='my-4 w-44 mx-auto' />
        <div>
          <p className='text-[#212B36] text-center font-semibold text-xl md:text-2xl xl:text-3xl mb-3'>
            Đặt lại mật khẩu
          </p>
          <div className='flex gap-2 justify-center text-sm'>
            <p className='text-[#212B36] text-center'>
              Vui lòng nhập mật khẩu mới để hoàn tất việc đặt lại mật khẩu.
            </p>
          </div>
        </div>

        <UpdatePasswordForm
          onSubmit={onSubmit}
          isPending={isPending}
          error={error}
          form={form}
        />
      </div>
    </div>
  );
}

export default UpdatePasswordPage;
