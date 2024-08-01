'use client';

import { useEffect, useState } from 'react';
import { getVacBridge } from '../index';

export const useBridge = () => {
  const [nickName, setNickName] = useState<string | null>(null);
  const [vacbridge, setVacBridge] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const vacbridgeInstance = await getVacBridge();
      if (vacbridgeInstance == null) return;
      setVacBridge(vacbridgeInstance);

      const nickName = await vacbridgeInstance.getOnboardingNickname();

      console.log('nickName', nickName);
      setNickName(nickName);
    })();
  }, []);

  const goBack = async () => {
    if (!vacbridge) return;
    await vacbridge.goBack();
  };
  const goHome = async () => {
    if (!vacbridge) return;
    await vacbridge.goHome();
  };

  return { nickName, goBack, goHome };
};
