import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { PATH } from '../../../routes/path';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';
import { setSession } from '@/api/api_utils';
import { useRouter } from 'next/navigation';

// 아기 생성 및 백신 조회 후 저장
export const useSignup = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>,
) => {
  const queryClient = useQueryClient();
  const navigate = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEY.SIGN_UP],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.SIGN_UP, payload);
      return response.data;
    },
    onSuccess: (data) => {
      setSession(data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SIGN_UP] });
    },
    onError: (error) => {},
    ...options,
  });
};
