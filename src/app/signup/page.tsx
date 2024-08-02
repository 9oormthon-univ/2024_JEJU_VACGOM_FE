'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { SignupWrapper } from './style';

import BackHeader from '@/app/_component/molecule/BackHeader';
import BottomButton from '@/app/_component/atom/BottomButton';
import { OnChangeValueType } from '@/types/globalType';
import { useRouter } from 'next/navigation';
import { checkParamsFilled, filterNumericInput } from '@/hooks/useUtil';

import InputForm from '@/app/_component/atom/InputForm';

import { useChildVaccination } from '@/api/queries/auth/child-vaccination';
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
  const identityFirstRef = useRef<HTMLInputElement>(null);
  const identityLastRef = useRef<HTMLInputElement>(null);

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

  const handleFirstPartChange = (e) => {
    let filteredValue = filterNumericInput(e);
    onChangeValue('identity_first', filteredValue);
    if (filteredValue.length === 6) {
      identityLastRef?.current.focus();
    }
  };
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
            // case 1성공
            router.push(PATH.SIGNUP_WELCOME);
          },
          onError: (error) => {
            console.log(error);
            // case 3 확인할 수 없다
            if (error.data.code === 'CHILD_REGISTRATION_FAILED') {
              router.push(PATH.SIGNUP_ERROR);
            } // case 2 이미 가입한 유저
            else if (error.data.code === 'CHILD_ALREADY_REGISTERED') {
              router.push(PATH.SIGNUP_INFO);
              setErrormessage(error.data.message);
            } else {
              // 서버에러
              setErrormessage(error.errorMessage);
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
              inputRef={identityFirstRef}
              onChange={handleFirstPartChange}
            />
            <p>-</p>
            <InputForm
              placeholder="뒷자리 입력"
              value={params.identity_last}
              type="password"
              maxLength={7}
              inputRef={identityLastRef}
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
