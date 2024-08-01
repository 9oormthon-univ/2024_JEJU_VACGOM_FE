'use client';

import * as React from 'react';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { SignupWrapper } from './style';
import { css } from '@emotion/react';

import { Icons } from '@/styles';
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
import { useAuthKaKao, useSignup } from '@/api/queries/auth/auth-kakao';
import TermsDetail from '@/app/_component/molecule/TermsDetail';
import TermsAllAgree from '@/app/_component/TermsAllAgree';
import { useBridge } from '@/bridge/hook/useBridge';
import { PATH } from '@/routes/path';
import useKaKaoStore from '@/store/signup/kakaoAgain';
import { calculateBirthday } from '@/hooks/useUtil';

interface Values {
  userName: string;
  identity_first: string;
  identity_last: string;
}

export default function Signup(): React.JSX.Element {
  const [params, setParams] = useState<ParamsType>({
    identity_first: '',
    identity_last: '',
    userName: '',
    phoneNumber: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const onChangeValue: OnChangeValueType = (field, value) => {
    setParams((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const [termSelected, setSelected] = useState(false);
  const handleSelected = () => {
    setSelected(!termSelected);
  };
  const { goBack } = useBridge();

  /**
   *  api 호출
   */
  const { mutate, isLoading } = useAuthKaKao<Values>();
  const [errormessage, setErrormessage] = useState(''); // 로딩 상태 추가

  console.log(calculateBirthday(params.identity_first, params.identity_last));

  const handleNextButtonClick = async () => {
    if (checkParamsFilled(params)) {
      mutate(
        {
          birthday: calculateBirthday(
            params?.identity_first,
            params?.identity_last,
          ),
          userName: params.userName,
          phoneNo: params.phoneNumber,
        },
        {
          onSuccess: () => {
            router.push(PATH.SIGNUP_KAKAO);
          },
          onError: (error) => {
            // 에러 처리
            if (error.success === false) {
              // 서버가 핸들링한 에러
              setErrormessage(error.data.message);
              router.push(PATH.SIGNUP_DONE);
            } else {
              // 서버에러
              router.push(PATH.SIGNUP_KAKAO_ERROR);
            }
          },
        },
      );
    }
  };

  const handleAgencySelect = (selectedOptions) => {
    onChangeValue('telecom', selectedOptions);
    setIsModalOpen(false);
  };
  const resetAgencyOptions = () => {
    onChangeValue('telecom', []);
  };

  if (isLoading) return <SkeletonScreen />;

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
                onChange={(e) => {
                  let filteredValue = filterNumericInput(e);
                  onChangeValue('identity_first', filteredValue);
                }}
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
          <div className="item">
            <TermsAllAgree
              selected={termSelected}
              handleSelected={handleSelected}
            />
          </div>
        </div>
        <WarningToastWrap
          errorMessage={errormessage}
          setErrorMessage={setErrormessage}
        />

        <BottomButton
          filled={checkParamsFilled(params) && termSelected}
          handleNextButtonClick={handleNextButtonClick}
          loading={isLoading}
        />
      </SignupWrapper>
    </Suspense>
  );
}
