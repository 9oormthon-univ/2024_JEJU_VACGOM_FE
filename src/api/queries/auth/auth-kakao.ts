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
import useKaKaoStore from '@/store/signup/kakaoAgain';

// 카카오 간편인증 1차
export const useAuthKaKao = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>,
) => {
  const queryClient = useQueryClient();
  const navigate = useRouter();
  const { setBirthday, setPhoneNo, setUserName } = useKaKaoStore(
    (state) => state,
  );

  return useMutation({
    mutationKey: [QUERY_KEY.KAKAO],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.KAKAO, payload);
      return response.data;
    },
    onSuccess: (data) => {
      // 세션 설정
      setSession(data);
      // 스토어에 사용자 정보 저장
      setUserName(data.userName);
      setBirthday(data.birthday);
      setPhoneNo(data.phoneNo);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.KAKAO] });
    },
    onError: (error) => {},
    ...options,
  });
};
