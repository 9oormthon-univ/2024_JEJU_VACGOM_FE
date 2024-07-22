import { EventEmitter } from 'eventemitter3';

export type InternalPostMessage = (message: string) => void;
export type InternalListener = (message: string) => void;

export class InternalVacgomAppIpc {
  private _emitter = new EventEmitter();

  constructor(private vacgomAppPostMessage: InternalPostMessage) {}

  public addListener(listener: InternalListener) {
    this._emitter.addListener('message', listener);
  }

  public send(message: string): void {
    return this.vacgomAppPostMessage(message);
  }

  public emit(message: string): void {
    this._emitter.emit('message', message);
  }
}
