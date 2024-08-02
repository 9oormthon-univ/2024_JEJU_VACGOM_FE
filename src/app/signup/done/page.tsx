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
import { LocalStorage, SecureLocalStorage } from '@/hooks/useUtil';
import ParentsVerify from '@/store/signup/ParentsVerify';
import babySignup from '@/store/signup/babySignup';
import useParentsStore from '@/store/vaccine/parents';

export default function SignupDone(): React.JSX.Element {
  const router = useRouter();
  const { parentsId, parentsName } = useParentsStore((state) => state);
  const { babyName } = babySignup();

  return (
    <SignupDoneWrap>
      <div className="padding">
        <DonePage
          title={`배우자에게 등록된 자녀예요!`}
          content_top={`${babyName}님은 예방접종 도우미에서`}
          content_bottom={`${parentsId}(${parentsName})님의 자녀로 등록되어 있어요.`}
          plus={`백곰 가입 링크를 보내고 초대를 요청해 보세요!`}
        />
        <Button
          label={'백곰 가입 링크 보내기'}
          size={'large'}
          customStyle={css`
            width: 100%;
          `}
          onClick={() => {
            router.push(PATH.LOGIN);
          }}
        />
      </div>
    </SignupDoneWrap>
  );
}
