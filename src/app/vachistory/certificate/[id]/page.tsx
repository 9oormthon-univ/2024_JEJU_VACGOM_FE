'use client';

import * as React from 'react';
import { Container } from './style';
import VaccineCard from '@/app/_component/atom/VaccineCertificate/index';
import BackHeader from '@/app/_component/molecule/BackHeader';
import { LocalStorage } from '@/hooks/useUtil';
import { useEffect, useState } from 'react';
import { getCertificateDetail } from '@/app/_lib/getCertificateDetail';
import { apiDevUrl } from '@/hooks/api';
import { PATH } from '@/routes/path';
import Button from '@/app/_component/atom/button/button';
import { Icons } from '@/styles';
import WarningToastWrap from '@/app/_component/molecule/WorningToastWrap';
import useCertificateStore from '@/store/vaccine/certification';
import { useInoculationDetail } from '@/api/queries/vaccine/inoculationsDetail';
import { useBridge } from '@/bridge/hook/useBridge';
import { useMember } from '@/api/queries/auth/member';
import { useRouter } from 'next/router';

type DetailDataType = {
  diseaseName: string;
  certificationIcon: string;
  inoculatedDate: string;
  userId: string;
  vaccineId: string;
  vaccineName: string;
  type?: 'NATION' | 'EXTRA' | 'EVENT';
};

type userDataType = {
  role: string;
  id: string;
  name: string;
  babyName: string;
};

export default function CertificateDetail() {
  const { vaccinationId } = useCertificateStore((state) => state);
  const {
    data: detail,
    isLoading,
    error,
  } = useInoculationDetail<DetailDataType>({ vaccinationId });
  const { data: userData } = useMember<userDataType>();

  const { getImage, shareImage } = useBridge();

  const [errormessage, setErrormessage] = useState('');
  const { goBack } = useBridge();

  return (
    <Container>
      <BackHeader title={'접종 상세'} url={goBack} />
      <div className="container">
        <VaccineCard
          image={detail?.certificationIcon}
          variant={'large'}
          vaccineName={`${detail?.diseaseName}(${detail?.vaccineName})`}
          diseaseName={detail?.diseaseName}
          date={detail?.inoculatedDate}
          definition
          account_id={userData?.name}
          type={detail?.type}
          subLabel
        />
        <div className="button">
          <Button
            prevIcon={Icons.share}
            label={'이미지 공유'}
            variant={'OutlineWhite'}
            size={'large'}
            onClick={shareImage}
          />
          <Button
            prevIcon={Icons.save}
            label={'이미지 저장'}
            variant={'OutlineWhite'}
            size={'large'}
            onClick={getImage}
          />
        </div>
      </div>
      <WarningToastWrap
        errorMessage={errormessage}
        setErrorMessage={setErrormessage}
      />
    </Container>
  );
}
