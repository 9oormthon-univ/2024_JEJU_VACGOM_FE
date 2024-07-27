'use client';

import * as React from 'react';
import { Suspense, useEffect, useState } from 'react';

import { SignupWrapper } from './style';

import BackHeader from '@/app/_component/molecule/BackHeader';
import JoinTemplate from '@/app/_component/temp/JoinTemplate';
import BottomButton from '@/app/_component/atom/BottomButton';
import { OnChangeValueType } from '@/types/globalType';
import * as queryString from 'querystring';
import { useRouter } from 'next/navigation';
import { fetchAccessToken } from '@/hooks/useKakaoLogin';
import {
  checkParamsFilled,
  filterNumericInput,
  LocalStorage,
} from '@/hooks/useUtil';

import InputForm from '@/app/_component/atom/InputForm';

import {
  useChildVaccination,
  useSignIn,
} from '@/api/queries/auth/child-vaccination';
import { useAccessToken } from '@/bridge/hook/useAccessToken';
import { setSession } from '@/api/api_utils';
import { PATH } from '@/routes/path';
import ViewingPage from '@/app/_component/temp/Viewing';
import { useBridge } from '@/bridge/hook/useBridge';
import WarningToastWrap from '@/app/_component/molecule/WorningToastWrap';
import useSignupStore from '@/store/signup/babySignup';

interface Values {
  userName: string;
  identity_first: string;
  identity_last: string;
}

export default function Signup(): React.JSX.Element {
  const router = useRouter();
  const [params, setParam] = useState({
    userName: '',
    identity_first: '',
    identity_last: '',
  });
  const { mutate, isLoading } = useChildVaccination<Values>();
  const { accessToken } = useAccessToken();
  const { nickName, goBack } = useBridge();
  const [errormessage, setErrormessage] = useState<string>('');
  //초기 ACCESS token 설정

  useEffect(() => {
    setSession(accessToken);
  }, [accessToken]);
  const onChangeValue: OnChangeValueType = (field, value) => {
    setParam((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const { setbabyName, setBabySsn } = useSignupStore((state) => state);

  const onSubmit = () => {
    if (nickName === null) {
      setErrormessage('닉네임이 설정되지 않았습니다.');
    }
    if (checkParamsFilled(params)) {
      // 값 전역 저장
      setbabyName(params.userName);
      setBabySsn(params.identity_first + params.identity_last);
      // API 요청 및 라우팅
      mutate(
        {
          nickname: nickName,
          babyName: params.userName,
          babySsn: params.identity_first + params.identity_last,
        },
        {
          onSuccess: () => {
            router.push(PATH.SIGNUP_INFO); // 성공 시 라우팅
          },
          onError: (error) => {
            // 에러 처리
            if (error.success === false) {
              // 서버가 핸들링한 에러
              setErrormessage(error.data.message);
            } else {
              // 서버에러
              setErrormessage(error.errorMessage);
              router.push(PATH.SIGNUP_ERROR);
            }
          },
        },
      );
    } else {
      setErrormessage('값을 모두 입력해주세요.');
    }
  };

  if (isLoading) {
    return <ViewingPage backUrl={PATH.SIGNUP} userName={params?.userName} />;
  }

  return (
    <SignupWrapper>
      <BackHeader title={' '} onClickHandler={goBack} />
      <div className="top">우리 아이 정보를 입력해 주세요</div>
      <div className="container">
        <div className="item">
          <InputForm
            placeholder="이름"
            value={params.userName}
            descriptionTop={'이름'}
            type="text"
            onChange={(e) => {
              onChangeValue('userName', e.target.value);
            }}
          />
        </div>
        <div className="item">
          <div className="input_title">주민등록번호</div>
          <div className="item_row">
            <InputForm
              placeholder="앞자리 입력"
              value={params.identity_first}
              type="text"
              maxLength={6}
              onChange={(e) => {
                let filteredValue = filterNumericInput(e);
                onChangeValue('identity_first', filteredValue);
              }}
            />
            <p>-</p>
            <InputForm
              placeholder="뒷자리 입력"
              value={params.identity_last}
              type="password"
              maxLength={7}
              onChange={(e) => {
                let filteredValue = filterNumericInput(e);
                onChangeValue('identity_last', filteredValue);
              }}
            />
          </div>
        </div>
      </div>
      <WarningToastWrap
        errorMessage={errormessage}
        setErrorMessage={setErrormessage}
      />
      <BottomButton
        filled={checkParamsFilled(params)}
        handleNextButtonClick={onSubmit}
      />
    </SignupWrapper>
  );
}
