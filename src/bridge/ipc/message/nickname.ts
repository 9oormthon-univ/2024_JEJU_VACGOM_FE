import { VacgomIpcMessage, VacgomIpcMessagePair } from './types';

export type NicknameRequest = VacgomIpcMessage<'Nickname', null>;
export type NicknameResponse = VacgomIpcMessage<'Nickname', string>;
export type Nickname = VacgomIpcMessagePair<NicknameRequest, NicknameResponse>;
