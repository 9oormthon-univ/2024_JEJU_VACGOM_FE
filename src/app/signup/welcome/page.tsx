'use client';

import * as React from 'react';
import { SignupErrorPageWrap } from './style';

import BackHeader from '@/app/_component/molecule/BackHeader';
import { PATH } from '@/routes/path';
import Button from '@/app/_component/atom/button/button';
import { useRouter } from 'next/navigation';
import { useBridge } from '@/bridge/hook/useBridge';

const SignupErrorPage = (): React.JSX.Element => {
  const router = useRouter();
  const { goHome } = useBridge();

  return (
    <SignupErrorPageWrap>
      <BackHeader
        title={' '}
        url={PATH.SIGNUP}
        color={'white'}
        nonicon={true}
      />
      <div className="container">
        <div className="top">
          <div className="cate">정보 조회 완료</div>
          <div className="title">환영합니다!</div>
          <div className="subTitle">지금 바로, 백곰을 시작해 보세요!</div>
        </div>
        <div className="body">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffedf4cdb87ccc9e401bdf99e8d9219b1160eed52b9582b4cc61008ac4077b04?"
            className="mt-7 w-full aspect-[0.92]"
          />
        </div>
        <div className="bottom">
          <Button
            label={'백곰 시작하기'}
            size={'large'}
            onClick={() => {
              goHome();
            }}
          />
        </div>
      </div>
    </SignupErrorPageWrap>
  );
};
export default SignupErrorPage;
