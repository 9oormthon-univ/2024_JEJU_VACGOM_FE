'use client';

import * as React from 'react';
import { DonePageWrap } from './style';
import Image from 'next/image';
import { css } from '@emotion/react';

import { Colors, Icons, Images } from '@globalStyles';
import Button from '../../atom/button/button';

type props = {
  more?: boolean;
  title: string;
  title_bottom?: string;
  content_top?: string;
  content_bottom?: string;
  src_success?: boolean;
  plus?: string;
};
const DonePage: React.FC<props> = ({
  more,
  title,
  title_bottom,
  content_top,
  content_bottom,
  plus,
  src_success = true,
}) => {
  return (
    <DonePageWrap more={more}>
      <div className="container">
        <Image
          src={src_success ? Images.vacgom_face : Images.warning_gray}
          alt={'접종 이미지'}
        />
        <div className="title">{title}</div>
        {title_bottom && <div className="title">{title_bottom}</div>}
        <div className="content_top">{content_top}</div>
        <div className="content_bottom">{content_bottom}</div>
        <div className="content_bottom">{plus}</div>
      </div>
    </DonePageWrap>
  );
};

export default DonePage;
