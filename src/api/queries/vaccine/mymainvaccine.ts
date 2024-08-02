import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';
import { useAccessToken } from '@/bridge/hook/useAccessToken';
import { useEffect } from 'react';
import { setSession } from '@/api/api_utils';

interface VaccineData {
  inoculationResponse: {
    requiredInoculationCnt: number;
    inoculatedCnt: number;
  };
  requiredVaccinationResponse: {
    vaccinationId: number;
    diseaseName: string;
    vaccineName: string;
    icon: string;
  };
  vacgomScore: number;
}

export const useMyMainVaccine = (params?: UseQueryOptions<VaccineData, AxiosError>) => {
  const { accessToken } = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      setSession(accessToken);
    }
  }, [accessToken]);

  console.log("accessToken", accessToken)

  return useQuery<VaccineData, AxiosError>({
    queryKey: [QUERY_KEY.MAIN],
    queryFn: async () => {
      const response = await axiosInstance.get<VaccineData>(PATH_API.MAIN);
      return response.data;
    },
    enabled: !!accessToken,
    onError: (error) => {
      console.error("데이터 못 가지고 왔음", error);
    },
    ...params,
  });
};

