import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MainHeader from '@/app/_component/molecule/BackHeader';
import Image from 'next/image';
import { Images } from '@globalStyles';
import NavigationFixed from '@/app/_component/organism/navigationFixed';
import Link from 'next/link';
import { LocalStorage } from '@/hooks/useUtil';
import { css, keyframes } from '@emotion/react';
import { AnimatedCircle } from '@/app/_component/organism/AnimatedCircle';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useBridge } from '@/bridge/hook/useBridge';
import BackHeader from '@/app/_component/molecule/BackHeader';
import { useMyMainVaccine } from '@/api/queries/vaccine/mymainvaccine';
import SkeletonScreen from '@/app/_component/temp/SkeletonScreen';

import WarningToastWrap from "@/app/_component/molecule/WorningToastWrap";

const NavVacContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #f9fafb;
`;

const OneNav = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 14px;
  border: 1px solid var(--Gray-Gray-200, #e5e8eb);
  background: var(--Gray-White, #fff);
  border: 1px solid var(--Gray-Gray-200, #e5e8eb);
  background: var(--Gray-White, #fff);
`;

const ListInfoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ListItemText = styled.span`
  color: var(--Gray-Gray-900, #191f28);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const LinkButton = styled.a`
  cursor: pointer;
`;

const VacListContainer = styled.div`
  display: flex;
  padding: 0px 20px 24px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const VacList = styled.div`
  display: flex;
  height: 79.5px;
  padding: 20px 18px;
  align-items: center;
  gap: 24px;
  flex: 1 0 0;
  border-radius: 14px;
  background: var(--Gray-Gray-50, #f9fafb);
`;

const MyVacList = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  flex-direction: column;
  justify-content: left;
`;

const MyVacTitle = styled.div`
  color: var(--Gray-Gray-500, #8b95a1);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.3px;
`;

const MyVacSentence = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  flex: 1 0 0;
  border-right: 1px solid var(--Gray-Gray-100, #f2f4f6);
`;

// 원형 테두리 애니메이션을 위한 키프레임 정의
const drawCircleAnimation = keyframes`
  from {
    stroke-dasharray: 0, 314;
  }
  to {
    stroke-dasharray: 314, 0;
  }
`;

const ProgressBar = styled.div`
  align-items: center;
  width: 90%;
  padding: 40px;
  margin-left: 20px;
`;
const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--small, 4px);
`;

const ScoreText = styled.div`
  color: var(--Gray-Gray-900, #191f28);
  text-align: center;
  font-family: Montserrat;
  font-size: 64px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
`;

const ScoreKoText = styled.div`
  color: var(--Gray-Gray-500, #8b95a1);
  text-align: center;
  font-family: Montserrat;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  margin-top: 16px;
`;
const MaxText = styled.div`
  color: var(--Gray-Gray-400, #b0b8c1);
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;
export default function VacInfo() {
  const [userName, setUserName] = useState('');
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { goBack } = useBridge();
  const { data, error, isLoading } = useMyMainVaccine();

  if (isLoading) return <SkeletonScreen />;

    if (error) {
      setErrorMessage(error.message);
      return <div>Error: {error.message}</div>;
    }

    console.log("data",data)
 
  const vaccinationProgress = data ? (data.inoculatedCnt / data.requiredInoculationCnt) * 100 : 0;

  return (
    <>
      <BackHeader title={'백곰 점수'} onClickHandler={goBack} />
      <ProgressBar>
        <CircularProgressbarWithChildren
          value={data.data.vacgomScore}
          styles={{
            root: {
              width: '100%',
            },
            path: {
              stroke: `rgba(65, 150, 253, 
              ${data.vacgomScore / 100})`,
            },
            trail: {
              stroke: '#F2F4F6',
            },
            text: {
              fill: '#f88',
              fontSize: '16px',
            },
          }}
        >
          <div style={{ fontSize: 12, marginTop: -5 }}>
            <ScoreContainer>
              <ScoreText>{data.data.vacgomScore}</ScoreText>
              <ScoreKoText>점</ScoreKoText>
            </ScoreContainer>
            <MaxText>100점</MaxText>
          </div>
        </CircularProgressbarWithChildren>
      </ProgressBar>
      <WarningToastWrap errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      <VacListContainer>
        <VacList>
          <Image src={Images.ico_vacscore_vaccine} alt="" />
          <MyVacList>
            <MyVacTitle>접종한 백신</MyVacTitle>
            <MyVacSentence>{data.data.inoculationResponse.inoculatedCnt}개</MyVacSentence>
          </MyVacList>
          <MyVacList>
            <MyVacTitle>필수접종백신</MyVacTitle>
            <MyVacSentence>{data.data.inoculationResponse.requiredInoculationCnt}개</MyVacSentence>
          </MyVacList>
        </VacList>
      </VacListContainer>
      <NavVacContainer>
        <OneNav>
          <ListInfoItem>
            <Image src={Images.ico_vacinfo_look} alt="" />
            <ListItemText>백신접종기관 조회</ListItemText>
          </ListInfoItem>
          <Link href="/vaclookup" passHref>
            <LinkButton>
              <Image src={Images.ico_my_right} alt="" />
            </LinkButton>
          </Link>
        </OneNav>
        <OneNav>
          <ListInfoItem>
            <Image src={Images.ico_vacscore_info} alt="" />
            <ListItemText>백신 정보 보기</ListItemText>
          </ListInfoItem>
          <Link href="/vachistory/vaccine" passHref>
            <LinkButton>
              <Image src={Images.ico_my_right} alt="" />
            </LinkButton>
          </Link>
        </OneNav>
      </NavVacContainer>
    </>
  );
}
