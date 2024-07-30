'use client';

import * as React from 'react';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { SingupKakaoWrapper } from './style';
import { css } from '@emotion/react';

import { Icons, Images } from '@/styles';
import { useRouter } from 'next/navigation';
import BackHeader from '@/app/_component/molecule/BackHeader';
import InputForm from '@/app/_component/atom/InputForm';
import { agencyRanges } from '@/constants';
import { OnChangeValueType, ParamsType } from '@/types/globalType';
import {
  checkParamsFilled,
  filterNumericInput,
  LocalStorage,
  SecureLocalStorage,
} from '@/hooks/useUtil';
import BottomButton from '@/app/_component/atom/BottomButton';
import FilterRadioModal from '@/app/_component/organism/filterRadioModal';
import { postSignup } from '@/app/_lib/postSignup';
import WarningToastWrap from '@/app/_component/molecule/WorningToastWrap';
import SkeletonScreen from '@/app/_component/temp/SkeletonScreen';
import useSignupStore from '@/store/signup/babySignup';
import { useSignup } from '@/api/queries/auth/auth-kakao';
import TermsDetail from '@/app/_component/molecule/TermsDetail';
import TermsAllAgree from '@/app/_component/TermsAllAgree';
import Image from 'next/image';
import Button from '@/app/_component/atom/button/button';
import { useBridge } from '@/bridge/hook/useBridge';

interface Values {
  userName: string;
  identity_first: string;
  identity_last: string;
}

export default function SignupKaKao(): React.JSX.Element {
  const handleReTry = () => {
    console.log('handleReTry');
  };
  const { goBack } = useBridge();
  return (
    <SingupKakaoWrapper>
      <BackHeader title={'보호자 본인 인증'} onClickHandler={goBack} />
      <div className="top">
        카카오톡 지갑에서
        <br /> 간편인증을 해주세요.
      </div>
      <div className="container">
        <div className="item">
          <div className="logo">
            <Image src={Images.kakao_logo} alt={'백곰'} />
          </div>
          <div className="text">
            <div className="number">01</div>
            <div className="label">카카오톡 앱에서 메시지 확인</div>
          </div>
        </div>
        <div className="item">
          <div className="logo">
            <Image src={Images.fingerprint_logo} alt={'백곰'} />
          </div>
          <div className="text">
            <div className="number">02</div>
            <div className="label">카카오톡 앱에서 메시지 확인</div>
          </div>
        </div>
        <div className="item">
          <div className="logo">
            <Image src={Images.check_logo} alt={'백곰'} />
          </div>
          <div className="text">
            <div className="number">03</div>
            <div className="label">카카오톡 앱에서 메시지 확인</div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <Button
          label="인증 재요청"
          variant={'OutlineWhite'}
          onClick={handleReTry}
          size={'large'}
        />
      </div>
      <BottomButton filled={false} label={'카카오 인증 완료 후 눌러주세요'} />
    </SingupKakaoWrapper>
  );
}
