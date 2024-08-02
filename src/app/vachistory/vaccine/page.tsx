'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Container } from './style';
import { Images } from '@/styles';
import MainHeader from '@/app/_component/atom/MainHeader';

import VaccineStatus from '@/app/_component/atom/VaccineStatus';
import { PATH } from '@/routes/path';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { LocalStorage } from '@/hooks/useUtil';
import useVaccinationStore from '../../../store/vaccine/vaccinationDetail';

interface ListDataType {
  vaccineName: string;
  inoculationOrders: [];
  vaccineId: string;
  diseaseId: string;
  orderString: string;
  diseaseName: string;
  minOrder: number;
  maxOrder: number;
  isCompleted: boolean;
}
const FiltersContainer = styled.div`
  display: flex;
  padding: 14px 20px;
  margin-left: 14px;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
  background: #fff;
  display: flex;
  padding: 4px;
  align-items: flex-start;
  gap: 8px;
`;

const SectionButton = styled.div`
  display: flex;
  padding: var(--small, 4px) 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: var(--surface-bright, #fff);
  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  opacity: ${({ active }) => (active ? '1' : '0.3')};
  color: var(--primary, #191f28);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;

const FilterWrapper = styled.div`
  display: flex;
  padding: 4px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 7px;
  background: var(--Gray-Gray-100, #f2f4f6);
`;

const MainContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const CertificateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex: 2;
  border-radius: 14px;
  border: 1px solid var(--Gray-Gray-100, #f2f4f6);
  background: var(--Gray-White, #fff);
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const MainTextContainer = styled.div`
  color: var(--Gray-Gray-900, #191f28);
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
`;
const MainSubTextContainer = styled.div`
  margin-top: -12px;
  color: var(--Gray-Gray-600, #6b7684);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

const SubContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 14px;
  border: 1px solid var(--Gray-Gray-100, #f2f4f6);
  background: var(--Gray-White, #fff);
`;

const SubMainContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  justify-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  align-self: stretch;
`;

const SubTitleText = styled.div`
  color: var(--Gray-Gray-800, #333d4b);
  text-align: center;
  justify-content: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 4px;
`;

export default function Vaccine() {
  const [selectedSection, setSelectedSection] = useState<string>('전체 백신');
  const [type, setType] = useState('NATION');
  const [list, setList] = useState<ListDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (selectedSection === '국가예방접종') {
      setType('NATION');
    } else {
      setType('EXTRA');
    }
  }, [selectedSection]);
  const { setVacType, setVaccineId } = useVaccinationStore((state) => state);
  const handleClickDetail = (vaccineId: string) => {
    LocalStorage.setItem('vacType', type);
    LocalStorage.setItem('vaccineId', vaccineId);
    setVacType(type);
    setVaccineId(vaccineId);
    router.push(PATH.VACHISTORY_VAC + '/' + vaccineId);
  };

  const handleToggleSection = (section) => {
    setSelectedSection(section);
    setType(section === '전체 백신' ? 'NATION' : 'EXTRA');
  };

  return (
    <Container>
      <MainHeader title="백신" />
      <MainContainer>
        <CertificateContainer>
          <Image src={Images.ico_my_profile_new} alt="" />
          <MainTextContainer>2개</MainTextContainer>
          <MainSubTextContainer>민지의 접종인증서</MainSubTextContainer>
        </CertificateContainer>

        <SubMainContainer>
          <SubContainer>
            <Image src={Images.ico_vacscore_vaccine} alt="" />
            <SubTitleText>인증서</SubTitleText>
          </SubContainer>
          <SubContainer>
            <Image src={Images.ico_vacinfo_look} alt="" />
            <SubTitleText>백신 정보</SubTitleText>
          </SubContainer>
        </SubMainContainer>
      </MainContainer>

      <FiltersContainer>
        <FilterWrapper>
          <SectionButton
            onClick={() => handleToggleSection('전체 백신')}
            active={selectedSection === '전체 백신'}
          >
            전체 백신
          </SectionButton>
          <SectionButton
            onClick={() => handleToggleSection('맞은 내역')}
            active={selectedSection === '맞은 내역'}
          >
            맞은 내역
          </SectionButton>
        </FilterWrapper>
      </FiltersContainer>

      <div className="body">
        <div className="content_wrap">
          {list.map((item, key) => (
            <VaccineStatus
              vaccineType={item.vaccineName}
              diseaseName={item.diseaseName}
              maxOrder={item.maxOrder}
              minOrder={item.minOrder}
              inoculationOrders={item.inoculationOrders}
              isCompleted={item.isCompleted}
              onClick={() => handleClickDetail(item.vaccineId)}
            />
          ))}
        </div>
      </div>
      {!loading && (
        <div className="bottom">
          예방접종등록사업을 시작한, 2002년 이후의 예방접종기록을 확인할 수
          있어요
        </div>
      )}
    </Container>
  );
}
