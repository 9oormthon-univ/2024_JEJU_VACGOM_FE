'use client';

import { BridgeNotInitialized } from './ipc/exception/bridge-not-initialized';
import { Bridge } from './bridge';

import {
  InternalPostMessage,
  InternalVacgomAppIpc,
} from './ipc/internal-vacgom-app-ipc';
import { VacgomAppIpc } from './ipc/vacgom-app-ipc';
import { Token } from './ipc/message/token';
import { Nickname } from '@/bridge/ipc/message/nickname';
import { BackRequest } from '@/bridge/ipc/message/back';
import { GoHomeRequest } from '@/bridge/ipc/message/goHome';

declare global {
  interface Window {
    flutter: {
      postMessage?: (message: string) => void;
    };

    webviewPostMessage?: (message: string) => void;
  }
}

export class Vacbridge implements Bridge {
  private ipcInternal?: InternalVacgomAppIpc;

  private vacapiPostMessage?: InternalPostMessage;

  private vacgomIpc?: VacgomAppIpc;

  public isInitialized = false;

  async init(): Promise<void> {
    console.log('[Vacbridge] 초기화 시작');
    this.vacapiPostMessage = await this.retrieveFlutterPostMessage();
    this.ipcInternal = new InternalVacgomAppIpc(this.vacapiPostMessage);
    this.exposeAutomationPostMessage();
    this.vacgomIpc = new VacgomAppIpc(this.ipcInternal);
    this.isInitialized = true;
    console.log('[Vacbridge] 초기화 완료');
  }

  public async getIpc(): Promise<VacgomAppIpc> {
    if (!this.vacgomIpc || !this.isInitialized) await this.init();

    return this.vacgomIpc!;
  }

  private exposeAutomationPostMessage(): void {
    window.webviewPostMessage = (message: string) => {
      console.log('[Vacbridge] 수신 메시지 ', message);
      this.ipcInternal?.emit(message as any);
    };

    console.log('[Vacbridge] webviewPostMessage 핸들러 expose');
  }

  private async retrieveFlutterPostMessage(): Promise<
    (message: string) => void
  > {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        clearInterval(interval);
        console.log('[Vacbridge] 플러터 postMessage 획득 실패');
        reject(new BridgeNotInitialized());
      }, 5000);

      const interval = setInterval(() => {
        console.log('[Vacbridge] 플러터 postMessage 획득 시도');
        if (window.flutter && window.flutter.postMessage) {
          clearInterval(interval);
          clearTimeout(timeout);
          console.log('[Vacbridge] 플러터 postMessage 획득 성공');
          resolve(window.flutter.postMessage.bind(window.flutter));
        }
      }, 100);
    });
  }

  async getOnboardingNickname(): Promise<string | null> {
    const ipc = await this.getIpc();
    const response = await ipc.invoke<Nickname>({
      type: 'Nickname',
      data: null,
    });

    return response.data;
  }

  async goBack(): Promise<void> {
    const ipc = await this.getIpc();
    await ipc.send<BackRequest>({
      type: 'Back',
      data: null,
    });
  }
  async goHome(): Promise<void> {
    const ipc = await this.getIpc();
    await ipc.send<GoHomeRequest>({
      type: 'GoHome',
      data: null,
    });
  }

  async getAccessToken(): Promise<string | null> {
    const ipc = await this.getIpc();
    const response = await ipc.invoke<Token>({
      type: 'Token',
      data: null,
    });

    return response.data;
  }
}
