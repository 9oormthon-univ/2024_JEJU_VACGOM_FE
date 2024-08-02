'use client';

import { useEffect, useState } from 'react';
import { getVacBridge } from '../index';

export const useBridge = () => {
  const [nickName, setNickName] = useState<string | null>(null);
  const [vacbridge, setVacBridge] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const vacbridgeInstance = await getVacBridge();
      if (vacbridgeInstance == null) return;

      if (isMounted) {
        setVacBridge(vacbridgeInstance);
        const nickName = await vacbridgeInstance.getOnboardingNickname();
        setNickName(nickName);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);
  const goBack = async () => {
    if (!vacbridge) return;
    await vacbridge.goBack();
  };
  const goHome = async () => {
    if (!vacbridge) return;
    await vacbridge.goHome();
  };
  const getImage = async () => {
    if (!vacbridge) return;
    await vacbridge.getImage();
  };
  const shareImage = async () => {
    if (!vacbridge) return;
    await vacbridge.shareImage();
  };

  return { nickName, goBack, goHome, getImage, shareImage };
};
