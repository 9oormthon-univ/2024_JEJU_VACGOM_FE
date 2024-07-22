'use client';

import * as React from 'react';
import { SignupErrorPageWrap } from './style';
import Image from 'next/image';
import { Colors, Icons, Images } from '@globalStyles';
import { SecureLocalStorage } from '@/hooks/useUtil';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import BackHeader from '@/app/_component/molecule/BackHeader';

type props = { backUrl: string; userName?: string | null };

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const SignupErrorPage: React.FC<props> = ({ backUrl, userName }: props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1,
      );
    }, 50); // 주기를 20밀리초로 설정하여 1단위로 증가

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <SignupErrorPageWrap>
      <BackHeader title={' '} url={backUrl} color={'white'} />
      <div className="container"></div>
    </SignupErrorPageWrap>
  );
};

export default SignupErrorPage;
