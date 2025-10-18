'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { logoApp, logoGoogle } from '@/constants/images';
import { registerSchema } from '@/modules/auth/domain/schema';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { RegisterFormData } from '@/modules/auth/domain/types';
import { toast } from 'sonner';
import { ERouteTable } from '@/constants/route';
import RegisterForm from '@/components/forms/RegisterForm';
import { useAuthStore } from '@/stores/useAuthStore';

function RegisterPage() {
  const { registerMutation } = useAuth();
  const { mutate: register, isPending, error } = registerMutation;
  const router = useRouter();
  const { setEmail } = useAuthStore();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setEmail(data.email);
    register(data);
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    toast('Tính năng Google login chưa được triển khai');
  };

  return (
    <div className='flex h-full bg-white justify-center items-center mx-auto px-6 py-4'>
      <div className='w-full'>
        <Image src={logoApp} alt='logo app' className='my-4 w-44 mx-auto' />
        <div>
          <p className='text-[#212B36] text-center font-semibold text-xl md:text-2xl xl:text-3xl mb-3'>
            Bắt đầu hoàn toàn miễn phí
          </p>
          <div className='flex gap-2 justify-center text-sm'>
            <p className='text-[#212B36]'>Bạn đã có tài khoản?</p>
            <p
              className='text-primary-main font-semibold cursor-pointer hover:underline'
              onClick={() => router.push(ERouteTable.LOGIN)}
            >
              Đăng nhập
            </p>
          </div>
        </div>

        <RegisterForm
          onSubmit={onSubmit}
          isPending={isPending}
          error={error}
          form={form}
        />
        <div className='text-center text-secondary text-sm my-5'>Hoặc</div>
        <button
          type='button'
          onClick={handleGoogleLogin}
          disabled={isPending}
          className='font-normal text-[#212B36] bg-[#919EAB14] cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl w-full h-12 flex justify-center items-center gap-2 border-none'
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

export default RegisterPage;
