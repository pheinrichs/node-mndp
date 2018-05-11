"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buf2hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2)).join('');
}
exports.buf2hex = buf2hex;
function bin2String(buffer) {
    return String.fromCharCode.apply(String, buffer);
}
exports.bin2String = bin2String;
