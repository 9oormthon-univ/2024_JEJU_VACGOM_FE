'use client';

import * as React from 'react';
import { Container } from './style';
import VaccineCard from '@/app/_component/atom/VaccineCertificate/index';
import { Images } from '@globalStyles';
import BackHeader from '@/app/_component/molecule/BackHeader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCertificate } from '@/app/_lib/getCertificate';
import { LocalStorage } from '@/hooks/useUtil';
import { VaccineData } from '@/types/globalType';
import { useInoculation } from '@/api/queries/vaccine/inoculations';
import SkeletonScreen from '@/app/_component/temp/SkeletonScreen';
import { useAccessToken } from '@/bridge/hook/useAccessToken';
import { setSession } from '@/api/api_utils';

export default function CertificateList(): React.JSX.Element {
  const router = useRouter();
  const onClickHandler = (id: string) => {
    LocalStorage.setItem('vaccineId', id);
    router.push(`/vachistory/certificate/${id}`);
  };

  const { data, isLoading, error } = useInoculation();
  if (isLoading) return <SkeletonScreen />;
  if (error) return <h4>{error.message}</h4>;
  console.log(data);

  return (
    <Container>
      <BackHeader title={'접종 인증서'} url={'/vacinfo'} />
      <div className="container">
        <div className="list">
          {data?.data?.map((card, index) => (
            <VaccineCard
              key={index}
              variant={'small'}
              image={card.iconImage}
              vaccineName={`${card.diseaseName}(${card.vaccineName})`}
              date={card.inoculatedDate}
              onClick={() => onClickHandler(card.vaccineId)}
              type={card.type}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
