/// <reference types="node" />
import { Device } from './interfaces/device';
import { Rinfo } from './interfaces/rinfo';
export declare class Discovery {
    msg: Buffer;
    info: Rinfo;
    constructor(msg: Buffer, info: Rinfo);
    /**
     * Output device information
     */
    output(callback: (response: Device) => void): void;
    /**
     * Format the buffer array
     */
    private format(callback);
}
