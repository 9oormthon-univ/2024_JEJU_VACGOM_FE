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
  listOnlyInoculated?: boolean;
} & Omit<UseQueryOptions, 'queryKey'>;

export const useVaccination = <T>({ listOnlyInoculated, ...other }: Props) => {
  const { accessToken } = useAccessToken();
  useEffect(() => {
    setSession(accessToken);
  }, [accessToken]);

  return useQuery({
    queryKey: [QUERY_KEY.VACCINATIONS],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${PATH_API.VACCINATIONS}?listOnlyInoculated=${listOnlyInoculated}`,
      );
      return response.data.data;
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    ...other,
  }) as UseQueryResult<T, AxiosError>;
};
