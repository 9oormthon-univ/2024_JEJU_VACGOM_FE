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

export const useChildVaccination = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEY.CHILD_VAC],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.CHILD_VAC, payload);
      return response.data;
    },
    onSuccess: (data) => {
      setSession(data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CHILD_VAC] });
    },
    onError: (error) => {},
    ...options,
  });
};
