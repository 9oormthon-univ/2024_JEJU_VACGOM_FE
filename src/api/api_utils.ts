import { axiosInstance } from '@/api/axios';
import { LocalStorage } from '@/hooks/useUtil';

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    LocalStorage.setItem('accessToken', accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken'!);
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};
