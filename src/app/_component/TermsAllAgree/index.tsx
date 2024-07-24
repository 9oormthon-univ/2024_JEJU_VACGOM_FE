'use client';
import React, { useState } from 'react';
import { TermsDetailContainer } from './style';
import Icon from '@/app/_component/atom/Icon/Icon';
import { Icons, Images } from '@/styles';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
type props = { selected: boolean; handleSelected: void };
const TermsAllAgree: React.FC<props> = ({
  selected,
  handleSelected,
}: props) => {
  return (
    <TermsDetailContainer>
      <div className={'wrap'}>
        <div className={'all'} onClick={handleSelected}>
          <div className={'button'}>
            <Image
              src={selected ? Images.choice_selec : Images.choice_unselec}
              alt={'seleted check box'}
              width={20}
              height={20}
            />
          </div>
          <div className={'title'}>약관 전체 동의</div>
        </div>
        <Link
          href="https://www.notion.so/been2spring/da1fae9ce9f54a7980a0782c91b7551f"
          passHref
        >
          <div className={'personal'}>
            <div className={'title'}>개인정보 수집/이용동의</div>
            <Image src={Images.ico_my_right} alt="" />
          </div>
        </Link>
        <Link
          href="https://www.notion.so/been2spring/63e3302aed7142dfa4771f41af1260d8?pvs=4"
          passHref
        >
          <div className={'personal'}>
            <div className={'title'}>제 3자 제공 동의</div>
            <Image src={Images.ico_my_right} alt="" />
          </div>
        </Link>
      </div>
    </TermsDetailContainer>
  );
};

export default TermsAllAgree;
