import * as dgram from 'dgram';

export interface Options {
    port: number;
    host?: string;
    version: dgram.SocketType;
}