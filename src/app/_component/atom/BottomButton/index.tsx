'use client';

import * as React from 'react';
import { BottomButtonWrap } from './style';

import BackHeader from '@/app/_component/molecule/BackHeader';
import JoinTemplate from '@/app/_component/temp/JoinTemplate';
import { ButtonType } from '@/app/_component/atom/atomType';
import Loading from '@/app/_component/atom/Loading/Loading';

type props = {
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  filled: boolean;
  handleNextButtonClick?: () => void;
  label?: string;
};
const BottomButton: React.FC<props> = ({
  loading,
  filled,
  type = 'button',
  handleNextButtonClick,
  label = '다음',
}) => {
  const onClickValid = () => {
    if (filled) {
      handleNextButtonClick();
    }
  };
  return (
    <BottomButtonWrap
      className={filled ? 'confirm_button_Filled' : 'confirm_button'}
      onClick={onClickValid}
      type={type}
      data-loading={loading}
    >
      {loading ? <Loading /> : label}
    </BottomButtonWrap>
  );
};

export default BottomButton;
