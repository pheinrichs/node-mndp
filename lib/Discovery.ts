import { Device } from './interfaces/device';
import { Rinfo } from './interfaces/rinfo';
import { DecodeOutput } from './interfaces/decodeOutput';
import { buf2hex, bin2String } from './util/format';

declare var Promise: any;

export class Discovery {

    msg: Buffer;
    info: Rinfo;

    constructor(msg: Buffer, info: Rinfo) {
        this.msg = msg;
        this.info = info;
    }

    /**
     * Output device information
     */
    output(callback: (response: Device) => void): any
    {
        this.format((response) => {
            callback(response);
        });
    }

    /**
     * Format the buffer array
     */
    private format(callback: (device: Device) => void): any
    {
        let device = {
            ipAddress: this.info.address,
            macAddress: '',
            identity: '',
            version: ''
        };

        /**
         * Mikrotik FirstByte starts at 8
         */
        let first_byte = 8;
        
        this.decode(first_byte).then((response) => {
            device.macAddress = buf2hex(response.buffer);
            first_byte += response.length + 4;
            return this.decode(first_byte);
        }).then((response) => {
            device.identity = bin2String(response.buffer);
            first_byte += response.length + 4;
            return this.decode(first_byte);
        }).then((response) => {
            device.version = response.buffer.toString();
        }).then(() => {
            callback(device);
        })
    }


    /**
     * Decode the length / the value
     * @param start Byte to start
     * @param callback 
     */
    private decode(start: number): Promise<DecodeOutput>
    {
        return new Promise((resolve:any, reject:any) => {
            let lengthArray: Buffer = new Buffer(this.msg.buffer.slice(start - 2, start));
            let length = lengthArray.readIntBE(0,lengthArray.byteLength);
            let item: Buffer = new Buffer(this.msg.slice(start, start + length));
    
            resolve({
                buffer: item,
                length: length
            });
        })
    }
}