'use client';

import * as React from 'react';
import { SignupDoneWrap } from './style';
import Image from 'next/image';
import { css } from '@emotion/react';

import { Colors, Icons, Images } from '@/styles';
import { Fragment, Suspense, useEffect, useState } from 'react';
import BackHeader from '@/app/_component/molecule/BackHeader';
import BottomButton from '@/app/_component/atom/BottomButton';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import DonePage from '@/app/_component/temp/DonePage';
import Button from '@/app/_component/atom/button/button';
import Link from 'next/link';
import { useQueryParams } from '@/hooks/useParam';
import { OnChangeValueType, ParamsType } from '@/types/globalType';
import { PATH } from '@/routes/path';
import { postRegister } from '@/app/_lib/postRegister';
import { postLogin } from '@/app/_lib/postLogin';
import {
  checkParamsFilled,
  LocalStorage,
  SecureLocalStorage,
} from '@/hooks/useUtil';
import { useBridge } from '@/bridge/hook/useBridge';

export default function KakaoErrorPage(): React.JSX.Element {
  const router = useRouter();
  const { goBack } = useBridge();

  return (
    <SignupDoneWrap>
      <BackHeader onClickHandler={goBack} />
      <div className="padding">
        <DonePage
          title={'인증에 실패했어요'}
          content_top={'올바른 정보를 입력했는지 확인하고,'}
          content_bottom={'다시 시도해 주세요.'}
          src_success={false}
        />
      </div>
      <BottomButton
        label={'다시 인증하기'}
        filled={true}
        handleNextButtonClick={() => {
          router.push(PATH.SIGNUP_INFO);
        }}
      />
    </SignupDoneWrap>
  );
}
