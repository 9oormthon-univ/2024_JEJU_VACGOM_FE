import { Vacbridge } from './vacbridge';

export * from './bridge';
export * from './vacbridge';

const vacBridge = new Vacbridge();
vacBridge.init().then(() => {
  console.log('[Vacbridge] 브릿지 초기화 완료');
});

export async function getVacBridge() {
  if (vacBridge.isInitialized) {
    return vacBridge;
  }

  return new Promise<Vacbridge>((resolve) => {
    const timeout = setTimeout(() => {
      clearInterval(interval);
      console.log('[Vacbridge] 브릿지 초기화 실패');
    }, 5000);

    const interval = setInterval(() => {
      console.log('[Vacbridge] 브릿지 초기화 대기 중');
      if (vacBridge.isInitialized) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve(vacBridge);
      }
    }, 100);
  });
}
