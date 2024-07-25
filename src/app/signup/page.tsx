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
import { useAccessToken } from '@/bridge/hook';
import { setSession } from '@/api/api_utils';
import { PATH } from '@/routes/path';
import ViewingPage from '@/app/_component/temp/Viewing';

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

  //초기 ACCESS token 설정
  useEffect(() => {
    console.log(accessToken);
    setSession(accessToken);
  }, [accessToken]);

  const onChangeValue: OnChangeValueType = (field, value) => {
    setParam((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const onSubmit = () => {
    if (checkParamsFilled(params)) {
      // API 요청 및 라우팅
      router.push(PATH.SIGNUP_ERROR); // 일단 해둠
      // mutate(
      //   {
      //     userName: params.userName,
      //     identity: params.identity_first + params.identity_last,
      //   },
      //   {
      //     onSuccess: () => {
      //       router.push(PATH.SIGNUP_INFO); // 성공 시 라우팅
      //     },
      //     onError: () => {
      //       // 에러 처리
      //       router.push(PATH.SIGNUP_ERROR); // 일단 해둠
      //     },
      //   },
      // );
    } else {
      // 에러 표기
    }
  };

  if (isLoading) {
    return <ViewingPage backUrl={PATH.SIGNUP} userName={params?.userName} />;
  }

  return (
    <SignupWrapper>
      <BackHeader title={' '} url={'/'} />
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

      <BottomButton
        filled={checkParamsFilled(params)}
        handleNextButtonClick={onSubmit}
      />
    </SignupWrapper>
  );
}
