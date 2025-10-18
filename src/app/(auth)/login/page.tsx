'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { logoApp, logoGoogle } from '@/constants/images';
import { loginSchema } from '@/modules/auth/domain/schema';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { LoginFormData } from '@/modules/auth/domain/types';
import { toast } from 'sonner';
import { ERouteTable } from '@/constants/route';
import LoginForm from '@/components/forms/LoginForm';

function LoginPage() {
  const { loginMutation } = useAuth();
  const { mutate: login, isPending, error } = loginMutation;
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', // Validate on blur for better UX
    reValidateMode: 'onChange', // Re-validate on change after first validation
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Trim whitespace from email and password
    const cleanData = {
      email: data.email.trim().toLowerCase(),
      password: data.password.trim(),
    };

    // Validate the cleaned data
    const validation = loginSchema.safeParse(cleanData);
    if (!validation.success) {
      // Set form errors if validation fails
      validation.error.errors.forEach(error => {
        form.setError(error.path[0] as keyof LoginFormData, {
          type: 'manual',
          message: error.message,
        });
      });
      return;
    }
    login(cleanData);
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    toast('Tính năng Google login chưa được triển khai');
  };

  return (
    <div className='h-full bg-white flex justify-center items-center mx-auto px-6 py-4'>
      <div className='w-full'>
        <Image src={logoApp} alt='logo app' className='my-4 w-44 mx-auto' />
        <div>
          <p className='text-[#212B36] text-center font-semibold text-xl md:text-2xl xl:text-3xl mb-3'>
            Chào mừng bạn trở lại
          </p>
          <div className='flex gap-2 justify-center text-sm'>
            <p className='text-[#212B36]'>Bạn chưa phải là thành viên?</p>
            <p
              className='text-primary-main font-semibold cursor-pointer hover:underline'
              onClick={() => router.push(ERouteTable.REGISTER)}
            >
              Đăng ký
            </p>
          </div>
        </div>

        <LoginForm
          onSubmit={onSubmit}
          isPending={isPending}
          error={error}
          form={form}
        />

        <div className='text-center text-[#637381] text-sm my-5'>Hoặc</div>

        <button
          type='button'
          onClick={handleGoogleLogin}
          disabled={isPending}
          className='font-normal text-[#212B36] bg-[#919EAB14] cursor-pointer rounded-xl w-full h-12 flex justify-center items-center gap-2 border-none'
        >
          <Image
            src={logoGoogle}
            alt='Google logo'
            className='h-6 w-6 object-cover'
          />
          Đăng nhập với Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
