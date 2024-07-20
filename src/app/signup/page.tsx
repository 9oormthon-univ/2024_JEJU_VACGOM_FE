'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

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
import { PATH } from '@/routes/path';
import { useForm } from 'react-hook-form';
import InputForm from '@/app/_component/atom/InputForm';
import { Icons } from '@/styles';
import { css } from '@emotion/react';

export default function Signup(): React.JSX.Element {
  const router = useRouter();
  const [params, setParam] = useState({
    userName: '',
    identity_first: '',
    identity_last: '',
  });
  const onChangeValue: OnChangeValueType = (field, value) => {
    setParam((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleClick = () => {
    if (checkParamsFilled(params)) {
      //api 요청 및 라우팅
    } else {
      // 에러 표기
    }
  };

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
        handleNextButtonClick={() => {
          handleClick();
        }}
      />
    </SignupWrapper>
  );
}
