import Image from 'next/image';
import IconArrowTopRight from '../../../../public/icon-svg/IconArrowTopRight';

interface CardChallengeProps {
  image: string;
  description: string;
  tag: string;
  onClick: () => void;
  backgroundColor: string;
}

export default function CardChallenge(props: CardChallengeProps) {
  const { image, description, tag, onClick, backgroundColor } = props;
  return (
    <div style={{ backgroundColor: backgroundColor }} className='rounded-4xl'>
      <div className='p-8'>
        <div className='flex items-center flex-col justify-center'>
          <Image alt='Challenge Image' src={image} className='w-[80px] mb-6' />

          <div className='font-bold text-lg'>{tag}</div>
          <div className='mt-3 text-center text-[#637381]'>{description}</div>

          <div
            className='cursor-pointer bg-white h-8 flex items-center px-8 rounded-full mt-3'
            role='presentation'
            onClick={onClick}
          >
            Khám phá
          </div>
        </div>
      </div>
    </div>
  );
}
