'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { JoinWrap, SignupWrapper } from './style';

import BackHeader from '@/app/_component/molecule/BackHeader';
import JoinTemplate from '@/app/_component/temp/JoinTemplate';
import BottomButton from '@/app/_component/atom/BottomButton';
import { OnChangeValueType } from '@/types/globalType';
import * as queryString from 'querystring';
import { useRouter } from 'next/navigation';
import { fetchAccessToken } from '@/hooks/useKakaoLogin';
import { filterNumericInput, LocalStorage } from '@/hooks/useUtil';
import { PATH } from '@/routes/path';
import { useForm } from 'react-hook-form';
import InputForm from '@/app/_component/atom/InputForm';
import { Icons } from '@/styles';
import { css } from '@emotion/react';

export default function Signup(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [params, setParam] = useState({
    signupState: undefined,
  });

  const onChangeValue: OnChangeValueType = (field, value) => {
    setParam((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const onSubmit = (data) => {
    // 폼 제출 시 처리 로직
    if (data.signupState) {
      router.push(PATH.LOGIN);
    } else {
      router.push(PATH.SIGNUP_TERMS);
    }
  };

  const identityFirst = watch('identity_first');
  const identityLast = watch('identity_last');

  return (
    <SignupWrapper>
      <BackHeader title={' '} url={'/'} />
      <div className="top">우리 아이 정보를 입력해 주세요</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="item">
            <InputForm
              placeholder="이름"
              descriptionTop={'이름'}
              type="text"
              {...register('userName', { required: true })}
            />
          </div>
          <div className="item">
            <div className="input_title">주민등록번호</div>
            <div className="item_row">
              <InputForm
                placeholder="앞자리 입력"
                type="text"
                maxLength={6}
                {...register('identity_first', {
                  required: true,
                  pattern: /^[0-9]{6}$/,
                  onChange: (e) => filterNumericInput(e),
                })}
              />
              <p>-</p>
              <InputForm
                placeholder="뒷자리 입력"
                type="password"
                maxLength={7}
                {...register('identity_last', {
                  required: true,
                  pattern: /^[0-9]{7}$/,
                  onChange: (e) => filterNumericInput(e),
                })}
              />
            </div>
          </div>
        </div>
        <BottomButton
          type="submit"
          filled={identityFirst && identityLast}
          handleNextButtonClick={handleSubmit(onSubmit)}
        />
      </form>
    </SignupWrapper>
  );
}
