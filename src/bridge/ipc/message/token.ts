import { VacgomIpcMessage, VacgomIpcMessagePair } from './types';

export type TokenRequest = VacgomIpcMessage<'Token', null>;
export type TokenResponse = VacgomIpcMessage<'Token', string>;
export type Token = VacgomIpcMessagePair<TokenRequest, TokenResponse>;
