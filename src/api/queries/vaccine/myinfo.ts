import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';
import { useAccessToken } from '@/bridge/hook/useAccessToken';
import { useEffect } from 'react';
import { setSession } from '@/api/api_utils';

interface UserData {
  id: number;
  role: string;
  type: string;
  name: string;
  babyName: string;
}

interface ApiResponse {
  result: boolean;
  message: string | null;
  data: UserData;
}

export const useMyInfo = (params?: UseQueryOptions<UserData, AxiosError>) => {
  const { accessToken } = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      setSession(accessToken);
    }
  }, [accessToken]);

  console.log("accessToken", accessToken);

  return useQuery<UserData, AxiosError>({
    queryKey: [QUERY_KEY.INFO],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse>(PATH_API.INFO); 
      if (response.data.result) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Unknown error");
    },
    enabled: !!accessToken,
    onError: (error) => {
      console.error("Failed to fetch user data", error);
    },
    ...params,
  });
};