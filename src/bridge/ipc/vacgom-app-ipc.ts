import {
  InternalListener,
  InternalVacgomAppIpc,
} from './internal-vacgom-app-ipc';
import {
  ExractResponse,
  ExtractRequest,
  InferMessage,
  IpcMessageHandler,
  MessageHandler,
  MessageListener,
  VacgomIpcMessageWithId,
  WithId,
} from './message';

export class VacgomAppIpc {
  private messages: Record<string, IpcMessageHandler<any>> = {};

  constructor(private internalVacgomAppIpc: InternalVacgomAppIpc) {
    this.internalVacgomAppIpc.addListener((message) => {
      this.listenAsyncResponse(JSON.parse(message));
    });
  }

  addListener<M>(listener: MessageListener<M>): void {
    this.internalVacgomAppIpc.addListener(
      this.getInternalListener<M>(listener),
    );
  }

  async send<T>(message: T): Promise<void> {
    const data = JSON.stringify(message);
    console.log(`[VacgomAppIpc] 전송 ${data}`);
    this.internalVacgomAppIpc.send(data);
  }

  async invoke<T>(message: ExtractRequest<T>): Promise<ExractResponse<T>> {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substr(2, 9);

      const identifiedMessage: WithId<typeof message> = {
        id,
        ...message,
      };

      this.messages[id] = (response) => {
        resolve(response);
      };

      this.internalVacgomAppIpc.send(JSON.stringify(identifiedMessage));

      console.log(
        `[VacgomAppIpc] async invoke (${id})\n${JSON.stringify(identifiedMessage)}\n`,
      );
    });
  }

  addHandler<M>(
    type: ExtractRequest<M>['type'],
    handler: MessageHandler<InferMessage<ExtractRequest<M>>, ExractResponse<M>>,
  ): void {
    this.addListener<ExtractRequest<M>>(async (message) => {
      if (message.type != type) return;

      const result = await handler(message);
      await this.send<ExractResponse<M>>(result);
    });
  }

  private listenAsyncResponse(message: VacgomIpcMessageWithId<never, never>) {
    if (!message.id) return;

    if (this.messages[message.id]) {
      this.messages[message.id](message);
      delete this.messages[message.id];

      console.log(
        `[VacgomAppIpc] 응답 수신 (${message.id})\n${JSON.stringify(message)}\n`,
      );
    }
  }

  private getInternalListener<M>(handle: MessageListener<M>): InternalListener {
    return (message: string) => {
      console.log(`[VacgomAppIpc] 수신 ${JSON.parse(message)}`);
      return handle(JSON.parse(message));
    };
  }
}
