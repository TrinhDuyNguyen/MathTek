'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { logoApp } from '@/constants/images';
import { forgotPasswordSchema } from '@/modules/auth/domain/schema';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { ForgotPasswordFormData } from '@/modules/auth/domain/types';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';

function ForgotPasswordPage() {
  const { forgotPasswordMutation } = useAuth();
  const { mutate: forgotPassword, isPending, error } = forgotPasswordMutation;

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    // Trim whitespace from email
    const cleanData = {
      email: data.email.trim().toLowerCase(),
    };

    // Validate the cleaned data
    const validation = forgotPasswordSchema.safeParse(cleanData);
    if (!validation.success) {
      // Set form errors if validation fails
      validation.error.errors.forEach(error => {
        form.setError(error.path[0] as keyof ForgotPasswordFormData, {
          type: 'manual',
          message: error.message,
        });
      });
      return;
    }
    forgotPassword(cleanData);
  };

  return (
    <div className='h-full bg-white flex justify-center items-center mx-auto px-6 py-4'>
      <div className='w-full'>
        <Image src={logoApp} alt='logo app' className='my-4 w-44 mx-auto' />
        <div>
          <p className='text-[#212B36] text-center font-semibold text-xl md:text-2xl xl:text-3xl mb-3'>
            Quên mật khẩu
          </p>
          <div className='flex gap-2 justify-center text-sm'>
            <p className='text-[#212B36] text-center'>
              Vui lòng nhập địa chỉ email được liên kết với tài khoản của bạn và
              chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.
            </p>
          </div>
        </div>

        <ForgotPasswordForm
          onSubmit={onSubmit}
          isPending={isPending}
          error={error}
          form={form}
        />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
