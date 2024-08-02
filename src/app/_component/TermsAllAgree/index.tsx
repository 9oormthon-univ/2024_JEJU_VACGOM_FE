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
      <div className="div">
        <Link
          className="div-2"
          href={
            'https://been2spring.notion.site/143ea9e50cd9471a856fd1ce52e47ed3'
          }
        >
          <div className="checklist">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e65e626f2d89290d15ee77b1f57a34cd68219ffc2cb4cca71a5015ec39b8b34c?apiKey=2f1c3d702854430c9d5f68ac3d9e3238&&apiKey=2f1c3d702854430c9d5f68ac3d9e3238"
              className="img"
            />
            <div className="필수-백곰-개인정보-수집-및-활용-동의">
              [필수] 백곰 개인정보 수집 및 활용 동의
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7d7df237aa643c6c1840f0f3492928d3f225e34a5f964ff43175efb69b349e5?apiKey=2f1c3d702854430c9d5f68ac3d9e3238&&apiKey=2f1c3d702854430c9d5f68ac3d9e3238"
              className="img-2"
            />
          </div>
        </Link>
        <Link
          className="div-3"
          href={
            'https://been2spring.notion.site/cb723ed5c4dc45a183964c9ff056cd2c'
          }
        >
          <div className="checklist">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f96ab5680cd347295f4a552d0f1ca9b2b6ef3ce3998eeb8ed2155ef8958b0c2d?apiKey=2f1c3d702854430c9d5f68ac3d9e3238&&apiKey=2f1c3d702854430c9d5f68ac3d9e3238"
              className="img"
            />
            <div className="필수-예방접종도우미-이용약관">
              [필수] 예방접종도우미 이용약관
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7d7df237aa643c6c1840f0f3492928d3f225e34a5f964ff43175efb69b349e5?apiKey=2f1c3d702854430c9d5f68ac3d9e3238&&apiKey=2f1c3d702854430c9d5f68ac3d9e3238"
              className="img-3"
            />
          </div>
        </Link>
        <Link
          className="div-4"
          href={
            'https://been2spring.notion.site/4c407e7fa55c4866827b7b2301169e57'
          }
        >
          <div className="checklist">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cfb41f6c2db843f749d950a373b812e56e05690fa85c99966b273b269de82fe?apiKey=2f1c3d702854430c9d5f68ac3d9e3238&&apiKey=2f1c3d702854430c9d5f68ac3d9e3238"
              className="img"
            />
            <div className="필수-예방접종도우미-개인정보-수집-및-이용">
              [필수] 예방접종도우미 개인정보 수집 및 이용
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7d7df237aa643c6c1840f0f3492928d3f225e34a5f964ff43175efb69b349e5?apiKey=2f1c3d702854430c9d5f68ac3d9e3238&&apiKey=2f1c3d702854430c9d5f68ac3d9e3238"
              className="img-4"
            />
          </div>
        </Link>
        <Link
          className="div-5"
          href={
            'https://been2spring.notion.site/37c4eb9131f944a3981f97e9a80cb933'
          }
        >
          <div className="checklist">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/36f18c473833387a082c5ffc693c5428f570cdb0573177c66bc4aa1428ca41bb?apiKey=2f1c3d702854430c9d5f68ac3d9e3238&&apiKey=2f1c3d702854430c9d5f68ac3d9e3238"
              className="img"
            />
            <div className="필수-예방접종도우미-개인정보처리방침">
              [필수] 예방접종도우미 개인정보처리방침
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7d7df237aa643c6c1840f0f3492928d3f225e34a5f964ff43175efb69b349e5?apiKey=2f1c3d702854430c9d5f68ac3d9e3238&&apiKey=2f1c3d702854430c9d5f68ac3d9e3238"
              className="img-5"
            />
          </div>
        </Link>
      </div>
    </TermsDetailContainer>
  );
};

export default TermsAllAgree;
