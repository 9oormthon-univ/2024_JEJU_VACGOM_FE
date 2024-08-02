export type VacgomIpcMessage<T, D> = {
  type: T;
  data: D;
};

export type VacgomIpcMessageWithId<T, D> = VacgomIpcMessage<T, D> & {
  id: string;
};

export type VacgomIpcMessagePair<R, S> = {
  req: R extends VacgomIpcMessage<infer T, infer D>
    ? VacgomIpcMessage<T, D>
    : never;
  res: S extends VacgomIpcMessage<infer T, infer D>
    ? VacgomIpcMessage<T, D>
    : never;
};

export type ExtractRequest<T> =
  T extends VacgomIpcMessagePair<any, any> ? T['req'] : never;

export type ExractResponse<T> =
  T extends VacgomIpcMessagePair<any, any> ? T['res'] : never;

export type IpcMessageHandler<
  M extends VacgomIpcMessage<any, any> | VacgomIpcMessageWithId<any, any>,
> = (message: M) => void;

export type WithId<M> = {
  id: string;
} & M;

export type InferMessage<M> =
  M extends VacgomIpcMessage<infer T, infer D>
    ? VacgomIpcMessage<T, D>
    : VacgomIpcMessage<any, any>;

export type MessageListener<M> = (message: InferMessage<M>) => void;

export type MessageHandler<R, S> = (message: R) => Promise<S> | S;
