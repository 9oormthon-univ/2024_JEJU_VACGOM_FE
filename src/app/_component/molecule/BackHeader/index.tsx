'use client';
import React from 'react';
import { HeaderContainer, Title } from './style';
import { MainHeaderType } from '../moleculeType';
import Icon from '@/app/_component/atom/Icon/Icon';
import { Icons } from '@/styles';
import { useRouter } from 'next/navigation';

const MainHeader: React.FC<MainHeaderType> = ({
  title,
  url,
  counter,
  color = 'black',
}) => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <Icon
        icon={color === 'black' ? Icons.arrow_left : Icons.arrow_left_white}
        onClick={() => {
          router.push(url);
        }}
        size={'20px'}
      />
      <Title>{title}</Title>
      {counter && <div className={'counter'}>{counter}/5</div>}
    </HeaderContainer>
  );
};

export default MainHeader;
