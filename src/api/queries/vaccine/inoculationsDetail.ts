import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';
import { useAccessToken } from '@/bridge/hook/useAccessToken';
import { useEffect } from 'react';
import { setSession } from '@/api/api_utils';

type Props = {
  vaccinationId?: number;
} & Omit<UseQueryOptions, 'queryKey'>;

export const useInoculationDetail = <T>({
  vaccinationId,
  ...options
}: Props) => {

  const { accessToken } = useAccessToken();
  useEffect(() => {
    setSession(accessToken);
  }, [accessToken]);

  return useQuery({
    queryKey: [QUERY_KEY.INOCULATIONS_DETAIL, vaccinationId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${PATH_API.INOCULATIONS_DETAIL}?vaccinationId=${vaccinationId}`,
      );
      return response.data.data;
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: !!vaccinationId,
    ...options,
  }) as UseQueryResult<T, AxiosError>;
};
