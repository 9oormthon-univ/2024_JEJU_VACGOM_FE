import { VacgomIpcMessage, VacgomIpcMessagePair } from './types';

export type HandshakeRequest = VacgomIpcMessage<'Handshake', boolean>;
export type handshakeResponse = VacgomIpcMessage<'Handshake', boolean>;
export type Handshake = VacgomIpcMessagePair<
  HandshakeRequest,
  handshakeResponse
>;
