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
    output(callback: (response: Device) => void): any;
    /**
     * Format the buffer array
     */
    private format(callback);
    /**
     * Decode the length / the value
     * @param start Byte to start
     * @param callback
     */
    private decode(start);
}
