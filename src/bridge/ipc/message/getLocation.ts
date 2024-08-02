import {
  VacgomIpcMessage,
  VacgomIpcMessagePair,
} from '@/bridge/ipc/message/types';

export type GetLocationRequest = VacgomIpcMessage<'GetLocation', null>;
export type GetLocationResponse = VacgomIpcMessage<
  'GetLocation',
  {
    lat: number;
    lon: number;
  }
>;
export type GetLocation = VacgomIpcMessagePair<
  GetLocationRequest,
  GetLocationResponse
>;
