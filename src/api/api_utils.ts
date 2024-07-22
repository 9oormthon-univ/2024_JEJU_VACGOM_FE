import { axiosInstance } from '@/api/axios';
import { LocalStorage } from '@/hooks/useUtil';

export interface IToken {
  accessToken: string | null;
  refreshToken?: string | null;
}

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    LocalStorage.setItem('accessToken', accessToken);
    console.log('아아');
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken'!);
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};
