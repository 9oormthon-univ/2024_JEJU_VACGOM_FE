'use client';

import * as React from 'react';
import { SingupKakaoWrapper } from './style';

import { useEffect, useState } from 'react';
import { Images } from '@/styles';
import BackHeader from '@/app/_component/molecule/BackHeader';
import BottomButton from '@/app/_component/atom/BottomButton';
import Image from 'next/image';
import Button from '@/app/_component/atom/button/button';
import { useBridge } from '@/bridge/hook/useBridge';
import { useAuthKaKaoVerify } from '@/api/queries/auth/auth-kakao-verify';
import useSignupStore from '@/store/signup/babySignup';
import useKaKaoStore from '@/store/signup/kakaoAgain';
import WarningToastWrap from '@/app/_component/molecule/WorningToastWrap';
import { useAuthKaKao } from '@/api/queries/auth/auth-kakao';
import useParentsStore from '@/store/vaccine/parents';

interface Values {
  userName: string;
  identity_first: string;
  identity_last: string;
}

export default function SignupKaKao(): React.JSX.Element {
  const { babyName, babySsn } = useSignupStore((state) => state);
  const { birthday, userName, phoneNo } = useKaKaoStore((state) => state);
  const { mutate: kakaoMutate, isLoading: isKakaoLoading } =
    useAuthKaKao<Values>();

  const { mutate: kakaoVerifyMutate, isLoading: isVerifyLoading } =
    useAuthKaKaoVerify<Values>();
  const { goBack } = useBridge();
  const [isDone, setIsDone] = useState(false);
  console.log(birthday, userName, phoneNo);
  const [errormessage, setErrormessage] = useState<string>('');

  const handleReTry = () => {
    kakaoMutate(
      {
        birthday: birthday,
        userName: userName,
        phoneNo: phoneNo,
      },
      {
        onSuccess: (data) => {
          setIsDone(false);
        },
        onError: (error) => {
          setErrormessage(error.message);
        },
      },
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isDone]);

  const handleDone = () => {
    kakaoVerifyMutate(
      {
        babyName: babyName,
        userName: userName,
      },
      {
        onSuccess: (data) => {
          console.log('onSuccess', data);
        },
        onError: (error) => {
          if (error.data.success === false) {
            setErrormessage(error.data.message);
          } else {
            setErrormessage(error.message);
          }
        },
      },
    );
  };

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
      <WarningToastWrap
        errorMessage={errormessage}
        setErrorMessage={setErrormessage}
      />
      <BottomButton
        filled={isDone}
        label={'카카오 인증 완료 후 눌러주세요'}
        handleNextButtonClick={handleDone}
      />
    </SingupKakaoWrapper>
  );
}
