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
  nonicon = false,
}) => {
  const router = useRouter();

  return (
    <HeaderContainer>
      {!nonicon && (
        <Icon
          icon={color === 'black' ? Icons.arrow_left : Icons.arrow_left_white}
          onClick={() => {
            router.push(url);
            onClickHandler && onClickHandler();
          }}
          size={'20px'}
        />
      )}

      <Title>{title}</Title>
      {counter && <div className={'counter'}>{counter}/5</div>}
    </HeaderContainer>
  );
};

export default MainHeader;
