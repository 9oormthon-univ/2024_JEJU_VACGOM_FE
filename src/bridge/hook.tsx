'use client';

import { useEffect, useState } from 'react';
import { getVacBridge } from './index';

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoadingAccessToken, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const vacbridge = await getVacBridge();
      if (vacbridge == null) return;
      const accessToken = await vacbridge.getAccessToken();

      console.log('accessToken', accessToken);
      setAccessToken(accessToken);
    })();
  }, []);

  return { accessToken, isLoadingAccessToken };
};
