'use client';
import React from 'react';
import { HeaderContainer, Title } from './style';
import { MainHeaderType } from '../moleculeType';
import Icon from '@/app/_component/atom/Icon/Icon';
import { Icons, Images } from '@/styles';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MainHeader: React.FC<MainHeaderType> = ({
  title,
  url,
  counter,
  color = 'black',
  onClickHandler,
}) => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <Image
        src={color === 'black' ? Images.arrow_left : Images.arrow_left_white}
        alt={'BACK'}
        onClick={() => {
          url && router.push(url);
          onClickHandler && onClickHandler();
        }}
      />
      <Title>{title}</Title>
      {counter && <div className={'counter'}>{counter}/5</div>}
    </HeaderContainer>
  );
};

export default MainHeader;
