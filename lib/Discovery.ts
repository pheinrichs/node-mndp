import { Device } from './interfaces/device';
import { Rinfo } from './interfaces/rinfo';
import { buf2hex, bin2String } from './util/format';

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
    output(callback: (response: Device) => void): void {
        this.format((response) => {
            callback(response);
        });
    }

    /**
     * Format the buffer array
     */
    private format(callback: (device: Device) => void): void {
        let device = {
            ipAddress: this.info.address,
            macAddress: '',
            identity: '',
            version: '',
            platform: '',
            uptime: 0,
            board: ''
        };

        /**
         * Mikrotik FirstByte starts at 8
         */

        let bufferLength = this.msg.buffer.byteLength;
        let offset = 4;
        while (offset + 4 < bufferLength) {
            let attrHead = Buffer.from(this.msg.buffer.slice(offset, offset + 4));
            let attrType = attrHead.readUInt16BE(0);
            let attrLength = attrHead.readUInt16BE(2);
            offset += 4;
            if (offset + attrLength > bufferLength){
                console.warn('invalid mndp packet: attribute too long');
                break;
            }

            switch (attrType) {
                case 1: // mac address
                    device.macAddress = buf2hex(this.msg.subarray(offset, offset + attrLength));
                    break;
                case 5: // identity
                    device.identity = bin2String(this.msg.subarray(offset, offset + attrLength));
                    break;
                case 7: // version
                    device.version = bin2String(this.msg.subarray(offset, offset + attrLength));
                    break;
                case 8: // platform
                    device.platform = bin2String(this.msg.subarray(offset, offset + attrLength));
                    break;
                case 10: // uptime
                    device.uptime = Buffer.from(this.msg.slice(offset, offset + attrLength)).readUInt32LE(0);
                    break;
                case 12: // board
                    device.board = bin2String(this.msg.subarray(offset, offset + attrLength));
                    break;
                default: // unknown type
                    console.debug('unknown mndp message type', attrType);
                    break;
            }

            offset += attrLength;
        }
        callback(device);
    }
}