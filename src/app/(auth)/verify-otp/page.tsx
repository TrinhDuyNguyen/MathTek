'use client';

import React, { useRef, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { logoApp } from '@/constants/images';
import Image from 'next/image';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const VerifyOtpPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { verifyMutation, resendOtpMutation } = useAuth();

  const { mutate: verify, isPending, error } = verifyMutation;
  const { mutate: resendOtp, isPending: isResendingOtp } = resendOtpMutation;

  // Redirect nếu không có thông tin user
  React.useEffect(() => {
    if (!user?.id || !user?.email) {
      router.push('/register');
    }
  }, [user, router]);

  // Clear code khi có lỗi để user dễ nhập lại
  React.useEffect(() => {
    if (error) {
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  }, [error]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit khi nhập đủ 6 số
    if (value && index === 5 && user?.id) {
      const fullCode = [...newCode];
      fullCode[index] = value;
      if (fullCode.every(digit => digit !== '')) {
        setTimeout(() => {
          verify({
            userId: user.id!,
            otpCode: fullCode.join(''),
          });
        }, 100); // Delay nhỏ để UI update
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedNumbers = pastedData.replace(/\D/g, '').slice(0, 6); // Chỉ lấy số và tối đa 6 ký tự

    if (pastedNumbers.length > 0) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedNumbers[i] || '';
      }
      setCode(newCode);

      // Focus vào ô cuối có data hoặc ô đầu tiên empty
      const lastFilledIndex = pastedNumbers.length - 1;
      const nextEmptyIndex = newCode.findIndex(digit => digit === '');
      const targetIndex =
        nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(lastFilledIndex, 5);
      inputRefs.current[targetIndex]?.focus();

      // Auto submit nếu paste đủ 6 số
      if (pastedNumbers.length === 6 && user?.id) {
        setTimeout(() => {
          verify({
            userId: user.id!,
            otpCode: pastedNumbers,
          });
        }, 100);
      }
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6 || !user?.id) {
      return;
    }

    verify({
      userId: user.id,
      otpCode: verificationCode,
    });
  };

  const handleResendCode = () => {
    if (user?.email) {
      resendOtp({ email: user.email });
    }
  };

  // Hiển thị loading nếu đang redirect
  if (!user?.id || !user?.email) {
    return <div>Đang chuyển hướng...</div>;
  }

  return (
    <div className='flex h-full bg-white justify-center items-center mx-auto px-6 py-4'>
      <div className='w-full'>
        {/* Banner Image - Hidden on mobile, visible on large screens */}
        <Image src={logoApp} alt='logo app' className='my-4 w-44 mx-auto' />

        {/* Verify Account Form Section */}
        <div className='w-full max-w-md mx-auto'>
          {/* Title and Description */}
          <div className='text-center mb-8 sm:mb-10'>
            <h1 className='text-[#212B36] font-semibold text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6'>
              Xác thực tài khoản
            </h1>
            <p className='text-[#637381] text-sm sm:text-base leading-relaxed'>
              Chúng tôi đã gửi mã xác nhận gồm 6 chữ số qua email. Vui lòng nhập
              mã vào ô bên dưới để xác minh email của bạn.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6 text-center'>
              {error.message || 'Mã xác thực không hợp lệ. Vui lòng thử lại.'}
            </div>
          )}

          {/* Verification Code Inputs */}
          <div className='flex gap-2 sm:gap-3 mb-8 sm:mb-10 justify-center'>
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={el => {
                  inputRefs.current[index] = el;
                }}
                type='text'
                value={digit}
                onChange={e => handleCodeChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className='w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg font-semibold border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500'
                maxLength={1}
                disabled={isPending}
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={isPending || code.some(digit => !digit)}
            className='font-semibold text-white bg-primary-main hover:bg-[#254bdc] disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl w-full h-11 sm:h-12 text-sm sm:text-base transition-colors mb-6'
          >
            {isPending ? (
              <>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                Đang xác thực...
              </>
            ) : (
              'Xác thực tài khoản'
            )}
          </Button>

          {/* Resend Code */}
          <div className='text-center text-sm sm:text-base mb-6 sm:mb-8'>
            <span className='text-[#637381]'>Bạn không nhận được mã? </span>
            <button
              onClick={handleResendCode}
              className='text-primary-main hover:underline cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed font-medium transition-colors'
              disabled={isPending || isResendingOtp}
            >
              {isResendingOtp ? 'Đang gửi...' : 'Gửi lại mã'}
            </button>
          </div>

          {/* Back to Login */}
          <button
            onClick={() => router.push('/login')}
            className='text-[#637381] text-sm sm:text-base hover:text-primary-main cursor-pointer flex items-center justify-center gap-2 w-full transition-colors'
            disabled={isPending}
          >
            <span>←</span>
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
