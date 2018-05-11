export function buf2hex(buffer: Uint8Array): string
{
    return Array.prototype.map.call(new Uint8Array(buffer), (x: any)  => ('00' + x.toString(16)).slice(-2)).join('');
}

export function bin2String(buffer: Uint8Array): string
{
    return String.fromCharCode.apply(String, buffer);
}