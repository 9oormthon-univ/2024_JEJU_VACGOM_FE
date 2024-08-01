import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';
import { setSession } from '@/api/api_utils';

// 아기 생성 및 백신 조회 후 저장

export const useChildVaccination = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEY.SIGNUP],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.SIGNUP, payload);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SIGNUP] });
    },
    onError: (error) => {},
    ...options,
  });
};
