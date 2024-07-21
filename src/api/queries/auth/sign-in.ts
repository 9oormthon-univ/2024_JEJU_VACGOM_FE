import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { setSession } from 'src/auth/utils';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/path';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

export const useSignIn = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>,
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: [QUERY_KEY.SIGN_IN],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.SIGN_IN, payload);
      return response.data;
    },
    onSuccess: (data) => {
      setSession(data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_INFO] });
      navigate(PATH.HOME);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
