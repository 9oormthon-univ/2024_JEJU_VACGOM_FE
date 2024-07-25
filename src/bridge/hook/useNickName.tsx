'use client';

import { useEffect, useState } from 'react';
import { getVacBridge } from '../index';

export const useNickName = () => {
  const [nickName, setNickName] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const vacbridge = await getVacBridge();
      if (vacbridge == null) return;
      const nickName = await vacbridge.getOnboardingNickname();

      console.log('nickName', nickName);
      setNickName(nickName);
    })();
  }, []);

  return { nickName };
};
