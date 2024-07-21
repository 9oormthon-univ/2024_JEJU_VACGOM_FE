import { axiosInstance } from '@/api/axios';

export interface IToken {
  accessToken: string | null;
  refreshToken?: string | null;
}

export const setSession = (token: IToken) => {
  const { accessToken } = token;
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken'!);
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};
