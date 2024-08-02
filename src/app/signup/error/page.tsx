'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { SignupErrorPageWrap } from './style';
import Image from 'next/image';
import { Images } from '@globalStyles';

import BackHeader from '@/app/_component/molecule/BackHeader';
import { PATH } from '@/routes/path';
import { css } from '@emotion/react';
import Button from '@/app/_component/atom/button/button';
import { useRouter } from 'next/navigation';

const SignupErrorPage = (): React.JSX.Element => {
  const router = useRouter();

  return (
    <SignupErrorPageWrap>
      <BackHeader title={' '} url={PATH.SIGNUP} color={'white'} />
      <div className="container">
        <div className="top">
          <div className="title">
            아이의 예방접종 내역을
            <br /> 확인할 수 없어요
          </div>
          <div className="subTitle">
            아이의 정보가 잘못되었거나, <br />
            예방접종 내역이 확인되지 않아요.
          </div>
        </div>
        <div className="body">
          <Image
            src={Images.vacgom_pillow}
            alt={'백곰이 베게 들고 있는 사진'}
          />
        </div>
        <div className="bottom">
          <Button
            label={'아이 정보를 다시 입력할게요'}
            size={'large'}
            onClick={() => {
              router.push(PATH.SIGNUP);
            }}
          />
        </div>
      </div>
    </SignupErrorPageWrap>
  );
};
export default SignupErrorPage;
