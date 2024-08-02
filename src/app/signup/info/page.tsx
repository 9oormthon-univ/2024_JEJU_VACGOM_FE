'use client';

import * as React from 'react';
import { Suspense, useRef, useState } from 'react';
import { SignupWrapper } from './style';
import { css } from '@emotion/react';
import { useRouter } from 'next/navigation';
import BackHeader from '@/app/_component/molecule/BackHeader';
import InputForm from '@/app/_component/atom/InputForm';
import { OnChangeValueType, ParamsType } from '@/types/globalType';
import {
  calculateBirthday,
  checkParamsFilled,
  filterNumericInput,
} from '@/hooks/useUtil';
import BottomButton from '@/app/_component/atom/BottomButton';
import WarningToastWrap from '@/app/_component/molecule/WorningToastWrap';
import SkeletonScreen from '@/app/_component/temp/SkeletonScreen';
import { useAuthKaKao } from '@/api/queries/auth/auth-kakao';
import { useBridge } from '@/bridge/hook/useBridge';
import { PATH } from '@/routes/path';
import useKaKaoStore from '@/store/signup/kakaoAgain';
import TermsAllAgree from '@/app/_component/TermsAllAgree';

interface Values {
  userName: string;
  birthday: string;
  phoneNo: string;
}

export default function Signup(): React.JSX.Element {
  const [params, setParams] = useState<ParamsType>({
    identity_first: '',
    identity_last: '',
    userName: '',
    phoneNumber: '',
  });
  const router = useRouter();
  const onChangeValue: OnChangeValueType = (field, value) => {
    setParams((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const { goBack } = useBridge();

  /**
   *  api 호출
   */
  const { setBirthday, setPhoneNo, setUserName } = useKaKaoStore(
    (state) => state,
  );
  const identityFirstRef = useRef<HTMLInputElement>(null);
  const identityLastRef = useRef<HTMLInputElement>(null);
  const handleNextButtonClick = async () => {
    if (checkParamsFilled(params)) {
      setUserName(params.userName);
      setBirthday(
        calculateBirthday(params?.identity_first, params?.identity_last),
      );
      setPhoneNo(params.phoneNumber);
      router.push(PATH.SIGNUP_TERMS);
    }
  };

  const handleFirstPartChange = (e) => {
    let filteredValue = filterNumericInput(e);
    onChangeValue('identity_first', filteredValue);
    if (filteredValue.length === 6) {
      identityLastRef?.current.focus();
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupWrapper>
        <BackHeader title={'보호자 본인 인증'} onClickHandler={goBack} />
        <div className="top">보호자의 정보를 입력해 주세요</div>
        <div className="container">
          <div className="item">
            <InputForm
              placeholder="이름을 입력해주세요"
              value={params.userName}
              descriptionTop={'이름'}
              type="text"
              onChange={(e) => {
                onChangeValue('userName', e.target.value);
              }}
            />
          </div>
          <div className="item">
            <InputForm
              placeholder="숫자만 입력해 주세요"
              value={params.phoneNumber}
              descriptionTop={'휴대폰 번호'}
              type="text"
              onChange={(e) => {
                let filteredValue = filterNumericInput(e);
                if (filteredValue.length > 11) {
                  filteredValue = filteredValue.slice(0, 11);
                }
                onChangeValue('phoneNumber', filteredValue);
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
                customStyle={css`
                  width: 50%;
                `}
                inputRef={identityFirstRef}
                onChange={handleFirstPartChange}
              />
              <p>-</p>
              <InputForm
                placeholder=""
                value={params.identity_last}
                type="text"
                maxLength={1}
                customStyle={css`
                  width: 60px;
                `}
                inputRef={identityLastRef}
                onChange={(e) => {
                  onChangeValue('identity_last', filterNumericInput(e));
                }}
              />
              <div className="hiden_item">
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>
          </div>
        </div>

        <BottomButton
          filled={checkParamsFilled(params)}
          handleNextButtonClick={handleNextButtonClick}
        />
      </SignupWrapper>
    </Suspense>
  );
}
