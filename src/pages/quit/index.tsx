import React from 'react';
import styled from '@emotion/styled';
import MainHeader from '@/app/_component/atom/RouteHeader';
import Image from 'next/image';
import { Images } from '@globalStyles';
import { useRouter } from 'next/router';
import { LocalStorage } from '@/hooks/useUtil';
import { getVacBridge } from '@/bridge';

const QuitContainer= styled.div`
padding: 20px;
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  opacity: 1;
  margin-top: 50px;
  margin-bottom: 60px;
`;

const CautionItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid #e5e8eb;
  border-radius: 14px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  opacity: 1;
  margin-bottom: 10px;
`;

const CautionText = styled.span`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  color: #333d4b;
  white-space: pre-line;
`;

const Button = styled.button`
  width: 100%;
  height: 56px;
  padding: 20px 100px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
`;

const PrimaryButton = styled(Button)`
display: flex;
height: 56px;
padding: 20px 100px;
justify-content: center;
align-items: center;
gap: 10px;
flex: 1 0 0;
border-radius: 12px;
background: var(--Primary, #4196FD);
color: var(--Gray-White, #FFF);
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 16px;
letter-spacing: -0.3px;
border:none;
`;

const SecondaryButton = styled(Button)`
display: flex;
height: 56px;
padding: 20px 100px;
justify-content: center;
align-items: center;
gap: 10px;
flex: 1 0 0;
border-radius: 12px;
border: 1px solid var(--Gray-Gray-200, #E5E8EB);
background: var(--Gray-White, #FFF);
color: var(--Gray-Gray-700, #4E5968);
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 16px; /* 100% */
letter-spacing: -0.3px;
`;

export default function Quit() {
  const router = useRouter();
  const accessToken = LocalStorage.getItem('accessToken');

  const handleAccountDeletion = async () => {
    const bridge = await getVacBridge();
    await bridge.quit();
  };

  return (
    <div>
      <MainHeader title="계정 탈퇴" url="/my" />
      <QuitContainer>
      <ImageWrapper>
        <Image src={Images.ico_quit_intro} alt="" />
      </ImageWrapper>
      <CautionItem>
        <Image src={Images.ico_quit} alt="" />
        <CautionText>
          회원님에게 꼭 맞는 백신을{'\n'}추천받을 수 없어요
        </CautionText>
      </CautionItem>
      <CautionItem>
        <Image src={Images.ico_quit} alt="" />
        <CautionText>
          회원님 근처의 지정의료기관을{'\n'}조회할 수 없어요
        </CautionText>
      </CautionItem>
      <CautionItem>
        <Image src={Images.ico_quit} alt="" />
        <CautionText>
          백신만의 백신 인증서를{'\n'}발급받을 수 없어요
        </CautionText>
      </CautionItem>
      <PrimaryButton onClick={() => (window.location.href = '/home')}>
        홈으로 이동
      </PrimaryButton>
      <SecondaryButton onClick={handleAccountDeletion}>
        그래도 탈퇴하기
      </SecondaryButton>
      </QuitContainer>
    </div>
  );
}
