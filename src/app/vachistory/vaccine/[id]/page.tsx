'use client';

import * as React from 'react';
import { Fragment } from 'react';
import { Container } from './style';
import BackHeader from '@/app/_component/molecule/BackHeader';
import VaccineDetail from '@/app/_component/atom/VaccineDetail';
import { PATH } from '@/routes/path';
import NonePage from '@/app/_component/molecule/NonePage';
import SkeletonScreen from '@/app/_component/temp/SkeletonScreen';
import { useVaccinationDetail } from '@/api/queries/vaccine/vaccinationDetail';
import useVaccinationStore from '../../../../store/vaccine/vaccinationDetail';
import { useBridge } from '@/bridge/hook/useBridge';

interface DetailDataType {
  order: string;
  vaccineProductName: string;
  vaccineBrandName: string;
  vaccineName: string;
  date: string;
  agency: string;
  lotNumber: string;
}

export default function Vaccine() {
  const reName = (order: string, vaccineProductName: string) => {
    if (vaccineProductName !== '') {
      return vaccineProductName + ' | ' + order;
    } else {
      return order;
    }
  };
  const { vaccinationId } = useVaccinationStore();
  const {
    data: detail,
    isLoading,
    error,
  } = useVaccinationDetail({ vaccinationId });
  const { goBack } = useBridge();

  const nonPage = () => {
    if (isLoading) {
      return <SkeletonScreen />;
    } else if (detail.length === 0) {
      return (
        <NonePage
          title="앗! 아직 접종하지 않은 백신이에요."
          content="접종 받은 백신에 대해서만"
          subcontent="접종 정보에 대해 알려드릴 수 있어요"
          isButton={false}
        />
      );
    } else {
      return (
        <>
          <div className={'top'}>
            <div className={'title'}>
              접종한 백신 정보에 대해
              <br />
              알려드릴게요
            </div>
            <div className={'subTop'}>
              접종기관, 백신명, 제조사, 로트번호에 대해 알 수 있어요!
            </div>
          </div>
          <div className="body">
            {detail?.map((item, key) => (
              <VaccineDetail
                vaccineDose={reName(item.order, item.vaccineProductName)}
                vaccineName={item.vaccineName}
                vaccineBrandName={item.vaccineBrandName}
                inoculatedAt={item.date}
                inoculationAgency={item.agency}
                lotNo={item.lotNumber}
              />
            ))}
          </div>
          {!isLoading && (
            <div className="bottom">
              예방접종등록사업을 시작한, 2002년 이후의 예방접종기록을 확인할 수
              있어요
            </div>
          )}
        </>
      );
    }
  };

  return (
    <Container>
      {!isLoading && <BackHeader title={' '} url={PATH.VACHISTORY_VAC} />}
      {nonPage()}
    </Container>
  );
}
