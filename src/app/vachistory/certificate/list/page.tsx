'use client';

import * as React from 'react';
import { Container } from './style';
import VaccineCard from '@/app/_component/atom/VaccineCertificate/index';
import BackHeader from '@/app/_component/molecule/BackHeader';
import { useRouter } from 'next/navigation';
import { LocalStorage } from '@/hooks/useUtil';
import { useInoculation } from '@/api/queries/vaccine/inoculations';
import SkeletonScreen from '@/app/_component/temp/SkeletonScreen';
import useCertificateStore from '@/store/vaccine/certification';
import { useBridge } from '@/bridge/hook/useBridge';

export default function CertificateList(): React.JSX.Element {
  const router = useRouter();
  const { setvaccinationId } = useCertificateStore((state) => state);
  const { goBack } = useBridge();

  const onClickHandler = (id: number) => {
    setvaccinationId(id);
    router.push(`/vachistory/certificate/${id}`);
  };

  const { data, isLoading, error } = useInoculation();
  if (isLoading) return <SkeletonScreen />;
  if (error) return <h4>{error.message}</h4>;

  return (
    <Container>
      <BackHeader title={'접종 인증서'} onClickHandler={goBack} />
      <div className="container">
        <div className="list">
          {data?.data.map((card, index) => (
            <VaccineCard
              key={index}
              variant={'small'}
              image={card.iconImage}
              vaccineName={`${card.diseaseName}(${card.vaccineName})`}
              date={card.inoculatedDate}
              onClick={() => onClickHandler(card.vaccinationId)}
              type={card.type}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
