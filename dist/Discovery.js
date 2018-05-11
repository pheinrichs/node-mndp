"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("./util/format");
class Discovery {
    constructor(msg, info) {
        this.msg = msg;
        this.info = info;
    }
    /**
     * Output device information
     */
    output(callback) {
        this.format((response) => {
            callback(response);
        });
    }
    /**
     * Format the buffer array
     */
    format(callback) {
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
            device.macAddress = format_1.buf2hex(response.buffer);
            first_byte += response.length + 4;
            return this.decode(first_byte);
        }).then((response) => {
            device.identity = format_1.bin2String(response.buffer);
            first_byte += response.length + 4;
            return this.decode(first_byte);
        }).then((response) => {
            device.version = response.buffer.toString();
        }).then(() => {
            callback(device);
        });
    }
    /**
     * Decode the length / the value
     * @param start Byte to start
     * @param callback
     */
    decode(start) {
        return new Promise((resolve, reject) => {
            let lengthArray = new Buffer(this.msg.buffer.slice(start - 2, start));
            let length = lengthArray.readIntBE(0, lengthArray.byteLength);
            let item = new Buffer(this.msg.slice(start, start + length));
            resolve({
                buffer: item,
                length: length
            });
        });
    }
}
exports.Discovery = Discovery;
